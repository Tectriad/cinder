import type { ReactNode, InputHTMLAttributes, CSSProperties, ChangeEvent } from "react";

export type CDCheckboxSize = "sm" | "md" | "lg";
export type CDCheckboxVariant = "default" | "card";
export type CDCheckboxShape = "default" | "square" | "round";
export type CheckboxShape = CDCheckboxShape;

export interface CDCheckboxOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  description?: ReactNode;
  icon?: ReactNode;
  shape?: CDCheckboxShape;
  round?: boolean;
}

export interface CDCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> {
  /**
   * Value identifier for checkbox group
   */
  value?: string | number;

  /**
   * Controlled checked state
   */
  checked?: boolean;

  /**
   * Uncontrolled initial checked state
   */
  defaultChecked?: boolean;

  /**
   * Indeterminate (partially checked) state, ideal for parent checkboxes
   */
  indeterminate?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Checkbox control size
   * @default "md"
   */
  size?: CDCheckboxSize;

  /**
   * Visual presentation variant: default inline or selectable card
   * @default "default"
   */
  variant?: CDCheckboxVariant;

  /**
   * Checkbox shape geometry
   * @default "default" (square with rounded corners)
   */
  shape?: CDCheckboxShape;

  /**
   * Shorthand boolean to render a circular / round checkbox
   * @default false
   */
  round?: boolean;

  /**
   * Primary label text or element
   */
  label?: ReactNode;

  /**
   * Secondary description text or element below label
   */
  description?: ReactNode;

  /**
   * Error state or error message
   */
  error?: boolean | string;

  /**
   * Callback fired on checked state change
   */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Custom root CSS class
   */
  className?: string;

  /**
   * Custom root inline styles
   */
  style?: CSSProperties;

  /**
   * Child content (used as label if `label` is not provided)
   */
  children?: ReactNode;
}

export interface CDCheckboxGroupProps {
  /**
   * Controlled array of checked values
   */
  value?: (string | number)[];

  /**
   * Initial checked values for uncontrolled mode
   */
  defaultValue?: (string | number)[];

  /**
   * Declarative array of options to render
   */
  options?: (string | number | CDCheckboxOption)[];

  /**
   * Disable all checkboxes in the group
   */
  disabled?: boolean;

  /**
   * Uniform size for checkboxes in group
   * @default "md"
   */
  size?: CDCheckboxSize;

  /**
   * Uniform shape for checkboxes in group
   * @default "default"
   */
  shape?: CDCheckboxShape;

  /**
   * Shorthand boolean to render all checkboxes in group as round
   * @default false
   */
  round?: boolean;

  /**
   * Layout direction
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";

  /**
   * Shared input name attribute for native form submission
   */
  name?: string;

  /**
   * Callback fired when selection changes
   */
  onChange?: (checkedValues: (string | number)[]) => void;

  /**
   * Custom root CSS class
   */
  className?: string;

  /**
   * Custom root inline styles
   */
  style?: CSSProperties;

  /**
   * Child CDCheckbox elements when not using options prop
   */
  children?: ReactNode;
}

export interface CDCheckboxGroupContextValue {
  value: (string | number)[];
  disabled?: boolean;
  size?: CDCheckboxSize;
  shape?: CDCheckboxShape;
  name?: string;
  toggleOption: (optionValue: string | number) => void;
}
