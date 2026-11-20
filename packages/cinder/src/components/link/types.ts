import type { AnchorHTMLAttributes, ReactNode } from "react";

export type CDLinkVariant = "default" | "primary" | "muted" | "subtle" | "danger";
export type CDLinkUnderline = "none" | "hover" | "always";
export type CDLinkSize = "sm" | "md" | "lg";

export interface CDLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: CDLinkVariant;
  underline?: CDLinkUnderline;
  size?: CDLinkSize;
  disabled?: boolean;
  external?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export type LinkProps = CDLinkProps;
