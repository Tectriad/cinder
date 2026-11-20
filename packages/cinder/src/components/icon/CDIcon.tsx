import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDIconProps, CDIconSize } from "./types";

function resolveIconSize(size?: CDIconSize): number | string {
  if (typeof size === "number") return size;
  if (!size) return 20;

  switch (size) {
    case "xs":
      return 14;
    case "sm":
      return 16;
    case "md":
      return 20;
    case "lg":
      return 24;
    case "xl":
      return 32;
    default:
      return size;
  }
}

export const CDIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (
    {
      size = 20,
      color = "currentColor",
      strokeWidth = 1.5,
      className,
      style,
      children,
      viewBox = "0 0 24 24",
      ...rest
    }: CDIconProps,
    ref
  ): ReactElement => {
    const dimension = resolveIconSize(size);

    return (
      <svg
        ref={ref}
        width={dimension}
        height={dimension}
        viewBox={viewBox}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("cinder-icon", className)}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          flexShrink: 0,
          ...style,
        }}
        aria-hidden="true"
        focusable="false"
        {...rest}
      >
        {children}
      </svg>
    );
  }
);

CDIcon.displayName = "CDIcon";

export const Icon = CDIcon;
