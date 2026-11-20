import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDSidebarHeaderProps } from "./types";

export const CDSidebarHeader = forwardRef<HTMLDivElement, CDSidebarHeaderProps>(
  (
    {
      children,
      className,
      ...restProps
    }: CDSidebarHeaderProps,
    ref
  ): ReactElement => {
    return (
      <div
        ref={ref}
        className={cn("cinder-sidebar-header", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CDSidebarHeader.displayName = "CDSidebarHeader";

export const SidebarHeader = CDSidebarHeader;
