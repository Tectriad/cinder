import type { IconDefinition } from "../types";
import { FRAMEWORK_WEB_ICONS } from "./frameworks-web";
import { FRAMEWORK_MARKUP_ICONS } from "./frameworks-markup";

export const FRAMEWORK_ICONS: IconDefinition[] = [
  ...FRAMEWORK_WEB_ICONS,
  ...FRAMEWORK_MARKUP_ICONS,
];

export {
  FRAMEWORK_WEB_ICONS,
  FRAMEWORK_MARKUP_ICONS,
};
