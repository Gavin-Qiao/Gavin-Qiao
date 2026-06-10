<div align="center">

# mohan-cv

**Print-perfect CV as code. One stylesheet, three documents.**

A multi-page curriculum vitae built in pure HTML and CSS — no framework, no build step, no JavaScript at runtime. The same source renders pixel-identically in the browser and in PDF, and a single design-token sheet drives a full master CV plus tailored one-page variants.

[![HTML](https://img.shields.io/badge/HTML-semantic-1a1a1a?style=flat-square)](#)
[![CSS](https://img.shields.io/badge/CSS-print--grade-476173?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-912338?style=flat-square)](#license)
[![Commits: Conventional](https://img.shields.io/badge/commits-conventional-66707a?style=flat-square)](https://www.conventionalcommits.org)

<br>

| Master (3 pages) | Contract one-pager | Research one-pager |
|:---:|:---:|:---:|
| ![Master CV preview](docs/preview-master-1.png) | ![Contract variant preview](docs/preview-contract-1.png) | ![Post-grad variant preview](docs/preview-postgrad-1.png) |

</div>

---

## Why CV as code

A CV maintained as a document drifts: formats fork, exports go stale, and every tailored version becomes a divergent copy. Treating the CV as a small codebase fixes all three — content is versioned and diffable, variants share one stylesheet instead of forking it, and the PDF is a reproducible build artifact rather than a hand-exported snapshot.

## Features

- **True page model.** Each page is a fixed US-Letter (8.5 × 11 in) canvas with a sidebar and content column. What you see in the browser is exactly what prints.
- **One stylesheet, many documents.** The master CV and both one-page variants share `styles.css`. A variant is just another HTML file reusing the same classes.
- **Design tokens.** Colors, accents, shadows, and page geometry live in CSS custom properties at the top of `styles.css`. Rebrand the entire document by editing one block.
- **Print discipline built in.** `@media print` rules emit clean Letter pages with exact colors; links survive as clickable PDF annotations.
- **Zero dependencies.** Open `index.html` directly, or serve the folder with the included single-file Bun server. Nothing to install, nothing to compile.

## Quick start

```sh
git clone https://github.com/Gavin-Qiao/mohan-cv.git
cd mohan-cv

# Preview — any static server works; a Bun one is included
bun server.js          # http://localhost:4173
```

Edit `index.html` (and keep `content/mohan-cv.md` in sync — it is the plain-text source of truth for the same content), then export.

## Export to PDF

Any Chromium browser produces a faithful PDF. Headless, from the command line:

```sh
# Windows (Edge)
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="cv-master.pdf" "file:///C:/path/to/mohan-cv/index.html"

# macOS / Linux (Chrome)
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="cv-master.pdf" "file:///path/to/mohan-cv/index.html"
```

Repeat for `cv-contract.html` and `cv-postgrad.html`. Or simply print from the browser with margins set to None.

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Master CV — three fixed pages, full history |
| `cv-contract.html` | One-page variant for contract and fractional work |
| `cv-postgrad.html` | One-page variant for research and industry roles |
| `styles.css` | Design tokens, page model, all components |
| `content/mohan-cv.md` | Content source of truth, mirrored by the HTML |
| `assets/` | Sidebar motif and affiliation marks |
| `server.js` | Optional zero-dependency Bun preview server |
| `docs/` | Rendered previews used by this README |

## Make it yours

**1. Replace the content.** Contact cards, summary, and section cards are plain semantic HTML in each document. Update `content/mohan-cv.md` alongside it so the text source stays authoritative.

**2. Retheme with tokens.** Everything visual hangs off the custom properties in `:root`:

| Token | Role |
|---|---|
| `--brand` | Accent for emphasis marks and the sidebar quote |
| `--accent` / `--accent-soft` | Section indexes, labels, timeline accents |
| `--paper` / `--ink` / `--ink-soft` / `--muted` | Surface and three text strengths |
| `--page-width` / `--page-height` | Page geometry (swap in `210mm`/`297mm` for A4) |

**3. Replace personal assets.** The affiliation mark and sidebar motif under `assets/` are personal to this instance. Substitute your own — institutional logos are trademarks of their owners and are not covered by this repository's license.

**4. Respect the page budget.** Pages are fixed-height with `overflow: hidden`, which keeps print honest but clips silently. After any content change, export the PDF and check the bottom of each page; if a section disappeared, trim a card or move a block to the sidebar. Treat it like a failing test.

**5. Derive a variant.** Copy one `<article class="page">` into a new file, keep the stylesheet link, retitle the hero, and curate cards for one audience. A variant should answer one reader, on one page.

## Commit convention

This repository follows [Conventional Commits](https://www.conventionalcommits.org):

| Prefix | Used for |
|---|---|
| `feat:` | New documents, sections, or capabilities |
| `fix:` | Layout, overflow, or content corrections |
| `docs:` | README and documentation |
| `style:` | Visual changes with no content change |
| `chore:` | Tooling, ignores, maintenance |

## License

Code and stylesheet are released under the [MIT License](LICENSE).

The personal content of this instance — name, biography, project descriptions, photographs, and all logos and marks under `assets/` — is **not** licensed for reuse. Replace it with your own before publishing a fork.
