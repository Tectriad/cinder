import type { HTMLAttributes, ReactNode, CSSProperties, KeyboardEvent } from "react";

export type CDTabsVariant = "line" | "enclosed" | "pills" | "segment";
export type CDTabsOrientation = "horizontal" | "vertical";
export type CDTabsSize = "sm" | "md" | "lg";

export interface CDTabItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  closable?: boolean;
  children?: ReactNode;
}

export interface CDTabsContextValue {
  activeKey: string;
  setActiveKey: (key: string) => void;
  variant: CDTabsVariant;
  orientation: CDTabsOrientation;
  size: CDTabsSize;
  onClose?: (key: string) => void;
}

export interface CDTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (key: string) => void;
  variant?: CDTabsVariant;
  orientation?: CDTabsOrientation;
  size?: CDTabsSize;
  items?: CDTabItem[];
  onClose?: (key: string) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type TabsProps = CDTabsProps;

export interface CDTabListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export type TabListProps = CDTabListProps;

export interface CDTabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  closable?: boolean;
  onClose?: (value: string) => void;
  children?: ReactNode;
  className?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export type TabProps = CDTabProps;

export interface CDTabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
  className?: string;
}

export type TabPanelProps = CDTabPanelProps;
