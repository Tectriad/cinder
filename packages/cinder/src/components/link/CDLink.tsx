import { forwardRef, type ReactElement, type ReactNode, type MouseEvent } from "react";
import { CDExternalLinkIcon } from "../icon";
import { cn } from "../../utils/cn";
import type { CDLinkProps } from "./types";

export const CDLink = forwardRef<HTMLAnchorElement, CDLinkProps>(
  (
    {
      variant = "primary",
      underline = "hover",
      size = "md",
      disabled = false,
      external = false,
      prefixIcon,
      suffixIcon,
      children,
      className,
      href,
      target,
      rel,
      onClick,
      ...restProps
    }: CDLinkProps,
    ref
  ): ReactElement => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (onClick) {
        onClick(event);
      }
    };

    const resolvedTarget: string | undefined = external ? target || "_blank" : target;
    const resolvedRel: string | undefined = external
      ? rel || "noopener noreferrer"
      : rel;

    const resolvedSuffix: ReactNode =
      suffixIcon !== undefined ? (
        suffixIcon
      ) : external ? (
        <CDExternalLinkIcon size={size === "sm" ? 12 : size === "lg" ? 16 : 14} />
      ) : null;

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={resolvedTarget}
        rel={resolvedRel}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleClick}
        className={cn(
          "cinder-link",
          `cinder-link-${variant}`,
          `cinder-link-underline-${underline}`,
          `cinder-link-${size}`,
          disabled && "cinder-link-disabled",
          className
        )}
        {...restProps}
      >
        {prefixIcon && <span className="cinder-link-icon-prefix">{prefixIcon}</span>}
        <span className="cinder-link-content">{children}</span>
        {resolvedSuffix && <span className="cinder-link-icon-suffix">{resolvedSuffix}</span>}
      </a>
    );
  }
);

CDLink.displayName = "CDLink";

export const Link = CDLink;
