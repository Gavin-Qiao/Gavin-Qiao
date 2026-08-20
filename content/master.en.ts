/**
 * English content for the master CV.
 *
 * This file is the single place to edit the English document: text,
 * cards, ordering, and pagination all live here. Values may contain
 * inline HTML (links, <strong>, &nbsp;, entities). Pages are fixed
 * height: after editing, export the PDF and check nothing fell off.
 *
 * To add another language, copy this file to master.<code>.ts,
 * translate the values, and register it in src/main.ts.
 */

import type { CVDocument } from "../src/types";

const en: CVDocument = {
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
      { label: "Phone",    href: "tel:+15145853689",                       text: "+1 (514) 585-3689" },
      { label: "Email",    href: "mailto:mohan.qiao@mail.concordia.ca",    text: "mohan.qiao@mail.concordia.ca" },
      { label: "Email",    href: "mailto:mohan.qiao@mail.mcgill.ca",       text: "mohan.qiao@mail.mcgill.ca" },
      { label: "GitHub",   href: "https://github.com/Gavin-Qiao",          text: "github.com/Gavin-Qiao" },
      { label: "LinkedIn", href: "https://linkedin.com/in/mohan-qiao",     text: "linkedin.com/in/mohan-qiao" }
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

    /* ------------------------------------------------ Page 1 */
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
              tag: "Full-Stack &middot; <a href=\"https://sdpsnet.org\">sdpsnet.org</a>",
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

    /* ------------------------------------------------ Page 2 */
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
            { name: "Trustworthy agents",        desc: "Governed, audited multi-agent LLM systems and orchestration." },
            { name: "Evidence &amp; assurance",  desc: "Source-grounded artifacts, monitors, and verifiable closure." },
            { name: "Human &amp; model evaluation", desc: "Cross-cultural creativity assessment and interpretable AI evaluation." }
          ]
        }
      ]
    },

    /* ------------------------------------------------ Page 3 */
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
              body: "End-to-end design, development, and operation of the SDPS conference platform (<a href=\"https://sdpsnet.org\">sdpsnet.org</a>)."
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

export default en;
