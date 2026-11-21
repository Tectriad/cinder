import type { CSSProperties, ReactNode } from "react";

export type CDTimeFormat = "12h" | "24h";

export interface CDTimeSlot {
  id: string;
  start: string; // "HH:mm" in 24h format e.g. "09:00"
  end: string;   // "HH:mm" in 24h format e.g. "17:00"
}

export interface CDTimeRangePreset {
  label: string;
  slots: { start: string; end: string }[];
}

export interface CDTimeRangePickerProps {
  /** Array of active time slot intervals */
  value?: CDTimeSlot[];
  /** Default intervals for uncontrolled mode */
  defaultValue?: CDTimeSlot[];
  /** Callback fired when intervals change */
  onChange?: (intervals: CDTimeSlot[]) => void;
  /** Display time format ("12h" | "24h"). Defaults to "24h". */
  format?: CDTimeFormat;
  /** Maximum number of simultaneous intervals allowed. Defaults to 5. */
  maxIntervals?: number;
  /** Minute step interval for picker increments (e.g. 15, 30, 60). Defaults to 15. */
  step?: number;
  /** Quick presets list */
  presets?: CDTimeRangePreset[];
  /** Read-only mode */
  readOnly?: boolean;
  /** Title label above intervals */
  title?: string;
  /** Extra elements rendered in header */
  extra?: ReactNode;
  /** Custom CSS class */
  className?: string;
  /** Inline style overrides */
  style?: CSSProperties;
}

export interface CDTimeIntervalRowProps {
  slot: CDTimeSlot;
  index: number;
  format: CDTimeFormat;
  hasConflict: boolean;
  canRemove: boolean;
  readOnly: boolean;
  step: number;
  onUpdate: (id: string, start: string, end: string) => void;
  onRemove: (id: string) => void;
}
