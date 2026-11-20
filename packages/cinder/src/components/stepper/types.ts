import type { HTMLAttributes, ReactNode, CSSProperties } from "react";

export type CDStepStatus = "wait" | "process" | "finish" | "error";
export type CDStepperOrientation = "horizontal" | "vertical";
export type CDStepperVariant = "default" | "dots" | "navigation";
export type CDStepperSize = "sm" | "md" | "lg";

export interface CDStepItem {
  title: ReactNode;
  description?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  status?: CDStepStatus;
  disabled?: boolean;
}

export interface CDStepperContextValue {
  current: number;
  status: CDStepStatus;
  orientation: CDStepperOrientation;
  variant: CDStepperVariant;
  size: CDStepperSize;
  onChange?: (current: number) => void;
}

export interface CDStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  current?: number;
  status?: CDStepStatus;
  onChange?: (current: number) => void;
  orientation?: CDStepperOrientation;
  variant?: CDStepperVariant;
  size?: CDStepperSize;
  items?: CDStepItem[];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type StepperProps = CDStepperProps;

export interface CDStepProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  stepIndex?: number;
  title?: ReactNode;
  description?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  status?: CDStepStatus;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export type StepProps = CDStepProps;
