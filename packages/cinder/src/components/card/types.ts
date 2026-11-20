import type { HTMLAttributes, ReactNode } from "react";

export type CDCardVariant = "surface" | "glass" | "outline";
export type CardVariant = CDCardVariant;
export type CDCardSize = "sm" | "md" | "lg";

export interface CDCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Visual presentation style */
  variant?: CDCardVariant;
  /** Hover elevation effect */
  interactive?: boolean;
  /** Hoverable alias to interactive */
  hoverable?: boolean;
  /** Explicit border outline */
  bordered?: boolean;
  /** Card padding size preset */
  size?: CDCardSize;
  /** Primary title rendered in automatic header */
  title?: ReactNode;
  /** Subtitle description below title */
  description?: ReactNode;
  /** Right-aligned header action/badge slot */
  extra?: ReactNode;
  /** Top cover media or banner element */
  cover?: ReactNode;
  /** Loading placeholder state */
  loading?: boolean;
  /** Content children */
  children?: ReactNode;
}

export type CardProps = CDCardProps;
export type CDCardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CDCardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type CDCardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type CDCardContentProps = HTMLAttributes<HTMLDivElement>;
export type CDCardFooterProps = HTMLAttributes<HTMLDivElement>;
