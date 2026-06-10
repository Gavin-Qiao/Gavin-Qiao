/**
 * renderer.ts — builds the CV from the language registry.
 *
 * Pure DOM construction, no dependencies. Language resolution order:
 * `?lang=` query parameter, the visitor's remembered choice, the
 * browser language, then the first registered language. The language
 * toggle is generated from the registry and is screen-only chrome —
 * print styles remove it, so exported PDFs stay clean.
 */

import type {
  CVDocument,
  Item,
  Page,
  Registry,
  Section,
} from "./types";

/* ------------------------------------------------------------------ *
 * Small DOM helpers
 * ------------------------------------------------------------------ */

type Attrs = Record<string, string> & { html?: string; text?: string };

function el(
  tag: string,
  attrs?: Attrs | null,
  ...children: Array<Node | null | undefined>
): HTMLElement {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === undefined) continue;
      if (key === "html") node.innerHTML = value;
      else if (key === "text") node.textContent = value;
      else node.setAttribute(key, value);
    }
  }
  for (const child of children) if (child) node.appendChild(child);
  return node;
}

/** `<h3>Name <span>Tag</span></h3>` — the shared card heading. */
function heading(item: { name: string; tag?: string }): HTMLElement {
  const h = el("h3", { html: item.name });
  if (item.tag) {
    h.appendChild(document.createTextNode(" "));
    h.appendChild(el("span", { html: item.tag }));
  }
  return h;
}

/** Joins parts with the stylesheet's dot separators. */
function dotted(parts: string[]): HTMLElement {
  const p = el("p");
  parts.forEach((part, i) => {
    if (i > 0) p.appendChild(el("span", { class: "dot" }));
    p.insertAdjacentHTML("beforeend", part);
  });
  return p;
}

function timeEl(time?: string): HTMLElement | null {
  return time ? el("time", { html: time }) : null;
}

/* ------------------------------------------------------------------ *
 * Section renderers
 * ------------------------------------------------------------------ */

function cardArticle(item: Item, className: string): HTMLElement {
  return el(
    "article",
    { class: className },
    el("div", { class: "card-head" }, heading(item), timeEl(item.time)),
    item.body ? el("p", { html: item.body }) : null,
  );
}

function renderSection(section: Section): Node {
  switch (section.type) {
    case "projects": {
      const grid = el("div", { class: "project-grid" });
      for (const item of section.items) grid.appendChild(cardArticle(item, "project-card"));
      return grid;
    }

    case "timeline": {
      const wrap = el("div", { class: "timeline" });
      for (const item of section.items) {
        wrap.appendChild(
          el(
            "article",
            { class: "timeline-item" },
            el("div", null, heading(item), item.detail ? dotted(item.detail) : null),
            timeEl(item.time),
          ),
        );
      }
      return wrap;
    }

    case "experience": {
      const wrap = el("div", { class: "stack" + (section.tight ? " tight" : "") });
      for (const item of section.items) {
        wrap.appendChild(
          item.body
            ? cardArticle(item, "experience-card")
            : el("article", { class: "mini-row" }, heading(item), timeEl(item.time)),
        );
      }
      return wrap;
    }

    case "honors": {
      const wrap = el("div", { class: "honor-list" });
      for (const item of section.items) {
        wrap.appendChild(
          el(
            "article",
            null,
            heading(item),
            timeEl(item.time),
            item.body ? el("p", { html: item.body }) : null,
          ),
        );
      }
      return wrap;
    }

    case "publications": {
      const frag = document.createDocumentFragment();
      for (const item of section.items) {
        frag.appendChild(
          el(
            "article",
            { class: "publication" },
            el("p", { html: item.authors }),
            el("p", null, el("em", { html: item.title })),
          ),
        );
      }
      return frag;
    }

    case "focus": {
      const grid = el("div", { class: "focus-grid" });
      for (const item of section.items) {
        grid.appendChild(
          el("p", null, el("strong", { html: item.name }), el("span", { html: item.desc })),
        );
      }
      return grid;
    }

    case "skills": {
      const panel = el("div", { class: "skills-panel" });
      for (const row of section.rows) {
        const p = el("p");
        for (const chip of row.items) p.appendChild(el("span", { html: chip }));
        panel.appendChild(
          el("div", { class: "skill-row" }, el("h3", { html: row.name }), p),
        );
      }
      return panel;
    }
  }
}

/* ------------------------------------------------------------------ *
 * Page chrome
 * ------------------------------------------------------------------ */

