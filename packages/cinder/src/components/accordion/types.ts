import type { ReactNode, CSSProperties } from "react";

export type CDAccordionKey = string | number;

export interface CDAccordionItemConfig {
  /** Unique key identifying the accordion panel */
  key: CDAccordionKey;
  /** Primary title of the panel */
  title: ReactNode;
  /** Optional secondary subtitle or description below title */
  subtitle?: ReactNode;
  /** Right-aligned extra slot (badges, actions, icons) */
  extra?: ReactNode;
  /** Panel content */
  children?: ReactNode;
  /** Content alias */
  content?: ReactNode;
  /** Disabled expansion state */
  disabled?: boolean;
  /** Additional class name for this item */
  className?: string;
  /** Custom inline style */
  style?: CSSProperties;
}

export interface CDAccordionProps {
  /** Configuration array of accordion panels */
  items?: CDAccordionItemConfig[];
  /** Controlled active keys */
  activeKeys?: CDAccordionKey[];
  /** Default active keys (uncontrolled) */
  defaultActiveKeys?: CDAccordionKey[];
  /** Whether only one panel can be open at a time (accordion mode) */
  accordion?: boolean;
  /** Visual presentation style */
  variant?: "surface" | "ghost" | "bordered";
  /** Change callback */
  onChange?: (activeKeys: CDAccordionKey[]) => void;
  /** Child items when used as a compound component */
  children?: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export interface CDAccordionItemProps extends CDAccordionItemConfig {
  /** Parent state propagation when used as compound component */
  isOpen?: boolean;
  /** Toggle callback */
  onToggle?: () => void;
}
