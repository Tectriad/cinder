import type {
  ReactNode,
  ButtonHTMLAttributes,
  ElementType,
  CSSProperties,
  MouseEvent as ReactMouseEvent,
} from "react";
import type { PolymorphicComponentPropsWithRef } from "../../types";

export type CDButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "glass"
  | "danger"
  | "accent"
  | "outline";

export type ButtonVariant = CDButtonVariant;

export type CDButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonSize = CDButtonSize;

export type CDButtonShape = "default" | "round" | "circle";
export type ButtonShape = CDButtonShape;

export type CDButtonRadius = "none" | "xs" | "sm" | "md" | "lg" | "full" | number | string;
export type ButtonRadius = CDButtonRadius;

export type CDButtonShadow = "none" | "sm" | "md" | "lg" | boolean;
export type ButtonShadow = CDButtonShadow;

export type CDButtonHtmlType = "button" | "submit" | "reset";
export type ButtonHtmlType = CDButtonHtmlType;

export interface CDButtonCustomTheme {
  bg?: string;
  fg?: string;
  hoverBg?: string;
  hoverFg?: string;
  border?: string;
  hoverBorder?: string;
  focusRing?: string;
  shadow?: string;
  hoverShadow?: string;
  radius?: string;
}

export type ButtonCustomTheme = CDButtonCustomTheme;

export interface CDButtonBaseProps {
  variant?: CDButtonVariant;
  size?: CDButtonSize;
  shape?: CDButtonShape;
  isRound?: boolean;
  radius?: CDButtonRadius;
  shadow?: CDButtonShadow;
  hoverShadow?: CDButtonShadow;
  htmlType?: CDButtonHtmlType;
  type?: CDButtonHtmlType;
  isSubmit?: boolean;
  isLoading?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  fullWidth?: boolean;
  customTheme?: CDButtonCustomTheme;
  children?: ReactNode;
  disabled?: boolean;
}

export type ButtonBaseProps = CDButtonBaseProps;

export type CDButtonProps<C extends ElementType = "button"> = PolymorphicComponentPropsWithRef<
  C,
  CDButtonBaseProps
>;

export type ButtonProps<C extends ElementType = "button"> = CDButtonProps<C>;

export interface CDIconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
  icon: ReactNode;
  "aria-label": string;
  variant?: CDButtonVariant;
  size?: CDButtonSize;
  isRound?: boolean;
  isLoading?: boolean;
  customTheme?: CDButtonCustomTheme;
  className?: string;
}

export type IconButtonProps = CDIconButtonProps;

export interface CDButtonGroupProps extends ButtonHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isAttached?: boolean;
  attached?: boolean;
  orientation?: "horizontal" | "vertical";
  size?: CDButtonSize;
  variant?: CDButtonVariant;
  className?: string;
}

export type ButtonGroupProps = CDButtonGroupProps;

export interface CDDropdownItem {
  key?: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export type DropdownItem = CDDropdownItem;

export interface CDButtonDropdownProps {
  label: ReactNode;
  items: CDDropdownItem[];
  variant?: CDButtonVariant;
  size?: CDButtonSize;
  isSplit?: boolean;
  split?: boolean;
  prefix?: ReactNode;
  align?: "left" | "right";
  onMainClick?: () => void;
  customTheme?: CDButtonCustomTheme;
  className?: string;
  menuClassName?: string;
}

export type ButtonDropdownProps = CDButtonDropdownProps;

export interface CDCopyButtonProps {
  value: string;
  variant?: CDButtonVariant;
  size?: CDButtonSize;
  label?: ReactNode;
  copiedLabel?: ReactNode;
  timeout?: number;
  onCopy?: (value: string) => void;
  className?: string;
  children?: ReactNode;
}

export type CopyButtonProps = CDCopyButtonProps;

export type CDFloatButtonPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";
export type FloatButtonPosition = CDFloatButtonPosition;

export type CDFloatButtonShape = "circle" | "square";
export type FloatButtonShape = CDFloatButtonShape;

export type CDFloatButtonSize = "xs" | "sm" | "md" | "lg";
export type FloatButtonSize = CDFloatButtonSize;

export type CDFloatButtonDirection = "up" | "down" | "left" | "right";
export type FloatButtonDirection = CDFloatButtonDirection;

export interface CDFloatButtonOffset {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}
export type FloatButtonOffset = CDFloatButtonOffset;

export interface CDFloatActionItem {
  key?: string;
  icon: ReactNode;
  label?: ReactNode;
  tooltip?: string;
  description?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  badge?: ReactNode;
}
export type FloatActionItem = CDFloatActionItem;

export interface CDFloatButtonProps {
  icon?: ReactNode;
  description?: ReactNode;
  tooltip?: string;
  shape?: CDFloatButtonShape;
  size?: CDFloatButtonSize;
  position?: CDFloatButtonPosition;
  offset?: CDFloatButtonOffset;
  fixed?: boolean;
  variant?: CDButtonVariant;
  badge?: {
    count?: number;
    dot?: boolean;
    color?: string;
  };
  actions?: CDFloatActionItem[];
  trigger?: "click" | "hover";
  direction?: CDFloatButtonDirection;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  "aria-label"?: string;
}
export type FloatButtonProps = CDFloatButtonProps;

export interface CDFloatButtonGroupProps {
  children?: ReactNode;
  actions?: CDFloatActionItem[];
  icon?: ReactNode;
  closeIcon?: ReactNode;
  trigger?: "click" | "hover";
  shape?: CDFloatButtonShape;
  size?: CDFloatButtonSize;
  position?: CDFloatButtonPosition;
  offset?: CDFloatButtonOffset;
  direction?: CDFloatButtonDirection;
  fixed?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}
export type FloatButtonGroupProps = CDFloatButtonGroupProps;
