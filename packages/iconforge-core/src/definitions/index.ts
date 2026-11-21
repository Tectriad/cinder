import type { IconDefinition } from "../types";
import { GENERAL_ICONS } from "./general";
import { NAVIGATION_ICONS } from "./navigation";
import { DEVELOPMENT_ICONS } from "./development";
import { FRAMEWORK_ICONS } from "./frameworks";
import { AI_ICONS } from "./ai";
import { BUSINESS_ICONS } from "./business";

export const ALL_ICONS: IconDefinition[] = [
  ...GENERAL_ICONS,
  ...NAVIGATION_ICONS,
  ...DEVELOPMENT_ICONS,
  ...FRAMEWORK_ICONS,
  ...AI_ICONS,
  ...BUSINESS_ICONS,
];

const ICONS_BY_NAME = new Map<string, IconDefinition>();

for (const icon of ALL_ICONS) {
  ICONS_BY_NAME.set(icon.name.toLowerCase(), icon);
  for (const alias of icon.aliases) {
    ICONS_BY_NAME.set(alias.toLowerCase(), icon);
  }
}

export function getIconDefinition(name: string): IconDefinition | undefined {
  return ICONS_BY_NAME.get(name.toLowerCase());
}

export {
  GENERAL_ICONS,
  NAVIGATION_ICONS,
  DEVELOPMENT_ICONS,
  FRAMEWORK_ICONS,
  AI_ICONS,
  BUSINESS_ICONS,
};
