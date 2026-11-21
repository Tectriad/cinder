import type { CSSProperties, ReactNode } from "react";

export type CDColorMode = "solid" | "gradient";
export type CDColorFormat = "hex" | "rgb" | "hsl";
export type CDGradientType = "linear" | "radial";

export interface CDGradientStop {
  id: string;
  color: string;
  offset: number; // 0 to 100 percentage
}

export interface CDGradientValue {
  type: CDGradientType;
  angle: number; // 0 to 360 degrees for linear
  stops: CDGradientStop[];
}

export interface CDColorPickerProProps {
  /** Current color value (HEX, RGBA, or CSS gradient string) */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when color changes */
  onChange?: (color: string) => void;
  /** Supported modes ("solid" | "gradient" | "both"). Defaults to "both". */
  mode?: "solid" | "gradient" | "both";
  /** Format of color input/output ("hex" | "rgb" | "hsl"). Defaults to "hex". */
  format?: CDColorFormat;
  /** Whether to show opacity/alpha slider. Defaults to true. */
  showAlpha?: boolean;
  /** Preset swatch colors to display */
  presets?: string[];
  /** Whether to show the eye dropper tool (if supported by browser). Defaults to true. */
  showEyeDropper?: boolean;
  /** Whether to render inline or as a dropdown popover. Defaults to "inline". */
  display?: "inline" | "popover";
  /** Trigger button label when display="popover" */
  label?: string;
  /** Optional custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Extra footer or action elements */
  extra?: ReactNode;
}
