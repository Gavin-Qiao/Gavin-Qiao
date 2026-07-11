#!/usr/bin/env python3
"""
Neo-Plasticism banner + matching footer.

- Center name cell is FIXED (position, size, type — never moves)
- Surrounding planes and their internal dividers move slowly / mechanically
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 340
FW, FH = 1200, 96

FPS = 10
SECONDS = 8
FRAMES = FPS * SECONDS
STEPS = 16

RED = (227, 6, 19)
BLUE = (0, 85, 164)
YELLOW = (255, 204, 0)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

LW = 16
OUT = Path(__file__).resolve().parent

# Fixed name cell (canvas coordinates) — this grid never moves
NX0, NX1 = 400, 800
NY0, NY1 = 100, 240


def load_font(size: int) -> ImageFont.ImageFont:
    # Geometric grotesques first — better De Stijl fit than Avenir
    preferred = [
        ("/System/Library/Fonts/Supplemental/Futura.ttc", (1, 2, 0)),  # medium/bold-ish
        ("/System/Library/Fonts/Supplemental/DIN Alternate Bold.ttf", (0,)),
        ("/System/Library/Fonts/HelveticaNeue.ttc", (1, 0)),
        ("/System/Library/Fonts/Supplemental/Arial Bold.ttf", (0,)),
    ]
    for path, indices in preferred:
        for index in indices:
            try:
                return ImageFont.truetype(path, size=size, index=index)
            except OSError:
                try:
                    return ImageFont.truetype(path, size=size)
                except OSError:
                    continue
    return ImageFont.load_default()


FONT = load_font(44)


def draw_tracked_text(
    d: ImageDraw.ImageDraw,
    text: str,
    cx: int,
    y: int,
    font: ImageFont.ImageFont,
    fill,
    tracking: float = 0.18,
) -> tuple[int, int]:
    """
    Draw text centered at (cx, y_top) with extra letter-spacing.
    tracking is a fraction of em-width between glyphs.
    Returns (width, height) of the drawn block.
    """
    if not text:
        return 0, 0
    # Measure glyphs
    widths = []
    height = 0
    for ch in text:
        b = d.textbbox((0, 0), ch, font=font)
        widths.append(b[2] - b[0])
        height = max(height, b[3] - b[1])
    # Average char width for gap
    avg = sum(widths) / max(len(widths), 1)
    gap = avg * tracking
    total_w = sum(widths) + gap * (len(text) - 1)
    x = cx - total_w / 2
    for ch, w in zip(text, widths):
        d.text((x, y), ch, font=font, fill=fill)
        x += w + gap
    return int(total_w), height


def mechanical_t(frame: int) -> float:
    cycle = frame % FRAMES
    half = FRAMES // 2
    raw = (cycle / half) if cycle <= half else (2 - cycle / half)
    return round(raw * (STEPS - 1)) / (STEPS - 1)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def fill_h_split(
    d: ImageDraw.ImageDraw,
    x0: int,
    y0: int,
    x1: int,
    y1: int,
    split_x: int,
    left_c,
    right_c,
) -> None:
    """Fill a rect with a vertical color split at split_x (clamped to rect)."""
    if x1 <= x0 or y1 <= y0:
        return
    s = max(x0, min(x1, split_x))
    if s > x0:
        d.rectangle([x0, y0, s, y1], fill=left_c)
    if s < x1:
        d.rectangle([s, y0, x1, y1], fill=right_c)


def fill_v_split(
    d: ImageDraw.ImageDraw,
    x0: int,
    y0: int,
    x1: int,
    y1: int,
    split_y: int,
    top_c,
    bot_c,
) -> None:
    if x1 <= x0 or y1 <= y0:
        return
    s = max(y0, min(y1, split_y))
    if s > y0:
        d.rectangle([x0, y0, x1, s], fill=top_c)
    if s < y1:
        d.rectangle([x0, s, x1, y1], fill=bot_c)


def draw_v_bar(d: ImageDraw.ImageDraw, x: int, y0: int, y1: int, lw: int = LW) -> None:
    d.rectangle([x - lw // 2, y0, x + lw // 2, y1], fill=BLACK)


def draw_h_bar(d: ImageDraw.ImageDraw, y: int, x0: int, x1: int, lw: int = LW) -> None:
    d.rectangle([x0, y - lw // 2, x1, y + lw // 2], fill=BLACK)


def draw_name(d: ImageDraw.ImageDraw) -> None:
    """Fixed white cell. Futura + open tracking. No underline."""
    d.rectangle([NX0, NY0, NX1, NY1], fill=WHITE)
    cx = (NX0 + NX1) // 2
    cy = (NY0 + NY1) // 2
    lines = ["MOHAN", "QIAO"]
    # Measure stacked block height first
    line_heights = []
    for ln in lines:
        b = d.textbbox((0, 0), ln, font=FONT)
        line_heights.append(b[3] - b[1])
    gap = 10
    total_h = sum(line_heights) + gap
    y = cy - total_h // 2
    for ln, lh in zip(lines, line_heights):
        draw_tracked_text(d, ln, cx, y, FONT, BLACK, tracking=0.22)
        y += lh + gap


def frame_banner(t: float) -> Image.Image:
    img = Image.new("RGB", (W, H), WHITE)
    d = ImageDraw.Draw(img)

    # Animated parameters (outer only)
    top_split = int(lerp(220, 900, t))          # yellow|red in top row
    bot_split = int(lerp(900, 220, t))          # blue|white in bottom row (counter)
    left_split = int(lerp(NY0 + 30, NY1 - 30, t))
    right_split = int(lerp(NY1 - 30, NY0 + 30, t))
    br_accent = int(lerp(100, 280, t))          # yellow block width bottom-right

    # ── 8 outer cells around fixed center ──────────────────────────────────
    # Top-left, top-center, top-right
    fill_h_split(d, 0, 0, NX0, NY0, top_split, YELLOW, RED)
    fill_h_split(d, NX0, 0, NX1, NY0, top_split, YELLOW, RED)
    fill_h_split(d, NX1, 0, W, NY0, top_split, YELLOW, RED)

    # Mid-left, mid-right (beside name)
    fill_v_split(d, 0, NY0, NX0, NY1, left_split, WHITE, BLUE)
    fill_v_split(d, NX1, NY0, W, NY1, right_split, RED, YELLOW)

    # Bottom-left, bottom-center, bottom-right
    fill_h_split(d, 0, NY1, NX0, H, bot_split, BLUE, WHITE)
    fill_h_split(d, NX0, NY1, NX1, H, bot_split, BLUE, WHITE)
    fill_h_split(d, NX1, NY1, W, H, bot_split, BLUE, WHITE)
    # Bottom-right yellow accent (overwrites a slice of BR)
    d.rectangle([W - br_accent, NY1, W, H], fill=YELLOW)

    # ── Moving dividers (only in outer rings — stop at name cell edges) ────
    # Top vertical splitter (only above name cell)
    draw_v_bar(d, top_split, 0, NY0)
    # Bottom vertical splitter (only below name cell)
    draw_v_bar(d, bot_split, NY1, H)
    # Left horizontal splitter (only left of name cell)
    draw_h_bar(d, left_split, 0, NX0)
    # Right horizontal splitter (only right of name cell)
    draw_h_bar(d, right_split, NX1, W)

    # ── Fixed grid: the four lines that box the name cell + span full canvas ─
    draw_h_bar(d, NY0, 0, W)  # top of name row
    draw_h_bar(d, NY1, 0, W)  # bottom of name row
    draw_v_bar(d, NX0, 0, H)  # left of name col
    draw_v_bar(d, NX1, 0, H)  # right of name col

    # Fixed name cell (painted last so type is always sharp)
    draw_name(d)

    # Outer frame
    d.rectangle([0, 0, W - 1, H - 1], outline=BLACK, width=LW)
    return img


def frame_footer(t: float) -> Image.Image:
    """Same structure, scaled; empty fixed center (no type)."""
    img = Image.new("RGB", (FW, FH), WHITE)
    d = ImageDraw.Draw(img)
    lw = 10
    x0, x1 = 400, 800
    y0, y1 = 28, 68

    top_split = int(lerp(220, 900, t))
    bot_split = int(lerp(900, 220, t))
    left_split = int(lerp(y0 + 6, y1 - 6, t))
    right_split = int(lerp(y1 - 6, y0 + 6, t))
    br_accent = int(lerp(80, 200, t))

    def vbar(x, ya, yb):
        d.rectangle([x - lw // 2, ya, x + lw // 2, yb], fill=BLACK)

    def hbar(y, xa, xb):
        d.rectangle([xa, y - lw // 2, xb, y + lw // 2], fill=BLACK)

    fill_h_split(d, 0, 0, x0, y0, top_split, YELLOW, RED)
    fill_h_split(d, x0, 0, x1, y0, top_split, YELLOW, RED)
    fill_h_split(d, x1, 0, FW, y0, top_split, YELLOW, RED)
    fill_v_split(d, 0, y0, x0, y1, left_split, WHITE, BLUE)
    fill_v_split(d, x1, y0, FW, y1, right_split, RED, YELLOW)
    fill_h_split(d, 0, y1, x0, FH, bot_split, BLUE, WHITE)
    fill_h_split(d, x0, y1, x1, FH, bot_split, BLUE, WHITE)
    fill_h_split(d, x1, y1, FW, FH, bot_split, BLUE, WHITE)
    d.rectangle([FW - br_accent, y1, FW, FH], fill=YELLOW)

    vbar(top_split, 0, y0)
    vbar(bot_split, y1, FH)
    hbar(left_split, 0, x0)
    hbar(right_split, x1, FW)

    hbar(y0, 0, FW)
    hbar(y1, 0, FW)
    vbar(x0, 0, FH)
    vbar(x1, 0, FH)

    d.rectangle([x0, y0, x1, y1], fill=WHITE)
    d.rectangle([0, 0, FW - 1, FH - 1], outline=BLACK, width=lw)
    return img


def write_gif(path: Path, frame_fn) -> None:
    frames = [
        frame_fn(mechanical_t(i)).quantize(colors=48, method=Image.Quantize.MEDIANCUT)
        for i in range(FRAMES)
    ]
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=int(1000 / FPS),
        loop=0,
        optimize=True,
        disposal=2,
    )


def main() -> None:
    write_gif(OUT / "neo-01-grid.gif", frame_banner)
    write_gif(OUT / "neo-01-footer.gif", frame_footer)
    frame_banner(0).save(OUT / "neo-01-grid-still.png")
    frame_banner(1.0).save(OUT / "neo-01-grid-end.png")
    frame_footer(0).save(OUT / "neo-01-footer-still.png")
    b = (OUT / "neo-01-grid.gif").stat().st_size // 1024
    f = (OUT / "neo-01-footer.gif").stat().st_size // 1024
    print(f"banner {b} KB · footer {f} KB · fixed center name · moving outer planes")


if __name__ == "__main__":
    main()
