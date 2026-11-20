import type { HTMLAttributes, ReactNode, MouseEvent } from "react";

export type CDNavbarPosition = "static" | "sticky" | "fixed";
export type CDNavbarVariant = "default" | "surface" | "transparent" | "glass";

export interface CDNavbarProps extends HTMLAttributes<HTMLElement> {
  position?: CDNavbarPosition;
  variant?: CDNavbarVariant;
  bordered?: boolean;
  height?: number | string;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export type NavbarProps = CDNavbarProps;
export type CDHeaderProps = CDNavbarProps;
export type HeaderProps = CDNavbarProps;

export interface CDNavbarBrandProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  logo?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
  children?: ReactNode;
  className?: string;
}

export type NavbarBrandProps = CDNavbarBrandProps;

export interface CDNavbarNavProps extends HTMLAttributes<HTMLElement> {
  align?: "left" | "center" | "right";
  children?: ReactNode;
  className?: string;
}

export type NavbarNavProps = CDNavbarNavProps;

export interface CDNavbarItemProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  children?: ReactNode;
  className?: string;
}

export type NavbarItemProps = CDNavbarItemProps;

export interface CDNavbarActionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export type NavbarActionProps = CDNavbarActionProps;
