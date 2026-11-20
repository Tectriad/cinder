import type { HTMLAttributes, ReactNode, MouseEvent, CSSProperties } from "react";

export interface CDBreadcrumbItemData {
  key?: string;
  title: ReactNode;
  href?: string;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
}

export interface CDBreadcrumbProps extends HTMLAttributes<HTMLElement> {
  separator?: ReactNode;
  maxItems?: number;
  items?: CDBreadcrumbItemData[];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type BreadcrumbProps = CDBreadcrumbProps;
export type CDBreadcrumbsProps = CDBreadcrumbProps;
export type BreadcrumbsProps = CDBreadcrumbProps;

export interface CDBreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  href?: string;
  active?: boolean;
  icon?: ReactNode;
  separator?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
  children?: ReactNode;
  className?: string;
}

export type BreadcrumbItemProps = CDBreadcrumbItemProps;