function renderSidebar(doc: CVDocument): HTMLElement {
  const side = doc.sidebar;
  const aside = el("aside", { class: "sidebar" });

  if (side.logo) {
    aside.appendChild(
      el(
        "div",
        { class: "affiliation-mark", "aria-label": side.logo.alt },
        el("img", { src: side.logo.src, alt: side.logo.alt }),
      ),
    );
  }

  const stack = el("section", { class: "contact-stack", "aria-label": "Contact" });
  for (const c of side.contacts) {
    stack.appendChild(
      el("a", { href: c.href, class: "contact-card", "data-label": c.label },
        el("span", { text: c.text })),
    );
  }
  aside.appendChild(stack);

  const strengths = el(
    "section",
    { class: "side-section" },
    el("h2", { html: side.strengthsTitle }),
  );
  const list = el("ul", { class: "strength-list" });
  for (const s of side.strengths) list.appendChild(el("li", null, el("span", { html: s })));
  strengths.appendChild(list);

  if (side.quote) {
    const quote = el("blockquote", { class: "side-quote" },
      el("strong", { html: side.quote.title }));
    quote.insertAdjacentHTML("beforeend", side.quote.text);
    strengths.appendChild(quote);
  }
  aside.appendChild(strengths);

  return aside;
}

function renderPage(
  doc: CVDocument,
  page: Page,
  pageNumber: number,
  counter: { n: number },
): HTMLElement {
  const article = el("article", {
    class: "page",
    "aria-label": `${doc.name} — ${pageNumber}`,
  });

  article.appendChild(renderSidebar(doc));

  const content = el(
    "section",
    { class: "content" },
    el(
      "header",
      { class: "hero" },
      el(
        "div",
        null,
        el("p", { class: "kicker", html: doc.kicker }),
        el("h1", { html: doc.name }),
        el("p", { class: "subtitle", html: doc.subtitle }),
      ),
      el("p", { class: "page-index", text: String(pageNumber).padStart(2, "0") }),
    ),
  );

  if (pageNumber === 1 && doc.summary) {
    content.appendChild(el("p", { class: "summary", html: doc.summary }));
  }

  for (const section of page.sections) {
    const shell = el(
      "section",
      {
        class:
          "section" +
          (section.compact ? " compact" : "") +
          (section.type === "focus" ? " focus-section" : ""),
      },
      el(
        "div",
        { class: "section-title" },
        el("span", { class: "section-index", text: String(++counter.n).padStart(2, "0") }),
        el("h2", { html: section.title }),
      ),
    );
    shell.appendChild(renderSection(section));
    content.appendChild(shell);
  }

  article.appendChild(content);
  return article;
}

/* ------------------------------------------------------------------ *
 * Language resolution and mounting
 * ------------------------------------------------------------------ */

function pickLanguage(registry: Registry): string {
  const codes = Object.keys(registry);

  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  if (fromQuery && registry[fromQuery]) return fromQuery;

  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem("cv-lang");
  } catch {
    /* file:// or privacy mode — non-fatal */
  }
  if (stored && registry[stored]) return stored;

  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  if (nav && registry[nav]) return nav;

  return registry.en ? "en" : codes[0];
}

function renderToggle(registry: Registry, active: string): HTMLElement | null {
  const codes = Object.keys(registry);
  if (codes.length < 2) return null;

  const nav = el("nav", { class: "lang-toggle", "aria-label": "Language" });
  for (const code of codes) {
    const a = el("a", {
      href: `?lang=${code}`,
      hreflang: code,
      lang: code,
      text: registry[code].label || code.toUpperCase(),
    });
    if (code === active) a.setAttribute("aria-current", "true");
    nav.appendChild(a);
  }
  return nav;
}

/** Renders the registry into `#cv-root`. Call once, after the DOM exists. */
export function renderCV(registry: Registry): void {
  const codes = Object.keys(registry);
  if (codes.length === 0) return;

  const lang = pickLanguage(registry);
  const doc = registry[lang];

  try {
    window.localStorage.setItem("cv-lang", lang);
  } catch {
    /* non-fatal */
  }

  document.documentElement.setAttribute("lang", doc.htmlLang || lang);
  document.title = doc.title;

  const root = document.getElementById("cv-root");
  if (!root) return;
  root.setAttribute("aria-label", doc.title);
  root.textContent = "";

  const counter = { n: 0 };
  doc.pages.forEach((page, i) => {
    root.appendChild(renderPage(doc, page, i + 1, counter));
  });

  const toggle = renderToggle(registry, lang);
  if (toggle) document.body.insertBefore(toggle, document.body.firstChild);
}
