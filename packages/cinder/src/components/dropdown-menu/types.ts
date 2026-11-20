import type { ReactNode, ReactElement, CSSProperties, MouseEvent } from "react";

export type CDDropdownMenuPlacement =
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "top-left"
  | "top-right";
export type DropdownMenuPlacement = CDDropdownMenuPlacement;

export interface CDDropdownMenuItem {
  key?: string;
  label?: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  extra?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divided?: boolean;
  divider?: boolean;
  groupTitle?: string;
  checked?: boolean;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export interface CDDropdownMenuProps {
  /**
   * Declarative array of menu items
   */
  items?: CDDropdownMenuItem[];

  /**
   * Menu alignment placement
   * @default "bottom-left"
   */
  placement?: CDDropdownMenuPlacement;

  /**
   * Action triggering menu open
   * @default "click"
   */
  trigger?: "click" | "hover";

  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Default open state
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether to auto-close menu when an item is clicked
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Trigger element
   */
  children: ReactElement;

  /**
   * Custom CSS class applied to menu overlay
   */
  className?: string;

  /**
   * Custom inline styles applied to menu overlay
   */
  style?: CSSProperties;
}

export type DropdownMenuProps = CDDropdownMenuProps;
export type DropdownMenuItem = CDDropdownMenuItem;
