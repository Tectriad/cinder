import { forwardRef, type ReactElement, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import type { CDBadgeProps, CDBadgeStatus } from "./types";

function getStatusColor(status: CDBadgeStatus): string {
  switch (status) {
    case "success":
      return "cinder-badge-status-success";
    case "processing":
      return "cinder-badge-status-processing";
    case "error":
      return "cinder-badge-status-error";
    case "warning":
      return "cinder-badge-status-warning";
    case "default":
    default:
      return "cinder-badge-status-default";
  }
}

/**
 * CDBadge
 *
 * Visual indicator providing status pills, numerical notification tags,
 * and overlaid badges on icons or buttons.
 */
export const CDBadge = forwardRef<HTMLSpanElement, CDBadgeProps>(
  (
    {
      count,
      overflowCount = 99,
      showZero = false,
      dot = false,
      pulse = false,
      status,
      text,
      variant = "default",
      size = "md",
      shape = "round",
      color,
      children,
      className,
      style,
      ...rest
    }: CDBadgeProps,
    ref,
  ): ReactElement => {
    // Standalone Status Dot Mode: <Badge status="success" text="Online" />
    if (status) {
      const statusClass: string = getStatusColor(status);
      const isProcessing: boolean = status === "processing" || pulse;

      return (
        <span
          ref={ref}
          className={cn("cinder-badge-status-wrapper", className)}
          style={style}
          {...rest}
        >
          <span
            className={cn(
              "cinder-badge-status-dot",
              statusClass,
              isProcessing && "cinder-badge-dot-pulse",
            )}
            style={color ? { backgroundColor: color } : undefined}
            aria-hidden="true"
          />
          {text && <span className="cinder-badge-status-text">{text}</span>}
        </span>
      );
    }

    // Determine count display value
    let displayCount: ReactNode = count;
    let isHidden = false;

    if (typeof count === "number") {
      if (count === 0 && !showZero) {
        isHidden = true;
      } else if (count > overflowCount) {
        displayCount = `${overflowCount}+`;
      }
    }

    // Overlaid Anchor Mode: <Badge count={5}><Button>Inbox</Button></Badge>
    if (children && (count !== undefined || dot)) {
      return (
        <span
          ref={ref}
          className={cn("cinder-badge-anchor-wrapper", className)}
          style={style}
          {...rest}
        >
          {children}
          {!isHidden && (
            <span
              className={cn(
                "cinder-badge",
                "cinder-badge-anchor",
                `cinder-badge-${variant}`,
                `cinder-badge-${size}`,
                `cinder-badge-shape-${shape}`,
                dot && "cinder-badge-dot-only",
                pulse && "cinder-badge-dot-pulse",
              )}
              style={color ? { backgroundColor: color } : undefined}
            >
              {dot ? null : displayCount}
            </span>
          )}
        </span>
      );
    }

    // Standalone Pill Badge Mode: <Badge variant="primary">New</Badge>
    const variantClass: string = {
      default: "cinder-badge-default",
      primary: "cinder-badge-primary",
      accent: "cinder-badge-accent",
      success: "cinder-badge-success",
      warning: "cinder-badge-warning",
      danger: "cinder-badge-danger",
    }[variant] ?? "cinder-badge-default";

    const sizeClass: string = {
      sm: "cinder-badge-sm",
      md: "cinder-badge-md",
      lg: "cinder-badge-lg",
    }[size] ?? "cinder-badge-md";

    return (
      <span
        ref={ref}
        className={cn(
          "cinder-badge",
          variantClass,
          sizeClass,
          `cinder-badge-shape-${shape}`,
          className,
        )}
        style={color ? { ...style, backgroundColor: color } : style}
        {...rest}
      >
        {dot && (
          <span
            className={cn(
              "cinder-badge-dot",
              pulse && "cinder-badge-dot-pulse",
            )}
            aria-hidden="true"
          />
        )}
        {displayCount !== undefined ? (
          <span>{displayCount}</span>
        ) : (
          <span>{children}</span>
        )}
      </span>
    );
  },
);

CDBadge.displayName = "CDBadge";

// Backward-compatible alias
export const Badge = CDBadge;
