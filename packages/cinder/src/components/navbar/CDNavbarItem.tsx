import {
  forwardRef,
  type ReactElement,
  type MouseEvent,
  type Ref,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";
import type { CDNavbarItemProps } from "./types";

export const CDNavbarItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, CDNavbarItemProps>(
  (
    {
      active = false,
      disabled = false,
      href,
      icon,
      badge,
      onClick,
      children,
      className,
      ...restProps
    }: CDNavbarItemProps,
    ref
  ): ReactElement => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      if (onClick) {
        onClick(event);
      }
    };

    const innerContent: ReactElement = (
      <>
        {icon && <span className="cinder-navbar-item-icon">{icon}</span>}
        <span className="cinder-navbar-item-label">{children}</span>
        {badge && <span className="cinder-navbar-item-badge">{badge}</span>}
      </>
    );

    const classes: string = cn(
      "cinder-navbar-item",
      active && "cinder-navbar-item-active",
      disabled && "cinder-navbar-item-disabled",
      className
    );

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
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

CDNavbarItem.displayName = "CDNavbarItem";

export const NavbarItem = CDNavbarItem;
