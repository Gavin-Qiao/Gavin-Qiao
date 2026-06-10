/*
 * renderer.js — builds the CV from per-language content files.
 *
 * Content files live in ./content/ and register themselves on a global:
 *
 *   window.CV_CONTENT["en"] = { label: "EN", ... }
 *
 * Add a language by copying an existing content file, translating the
 * values, and adding one <script> tag in index.html. The toggle below
 * is generated from the registry, so new languages appear automatically.
 *
 * Language resolution: ?lang= query parameter, then the visitor's last
 * choice (localStorage), then the browser language, then the first
 * registered language. The toggle is screen-only chrome; print styles
 * hide it, so exported PDFs stay clean.
 *
 * No dependencies, no build step. Works from file:// as well as a server.
 */

(function () {
  "use strict";

  var REGISTRY = window.CV_CONTENT || {};
  var LANGS = Object.keys(REGISTRY);
  if (LANGS.length === 0) {
    document.title = "No content registered";
    return;
  }

  /* ---------------------------------------------------------------- *
   * Language resolution
   * ---------------------------------------------------------------- */

  function pickLanguage() {
    var fromQuery = new URLSearchParams(window.location.search).get("lang");
    if (fromQuery && REGISTRY[fromQuery]) return fromQuery;

    var stored = null;
    try { stored = window.localStorage.getItem("cv-lang"); } catch (e) { /* file:// or privacy mode */ }
    if (stored && REGISTRY[stored]) return stored;

    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    if (nav && REGISTRY[nav]) return nav;

    return REGISTRY.en ? "en" : LANGS[0];
  }

  var LANG = pickLanguage();
  var DOC = REGISTRY[LANG];

  try { window.localStorage.setItem("cv-lang", LANG); } catch (e) { /* non-fatal */ }

  /* ---------------------------------------------------------------- *
   * Small DOM helpers
   * ---------------------------------------------------------------- */

  // el("p", {class: "summary", html: "..."}, child, child, ...)
  function el(tag, attrs) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "html") node.innerHTML = attrs[key];
        else if (key === "text") node.textContent = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    for (var i = 2; i < arguments.length; i++) {
      if (arguments[i]) node.appendChild(arguments[i]);
    }
    return node;
  }

  // h3 with an optional muted tag: <h3>Name <span>Tag</span></h3>
  function heading(item) {
    var h = el("h3", { html: item.name });
    if (item.tag) {
      h.appendChild(document.createTextNode(" "));
      h.appendChild(el("span", { html: item.tag }));
    }
    return h;
  }

  // "A · B · C" out of an array, using the stylesheet's dot separators
  function dotted(parts) {
    var p = el("p");
    parts.forEach(function (part, i) {
      if (i > 0) p.appendChild(el("span", { class: "dot" }));
      p.insertAdjacentHTML("beforeend", part);
    });
    return p;
  }

  /* ---------------------------------------------------------------- *
   * Section renderers — one per section "type" in the content schema
   * ---------------------------------------------------------------- */

  var SECTIONS = {

    // Cards with a name, muted tag, time, and a body paragraph.
    projects: function (section) {
      var grid = el("div", { class: "project-grid" });
      section.items.forEach(function (item) {
        grid.appendChild(
          el("article", { class: "project-card" },
            el("div", { class: "card-head" },
              heading(item),
              item.time ? el("time", { html: item.time }) : null),
            item.body ? el("p", { html: item.body }) : null));
      });
      return grid;
    },

    // Education-style vertical timeline.
    timeline: function (section) {
      var wrap = el("div", { class: "timeline" });
      section.items.forEach(function (item) {
        wrap.appendChild(
          el("article", { class: "timeline-item" },
            el("div", null,
              heading(item),
              item.detail ? dotted(item.detail) : null),
            item.time ? el("time", { html: item.time }) : null));
      });
      return wrap;
    },

    // Experience cards; items without a body collapse to one-line rows.
    experience: function (section) {
      var wrap = el("div", { class: "stack" + (section.tight ? " tight" : "") });
      section.items.forEach(function (item) {
        if (item.body) {
          wrap.appendChild(
            el("article", { class: "experience-card" },
              el("div", { class: "card-head" },
                heading(item),
                item.time ? el("time", { html: item.time }) : null),
              el("p", { html: item.body })));
        } else {
          wrap.appendChild(
            el("article", { class: "mini-row" },
              heading(item),
              item.time ? el("time", { html: item.time }) : null));
        }
      });
      return wrap;
    },

    // Honors / service list.
    honors: function (section) {
      var wrap = el("div", { class: "honor-list" });
      section.items.forEach(function (item) {
        wrap.appendChild(
          el("article", null,
            heading(item),
            item.time ? el("time", { html: item.time }) : null,
            item.body ? el("p", { html: item.body }) : null));
      });
      return wrap;
    },

    // Bibliography entries.
    publications: function (section) {
      var frag = document.createDocumentFragment();
      section.items.forEach(function (item) {
        frag.appendChild(
          el("article", { class: "publication" },
            el("p", { html: item.authors }),
            el("p", null, el("em", { html: item.title }))));
      });
      return frag;
    },

    // Three-column research focus grid.
    focus: function (section) {
      var grid = el("div", { class: "focus-grid" });
      section.items.forEach(function (item) {
        grid.appendChild(
          el("p", null,
            el("strong", { html: item.name }),
            el("span", { html: item.desc })));
      });
      return grid;
    },

    // Labelled skill rows.
    skills: function (section) {
      var panel = el("div", { class: "skills-panel" });
      section.rows.forEach(function (row) {
        var p = el("p");
        row.items.forEach(function (chip) {
          p.appendChild(el("span", { html: chip }));
        });
        panel.appendChild(
          el("div", { class: "skill-row" },
            el("h3", { html: row.name }),
            p));
      });
      return panel;
    }
  };

  /* ---------------------------------------------------------------- *
   * Page chrome — sidebar, hero, section shells
   * ---------------------------------------------------------------- */

  function renderSidebar() {
    var side = DOC.sidebar;
    var aside = el("aside", { class: "sidebar" });

    if (side.logo) {
      aside.appendChild(
        el("div", { class: "affiliation-mark", "aria-label": side.logo.alt },
          el("img", { src: side.logo.src, alt: side.logo.alt })));
    }

    var stack = el("section", { class: "contact-stack", "aria-label": "Contact" });
    side.contacts.forEach(function (c) {
      stack.appendChild(
        el("a", { href: c.href, class: "contact-card", "data-label": c.label },
          el("span", { text: c.text })));
    });
    aside.appendChild(stack);

    var strengths = el("section", { class: "side-section" },
      el("h2", { html: side.strengthsTitle }));
    var list = el("ul", { class: "strength-list" });
    side.strengths.forEach(function (s) {
      list.appendChild(el("li", null, el("span", { html: s })));
    });
    strengths.appendChild(list);

    if (side.quote) {
      var quote = el("blockquote", { class: "side-quote" },
        el("strong", { html: side.quote.title }));
      quote.insertAdjacentHTML("beforeend", side.quote.text);
      strengths.appendChild(quote);
    }
    aside.appendChild(strengths);

    return aside;
  }

  function renderPage(page, pageNumber, sectionCounter) {
    var article = el("article", { class: "page", "aria-label": DOC.name + " — " + pageNumber });

    article.appendChild(renderSidebar());

    var content = el("section", { class: "content" },
      el("header", { class: "hero" },
        el("div", null,
          el("p", { class: "kicker", html: DOC.kicker }),
          el("h1", { html: DOC.name }),
          el("p", { class: "subtitle", html: DOC.subtitle })),
        el("p", { class: "page-index", text: String(pageNumber).padStart(2, "0") })));

    if (pageNumber === 1 && DOC.summary) {
      content.appendChild(el("p", { class: "summary", html: DOC.summary }));
    }

    page.sections.forEach(function (section) {
      var render = SECTIONS[section.type];
      if (!render) return;
      var shell = el("section", { class: "section" + (section.compact ? " compact" : "") + (section.type === "focus" ? " focus-section" : "") },
        el("div", { class: "section-title" },
          el("span", { class: "section-index", text: String(++sectionCounter.n).padStart(2, "0") }),
          el("h2", { html: section.title })));
      shell.appendChild(render(section));
      content.appendChild(shell);
    });

    article.appendChild(content);
    return article;
  }

  function renderToggle() {
    if (LANGS.length < 2) return null;
    var nav = el("nav", { class: "lang-toggle", "aria-label": "Language" });
    LANGS.forEach(function (code) {
      var a = el("a", { href: "?lang=" + code, hreflang: code, lang: code, text: REGISTRY[code].label || code.toUpperCase() });
      if (code === LANG) a.setAttribute("aria-current", "true");
      nav.appendChild(a);
    });
    return nav;
  }

  /* ---------------------------------------------------------------- *
   * Mount
   * ---------------------------------------------------------------- */

  document.documentElement.setAttribute("lang", DOC.htmlLang || LANG);
  document.title = DOC.title;

  var root = document.getElementById("cv-root");
  root.setAttribute("aria-label", DOC.title);
  root.textContent = "";

  var counter = { n: 0 };
  DOC.pages.forEach(function (page, i) {
    root.appendChild(renderPage(page, i + 1, counter));
  });

  var toggle = renderToggle();
  if (toggle) document.body.insertBefore(toggle, document.body.firstChild);
})();
