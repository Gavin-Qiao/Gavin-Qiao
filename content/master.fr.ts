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
  subtitle: "Chercheur en apprentissage automatique &middot; Accumulation &eacute;pist&eacute;mique &middot; IA auditable",

  summary: "Doctorant &eacute;tudiant comment des agents humains et artificiels faillibles peuvent contribuer &agrave; un <strong>savoir cumulatif, auditable et d&eacute;fendable</strong>. Je con&ccedil;ois des instruments de recherche contr&ocirc;l&eacute;s pour le raisonnement LLM v&eacute;rifi&eacute;, la mesure comparative, la localit&eacute; certifi&eacute;e et le regroupement exploratoire. B.&nbsp;Sc. en math&eacute;matiques et informatique (McGill); doctorant &agrave; Concordia par un parcours acc&eacute;l&eacute;r&eacute;. Bilingue FR/EN &middot; Montr&eacute;al.",

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

    /* ------------------------------------------------ Page 1 */
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

    /* ------------------------------------------------ Page 2 */
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
