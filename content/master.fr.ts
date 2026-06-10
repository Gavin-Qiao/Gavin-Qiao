/**
 * Contenu français du CV principal.
 *
 * Ce fichier est l'unique endroit où modifier le document français :
 * textes, cartes, ordre et pagination. Les valeurs acceptent du HTML
 * en ligne (liens, <strong>, &nbsp;, entités). Les pages sont à
 * hauteur fixe : après toute modification, exportez le PDF et
 * vérifiez que rien ne déborde.
 */

import type { CVDocument } from "../src/types";

const fr: CVDocument = {
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
      { label: "Téléphone", href: "tel:+15145853689",                    text: "+1 (514) 585-3689" },
      { label: "Courriel",       href: "mailto:mohan.qiao@mail.concordia.ca", text: "mohan.qiao@mail.concordia.ca" },
      { label: "Courriel",       href: "mailto:mohan.qiao@mail.mcgill.ca",    text: "mohan.qiao@mail.mcgill.ca" },
      { label: "GitHub",         href: "https://github.com/Gavin-Qiao",       text: "github.com/Gavin-Qiao" },
      { label: "LinkedIn",       href: "https://linkedin.com/in/mohan-qiao",  text: "linkedin.com/in/mohan-qiao" }
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

    /* ------------------------------------------------ Page 1 */
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
              tag: "Full-stack &middot; <a href=\"https://sdpsnet.org\">sdpsnet.org</a>",
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

    /* ------------------------------------------------ Page 2 */
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
              name: "Gauging-&Psi;",
              tag: "Regroupement sans nombre de classes &middot; avec le Pr Yong Zeng",
              time: "Actif &middot; article en cours",
              body: "Pipeline de regroupement exploratoire sans nombre de classes pr&eacute;d&eacute;fini &mdash; s&eacute;paration globale par &eacute;lagage r&eacute;cursif d&rsquo;arbres couvrants, puis raffinement local par graphes d&rsquo;espaces de tol&eacute;rance adaptatifs. &Eacute;valu&eacute; sur 124 jeux de donn&eacute;es &eacute;tiquet&eacute;s avec piste d&rsquo;audit visuelle&nbsp;; manuscrit en pr&eacute;paration."
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
            { name: "Agents fiables",                       desc: "Syst&egrave;mes multi-agents LLM gouvern&eacute;s et audit&eacute;s, et leur orchestration." },
            { name: "Preuve et assurance",                  desc: "Artefacts ancr&eacute;s aux sources, moniteurs et cl&ocirc;ture v&eacute;rifiable." },
            { name: "&Eacute;valuation humaine et machine", desc: "&Eacute;valuation interculturelle de la cr&eacute;ativit&eacute; et &eacute;valuation interpr&eacute;table de l&rsquo;IA." }
          ]
        }
      ]
    },

    /* ------------------------------------------------ Page 3 */
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
              body: "Conception, d&eacute;veloppement et exploitation de bout en bout de la plateforme de conf&eacute;rence SDPS (<a href=\"https://sdpsnet.org\">sdpsnet.org</a>)."
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

export default fr;
