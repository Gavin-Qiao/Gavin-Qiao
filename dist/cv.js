(() => {
  // src/renderer.ts
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (value === undefined)
          continue;
        if (key === "html")
          node.innerHTML = value;
        else if (key === "text")
          node.textContent = value;
        else
          node.setAttribute(key, value);
      }
    }
    for (const child of children)
      if (child)
        node.appendChild(child);
    return node;
  }
  function heading(item) {
    const h = el("h3", { html: item.name });
    if (item.tag) {
      h.appendChild(document.createTextNode(" "));
      h.appendChild(el("span", { html: item.tag }));
    }
    return h;
  }
  function dotted(parts) {
    const p = el("p");
    parts.forEach((part, i) => {
      if (i > 0)
        p.appendChild(el("span", { class: "dot" }));
      p.insertAdjacentHTML("beforeend", part);
    });
    return p;
  }
  function timeEl(time) {
    return time ? el("time", { html: time }) : null;
  }
  function cardArticle(item, className) {
    return el("article", { class: className }, el("div", { class: "card-head" }, heading(item), timeEl(item.time)), item.body ? el("p", { html: item.body }) : null);
  }
  function renderSection(section) {
    switch (section.type) {
      case "projects": {
        const grid = el("div", { class: "project-grid" });
        for (const item of section.items)
          grid.appendChild(cardArticle(item, "project-card"));
        return grid;
      }
      case "timeline": {
        const wrap = el("div", { class: "timeline" });
        for (const item of section.items) {
          wrap.appendChild(el("article", { class: "timeline-item" }, el("div", null, heading(item), item.detail ? dotted(item.detail) : null), timeEl(item.time)));
        }
        return wrap;
      }
      case "experience": {
        const wrap = el("div", { class: "stack" + (section.tight ? " tight" : "") });
        for (const item of section.items) {
          wrap.appendChild(item.body ? cardArticle(item, "experience-card") : el("article", { class: "mini-row" }, heading(item), timeEl(item.time)));
        }
        return wrap;
      }
      case "honors": {
        const wrap = el("div", { class: "honor-list" });
        for (const item of section.items) {
          wrap.appendChild(el("article", null, heading(item), timeEl(item.time), item.body ? el("p", { html: item.body }) : null));
        }
        return wrap;
      }
      case "publications": {
        const frag = document.createDocumentFragment();
        for (const item of section.items) {
          frag.appendChild(el("article", { class: "publication" }, el("p", { html: item.authors }), el("p", null, el("em", { html: item.title }))));
        }
        return frag;
      }
      case "focus": {
        const grid = el("div", { class: "focus-grid" });
        for (const item of section.items) {
          grid.appendChild(el("p", null, el("strong", { html: item.name }), el("span", { html: item.desc })));
        }
        return grid;
      }
      case "skills": {
        const panel = el("div", { class: "skills-panel" });
        for (const row of section.rows) {
          const p = el("p");
          for (const chip of row.items)
            p.appendChild(el("span", { html: chip }));
          panel.appendChild(el("div", { class: "skill-row" }, el("h3", { html: row.name }), p));
        }
        return panel;
      }
    }
  }
  function renderSidebar(doc) {
    const side = doc.sidebar;
    const aside = el("aside", { class: "sidebar" });
    if (side.logo) {
      aside.appendChild(el("div", { class: "affiliation-mark", "aria-label": side.logo.alt }, el("img", { src: side.logo.src, alt: side.logo.alt })));
    }
    const stack = el("section", { class: "contact-stack", "aria-label": "Contact" });
    for (const c of side.contacts) {
      stack.appendChild(el("a", { href: c.href, class: "contact-card", "data-label": c.label }, el("span", { text: c.text })));
    }
    aside.appendChild(stack);
    const strengths = el("section", { class: "side-section" }, el("h2", { html: side.strengthsTitle }));
    const list = el("ul", { class: "strength-list" });
    for (const s of side.strengths)
      list.appendChild(el("li", null, el("span", { html: s })));
    strengths.appendChild(list);
    if (side.quote) {
      const quote = el("blockquote", { class: "side-quote" }, el("strong", { html: side.quote.title }));
      quote.insertAdjacentHTML("beforeend", side.quote.text);
      strengths.appendChild(quote);
    }
    aside.appendChild(strengths);
    return aside;
  }
  function renderPage(doc, page, pageNumber, counter) {
    const article = el("article", {
      class: "page",
      "aria-label": `${doc.name} — ${pageNumber}`
    });
    article.appendChild(renderSidebar(doc));
    const content = el("section", { class: "content" }, el("header", { class: "hero" }, el("div", null, el("p", { class: "kicker", html: doc.kicker }), el("h1", { html: doc.name }), el("p", { class: "subtitle", html: doc.subtitle })), el("p", { class: "page-index", text: String(pageNumber).padStart(2, "0") })));
    if (pageNumber === 1 && doc.summary) {
      content.appendChild(el("p", { class: "summary", html: doc.summary }));
    }
    for (const section of page.sections) {
      const shell = el("section", {
        class: "section" + (section.compact ? " compact" : "") + (section.type === "focus" ? " focus-section" : "")
      }, el("div", { class: "section-title" }, el("span", { class: "section-index", text: String(++counter.n).padStart(2, "0") }), el("h2", { html: section.title })));
      shell.appendChild(renderSection(section));
      content.appendChild(shell);
    }
    article.appendChild(content);
    return article;
  }
  function pickLanguage(registry) {
    const codes = Object.keys(registry);
    const fromQuery = new URLSearchParams(window.location.search).get("lang");
    if (fromQuery && registry[fromQuery])
      return fromQuery;
    let stored = null;
    try {
      stored = window.localStorage.getItem("cv-lang");
    } catch {}
    if (stored && registry[stored])
      return stored;
    const nav = (navigator.language || "").slice(0, 2).toLowerCase();
    if (nav && registry[nav])
      return nav;
    return registry.en ? "en" : codes[0];
  }
  function renderToggle(registry, active) {
    const codes = Object.keys(registry);
    if (codes.length < 2)
      return null;
    const nav = el("nav", { class: "lang-toggle", "aria-label": "Language" });
    for (const code of codes) {
      const a = el("a", {
        href: `?lang=${code}`,
        hreflang: code,
        lang: code,
        text: registry[code].label || code.toUpperCase()
      });
      if (code === active)
        a.setAttribute("aria-current", "true");
      nav.appendChild(a);
    }
    return nav;
  }
  function renderCV(registry) {
    const codes = Object.keys(registry);
    if (codes.length === 0)
      return;
    const lang = pickLanguage(registry);
    const doc = registry[lang];
    try {
      window.localStorage.setItem("cv-lang", lang);
    } catch {}
    document.documentElement.setAttribute("lang", doc.htmlLang || lang);
    document.title = doc.title;
    const root = document.getElementById("cv-root");
    if (!root)
      return;
    root.setAttribute("aria-label", doc.title);
    root.textContent = "";
    const counter = { n: 0 };
    doc.pages.forEach((page, i) => {
      root.appendChild(renderPage(doc, page, i + 1, counter));
    });
    const toggle = renderToggle(registry, lang);
    if (toggle)
      document.body.insertBefore(toggle, document.body.firstChild);
  }

  // content/master.en.ts
  var en = {
    label: "EN",
    htmlLang: "en",
    title: "Mohan Qiao CV",
    kicker: "Curriculum Vitae",
    name: "Mohan Qiao",
    subtitle: "AI &amp; LLM-Agent Engineer &middot; Trustworthy &amp; Governed Agent Systems",
    summary: "Builder of <strong>trustworthy, governed multi-agent LLM systems</strong> &mdash; orchestration, evaluation, guardrails, and audit-grade provenance, from formally verified proof search (Lean&nbsp;4) to production platforms. PhD candidate (Information &amp; Systems Engineering, Concordia, 2027) and co-founder of <strong>Telotia</strong>. Bilingual EN/FR &middot; Montr&eacute;al.",
    sidebar: {
      logo: {
        src: "./assets/concordia-wordmark-transparent.png",
        alt: "Concordia University"
      },
      contacts: [
        { label: "Phone", href: "tel:+15145853689", text: "+1 (514) 585-3689" },
        { label: "Email", href: "mailto:mohan.qiao@mail.concordia.ca", text: "mohan.qiao@mail.concordia.ca" },
        { label: "Email", href: "mailto:mohan.qiao@mail.mcgill.ca", text: "mohan.qiao@mail.mcgill.ca" },
        { label: "GitHub", href: "https://github.com/Gavin-Qiao", text: "github.com/Gavin-Qiao" },
        { label: "LinkedIn", href: "https://linkedin.com/in/mohan-qiao", text: "linkedin.com/in/mohan-qiao" }
      ],
      strengthsTitle: "Core Strengths",
      strengths: [
        "LLM Agent Orchestration",
        "Agent Reliability &amp; Evaluation",
        "Evidence Governance &amp; Assurance",
        "Full-Stack Engineering",
        "Neuro-Symbolic AI",
        "Applied ML &amp; RL"
      ],
      quote: {
        title: "Capability is not warrant",
        text: "Building AI agents whose outputs you can audit, not merely trust."
      }
    },
    pages: [
      {
        sections: [
          {
            type: "projects",
            title: "Selected Projects &mdash; Agent &amp; Systems",
            items: [
              {
                name: "Telotia",
                tag: "Co-Founder",
                time: "Ongoing",
                body: "Co-founder building trustworthy, governed AI agents for regulated quality processes (CAPA validation), applying evidence-governance and audit discipline so LLM-agent outputs are admissible in FDA/ISO-regulated workflows."
              },
              {
                name: "Principia",
                tag: "Evidence-Governance Framework",
                time: "2026",
                body: "Authored Principia, a fallibilist evidence-governance framework for coordinating fallible multi-agent LLM systems &mdash; typed context, source-preserved receipts, adversarial review, and governed closure (&ldquo;capability is not warrant&rdquo;). Probatio is its working implementation. Paper in preparation (draft v4.6, 2026)."
              },
              {
                name: "Probatio",
                tag: "Lean-Verified Proof-Search Organization",
                time: "Active &middot; paper WIP",
                body: "Research harness measuring what organization adds over a bare model: multi-agent debate, lock-and-recurse decomposition, mechanical proof repair, and accumulated memory drive a small local LLM against Lean&nbsp;4 kernel verification on formalized Erd&#337;s problems (DeepMind AlphaProof Nexus benchmark). Organizational levers alone advanced the Erd&#337;s&nbsp;#125 ladder from 5/19 to 10/19 rungs &mdash; every close cold-verified, axiom-clean &mdash; across 80+ evidence-logged findings on a governed claim ladder."
              },
              {
                name: "SDPS 2026 Platform",
                tag: 'Full-Stack &middot; <a href="https://sdpsnet.org">sdpsnet.org</a>',
                time: "2025&ndash;Present",
                body: "Own the SDPS conference platform end-to-end: chose the stack (Astro / TypeScript / Cloudflare D1/R2), recovered the society&rsquo;s data from the predecessor server compromised in a serious cybersecurity attack, and ship + operate registration, paper submission, payments, and transactional email &mdash; including service billing (Cloudflare, Resend) &mdash; with an automated test suite and release gating."
              }
            ]
          },
          {
            type: "timeline",
            title: "Education",
            items: [
              {
                name: "Ph.D. Information &amp; Systems Engineering",
                detail: ["Concordia University", "Supervisor: Prof. Yong Zeng", "4.30 / 4.30", "Accelerated to PhD"],
                time: "2024&ndash;Present"
              },
              {
                name: "M.A.Sc. Quality Systems Engineering",
                detail: ["Concordia University", "4.30 / 4.30", "Concordia Merit Scholarship"],
                time: "2023&ndash;2024"
              },
              {
                name: "B.Sc. in Mathematics &amp; Computer Science",
                detail: ["McGill University", "Joint Major", "3.62 / 4.00"],
                time: "2019&ndash;2022"
              },
              {
                name: "DEC Science de la Nature",
                detail: ["Coll&egrave;ge Bois-de-Boulogne"],
                time: "2017&ndash;2019"
              }
            ]
          }
        ]
      },
      {
        sections: [
          {
            type: "projects",
            title: "Research Projects",
            items: [
              {
                name: "Aviation Safety Project",
                tag: "Industry collaboration &middot; Collins Aerospace",
                time: "Ongoing",
                body: "Knowledge-to-assurance pipeline turning aviation documentation, regulations, simulator state, and incident narratives into authority-tagged artifacts, temporal monitors, falsification traces, and RL safety contracts for safety-critical flight scenarios."
              },
              {
                name: "Psi",
                tag: "Exploratory Clustering &middot; with Prof. Yong Zeng",
                time: "Active",
                body: "Developing proximity-based structure discovery without a preset number of groups. Manuscript in preparation."
              },
              {
                name: "Proximity Atlas",
                tag: "Proximity Evidence",
                time: "Active",
                body: "Developing an atlas of proximity evidence rather than one accepted clustering; non-decision remains allowed. Manuscript in preparation."
              },
              {
                name: "OECD PISA 2025 Creative Thinking",
                tag: "UBC Collaboration",
                time: "Jan 2025&ndash;Present",
                body: "Co-lead researcher for PISA Canada English group (10+ researchers, UBC collaboration), studying creative thinking across cultures. Built &ldquo;PRISM,&rdquo; a cross-platform assessment system implementing three theoretical frameworks for standardized international evaluation."
              },
              {
                name: "LLM for Assessing Creativity",
                time: "Ongoing",
                body: "Leading research on using LLMs to automate and scale creativity assessment &mdash; whether language models can replicate expert-level scoring of divergent-thinking tasks across languages and cultures, with calibrated evaluation."
              },
              {
                name: "AI-Enabled Cancer Prevention App",
                tag: "University of Calgary",
                time: "Sept 2023&ndash;Sept 2024",
                body: "Designed AI-driven dialogue mechanisms for personalized behavioral interventions targeting sedentary-behaviour reduction, applying Environment-Based Design methodology and the TASKS framework."
              }
            ]
          },
          {
            type: "publications",
            title: "Publications",
            compact: true,
            items: [
              {
                authors: "Camarda, A., Cassotti, M., &hellip;, <strong>Qiao, M.</strong>, &hellip;, &amp; Lubart, T. (Under review).",
                title: "Cognitive Flexibility and Rigidity Across Cultures and Genders: Evidence from PISA Creative Problem-Solving."
              }
            ]
          },
          {
            type: "focus",
            title: "Research Focus",
            items: [
              { name: "Trustworthy agents", desc: "Governed, audited multi-agent LLM systems and orchestration." },
              { name: "Evidence &amp; assurance", desc: "Source-grounded artifacts, monitors, and verifiable closure." },
              { name: "Human &amp; model evaluation", desc: "Cross-cultural creativity assessment and interpretable AI evaluation." }
            ]
          }
        ]
      },
      {
        sections: [
          {
            type: "experience",
            title: "Research Experience",
            items: [
              {
                name: "Research Assistant",
                tag: "Concordia University, Dr. Youmin Zhang",
                time: "Feb&ndash;Jun 2023",
                body: "Investigated UAV-based remote sensing for forest fire detection. Operated DJI M300 drones with Zenmuse L1 LiDAR for environmental data acquisition and built post-processing pipelines for sensor-data analysis."
              },
              {
                name: "Research Assistant",
                tag: "Concordia University, Dr. Jun Yan",
                time: "May&ndash;Dec 2022",
                body: "Investigated ML-based approaches to cyber-physical security in IoT. Conducted systematic literature reviews and developed methodologies for integrating diverse data sources into cybersecurity models."
              }
            ]
          },
          {
            type: "experience",
            title: "Teaching",
            tight: true,
            items: [
              {
                name: "Teaching Assistant",
                tag: "INSE 6411, Concordia University",
                time: "Fall 2024 &amp; Winter 2025",
                body: "Co-instructed graduate sessions on Product Design Theory &amp; Methodology. Designed assessments and mentored student research projects."
              },
              {
                name: "Math &amp; Programming Tutor",
                tag: "Tutorax, Laval",
                time: "Apr&ndash;Aug 2023"
              },
              {
                name: "Math, Physics &amp; Programming Tutor",
                tag: "Linguo 360, Montr&eacute;al",
                time: "Jan&ndash;May 2022"
              }
            ]
          },
          {
            type: "honors",
            title: "Service &amp; Honors",
            items: [
              {
                name: "IT Director",
                tag: "Society of Design and Process Science (SDPS)",
                time: "Present",
                body: 'End-to-end design, development, and operation of the SDPS conference platform (<a href="https://sdpsnet.org">sdpsnet.org</a>).'
              },
              { name: "Concordia Merit Scholarship", time: "2023" },
              { name: "TCPS 2 Certification", tag: "Tri-Council Policy Statement on Research Ethics" },
              { name: "Quality Award, Festival de Robotique", tag: "FIRST Robotics, Montr&eacute;al Regional", time: "2017" }
            ]
          },
          {
            type: "skills",
            title: "Skills &amp; Languages",
            rows: [
              {
                name: "AI &amp; ML",
                items: ["Agentic AI &amp; Orchestration", "LLM Agents", "RAG", "LLM Evaluation &amp; Guardrails", "Agent Reliability", "Neuro-Symbolic AI", "Reinforcement Learning", "NLP"]
              },
              {
                name: "Programming",
                items: ["Python", "TypeScript", "Rust", "Lean 4", "Elixir", "Java", "C/C++", "SQL"]
              },
              {
                name: "Systems &amp; Infra",
                items: ["Cloudflare (Workers/D1/R2)", "Astro", "Node/Bun", "FastAPI", "OpenCV", "Docker", "CI/CD"]
              },
              {
                name: "Methods",
                items: ["Evidence Governance &amp; Audit", "Formal Verification", "Model Validation", "Experiment Design", "Quality Systems"]
              },
              {
                name: "Languages",
                items: ["English (Fluent)", "French (Fluent)", "Mandarin Chinese (Native)"]
              }
            ]
          }
        ]
      }
    ]
  };
  var master_en_default = en;

  // content/master.fr.ts
  var fr = {
    label: "FR",
    htmlLang: "fr",
    title: "CV de Mohan Qiao",
    kicker: "Curriculum Vitae",
    name: "Mohan Qiao",
    subtitle: "Ing&eacute;nieur IA et agents LLM &middot; Syst&egrave;mes d&rsquo;agents fiables et gouvern&eacute;s",
    summary: "Concepteur de <strong>syst&egrave;mes multi-agents LLM fiables et gouvern&eacute;s</strong> &mdash; orchestration, &eacute;valuation, garde-fous et provenance auditable, de la recherche de preuves formellement v&eacute;rifi&eacute;e (Lean&nbsp;4) aux plateformes en production. Doctorant (g&eacute;nie de l&rsquo;information et des syst&egrave;mes, Concordia, 2027) et cofondateur de <strong>Telotia</strong>. Bilingue FR/EN &middot; Montr&eacute;al.",
    sidebar: {
      logo: {
        src: "./assets/concordia-wordmark-transparent.png",
        alt: "Université Concordia"
      },
      contacts: [
        { label: "Téléphone", href: "tel:+15145853689", text: "+1 (514) 585-3689" },
        { label: "Courriel", href: "mailto:mohan.qiao@mail.concordia.ca", text: "mohan.qiao@mail.concordia.ca" },
        { label: "Courriel", href: "mailto:mohan.qiao@mail.mcgill.ca", text: "mohan.qiao@mail.mcgill.ca" },
        { label: "GitHub", href: "https://github.com/Gavin-Qiao", text: "github.com/Gavin-Qiao" },
        { label: "LinkedIn", href: "https://linkedin.com/in/mohan-qiao", text: "linkedin.com/in/mohan-qiao" }
      ],
      strengthsTitle: "Atouts cl&eacute;s",
      strengths: [
        "Orchestration d&rsquo;agents LLM",
        "Fiabilit&eacute; et &eacute;valuation des agents",
        "Gouvernance de la preuve et assurance",
        "D&eacute;veloppement full-stack",
        "IA neuro-symbolique",
        "Apprentissage automatique appliqu&eacute; et RL"
      ],
      quote: {
        title: "La capacit&eacute; n&rsquo;est pas une garantie",
        text: "Des agents d&rsquo;IA dont on audite les r&eacute;sultats au lieu de simplement s&rsquo;y fier."
      }
    },
    pages: [
      {
        sections: [
          {
            type: "projects",
            title: "Projets choisis &mdash; Agents et syst&egrave;mes",
            items: [
              {
                name: "Telotia",
                tag: "Cofondateur",
                time: "En cours",
                body: "Cofondateur d&rsquo;une jeune pousse construisant des agents d&rsquo;IA fiables et gouvern&eacute;s pour les processus qualit&eacute; r&eacute;glement&eacute;s (validation CAPA), o&ugrave; la gouvernance de la preuve et la discipline d&rsquo;audit rendent les r&eacute;sultats d&rsquo;agents LLM recevables dans les flux FDA/ISO."
              },
              {
                name: "Principia",
                tag: "Cadre de gouvernance de la preuve",
                time: "2026",
                body: "Auteur de Principia, cadre faillibiliste de gouvernance de la preuve pour coordonner des syst&egrave;mes multi-agents LLM faillibles &mdash; contexte typ&eacute;, re&ccedil;us &agrave; source pr&eacute;serv&eacute;e, revue adversariale et cl&ocirc;ture gouvern&eacute;e (&laquo;&nbsp;la capacit&eacute; n&rsquo;est pas une garantie&nbsp;&raquo;). Probatio en est l&rsquo;impl&eacute;mentation. Article en pr&eacute;paration (version 4.6, 2026)."
              },
              {
                name: "Probatio",
                tag: "Recherche de preuves v&eacute;rifi&eacute;e par Lean",
                time: "Actif &middot; article en cours",
                body: "Harnais de recherche mesurant ce que l&rsquo;organisation ajoute au mod&egrave;le nu&nbsp;: d&eacute;bat multi-agents, d&eacute;composition r&eacute;cursive avec verrouillage, r&eacute;paration m&eacute;canique des preuves et m&eacute;moire cumulative pilotent un petit LLM local face &agrave; la v&eacute;rification du noyau Lean&nbsp;4 sur des probl&egrave;mes d&rsquo;Erd&#337;s formalis&eacute;s (banc d&rsquo;essai AlphaProof Nexus de DeepMind). Les leviers organisationnels seuls ont fait passer l&rsquo;&eacute;chelle du probl&egrave;me Erd&#337;s&nbsp;n&ordm;&nbsp;125 de 5/19 &agrave; 10/19 barreaux &mdash; chaque cl&ocirc;ture v&eacute;rifi&eacute;e &agrave; froid, sans axiome ajout&eacute;."
              },
              {
                name: "Plateforme SDPS 2026",
                tag: 'Full-stack &middot; <a href="https://sdpsnet.org">sdpsnet.org</a>',
                time: "2025&ndash;auj.",
                body: "Responsable de bout en bout de la plateforme de conf&eacute;rence SDPS&nbsp;: choix de la pile (Astro / TypeScript / Cloudflare D1/R2), r&eacute;cup&eacute;ration des donn&eacute;es de la soci&eacute;t&eacute; apr&egrave;s la compromission du serveur pr&eacute;c&eacute;dent lors d&rsquo;une cyberattaque s&eacute;rieuse, puis livraison et exploitation des inscriptions, soumissions, paiements et courriels transactionnels &mdash; facturation des services comprise (Cloudflare, Resend) &mdash; avec tests automatis&eacute;s et contr&ocirc;le des mises en production."
              }
            ]
          },
          {
            type: "timeline",
            title: "Formation",
            items: [
              {
                name: "Doctorat (Ph.&nbsp;D.), g&eacute;nie de l&rsquo;information et des syst&egrave;mes",
                detail: ["Universit&eacute; Concordia", "Directeur&nbsp;: Pr Yong Zeng", "4,30 / 4,30", "Passage acc&eacute;l&eacute;r&eacute; au doctorat"],
                time: "2024&ndash;auj."
              },
              {
                name: "M.&nbsp;Sc.&nbsp;A., g&eacute;nie des syst&egrave;mes qualit&eacute;",
                detail: ["Universit&eacute; Concordia", "4,30 / 4,30", "Bourse au m&eacute;rite de Concordia"],
                time: "2023&ndash;2024"
              },
              {
                name: "B.&nbsp;Sc., math&eacute;matiques et informatique",
                detail: ["Universit&eacute; McGill", "Majeure conjointe", "3,62 / 4,00"],
                time: "2019&ndash;2022"
              },
              {
                name: "DEC Sciences de la nature",
                detail: ["Coll&egrave;ge Bois-de-Boulogne"],
                time: "2017&ndash;2019"
              }
            ]
          }
        ]
      },
      {
        sections: [
          {
            type: "projects",
            title: "Projets de recherche",
            items: [
              {
                name: "Projet de s&eacute;curit&eacute; a&eacute;rienne",
                tag: "Collaboration industrielle &middot; Collins Aerospace",
                time: "En cours",
                body: "Cha&icirc;ne du savoir &agrave; l&rsquo;assurance transformant documentation a&eacute;ronautique, r&eacute;glementation, &eacute;tats de simulateur et r&eacute;cits d&rsquo;incidents en artefacts &agrave; autorit&eacute; &eacute;tiquet&eacute;e, moniteurs temporels, traces de falsification et contrats de s&ucirc;ret&eacute; RL pour des sc&eacute;narios de vol critiques."
              },
              {
                name: "Psi",
                tag: "Regroupement exploratoire &middot; avec le Pr Yong Zeng",
                time: "Actif",
                body: "D&eacute;veloppement d&rsquo;une d&eacute;couverte de structure fond&eacute;e sur la proximit&eacute;, sans nombre de groupes fix&eacute;. Manuscrit en pr&eacute;paration."
              },
              {
                name: "Proximity Atlas",
                tag: "Preuve de proximit&eacute;",
                time: "Actif",
                body: "D&eacute;veloppement d&rsquo;un atlas de preuve de proximit&eacute; plut&ocirc;t qu&rsquo;un seul regroupement accept&eacute;&nbsp;; la non-d&eacute;cision reste possible. Manuscrit en pr&eacute;paration."
              },
              {
                name: "PISA 2025 de l&rsquo;OCDE &mdash; Pens&eacute;e cr&eacute;ative",
                tag: "Collaboration UBC",
                time: "Janv. 2025&ndash;auj.",
                body: "Cochercheur principal du groupe PISA Canada anglophone (plus de 10 chercheurs, collaboration avec UBC), sur la pens&eacute;e cr&eacute;ative &agrave; travers les cultures. Conception de &laquo;&nbsp;PRISM&nbsp;&raquo;, syst&egrave;me d&rsquo;&eacute;valuation multiplateforme impl&eacute;mentant trois cadres th&eacute;oriques pour une &eacute;valuation internationale normalis&eacute;e."
              },
              {
                name: "LLM et &eacute;valuation de la cr&eacute;ativit&eacute;",
                time: "En cours",
                body: "Direction de travaux sur l&rsquo;&eacute;valuation automatis&eacute;e et &agrave; grande &eacute;chelle de la cr&eacute;ativit&eacute; par LLM &mdash; d&eacute;terminer si les mod&egrave;les peuvent reproduire la notation experte de t&acirc;ches de pens&eacute;e divergente &agrave; travers langues et cultures, avec une &eacute;valuation calibr&eacute;e."
              },
              {
                name: "Application IA de pr&eacute;vention du cancer",
                tag: "Universit&eacute; de Calgary",
                time: "Sept. 2023&ndash;sept. 2024",
                body: "Conception de m&eacute;canismes de dialogue pilot&eacute;s par l&rsquo;IA pour des interventions comportementales personnalis&eacute;es visant la r&eacute;duction de la s&eacute;dentarit&eacute;, selon la m&eacute;thodologie Environment-Based Design et le cadre TASKS."
              }
            ]
          },
          {
            type: "publications",
            title: "Publications",
            compact: true,
            items: [
              {
                authors: "Camarda, A., Cassotti, M., &hellip;, <strong>Qiao, M.</strong>, &hellip;, &amp; Lubart, T. (en &eacute;valuation).",
                title: "Cognitive Flexibility and Rigidity Across Cultures and Genders: Evidence from PISA Creative Problem-Solving."
              }
            ]
          },
          {
            type: "focus",
            title: "Axes de recherche",
            items: [
              { name: "Agents fiables", desc: "Syst&egrave;mes multi-agents LLM gouvern&eacute;s et audit&eacute;s, et leur orchestration." },
              { name: "Preuve et assurance", desc: "Artefacts ancr&eacute;s aux sources, moniteurs et cl&ocirc;ture v&eacute;rifiable." },
              { name: "&Eacute;valuation humaine et machine", desc: "&Eacute;valuation interculturelle de la cr&eacute;ativit&eacute; et &eacute;valuation interpr&eacute;table de l&rsquo;IA." }
            ]
          }
        ]
      },
      {
        sections: [
          {
            type: "experience",
            title: "Exp&eacute;rience en recherche",
            items: [
              {
                name: "Assistant de recherche",
                tag: "Universit&eacute; Concordia, Pr Youmin Zhang",
                time: "F&eacute;vr.&ndash;juin 2023",
                body: "T&eacute;l&eacute;d&eacute;tection par drone pour la d&eacute;tection des feux de for&ecirc;t. Pilotage de DJI M300 avec LiDAR Zenmuse L1 pour l&rsquo;acquisition de donn&eacute;es environnementales et d&eacute;veloppement de cha&icirc;nes de post-traitement pour l&rsquo;analyse des donn&eacute;es capteurs."
              },
              {
                name: "Assistant de recherche",
                tag: "Universit&eacute; Concordia, Pr Jun Yan",
                time: "Mai&ndash;d&eacute;c. 2022",
                body: "Approches d&rsquo;apprentissage automatique pour la cybers&eacute;curit&eacute; des infrastructures cyberphysiques de l&rsquo;Internet des objets. Revues syst&eacute;matiques de la litt&eacute;rature et m&eacute;thodologies d&rsquo;int&eacute;gration de sources de donn&eacute;es diverses aux mod&egrave;les de cybers&eacute;curit&eacute;."
              }
            ]
          },
          {
            type: "experience",
            title: "Enseignement",
            tight: true,
            items: [
              {
                name: "Auxiliaire d&rsquo;enseignement",
                tag: "INSE 6411, Universit&eacute; Concordia",
                time: "Aut. 2024 et hiver 2025",
                body: "Coenseignement de s&eacute;ances aux cycles sup&eacute;rieurs en th&eacute;orie et m&eacute;thodologie de la conception de produits. Conception d&rsquo;&eacute;valuations et mentorat de projets de recherche &eacute;tudiants."
              },
              {
                name: "Tuteur en math&eacute;matiques et programmation",
                tag: "Tutorax, Laval",
                time: "Avr.&ndash;ao&ucirc;t 2023"
              },
              {
                name: "Tuteur en math&eacute;matiques, physique et programmation",
                tag: "Linguo 360, Montr&eacute;al",
                time: "Janv.&ndash;mai 2022"
              }
            ]
          },
          {
            type: "honors",
            title: "Engagement et distinctions",
            items: [
              {
                name: "Directeur TI",
                tag: "Society for Design and Process Science (SDPS)",
                time: "Aujourd&rsquo;hui",
                body: 'Conception, d&eacute;veloppement et exploitation de bout en bout de la plateforme de conf&eacute;rence SDPS (<a href="https://sdpsnet.org">sdpsnet.org</a>).'
              },
              { name: "Bourse au m&eacute;rite de Concordia", time: "2023" },
              { name: "Certification EPTC&nbsp;2", tag: "&Eacute;nonc&eacute; de politique des trois Conseils &mdash; &eacute;thique de la recherche" },
              { name: "Prix Qualit&eacute;, Festival de robotique", tag: "FIRST Robotics, r&eacute;gional de Montr&eacute;al", time: "2017" }
            ]
          },
          {
            type: "skills",
            title: "Comp&eacute;tences et langues",
            rows: [
              {
                name: "IA et apprentissage",
                items: ["IA agentique et orchestration", "Agents LLM", "RAG", "&Eacute;valuation de LLM et garde-fous", "Fiabilit&eacute; des agents", "IA neuro-symbolique", "Apprentissage par renforcement", "TALN"]
              },
              {
                name: "Programmation",
                items: ["Python", "TypeScript", "Rust", "Lean 4", "Elixir", "Java", "C/C++", "SQL"]
              },
              {
                name: "Syst&egrave;mes et infra",
                items: ["Cloudflare (Workers/D1/R2)", "Astro", "Node/Bun", "FastAPI", "OpenCV", "Docker", "CI/CD"]
              },
              {
                name: "M&eacute;thodes",
                items: ["Gouvernance de la preuve et audit", "V&eacute;rification formelle", "Validation de mod&egrave;les", "Plans d&rsquo;exp&eacute;rience", "Syst&egrave;mes qualit&eacute;"]
              },
              {
                name: "Langues",
                items: ["Fran&ccedil;ais (courant)", "Anglais (courant)", "Mandarin (langue maternelle)"]
              }
            ]
          }
        ]
      }
    ]
  };
  var master_fr_default = fr;

  // src/main.ts
  renderCV({ en: master_en_default, fr: master_fr_default });
})();
