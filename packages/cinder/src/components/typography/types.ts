import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  CSSProperties,
  ElementType,
} from "react";

export type CDTypographyType =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "muted"
  | "primary";

export type CDHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface CDCopyableConfig {
  text?: string;
  onCopy?: () => void;
  tooltips?: [string, string]; // [before copy, after copy]
}

export interface CDEditableConfig {
  editing?: boolean;
  onChange?: (val: string) => void;
  onStart?: () => void;
  onCancel?: () => void;
  autoSize?: boolean;
  maxLength?: number;
}

export interface CDEllipsisConfig {
  rows?: number;
  suffix?: string;
  expandable?: boolean;
}

/* Heading Props */
export interface CDHeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "color"> {
  level?: CDHeadingLevel;
  type?: CDTypographyType;
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  gradient?: boolean;
  copyable?: boolean | CDCopyableConfig;
  editable?: boolean | CDEditableConfig;
  ellipsis?: boolean | CDEllipsisConfig;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type HeadingProps = CDHeadingProps;
export type CDTitleProps = CDHeadingProps;
export type TitleProps = CDHeadingProps;

/* Text Props */
export interface CDTextProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  as?: ElementType;
  type?: CDTypographyType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  strong?: boolean;
  italic?: boolean;
  underline?: boolean;
  delete?: boolean;
  code?: boolean;
  mark?: boolean;
  keyboard?: boolean;
  copyable?: boolean | CDCopyableConfig;
  editable?: boolean | CDEditableConfig;
  ellipsis?: boolean | CDEllipsisConfig;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type TextProps = CDTextProps;

/* Paragraph Props */
export interface CDParagraphProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "color"> {
  type?: CDTypographyType;
  size?: "sm" | "md" | "lg";
  lead?: boolean;
  spacing?: "tight" | "normal" | "relaxed";
  copyable?: boolean | CDCopyableConfig;
  editable?: boolean | CDEditableConfig;
  ellipsis?: boolean | CDEllipsisConfig;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type ParagraphProps = CDParagraphProps;

/* Label Props */
export interface CDLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
  required?: boolean;
  optional?: boolean | ReactNode;
  tooltip?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type LabelProps = CDLabelProps;

/* Code Props */
export interface CDCodeProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
  copyable?: boolean | CDCopyableConfig;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type CodeProps = CDCodeProps;

/* Kbd Props */
export interface CDKbdProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type KbdProps = CDKbdProps;

/* Root Typography Props */
export interface CDTypographyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type TypographyProps = CDTypographyProps;
