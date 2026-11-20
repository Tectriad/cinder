import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { useSidebarContext } from "./SidebarContext";
import type { CDSidebarGroupProps } from "./types";

export const CDSidebarGroup = forwardRef<HTMLDivElement, CDSidebarGroupProps>(
  (
    {
      title,
      action,
      children,
      className,
      ...restProps
    }: CDSidebarGroupProps,
    ref
  ): ReactElement => {
    const { collapsed } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(
          "cinder-sidebar-group",
          collapsed && "cinder-sidebar-group-collapsed",
          className
        )}
        {...restProps}
      >
        {title && !collapsed && (
          <div className="cinder-sidebar-group-header">
            <span className="cinder-sidebar-group-title">{title}</span>
            {action && <div className="cinder-sidebar-group-action">{action}</div>}
          </div>
        )}
        {collapsed && <div className="cinder-sidebar-group-divider" />}
        <div className="cinder-sidebar-group-items">{children}</div>
      </div>
    );
  }
);

CDSidebarGroup.displayName = "CDSidebarGroup";

export const SidebarGroup = CDSidebarGroup;
