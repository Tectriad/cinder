import type { ReactNode, CSSProperties } from "react";

export type CDSelectSize = "sm" | "md" | "lg";
export type SelectSize = CDSelectSize;

export type CDSelectPlacement = "bottom" | "top";
export type SelectPlacement = CDSelectPlacement;

export type CDSelectValue = string | number;
export type SelectValue = CDSelectValue;

export interface CDSelectOption {
  value: CDSelectValue;
  label: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  description?: ReactNode;
  group?: string;
}

export type SelectOption = CDSelectOption;

export interface CDSelectProps {
  options?: CDSelectOption[];
  value?: CDSelectValue | CDSelectValue[];
  defaultValue?: CDSelectValue | CDSelectValue[];
  onChange?: (value: any, option?: any) => void;
  placeholder?: string;
  size?: CDSelectSize;
  multiple?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  prefixIcon?: ReactNode;
  placement?: CDSelectPlacement;
  portal?: boolean;
  className?: string;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  name?: string;
  id?: string;
  children?: ReactNode;
}

export type SelectProps = CDSelectProps;

export interface CDOptionProps {
  value: CDSelectValue;
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  description?: ReactNode;
}

export type OptionProps = CDOptionProps;
