import type {
  TextareaHTMLAttributes,
  ReactNode,
  CSSProperties,
  ChangeEvent,
} from "react";

export type CDTextAreaSize = "sm" | "md" | "lg";
export type CDTextAreaStatus = "error" | "warning";
export type CDTextAreaResize = "none" | "vertical" | "horizontal" | "both";

export interface CDTextAreaAutoSizeConfig {
  minRows?: number;
  maxRows?: number;
}

export type CDTextAreaAutoSize = boolean | CDTextAreaAutoSizeConfig;

export interface CDTextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: CDTextAreaSize;
  status?: CDTextAreaStatus;
  resize?: CDTextAreaResize;
  autoSize?: CDTextAreaAutoSize;
  showCount?: boolean | ((count: number, maxLength?: number) => ReactNode);
  allowClear?: boolean;
  onClear?: () => void;
  className?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export type TextAreaProps = CDTextAreaProps;
export type CDTextareaProps = CDTextAreaProps;
export type TextareaProps = CDTextAreaProps;
