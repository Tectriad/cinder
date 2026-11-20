import {
  forwardRef,
  type ReactElement,
  type MouseEvent,
  type Ref,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";
import { useSidebarContext } from "./SidebarContext";
import type { CDSidebarItemProps } from "./types";

export const CDSidebarItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, CDSidebarItemProps>(
  (
    {
      active = false,
      disabled = false,
      icon,
      badge,
      rightAccessory,
      href,
      tooltip,
      onClick,
      children,
      className,
      ...restProps
    }: CDSidebarItemProps,
    ref
  ): ReactElement => {
    const { collapsed } = useSidebarContext();

    const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      if (onClick) {
        onClick(event);
      }
    };

    const titleAttr: string | undefined =
      tooltip || (typeof children === "string" ? children : undefined);

    const innerContent: ReactElement = (
      <>
        {icon && <span className="cinder-sidebar-item-icon">{icon}</span>}
        {!collapsed && (
          <>
            <span className="cinder-sidebar-item-label">{children}</span>
            {badge && <span className="cinder-sidebar-item-badge">{badge}</span>}
            {rightAccessory && (
              <span className="cinder-sidebar-item-accessory">{rightAccessory}</span>
            )}
          </>
        )}
      </>
    );

    const classes: string = cn(
      "cinder-sidebar-item",
      active && "cinder-sidebar-item-active",
      disabled && "cinder-sidebar-item-disabled",
      collapsed && "cinder-sidebar-item-collapsed",
      className
    );

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          title={titleAttr}
          aria-current={active ? "page" : undefined}
          aria-disabled={disabled ? "true" : undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={handleClick}
          className={classes}
          {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        title={titleAttr}
        aria-pressed={active}
        onClick={handleClick}
        className={classes}
        {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {innerContent}
      </button>
    );
  }
);

CDSidebarItem.displayName = "CDSidebarItem";

export const SidebarItem = CDSidebarItem;
