import {
  forwardRef,
  type ElementType,
  type CSSProperties,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDButtonProps,
  CDButtonCustomTheme,
  CDButtonHtmlType,
} from "./types";

function buildCustomThemeStyles(
  customTheme?: CDButtonCustomTheme
): CSSProperties | undefined {
  if (!customTheme) return undefined;
  const customStyles: Record<string, string> = {};
  if (customTheme.bg) customStyles["--custom-btn-bg"] = customTheme.bg;
  if (customTheme.fg) customStyles["--custom-btn-fg"] = customTheme.fg;
  if (customTheme.hoverBg)
    customStyles["--custom-btn-hover-bg"] = customTheme.hoverBg;
  if (customTheme.hoverFg)
    customStyles["--custom-btn-hover-fg"] = customTheme.hoverFg;
  if (customTheme.border)
    customStyles["--custom-btn-border"] = customTheme.border;
  if (customTheme.hoverBorder)
    customStyles["--custom-btn-hover-border"] = customTheme.hoverBorder;
  if (customTheme.focusRing)
    customStyles["--custom-btn-focus-ring"] = customTheme.focusRing;
  if (customTheme.shadow)
    customStyles["--custom-btn-shadow"] = customTheme.shadow;
  if (customTheme.hoverShadow)
    customStyles["--custom-btn-hover-shadow"] = customTheme.hoverShadow;
  if (customTheme.radius)
    customStyles["--custom-btn-radius"] = customTheme.radius;
  return customStyles as CSSProperties;
}

const LoadingSpinner = (): ReactElement => (
  <svg
    className="cinder-spinner"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4"
      opacity="0.25"
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

function CDButtonRender<C extends ElementType = "button">(
  {
    as,
    variant = "primary",
    size = "md",
    shape = "default",
    isRound = false,
    radius,
    shadow,
    hoverShadow,
    htmlType,
    type,
    isSubmit = false,
    isLoading = false,
    prefix,
    suffix,
    leftIcon,
    rightIcon,
    prefixIcon,
    suffixIcon,
    fullWidth = false,
    customTheme,
    disabled = false,
    className,
    style,
    children,
    ...rest
  }: CDButtonProps<C>,
  ref: any
): ReactElement {
  const Component: ElementType = as || "button";
  const isActuallyDisabled: boolean = Boolean(disabled || isLoading);

  // Resolve HTML button submission type
  const resolvedType: CDButtonHtmlType = isSubmit
    ? "submit"
    : htmlType || type || "button";

  // Resolve shape & rounding
  const isRoundButton: boolean = Boolean(isRound || shape === "round");
  const isCircleButton: boolean = Boolean(shape === "circle");

  // Resolve controlled border radius
  let radiusClass: string | undefined = undefined;
  let inlineRadius: string | undefined = undefined;
  if (radius !== undefined) {
    if (
      typeof radius === "string" &&
      ["none", "xs", "sm", "md", "lg", "full"].includes(radius)
    ) {
      radiusClass = `cinder-btn-radius-${radius}`;
    } else if (typeof radius === "number") {
      inlineRadius = `${radius}px`;
    } else {
      inlineRadius = radius;
    }
  }

  // Resolve controlled normal shadow
  let shadowClass: string | undefined = undefined;
  if (shadow !== undefined) {
    if (
      typeof shadow === "string" &&
      ["none", "sm", "md", "lg"].includes(shadow)
    ) {
      shadowClass = `cinder-btn-shadow-${shadow}`;
    } else if (shadow === true) {
      shadowClass = "cinder-btn-shadow-sm";
    } else if (shadow === false) {
      shadowClass = "cinder-btn-shadow-none";
    }
  }

  // Resolve controlled on-hover shadow & elevation
  let hoverShadowClass: string | undefined = undefined;
  if (hoverShadow !== undefined) {
    if (
      typeof hoverShadow === "string" &&
      ["none", "sm", "md", "lg"].includes(hoverShadow)
    ) {
      hoverShadowClass = `cinder-btn-hover-shadow-${hoverShadow}`;
    } else if (hoverShadow === true) {
      hoverShadowClass = "cinder-btn-hover-shadow-md";
    } else if (hoverShadow === false) {
      hoverShadowClass = "cinder-btn-hover-shadow-none";
    }
  }

  // Resolve aliases: outline -> tertiary, accent -> secondary
  const resolvedVariant: string =
    variant === "outline"
      ? "tertiary"
      : variant === "accent"
      ? "secondary"
      : variant;

  const prefixSlot = prefix || leftIcon || prefixIcon;
  const suffixSlot = suffix || rightIcon || suffixIcon;

  const customStyles: CSSProperties | undefined =
    buildCustomThemeStyles(customTheme);
  const mergedStyle: CSSProperties | undefined = {
    ...(inlineRadius ? { borderRadius: inlineRadius } : {}),
    ...customStyles,
    ...style,
  };

  return (
    <Component
      ref={ref}
      type={Component === "button" ? resolvedType : undefined}
      disabled={Component === "button" ? isActuallyDisabled : undefined}
      aria-disabled={isActuallyDisabled ? true : undefined}
      aria-busy={isLoading ? true : undefined}
      className={cn(
        "cinder-btn",
        `cinder-btn-${resolvedVariant}`,
        `cinder-btn-${size}`,
        isRoundButton && "cinder-btn-round",
        isCircleButton && "cinder-btn-circle",
        radiusClass,
        shadowClass,
        hoverShadowClass,
        fullWidth && "cinder-btn-full",
        isLoading && "cinder-btn-loading",
        isActuallyDisabled && "cinder-btn-disabled",
        customTheme && "cinder-btn-custom-theme",
        className
      )}
      style={
        mergedStyle && Object.keys(mergedStyle).length > 0
          ? mergedStyle
          : undefined
      }
      {...rest}
    >
      {isLoading && (
        <span className="cinder-btn-spinner" aria-hidden="true">
          <LoadingSpinner />
        </span>
      )}

      {!isLoading && prefixSlot && (
        <span className="cinder-btn-prefix" aria-hidden="true">
          {prefixSlot}
        </span>
      )}

      {children && <span className="cinder-btn-label">{children}</span>}

      {!isLoading && suffixSlot && (
        <span className="cinder-btn-suffix" aria-hidden="true">
          {suffixSlot}
        </span>
      )}
    </Component>
  );
}

export const CDButton = forwardRef(CDButtonRender) as <
  C extends ElementType = "button"
>(
  props: CDButtonProps<C> & { ref?: any }
) => ReactElement;

export const Button = CDButton;
