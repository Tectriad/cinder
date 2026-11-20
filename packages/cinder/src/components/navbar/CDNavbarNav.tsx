import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDNavbarNavProps } from "./types";

export const CDNavbarNav = forwardRef<HTMLElement, CDNavbarNavProps>(
  (
    {
      align = "left",
      children,
      className,
      ...restProps
    }: CDNavbarNavProps,
    ref
  ): ReactElement => {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Main Navigation"
        className={cn(
          "cinder-navbar-nav",
          `cinder-navbar-nav-${align}`,
          className
        )}
        {...restProps}
      >
        {children}
      </nav>
    );
  }
);

CDNavbarNav.displayName = "CDNavbarNav";

export const NavbarNav = CDNavbarNav;
