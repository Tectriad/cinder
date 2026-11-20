import type { ReactNode, CSSProperties } from "react";

export type CDListSize = "sm" | "md" | "lg";

export interface CDListItemMetaProps {
  /** Avatar element in list item */
  avatar?: ReactNode;
  /** Primary title */
  title?: ReactNode;
  /** Secondary description copy */
  description?: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline style */
  style?: CSSProperties;
}

export interface CDListItemProps {
  /** Right-aligned actions array (buttons, icons, links) */
  actions?: ReactNode[];
  /** Extra slot (thumbnails, metrics, tags) */
  extra?: ReactNode;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** Child content */
  children?: ReactNode;
}

export interface CDListProps<T = any> {
  /** Array of data items to render */
  dataSource?: T[];
  /** Render callback for each item */
  renderItem?: (item: T, index: number) => ReactNode;
  /** Header slot content */
  header?: ReactNode;
  /** Footer slot content */
  footer?: ReactNode;
  /** Border outline around list */
  bordered?: boolean;
  /** Divider lines between list items */
  split?: boolean;
  /** Size density preset */
  size?: CDListSize;
  /** Loading spinner overlay */
  loading?: boolean;
  /** Empty state message */
  emptyText?: ReactNode;
  /** Grid layout columns configuration */
  grid?: {
    gutter?: number;
    column?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Child items when used without dataSource */
  children?: ReactNode;
}
