import {
  forwardRef,
  type ReactElement,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import type { CDBoxProps, CDSpacingValue } from "./types";

function resolveSpacing(val?: CDSpacingValue): string | undefined {
  if (val === undefined) return undefined;
  if (typeof val === "number") {
    return `${val * 4}px`;
  }
  const scaleMap: Record<string, string> = {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  };
  return scaleMap[val] || String(val);
}

export const CDBox = forwardRef<HTMLElement, CDBoxProps>(
  (
    {
      as: Component = "div",
      p,
      px,
      py,
      m,
      mx,
      my,
      bg,
      border,
      rounded,
      shadow,
      display,
      width,
      height,
      children,
      className,
      style,
      ...restProps
    }: CDBoxProps,
    ref
  ): ReactElement => {
    const inlineStyles: CSSProperties = {
      ...(p !== undefined ? { padding: resolveSpacing(p) } : {}),
      ...(px !== undefined
        ? {
            paddingLeft: resolveSpacing(px),
            paddingRight: resolveSpacing(px),
          }
        : {}),
      ...(py !== undefined
        ? {
            paddingTop: resolveSpacing(py),
            paddingBottom: resolveSpacing(py),
          }
        : {}),
      ...(m !== undefined ? { margin: resolveSpacing(m) } : {}),
      ...(mx !== undefined
        ? {
            marginLeft: resolveSpacing(mx),
            marginRight: resolveSpacing(mx),
          }
        : {}),
      ...(my !== undefined
        ? {
            marginTop: resolveSpacing(my),
            marginBottom: resolveSpacing(my),
          }
        : {}),
      ...(display ? { display } : {}),
      ...(width !== undefined ? { width } : {}),
      ...(height !== undefined ? { height } : {}),
      ...style,
    };

    const isNamedBg: boolean =
      Boolean(bg) &&
      ["canvas", "surface", "card", "glass", "transparent"].includes(bg as string);

    if (bg && !isNamedBg) {
      inlineStyles.backgroundColor = bg;
    }

    if (border && typeof border === "string") {
      inlineStyles.border = border;
    }

    return (
      <Component
        ref={ref}
        style={inlineStyles}
        className={cn(
          "cinder-box",
          isNamedBg && `cinder-box-bg-${bg}`,
          border === true && "cinder-box-border",
          rounded && `cinder-box-rounded-${rounded}`,
          shadow && `cinder-box-shadow-${shadow}`,
          className
        )}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

CDBox.displayName = "CDBox";

export const Box = CDBox;
