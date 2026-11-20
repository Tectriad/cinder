import type { HTMLAttributes, ReactNode, MouseEvent, CSSProperties } from "react";

export type CDSidebarVariant = "default" | "floating" | "inset";
export type CDSidebarPlacement = "left" | "right" | "top" | "bottom";

export interface CDSidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  collapsible: boolean;
  placement: CDSidebarPlacement;
  floating: boolean;
}

export interface CDSidebarProps extends HTMLAttributes<HTMLElement> {
  placement?: CDSidebarPlacement;
  position?: CDSidebarPlacement;
  floating?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  collapsible?: boolean;
  width?: number | string;
  collapsedWidth?: number | string;
  height?: number | string;
  collapsedHeight?: number | string;
  variant?: CDSidebarVariant;
  bordered?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type SidebarProps = CDSidebarProps;

export interface CDSidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export type SidebarHeaderProps = CDSidebarHeaderProps;

export interface CDSidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export type SidebarContentProps = CDSidebarContentProps;

export interface CDSidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export type SidebarFooterProps = CDSidebarFooterProps;

export interface CDSidebarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export type SidebarGroupProps = CDSidebarGroupProps;

export interface CDSidebarItemProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  rightAccessory?: ReactNode;
  href?: string;
  tooltip?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  children?: ReactNode;
  className?: string;
}

export type SidebarItemProps = CDSidebarItemProps;
