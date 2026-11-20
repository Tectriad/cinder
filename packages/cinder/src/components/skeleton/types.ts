import type { ReactNode, CSSProperties } from "react";

export type CDSkeletonVariant = "text" | "circle" | "rect" | "button" | "card";
export type SkeletonVariant = CDSkeletonVariant;

export type CDSkeletonAnimation = "wave" | "pulse" | "none";
export type SkeletonAnimation = CDSkeletonAnimation;

export interface CDSkeletonProps {
  /**
   * Geometric shape or preset layout
   * @default "text"
   */
  variant?: CDSkeletonVariant;

  /**
   * Placeholder motion animation style
   * @default "wave"
   */
  animation?: CDSkeletonAnimation;

  /**
   * Explicit custom width (e.g. 120, "80%", "200px")
   */
  width?: string | number;

  /**
   * Explicit custom height (e.g. 16, "32px")
   */
  height?: string | number;

  /**
   * Number of text paragraph lines to generate when variant="text"
   * @default 3
   */
  lines?: number;

  /**
   * Whether the skeleton is currently visible (showing placeholder vs children)
   * @default true
   */
  loading?: boolean;

  /**
   * Wrapped real content rendered when loading=false
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
