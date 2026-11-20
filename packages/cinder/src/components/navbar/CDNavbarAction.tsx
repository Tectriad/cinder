import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDNavbarActionProps } from "./types";

export const CDNavbarAction = forwardRef<HTMLDivElement, CDNavbarActionProps>(
  (
    {
      children,
      className,
      ...restProps
    }: CDNavbarActionProps,
    ref
  ): ReactElement => {
    return (
      <div
        ref={ref}
        className={cn("cinder-navbar-action", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CDNavbarAction.displayName = "CDNavbarAction";

export const NavbarAction = CDNavbarAction;
