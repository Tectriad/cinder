import type {
  CSSProperties,
  ReactNode,
} from "react";

export type CDFormFieldType =
  | "text"
  | "number"
  | "decimal"
  | "textarea"
  | "select"
  | "multiselect"
  | "radio"
  | "checkbox"
  | "checkbox-group"
  | "switch"
  | "slider"
  | "date-picker"
  | "time-picker"
  | "file-picker"
  | "custom";

export type CDFormVariant = "standard" | "cards" | "survey";

export type CDFormLayout = "vertical" | "horizontal" | "straight";

export interface CDFormHeaderConfig {
  title?: string;
  description?: string;
  badge?: string;
  requiredNotice?: string;
  accentColor?: string;
}

export type CDFormValidationPreset =
  | "email"
  | "url"
  | "number"
  | "decimal"
  | "phone"
  | "alphanumeric"
  | "strong-password";

export interface CDFormSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type CDFormValidatorFn = (
  value: unknown,
  formValues: Record<string, unknown>
) => string | boolean | undefined | Promise<string | boolean | undefined>;

export interface CDFormFieldValidation {
  required?: boolean | string;
  preset?: CDFormValidationPreset;
  pattern?: string | RegExp;
  patternMessage?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  minMessage?: string;
  maxMessage?: string;
  minLengthMessage?: string;
  maxLengthMessage?: string;
  custom?: CDFormValidatorFn;
}

export interface CDFormFieldConfig {
  name: string;
  label: string;
  type: CDFormFieldType;
  subType?: "text" | "email" | "password" | "url" | "tel" | "search";
  subtitle?: string;
  questionNumber?: number | string;
  placeholder?: string;
  defaultValue?: unknown;
  tooltip?: string;
  helpText?: string;
  required?: boolean | string;
  validation?: CDFormFieldValidation;
  options?: CDFormSelectOption[];
  colSpan?: number; // 1 to 12 (default: 12)
  disabled?: boolean | ((values: Record<string, unknown>) => boolean);
  visible?: (values: Record<string, unknown>) => boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  rows?: number;
  showCount?: boolean;
  accept?: string; // for file-picker
  maxFileSize?: number; // for file-picker
  multipleFiles?: boolean; // for file-picker
  renderCustom?: (
    field: CDFormFieldConfig,
    formContext: CDFormContextValue
  ) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface CDFormActionButton {
  key: string;
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "danger" | "ghost";
  htmlType?: "submit" | "button" | "reset";
  onClick?: (formContext: CDFormContextValue) => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface CDFormActionsConfig {
  enabled?: boolean;
  align?: "left" | "center" | "right" | "between";
  submitText?: string;
  resetText?: string;
  cancelText?: string;
  showSubmit?: boolean;
  showReset?: boolean;
  showCancel?: boolean;
  onCancel?: () => void;
  onReset?: () => void;
  extraButtons?: CDFormActionButton[];
}

export interface CDFormContextValue {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldTouched: (name: string, isTouched?: boolean) => void;
  setFieldError: (name: string, error: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
  validateField: (name: string) => Promise<string | undefined>;
  validateForm: () => Promise<boolean>;
}

export interface CDFormBuilderProps {
  fields: CDFormFieldConfig[];
  initialValues?: Record<string, unknown>;
  onSubmit?: (
    values: Record<string, unknown>,
    formContext: CDFormContextValue
  ) => void | Promise<void>;
  onChange?: (
    values: Record<string, unknown>,
    changedField: { name: string; value: unknown }
  ) => void;
  validationMode?: "onChange" | "onBlur" | "onSubmit";
  variant?: CDFormVariant;
  layout?: CDFormLayout;
  header?: CDFormHeaderConfig;
  showQuestionNumbers?: boolean;
  maxWidth?: number | string;
  centered?: boolean;
  columns?: number;
  gap?: number | string;
  actions?: CDFormActionsConfig;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export type FormBuilderProps = CDFormBuilderProps;
