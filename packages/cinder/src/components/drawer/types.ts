import type { ReactNode, CSSProperties } from "react";

export type CDDrawerPlacement = "right" | "left" | "top" | "bottom";
export type DrawerPlacement = CDDrawerPlacement;

export interface CDDrawerProps {
  /**
   * Whether the drawer sheet is visible
   */
  open?: boolean;

  /**
   * Callback fired when drawer requests to close
   */
  onClose?: () => void;

  /**
   * Edge of the viewport the drawer slides from
   * @default "right"
   */
  placement?: CDDrawerPlacement;

  /**
   * Primary title displayed in the drawer header
   */
  title?: ReactNode;

  /**
   * Subtitle or descriptive metadata below title
   */
  description?: ReactNode;

  /**
   * Custom footer elements
   */
  footer?: ReactNode;

  /**
   * Whether to display the top close icon button
   * @default true
   */
  closable?: boolean;

  /**
   * Whether clicking the darkened background mask triggers close
   * @default true
   */
  maskClosable?: boolean;

  /**
   * Drawer width (for left & right placements)
   * @default 380
   */
  width?: number | string;

  /**
   * Drawer height (for top & bottom placements)
   * @default 380
   */
  height?: number | string;

  /**
   * Destroy drawer children from DOM when closed
   * @default true
   */
  destroyOnClose?: boolean;

  /**
   * Drawer content body
   */
  children?: ReactNode;

  /**
   * Custom CSS class applied to drawer container
   */
  className?: string;

  /**
   * Custom inline styles applied to drawer container
   */
  style?: CSSProperties;
}

export type DrawerProps = CDDrawerProps;
export type CDSheetProps = CDDrawerProps;
export type SheetProps = CDDrawerProps;
