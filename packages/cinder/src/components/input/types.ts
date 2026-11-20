import type { InputHTMLAttributes, ReactNode } from "react";

export type CDInputSize = "sm" | "md" | "lg";
export type InputSize = CDInputSize;

export interface CDInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: CDInputSize;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  error?: boolean;
  label?: string;
  helperText?: string;
}

export type InputProps = CDInputProps;
