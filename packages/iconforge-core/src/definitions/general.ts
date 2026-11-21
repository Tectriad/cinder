import type { IconDefinition } from "../types";
import { GENERAL_PRIMARY_ICONS } from "./general-primary";
import { GENERAL_ACTION_ICONS } from "./general-actions";
import { GENERAL_STATUS_ICONS } from "./general-status";
import { GENERAL_FEEDBACK_ICONS } from "./general-feedback";

export const GENERAL_ICONS: IconDefinition[] = [
  ...GENERAL_PRIMARY_ICONS,
  ...GENERAL_ACTION_ICONS,
  ...GENERAL_STATUS_ICONS,
  ...GENERAL_FEEDBACK_ICONS,
];

export {
  GENERAL_PRIMARY_ICONS,
  GENERAL_ACTION_ICONS,
  GENERAL_STATUS_ICONS,
  GENERAL_FEEDBACK_ICONS,
};
