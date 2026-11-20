import type { ReactNode, CSSProperties } from "react";

export type CDProgressStatus = "normal" | "success" | "warning" | "danger" | "active";
export type ProgressStatus = CDProgressStatus;

export type CDProgressSize = "sm" | "md" | "lg";
export type ProgressSize = CDProgressSize;

export interface CDProgressBarProps {
  /**
   * Progress completion percentage (0 - 100)
   * @default 0
   */
  value?: number;

  /**
   * Secondary buffer completion percentage (0 - 100)
   */
  buffer?: number;

  /**
   * Semantic completion status
   * @default "normal"
   */
  status?: CDProgressStatus;

  /**
   * Bar height dimension preset
   * @default "md"
   */
  size?: CDProgressSize;

  /**
   * Indeterminate ongoing operation without determinate progress
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Whether to display the percentage label
   * @default true
   */
  showInfo?: boolean;

  /**
   * Custom percentage label format callback
   */
  format?: (percent: number) => ReactNode;

  /**
   * Custom filled progress bar color override
   */
  color?: string;

  /**
   * Custom background track color override
   */
  trackColor?: string;

  /**
   * Custom root CSS class
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: CSSProperties;
}
