import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDSidebarFooterProps } from "./types";

export const CDSidebarFooter = forwardRef<HTMLDivElement, CDSidebarFooterProps>(
  (
    {
      children,
      className,
      ...restProps
    }: CDSidebarFooterProps,
    ref
  ): ReactElement => {
    return (
      <div
        ref={ref}
        className={cn("cinder-sidebar-footer", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CDSidebarFooter.displayName = "CDSidebarFooter";

export const SidebarFooter = CDSidebarFooter;
