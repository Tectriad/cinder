import type {
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  CSSProperties,
  ChangeEvent,
} from "react";

export type CDRadioSize = "sm" | "md" | "lg";
export type CDRadioVariant = "default" | "card";

export interface CDRadioOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  description?: ReactNode;
  icon?: ReactNode;
}

export interface CDRadioContextValue {
  name?: string;
  value?: string | number;
  onChange?: (value: string | number, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: CDRadioSize;
  variant?: CDRadioVariant;
  buttonStyle?: "outline" | "solid";
}

export interface CDRadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> {
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: CDRadioSize;
  variant?: CDRadioVariant;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type RadioProps = CDRadioProps;

export interface CDRadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: CDRadioSize;
  variant?: CDRadioVariant;
  direction?: "horizontal" | "vertical";
  buttonStyle?: "outline" | "solid";
  options?: CDRadioOption[];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type RadioGroupProps = CDRadioGroupProps;

export interface CDRadioButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> {
  value: string | number;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
}

export type RadioButtonProps = CDRadioButtonProps;
