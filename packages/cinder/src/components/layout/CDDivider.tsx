import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDDividerProps } from "./types";

export const CDDivider = forwardRef<HTMLDivElement, CDDividerProps>(
  (
    {
      orientation = "horizontal",
      textPlacement = "center",
      variant = "solid",
      plain = false,
      children,
      className,
      style,
      ...restProps
    }: CDDividerProps,
    ref
  ): ReactElement => {
    const hasChildren: boolean = Boolean(children) && orientation === "horizontal";

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        style={style}
        className={cn(
          "cinder-divider",
          `cinder-divider-${orientation}`,
          `cinder-divider-${variant}`,
          hasChildren && `cinder-divider-with-text`,
          hasChildren && `cinder-divider-text-${textPlacement}`,
          plain && "cinder-divider-plain",
          className
        )}
        {...restProps}
      >
        {hasChildren && (
          <span className="cinder-divider-inner-text">{children}</span>
        )}
      </div>
    );
  }
);

CDDivider.displayName = "CDDivider";

export const Divider = CDDivider;
