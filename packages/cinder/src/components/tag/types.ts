import type { ReactNode, CSSProperties, MouseEvent } from "react";

export type CDTagVariant = "default" | "primary" | "success" | "warning" | "error" | "info";
export type CDTagSize = "sm" | "md" | "lg";

export interface CDTagProps {
  /** Visual color variant */
  variant?: CDTagVariant;
  /** Size tier */
  size?: CDTagSize;
  /** Whether the tag can be closed with an 'x' icon */
  closable?: boolean;
  /** Custom background or border color override */
  color?: string;
  /** Custom text color override when color is specified */
  textColor?: string;
  /** Optional icon prefix element */
  icon?: ReactNode;
  /** Pill rounded styling */
  round?: boolean;
  /** Explicit border outline */
  bordered?: boolean;
  /** Clickable checkable mode */
  checkable?: boolean;
  /** Checked status for checkable tag */
  checked?: boolean;
  /** Callback when check state changes */
  onChange?: (checked: boolean) => void;
  /** Callback fired when tag is closed */
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  /** Disabled interaction */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Tag content */
  children?: ReactNode;
}
