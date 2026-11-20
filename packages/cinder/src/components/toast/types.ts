import type { ReactNode, CSSProperties, MouseEvent } from "react";

export type CDToastType = "info" | "success" | "warning" | "error" | "neutral";
export type ToastType = CDToastType;

export type CDToastPlacement =
  | "top"
  | "top-center"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";
export type ToastPlacement = CDToastPlacement;

export type CDToastAnimation = "slide" | "fade" | "zoom" | "bounce";
export type ToastAnimation = CDToastAnimation;

export interface CDToastItem {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  type?: CDToastType;
  duration?: number;
  closable?: boolean;
  action?: ReactNode;
  icon?: ReactNode | boolean;
  placement?: CDToastPlacement;
  animation?: CDToastAnimation;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface CDToastOptions
  extends Omit<CDToastItem, "id"> {
  id?: string;
}

export interface CDToastProps {
  item: CDToastItem;
  onDismiss: (id: string, event?: MouseEvent<HTMLButtonElement>) => void;
}

export interface CDToastContainerProps {
  placement?: CDToastPlacement;
  maxToasts?: number;
  className?: string;
  style?: CSSProperties;
}
