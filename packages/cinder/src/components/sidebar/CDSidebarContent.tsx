import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDSidebarContentProps } from "./types";

export const CDSidebarContent = forwardRef<HTMLDivElement, CDSidebarContentProps>(
  (
    {
      children,
      className,
      ...restProps
    }: CDSidebarContentProps,
    ref
  ): ReactElement => {
    return (
      <div
        ref={ref}
        className={cn("cinder-sidebar-content", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CDSidebarContent.displayName = "CDSidebarContent";

export const SidebarContent = CDSidebarContent;
