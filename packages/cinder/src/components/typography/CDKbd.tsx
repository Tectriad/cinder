import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDKbdProps } from "./types";

export const CDKbd = forwardRef<HTMLElement, CDKbdProps>(
  (
    {
      size = "md",
      children,
      className,
      ...restProps
    }: CDKbdProps,
    ref
  ): ReactElement => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "cinder-typography",
          "cinder-kbd",
          `cinder-kbd-${size}`,
          className
        )}
        {...restProps}
      >
        {children}
      </kbd>
    );
  }
);

CDKbd.displayName = "CDKbd";

export const Kbd = CDKbd;
