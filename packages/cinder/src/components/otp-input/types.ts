import type { CSSProperties, ReactNode } from "react";

export type CDOTPType = "numeric" | "alphanumeric" | "alpha";
export type CDOTPRadius = "none" | "sm" | "md" | "lg" | "full" | number | string;
export type CDOTPSize = "sm" | "md" | "lg";

export interface GenerateOTPOptions {
  /** Length of the generated code (e.g. 4 or 6). Defaults to 4. */
  length?: number;
  /** Character composition: "numeric" (number alone), "alphanumeric" (word and number), or "alpha" (word alone). Defaults to "numeric". */
  type?: CDOTPType;
}

export interface CDOTPInputProps {
  /** Number of digits / verification slots. Defaults to 6 (supports 4, 6, 8, etc.). */
  length?: number;
  /** Current combined string value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when any slot changes */
  onChange?: (value: string) => void;
  /** Callback fired automatically when all slots are filled */
  onComplete?: (code: string) => void;
  /** Input validation type: "numeric" (numbers alone), "alphanumeric" (word and number), or "alpha" (word alone). Defaults to "numeric". */
  type?: CDOTPType;
  /** Corner curve / roundness of the box ("none" | "sm" | "md" | "lg" | "full" or custom string/number). Defaults to "md". */
  radius?: CDOTPRadius;
  /** Visual dimension size of verification slots ("sm" | "md" | "lg"). Defaults to "md". */
  size?: CDOTPSize;
  /** Mask inputs like a password. Defaults to false. */
  masked?: boolean;
  /** Whether to allow toggling masked state with eye icon button. Defaults to false. */
  showMaskToggle?: boolean;
  /** Insert visual group divider in the middle (e.g. 2-2 for 4 digits, 3-3 for 6 digits). Defaults to true for length >= 6. */
  grouped?: boolean;
  /** Automatically focus the first input on render. Defaults to false. */
  autoFocus?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text or error message displayed below */
  helperText?: string;
  /** Label rendered above */
  label?: string;
  /** Extra elements in header */
  extra?: ReactNode;
  /** Custom CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}
