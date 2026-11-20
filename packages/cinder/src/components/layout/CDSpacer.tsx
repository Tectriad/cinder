import {
  forwardRef,
  type ReactElement,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import type { CDSpacerProps, CDSpacingValue } from "./types";

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

export const CDSpacer = forwardRef<HTMLDivElement, CDSpacerProps>(
  (
    { x, y, size, flex = 1, className, style, ...restProps }: CDSpacerProps,
    ref
  ): ReactElement => {
    const isFlexAuto: boolean = flex === true || (flex !== false && !x && !y && !size);
    const resolvedFlex: string | number | undefined = isFlexAuto
      ? "1 1 auto"
      : typeof flex === "number" || typeof flex === "string"
      ? flex
      : undefined;

    const width: string | undefined = resolveSpacing(x ?? size);
    const height: string | undefined = resolveSpacing(y ?? size);

    const inlineStyles: CSSProperties = {
      ...(resolvedFlex ? { flex: resolvedFlex } : {}),
      ...(width ? { width, minWidth: width } : {}),
      ...(height ? { height, minHeight: height } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={inlineStyles}
        className={cn("cinder-spacer", className)}
        {...restProps}
      />
    );
  }
);

CDSpacer.displayName = "CDSpacer";

export const Spacer = CDSpacer;
