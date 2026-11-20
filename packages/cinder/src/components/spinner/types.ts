import type { ReactNode, CSSProperties } from "react";

export type CDSpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerSize = CDSpinnerSize;

export type CDSpinnerVariant = "spin" | "dots" | "track";
export type SpinnerVariant = CDSpinnerVariant;

export interface CDSpinnerProps {
  /**
   * Spinner dimension preset
   * @default "md"
   */
  size?: CDSpinnerSize;

  /**
   * Visual indicator animation style
   * @default "spin"
   */
  variant?: CDSpinnerVariant;

  /**
   * Informative copy displayed alongside or below indicator
   */
  tip?: ReactNode;

  /**
   * Whether the spinner is actively animating
   * @default true
   */
  spinning?: boolean;

  /**
   * Custom indicator color override
   */
  color?: string;

  /**
   * Delay in milliseconds before showing spinner (prevents flickering)
   */
  delay?: number;

  /**
   * Wrapped content to display behind a loading overlay
   */
  children?: ReactNode;

  /**
   * Custom root CSS class
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: CSSProperties;
}
