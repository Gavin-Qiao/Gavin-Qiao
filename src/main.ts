/**
 * main.ts — the entry point. Registers every language edition and
 * renders. To add a language: create content/master.<code>.ts (copy
 * an existing one), then add its import and registry line here and
 * run `bun run build`. The on-screen toggle updates by itself.
 */

import { renderCV } from "./renderer";

import en from "../content/master.en";
import fr from "../content/master.fr";

renderCV({ en, fr });
