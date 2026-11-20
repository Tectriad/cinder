import type { ReactNode, ReactElement, CSSProperties } from "react";

export type CDTooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipPlacement = CDTooltipPlacement;

export type CDTooltipTrigger = "hover" | "focus" | "click";
export type TooltipTrigger = CDTooltipTrigger;

export interface CDTooltipProps {
  /**
   * Tooltip copy or element displayed in the floating balloon
   */
  title: ReactNode;

  /**
   * Anchor alignment direction relative to trigger element
   * @default "top"
   */
  placement?: CDTooltipPlacement;

  /**
   * Action triggering tooltip appearance
   * @default "hover"
   */
  trigger?: CDTooltipTrigger | CDTooltipTrigger[];

  /**
   * Whether to display small arrow pointer pointing to target
   * @default true
   */
  arrow?: boolean;

  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Default open state for uncontrolled usage
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Delay in milliseconds before opening on mouse hover
   * @default 100
   */
  mouseEnterDelay?: number;

  /**
   * Delay in milliseconds before closing on mouse leave
   * @default 100
   */
  mouseLeaveDelay?: number;

  /**
   * Custom background color override
   */
  color?: string;

  /**
   * Target trigger element
   */
  children: ReactElement;

  /**
   * Custom CSS class applied to floating tooltip
   */
  className?: string;

  /**
   * Custom inline styles applied to floating tooltip
   */
  style?: CSSProperties;
}

export type TooltipProps = CDTooltipProps;
