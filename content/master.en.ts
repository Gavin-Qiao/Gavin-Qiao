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
  subtitle: "Machine Learning Researcher &middot; Epistemic Accumulation &middot; Auditable AI Systems",

  summary: "PhD researcher studying how fallible human and machine agents can contribute to <strong>cumulative, auditable, and defensible knowledge</strong>. I build controlled research instruments spanning verifier-grounded LLM reasoning, comparative measurement, certified locality, and exploratory clustering. B.Sc. Mathematics &amp; Computer Science (McGill); PhD student at Concordia through an accelerated pathway. Bilingual EN/FR &middot; Montr&eacute;al.",

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

    /* ------------------------------------------------ Page 1 */
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

    /* ------------------------------------------------ Page 2 */
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
