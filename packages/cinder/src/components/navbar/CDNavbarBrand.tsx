import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDNavbarBrandProps } from "./types";

export const CDNavbarBrand = forwardRef<HTMLDivElement, CDNavbarBrandProps>(
  (
    {
      logo,
      title,
      subtitle,
      href,
      onClick,
      children,
      className,
      ...restProps
    }: CDNavbarBrandProps,
    ref
  ): ReactElement => {
    const content: ReactElement = (
      <>
        {logo && <span className="cinder-navbar-brand-logo">{logo}</span>}
        {(title || subtitle) && (
          <div className="cinder-navbar-brand-text">
            {title && <span className="cinder-navbar-brand-title">{title}</span>}
            {subtitle && <span className="cinder-navbar-brand-subtitle">{subtitle}</span>}
          </div>
        )}
        {children}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={cn("cinder-navbar-brand", "cinder-navbar-brand-link", className)}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn("cinder-navbar-brand", className)}
        {...restProps}
      >
        {content}
      </div>
    );
  }
);

CDNavbarBrand.displayName = "CDNavbarBrand";

export const NavbarBrand = CDNavbarBrand;
