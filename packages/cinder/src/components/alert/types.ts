import type { ReactNode, CSSProperties, MouseEvent } from "react";

export type CDAlertType = "info" | "success" | "warning" | "danger" | "neutral";
export type AlertType = CDAlertType;

export type CDAlertVariant = "subtle" | "solid" | "outline" | "banner";
export type AlertVariant = CDAlertVariant;

export interface CDAlertProps {
  /**
   * Semantic intent determining icon and color scheme
   * @default "info"
   */
  type?: CDAlertType;

  /**
   * Visual presentation style
   * @default "subtle"
   */
  variant?: CDAlertVariant;

  /**
   * Primary title or alert summary
   */
  title?: ReactNode;

  /**
   * Detailed explanation or supporting message
   */
  description?: ReactNode;

  /**
   * Children content (used as description if not explicitly provided)
   */
  children?: ReactNode;

  /**
   * Custom leading icon, or false to hide the default status icon
   */
  icon?: ReactNode | boolean;

  /**
   * Whether to display the default status icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Whether the alert can be closed by the user
   * @default false
   */
  closable?: boolean;

  /**
   * Callback fired when close button is clicked
   */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Action element (button or link) placed on the right
   */
  action?: ReactNode;

  /**
   * Banner mode: edge-to-edge bar with square corners and bottom border
   * @default false
   */
  banner?: boolean;

  /**
   * Custom root CSS class
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: CSSProperties;
}
