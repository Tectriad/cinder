import type {
  ButtonHTMLAttributes,
  ReactNode,
  CSSProperties,
  MouseEvent,
  KeyboardEvent,
} from "react";

export type CDSwitchSize = "sm" | "md" | "lg";

export interface CDSwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    checked: boolean,
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: CDSwitchSize;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  thumbIcon?: ReactNode | ((checked: boolean) => ReactNode);
  className?: string;
  style?: CSSProperties;
}

export type SwitchProps = CDSwitchProps;
export type CDToggleProps = CDSwitchProps;
export type ToggleProps = CDSwitchProps;
