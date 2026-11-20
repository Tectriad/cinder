import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDBreadcrumbItemProps } from "./types";

export const CDBreadcrumbItem = forwardRef<HTMLLIElement, CDBreadcrumbItemProps>(
  (
    {
      href,
      active = false,
      icon,
      separator,
      onClick,
      children,
      className,
      ...restProps
    }: CDBreadcrumbItemProps,
    ref
  ): ReactElement => {
    return (
      <li
        ref={ref}
        className={cn(
          "cinder-breadcrumb-item",
          active && "cinder-breadcrumb-item-active",
          className
        )}
        {...restProps}
      >
        {href && !active ? (
          <a
            href={href}
            onClick={onClick}
            className="cinder-breadcrumb-link"
          >
            {icon && <span className="cinder-breadcrumb-icon">{icon}</span>}
            <span className="cinder-breadcrumb-text">{children}</span>
          </a>
        ) : (
          <span
            aria-current={active ? "page" : undefined}
            onClick={onClick}
            className="cinder-breadcrumb-current"
          >
            {icon && <span className="cinder-breadcrumb-icon">{icon}</span>}
            <span className="cinder-breadcrumb-text">{children}</span>
          </span>
        )}

        {separator !== null && separator !== undefined && (
          <span className="cinder-breadcrumb-separator" aria-hidden="true">
            {separator}
          </span>
        )}
      </li>
    );
  }
);

CDBreadcrumbItem.displayName = "CDBreadcrumbItem";

export const BreadcrumbItem = CDBreadcrumbItem;
