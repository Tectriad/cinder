import { forwardRef, type ReactElement, type CSSProperties } from "react";
import { CDMenuIcon, CDCloseIcon } from "../icon";
import { cn } from "../../utils/cn";
import type { CDNavbarProps } from "./types";

export const CDNavbar = forwardRef<HTMLElement, CDNavbarProps>(
  (
    {
      position = "sticky",
      variant = "default",
      bordered = true,
      height = 64,
      mobileMenuOpen,
      onMobileMenuToggle,
      children,
      className,
      style,
      ...restProps
    }: CDNavbarProps,
    ref
  ): ReactElement => {
    const handleToggle = (): void => {
      if (onMobileMenuToggle) {
        onMobileMenuToggle(!mobileMenuOpen);
      }
    };

    const headerStyle: CSSProperties = {
      height: typeof height === "number" ? `${height}px` : height,
      ...style,
    };

    return (
      <header
        ref={ref}
        style={headerStyle}
        className={cn(
          "cinder-navbar",
          `cinder-navbar-${position}`,
          `cinder-navbar-${variant}`,
          bordered && "cinder-navbar-bordered",
          className
        )}
        {...restProps}
      >
        <div className="cinder-navbar-container">
          {children}

          {onMobileMenuToggle && (
            <button
              type="button"
              className="cinder-navbar-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              onClick={handleToggle}
            >
              {mobileMenuOpen ? <CDCloseIcon size={20} /> : <CDMenuIcon size={20} />}
            </button>
          )}
        </div>
      </header>
    );
  }
);

CDNavbar.displayName = "CDNavbar";

export const Navbar = CDNavbar;
export const CDHeader = CDNavbar;
export const Header = CDNavbar;
