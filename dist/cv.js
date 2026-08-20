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
    subtitle: "Machine Learning Researcher &middot; Epistemic Accumulation &middot; Auditable AI Systems",
    summary: "PhD researcher studying how fallible human and machine agents can contribute to <strong>cumulative, auditable, and defensible knowledge</strong>. I build controlled research instruments spanning verifier-grounded LLM reasoning, comparative measurement, certified locality, and exploratory clustering. B.Sc. Mathematics &amp; Computer Science (McGill); PhD student at Concordia through an accelerated pathway. Bilingual EN/FR &middot; Montr&eacute;al.",
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
        "LLM Agents &amp; External Memory",
        "Continual Epistemic Accumulation",
        "Formal Verification (Lean 4)",
        "Statistical Experiment Design",
        "Comparative Measurement",
        "Research Software Engineering"
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
            title: "Selected Research Projects",
            items: [
              {
                name: "Probatio",
                tag: "Epistemic Accumulation &middot; Verifier-Grounded LLM Research",
                time: "Active",
                body: "Designed a controlled instrument for measuring the <strong>organization&ndash;generation boundary</strong>: one fixed open-weight model works alone or inside a deterministic research organization under matched evidence and resource budgets. Lean&nbsp;4 provides cold kernel checks; sealed targets, retained trajectories, failed attempts, and narrow claim levels keep correctness distinct from novelty or informal fidelity."
              },
              {
                name: "Mensura",
                tag: "Error-Controlled Comparative Measurement",
                time: "Active",
                body: "Developing claim-aware comparative measurement through two coupled layers: adaptive evidence acquisition and inversion from completed comparison experiments to task quality or latent structure. Mensura seeks only supportable outputs &mdash; pair relations, partial orders, rank sets, identification regions, decisions, or abstention &mdash; while retaining the complete comparison history."
              },
              {
                name: "Measure of Tolerance (MoT)",
                tag: "Data-Certified Locality",
                time: "Active",
                body: "Developing simultaneous, anytime-valid homogeneity certificates over points and regions, then testing whether downstream decisions can inherit explicit loss bounds and fallback. One bounded application showed safe work avoidance under its fixed contract; another route was rejected when a simpler substitute sufficed. Neither result implies operational time or resource savings."
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
              }
            ]
          },
          {
            type: "timeline",
            title: "Education",
            items: [
              {
                name: "Ph.D. Student, Information &amp; Systems Engineering",
                detail: ["Concordia University", "4.30 / 4.30", "Accelerated pathway from graduate studies"],
                time: "2024&ndash;Present"
              },
              {
                name: "Graduate Studies, Quality Systems Engineering",
                detail: ["Concordia University", "Transferred to PhD before degree completion", "4.30 / 4.30", "Concordia Merit Scholarship"],
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
                name: "Telotia",
                tag: "Co-Founder &middot; Pre-Product R&amp;D",
                time: "Ongoing",
                body: "Developing claim-to-evidence validation for regulated quality work. The system decomposes reports into reviewable claims, returns support, contradiction, or absence with source-preserved receipts, and flags uncertainty for expert review; current demonstrations support product discovery, not public performance claims or replacement of domain sign-off."
              },
              {
                name: "Principia",
                tag: "Chambered Reasoning Infrastructure",
                time: "2026",
                body: "Built an executable backbone for chambered, traceable reasoning: typed contexts and roles, adversarial debate, experiment receipts, governed synthesis, and explicit closure conditions. A Rust kernel, embedded state, schemas, and conformance tooling keep generated reasoning distinct from authoritative state."
              },
              {
                name: "Noesis",
                tag: "Knowledge-Grounded Flight Autonomy",
                time: "Active research",
                body: "Built a public-knowledge-to-autonomy research stack connecting page-cited POH/FAA constraints and simulator affordances to formal monitors, scripted controllers, learned residuals, and cross-FDM evaluation. Negative transfer tests determine where learning earns a role; all current evidence is simulator research, not certification or operational flight material."
              },
              {
                name: "PISA Creative LLM",
                tag: "LLM &amp; Human-Judgment Evaluation",
                time: "Jan 2025&ndash;Present",
                body: "Implemented a CLI-first framework for evaluating LLM judgments on PISA 2022 creative-thinking responses across pairwise, holistic, and criteria-based methods. The design separates append-only comparison collection from ranking and supports comparison against trained human ratings across 16 country-language groups and seven items."
              },
              {
                name: "SDPS Society &amp; Conference Platform",
                tag: "IT Director &middot; Production Engineering",
                time: "2025&ndash;Present",
                body: "Built and operate the Society and SDPS 2026 platform across submissions, peer review, workshop portals, registration, payments, receipts, administration, people and heritage content, and recovered publication archives using Astro, Bun, and Cloudflare Workers/D1/R2."
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
            title: "Research Output",
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
              { name: "Epistemic accumulation", desc: "Turning fallible contributions into revisable, evidence-bound organizational knowledge." },
              { name: "Measurement under fallibility", desc: "Separating what the data support from what a model or evaluator merely reports." },
              { name: "Verifier-grounded systems", desc: "Matched experiments, formal checks, complete trajectories, and bounded conclusions." }
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
    subtitle: "Chercheur en apprentissage automatique &middot; Accumulation &eacute;pist&eacute;mique &middot; IA auditable",
    summary: "Doctorant &eacute;tudiant comment des agents humains et artificiels faillibles peuvent contribuer &agrave; un <strong>savoir cumulatif, auditable et d&eacute;fendable</strong>. Je con&ccedil;ois des instruments de recherche contr&ocirc;l&eacute;s pour le raisonnement LLM v&eacute;rifi&eacute;, la mesure comparative, la localit&eacute; certifi&eacute;e et le regroupement exploratoire. B.&nbsp;Sc. en math&eacute;matiques et informatique (McGill); doctorant &agrave; Concordia par un parcours acc&eacute;l&eacute;r&eacute;. Bilingue FR/EN &middot; Montr&eacute;al.",
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
        "Agents LLM et m&eacute;moire externe",
        "Accumulation &eacute;pist&eacute;mique continue",
        "V&eacute;rification formelle (Lean 4)",
        "Plans d&rsquo;exp&eacute;rience statistiques",
        "Mesure comparative",
        "G&eacute;nie logiciel de recherche"
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
            title: "Projets de recherche choisis",
            items: [
              {
                name: "Probatio",
                tag: "Accumulation &eacute;pist&eacute;mique &middot; Recherche LLM v&eacute;rifi&eacute;e",
                time: "Actif",
                body: "Conception d&rsquo;un instrument contr&ocirc;l&eacute; pour mesurer la <strong>fronti&egrave;re entre organisation et g&eacute;n&eacute;ration</strong>&nbsp;: un m&ecirc;me mod&egrave;le ouvert fixe travaille seul ou dans une organisation de recherche d&eacute;terministe, &agrave; preuves et budgets appari&eacute;s. Les v&eacute;rifications &agrave; froid de Lean&nbsp;4, les cibles scell&eacute;es, les trajectoires conserv&eacute;es et les niveaux d&rsquo;affirmation distinguent correction formelle, nouveaut&eacute; et fid&eacute;lit&eacute; informelle."
              },
              {
                name: "Mensura",
                tag: "Mesure comparative &agrave; erreur contr&ocirc;l&eacute;e",
                time: "Actif",
                body: "D&eacute;veloppement d&rsquo;une mesure comparative attentive aux affirmations par deux couches coupl&eacute;es&nbsp;: acquisition adaptative des preuves et inversion de l&rsquo;exp&eacute;rience vers la qualit&eacute; des t&acirc;ches ou la structure latente. Mensura ne vise que des sorties soutenables &mdash; relations, ordres partiels, ensembles de rangs, r&eacute;gions d&rsquo;identification, d&eacute;cisions ou abstention &mdash; en conservant l&rsquo;historique complet."
              },
              {
                name: "Mesure de tol&eacute;rance (MoT)",
                tag: "Localit&eacute; certifi&eacute;e par les donn&eacute;es",
                time: "Actif",
                body: "D&eacute;veloppement de certificats simultan&eacute;s et valides &agrave; tout instant d&rsquo;homog&eacute;n&eacute;it&eacute; sur les points et r&eacute;gions, puis test de d&eacute;cisions h&eacute;ritant d&rsquo;une borne de perte et d&rsquo;un repli explicites. Une application born&eacute;e a permis d&rsquo;&eacute;viter du travail sous contrat fixe; une autre piste a &eacute;t&eacute; rejet&eacute;e lorsqu&rsquo;un substitut plus simple suffisait."
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
              }
            ]
          },
          {
            type: "timeline",
            title: "Formation",
            items: [
              {
                name: "Doctorant (Ph.&nbsp;D.), g&eacute;nie de l&rsquo;information et des syst&egrave;mes",
                detail: ["Universit&eacute; Concordia", "4,30 / 4,30", "Parcours acc&eacute;l&eacute;r&eacute; depuis les &eacute;tudes sup&eacute;rieures"],
                time: "2024&ndash;auj."
              },
              {
                name: "&Eacute;tudes sup&eacute;rieures, g&eacute;nie des syst&egrave;mes qualit&eacute;",
                detail: ["Universit&eacute; Concordia", "Transfert au doctorat avant l&rsquo;obtention du dipl&ocirc;me", "4,30 / 4,30", "Bourse au m&eacute;rite de Concordia"],
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
                name: "Telotia",
                tag: "Cofondateur &middot; R-D pr&eacute;produit",
                time: "En cours",
                body: "D&eacute;veloppement d&rsquo;une validation affirmation-vers-preuve pour les processus qualit&eacute; r&eacute;glement&eacute;s. Le syst&egrave;me retourne soutien, contradiction ou absence avec re&ccedil;us pr&eacute;servant les sources et signale l&rsquo;incertitude &agrave; l&rsquo;expert; les d&eacute;monstrations actuelles servent la d&eacute;couverte produit, non des affirmations publiques de performance."
              },
              {
                name: "Principia",
                tag: "Infrastructure de raisonnement en chambres",
                time: "2026",
                body: "Construction d&rsquo;une ossature ex&eacute;cutable pour un raisonnement tra&ccedil;able en chambres&nbsp;: contextes et r&ocirc;les typ&eacute;s, d&eacute;bat contradictoire, re&ccedil;us exp&eacute;rimentaux, synth&egrave;se gouvern&eacute;e et conditions explicites de cl&ocirc;ture. Un noyau Rust, un &eacute;tat embarqu&eacute;, des sch&eacute;mas et des tests de conformit&eacute; s&eacute;parent le raisonnement g&eacute;n&eacute;r&eacute; de l&rsquo;&eacute;tat faisant autorit&eacute;."
              },
              {
                name: "Noesis",
                tag: "Autonomie a&eacute;rienne fond&eacute;e sur les connaissances",
                time: "Recherche active",
                body: "Construction d&rsquo;une cha&icirc;ne de recherche reliant des contraintes POH/FAA cit&eacute;es et les affordances du simulateur &agrave; des moniteurs formels, des contr&ocirc;leurs script&eacute;s, des r&eacute;siduels appris et une &eacute;valuation entre mod&egrave;les de vol. Les tests de transfert n&eacute;gatifs d&eacute;terminent o&ugrave; l&rsquo;apprentissage m&eacute;rite sa place; les r&eacute;sultats actuels rel&egrave;vent de la simulation, non de la certification."
              },
              {
                name: "PISA Creative LLM",
                tag: "&Eacute;valuation LLM et jugement humain",
                time: "Janv. 2025&ndash;auj.",
                body: "Impl&eacute;mentation d&rsquo;un cadre en ligne de commande pour &eacute;valuer les jugements LLM sur les r&eacute;ponses de pens&eacute;e cr&eacute;ative PISA 2022 par m&eacute;thodes comparative, holistique et crit&eacute;ri&eacute;e. La collecte comparative append-only est s&eacute;par&eacute;e du classement et permet la comparaison aux notes humaines dans 16 groupes pays-langue et sept items."
              },
              {
                name: "Plateforme de la soci&eacute;t&eacute; et du congr&egrave;s SDPS",
                tag: "Directeur TI &middot; Ing&eacute;nierie de production",
                time: "2025&ndash;auj.",
                body: "Construction et exploitation de la plateforme de la soci&eacute;t&eacute; et de SDPS 2026&nbsp;: soumissions, &eacute;valuation par les pairs, ateliers, inscriptions, paiements, re&ccedil;us, administration, patrimoine et archives de publications r&eacute;cup&eacute;r&eacute;es avec Astro, Bun et Cloudflare Workers/D1/R2."
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
            title: "Production de recherche",
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
              { name: "Accumulation &eacute;pist&eacute;mique", desc: "Transformer des contributions faillibles en savoir organisationnel r&eacute;visable et li&eacute; aux preuves." },
              { name: "Mesure sous faillibilit&eacute;", desc: "S&eacute;parer ce que les donn&eacute;es soutiennent de ce qu&rsquo;un mod&egrave;le ou un &eacute;valuateur rapporte." },
              { name: "Syst&egrave;mes ancr&eacute;s dans un v&eacute;rificateur", desc: "Exp&eacute;riences appari&eacute;es, v&eacute;rifications formelles, trajectoires compl&egrave;tes et conclusions born&eacute;es." }
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
