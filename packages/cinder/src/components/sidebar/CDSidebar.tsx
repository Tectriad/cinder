import {
  forwardRef,
  useState,
  type ReactElement,
  type CSSProperties,
} from "react";
import {
  CDChevronLeftIcon,
  CDChevronRightIcon,
  CDChevronUpIcon,
  CDChevronDownIcon,
} from "../icon";
import { cn } from "../../utils/cn";
import { SidebarContext } from "./SidebarContext";
import type { CDSidebarProps, CDSidebarPlacement } from "./types";

export const CDSidebar = forwardRef<HTMLElement, CDSidebarProps>(
  (
    {
      placement: placementProp,
      position,
      floating = false,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapse,
      collapsible = true,
      width = 260,
      collapsedWidth = 68,
      height = 64,
      collapsedHeight = 44,
      variant = "default",
      bordered = true,
      children,
      className,
      style,
      ...restProps
    }: CDSidebarProps,
    ref
  ): ReactElement => {
    const placement: CDSidebarPlacement = placementProp || position || "left";
    const isFloating: boolean = floating || variant === "floating";
    const isHorizontal: boolean = placement === "top" || placement === "bottom";

    const [internalCollapsed, setInternalCollapsed] = useState<boolean>(defaultCollapsed);

    const isCollapsed: boolean =
      controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

    const handleSetCollapsed = (nextCollapsed: boolean): void => {
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(nextCollapsed);
      }
      if (onCollapse) {
        onCollapse(nextCollapsed);
      }
    };

    const sidebarStyle: CSSProperties = { ...style };
    if (isHorizontal) {
      const currentHeight: number | string = isCollapsed ? collapsedHeight : height;
      sidebarStyle.height =
        typeof currentHeight === "number" ? `${currentHeight}px` : currentHeight;
      if (!sidebarStyle.width) {
        sidebarStyle.width = "100%";
      }
    } else {
      const currentWidth: number | string = isCollapsed ? collapsedWidth : width;
      sidebarStyle.width =
        typeof currentWidth === "number" ? `${currentWidth}px` : currentWidth;
    }

    const renderCollapseIcon = (): ReactElement => {
      if (placement === "left") {
        return isCollapsed ? (
          <CDChevronRightIcon size={14} />
        ) : (
          <CDChevronLeftIcon size={14} />
        );
      }
      if (placement === "right") {
        return isCollapsed ? (
          <CDChevronLeftIcon size={14} />
        ) : (
          <CDChevronRightIcon size={14} />
        );
      }
      if (placement === "top") {
        return isCollapsed ? (
          <CDChevronDownIcon size={14} />
        ) : (
          <CDChevronUpIcon size={14} />
        );
      }
      // placement === "bottom"
      return isCollapsed ? (
        <CDChevronUpIcon size={14} />
      ) : (
        <CDChevronDownIcon size={14} />
      );
    };

    return (
      <SidebarContext.Provider
        value={{
          collapsed: isCollapsed,
          setCollapsed: handleSetCollapsed,
          collapsible,
          placement,
          floating: isFloating,
        }}
      >
        <aside
          ref={ref}
          style={sidebarStyle}
          className={cn(
            "cinder-sidebar",
            `cinder-sidebar-${placement}`,
            `cinder-sidebar-${isHorizontal ? "horizontal" : "vertical"}`,
            `cinder-sidebar-${variant}`,
            isFloating && "cinder-sidebar-floating",
            isCollapsed && "cinder-sidebar-collapsed",
            bordered && "cinder-sidebar-bordered",
            className
          )}
          {...restProps}
        >
          <div className="cinder-sidebar-inner">
            {children}
          </div>

          {collapsible && (
            <button
              type="button"
              className={cn(
                "cinder-sidebar-collapse-btn",
                `cinder-sidebar-collapse-btn-${placement}`
              )}
              onClick={() => handleSetCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {renderCollapseIcon()}
            </button>
          )}
        </aside>
      </SidebarContext.Provider>
    );
  }
);

CDSidebar.displayName = "CDSidebar";

export const Sidebar = CDSidebar;
