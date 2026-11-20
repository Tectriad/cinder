import type { ReactNode, ReactElement, CSSProperties } from "react";

export type CDPopoverPlacement = "top" | "bottom" | "left" | "right";
export type PopoverPlacement = CDPopoverPlacement;

export type CDPopoverTrigger = "click" | "hover" | "focus";
export type PopoverTrigger = CDPopoverTrigger;

export interface CDPopoverProps {
  /**
   * Title text or element displayed in the popover header
   */
  title?: ReactNode;

  /**
   * Rich interactive content displayed in the popover card
   */
  content: ReactNode;

  /**
   * Alignment placement relative to the trigger element
   * @default "top"
   */
  placement?: CDPopoverPlacement;

  /**
   * Action triggering popover appearance
   * @default "click"
   */
  trigger?: CDPopoverTrigger | CDPopoverTrigger[];

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
   * Target trigger element
   */
  children: ReactElement;

  /**
   * Custom CSS class applied to floating popover card
   */
  className?: string;

  /**
   * Custom inline styles applied to floating popover card
   */
  style?: CSSProperties;
}

export type PopoverProps = CDPopoverProps;
