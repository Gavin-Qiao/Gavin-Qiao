/**
 * types.ts — the content schema.
 *
 * A CV is a `CVDocument`: header metadata, one shared sidebar, and a
 * list of fixed-height pages, each holding typed sections. The section
 * `type` field is a discriminated union, so a typo like `"project"`
 * or a missing required field fails `bun run check` before it can
 * render wrong.
 *
 * String fields ending in visible text accept inline HTML (links,
 * <strong>, &nbsp;, character entities). Content files are trusted
 * input — this template renders your own data, not user input.
 */

/** One entry in the sidebar contact stack. */
export interface Contact {
  /** Small uppercase label printed above the value, e.g. "Email". */
  label: string;
  /** Destination: tel:, mailto:, or https:// URL. */
  href: string;
  /** Visible text. Kept as plain text to avoid layout surprises. */
  text: string;
}

/** Optional affiliation mark at the top of the sidebar. */
export interface Logo {
  src: string;
  alt: string;
}

/** The framed statement under the sidebar strengths. */
export interface Quote {
  title: string;
  text: string;
}

/** Sidebar shown identically on every page. */
export interface Sidebar {
  logo?: Logo;
  contacts: Contact[];
  strengthsTitle: string;
  strengths: string[];
  quote?: Quote;
}

/** A dated card: projects, experience, honors all share this shape. */
export interface Item {
  name: string;
  /** Muted annotation rendered after the name. */
  tag?: string;
  /** Right-aligned date or status. */
  time?: string;
  /** Body paragraph. Omit it in an `experience` section to render a
   *  compact one-line row instead of a card. */
  body?: string;
}

/** Education-style entry with dot-separated detail parts. */
export interface TimelineItem {
  name: string;
  detail?: string[];
  time?: string;
}

export interface PublicationItem {
  authors: string;
  title: string;
}

export interface FocusItem {
  name: string;
  desc: string;
}

export interface SkillRow {
  name: string;
  items: string[];
}

interface SectionBase {
  /** Section heading. The two-digit index is generated automatically. */
  title: string;
  /** Slightly tighter top margin, used for short sections. */
  compact?: boolean;
}

export interface ProjectsSection extends SectionBase {
  type: "projects";
  items: Item[];
}

export interface TimelineSection extends SectionBase {
  type: "timeline";
  items: TimelineItem[];
}

export interface ExperienceSection extends SectionBase {
  type: "experience";
  /** Tighter vertical rhythm for lists that mix cards and rows. */
  tight?: boolean;
  items: Item[];
}

export interface HonorsSection extends SectionBase {
  type: "honors";
  items: Item[];
}

export interface PublicationsSection extends SectionBase {
  type: "publications";
  items: PublicationItem[];
}

export interface FocusSection extends SectionBase {
  type: "focus";
  items: FocusItem[];
}

export interface SkillsSection extends SectionBase {
  type: "skills";
  rows: SkillRow[];
}

export type Section =
  | ProjectsSection
  | TimelineSection
  | ExperienceSection
  | HonorsSection
  | PublicationsSection
  | FocusSection
  | SkillsSection;

/** One fixed US-Letter page. Mind the budget: pages clip, not grow. */
export interface Page {
  sections: Section[];
}

/** A complete CV in one language. */
export interface CVDocument {
  /** Toggle label, e.g. "EN". */
  label: string;
  /** Value for the html lang attribute, e.g. "en". */
  htmlLang: string;
  /** Browser/PDF document title. */
  title: string;
  /** Small uppercase line above the name, e.g. "Curriculum Vitae". */
  kicker: string;
  name: string;
  subtitle: string;
  /** Lead paragraph, first page only. */
  summary?: string;
  sidebar: Sidebar;
  pages: Page[];
}

/** Language code (used in ?lang= and localStorage) to document. */
export type Registry = Record<string, CVDocument>;
