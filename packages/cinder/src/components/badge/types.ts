import type { HTMLAttributes, ReactNode } from "react";

export type CDBadgeVariant =
  | "default"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger";
export type BadgeVariant = CDBadgeVariant;

export type CDBadgeSize = "sm" | "md" | "lg";
export type BadgeSize = CDBadgeSize;

export type CDBadgeStatus =
  | "success"
  | "processing"
  | "error"
  | "warning"
  | "default";
export type BadgeStatus = CDBadgeStatus;

export type CDBadgeShape = "round" | "square";
export type BadgeShape = CDBadgeShape;

export interface CDBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Numerical count to display
   */
  count?: number | ReactNode;

  /**
   * Max count limit before showing overflow (e.g. 99 -> "99+")
   * @default 99
   */
  overflowCount?: number;

  /**
   * Whether to display badge when count is zero
   * @default false
   */
  showZero?: boolean;

  /**
   * Small status dot without text
   * @default false
   */
  dot?: boolean;

  /**
   * Animated pulsing ring effect
   * @default false
   */
  pulse?: boolean;

  /**
   * Status dot preset with semantic coloring
   */
  status?: CDBadgeStatus;

  /**
   * Text label accompanying standalone status dot
   */
  text?: ReactNode;

  /**
   * Badge color scheme
   * @default "default"
   */
  variant?: CDBadgeVariant;

  /**
   * Badge dimension preset
   * @default "md"
   */
  size?: CDBadgeSize;

  /**
   * Badge corner shape
   * @default "round"
   */
  shape?: CDBadgeShape;

  /**
   * Custom background color override
   */
  color?: string;

  /**
   * Child element being annotated by the badge (e.g. an icon or button)
   */
  children?: ReactNode;
}

export type BadgeProps = CDBadgeProps;
