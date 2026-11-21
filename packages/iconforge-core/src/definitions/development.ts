import type { IconDefinition } from "../types";
import { DEV_CORE_ICONS } from "./dev-core";
import { DEV_HARDWARE_ICONS } from "./dev-hardware";
import { DEV_SERVER_ICONS } from "./dev-server";
import { DEV_GIT_ICONS } from "./dev-git";
import { DEV_REVIEW_ICONS } from "./dev-review";

export const DEVELOPMENT_ICONS: IconDefinition[] = [
  ...DEV_CORE_ICONS,
  ...DEV_HARDWARE_ICONS,
  ...DEV_SERVER_ICONS,
  ...DEV_GIT_ICONS,
  ...DEV_REVIEW_ICONS,
];

export {
  DEV_CORE_ICONS,
  DEV_HARDWARE_ICONS,
  DEV_SERVER_ICONS,
  DEV_GIT_ICONS,
  DEV_REVIEW_ICONS,
};
