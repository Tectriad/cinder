import {
  forwardRef,
  useState,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
} from "react";
import { cn } from "../../utils/cn";
import {
  CDInfoIcon,
  CDCheckCircleIcon,
  CDAlertCircleIcon,
  CDCloseIcon,
} from "../icon";
import type { CDAlertProps, CDAlertType } from "./types";

function getDefaultIcon(type: CDAlertType): ReactNode {
  switch (type) {
    case "success":
      return <CDCheckCircleIcon size={18} className="cinder-alert-icon" />;
    case "warning":
    case "danger":
      return <CDAlertCircleIcon size={18} className="cinder-alert-icon" />;
    case "info":
    case "neutral":
    default:
      return <CDInfoIcon size={18} className="cinder-alert-icon" />;
  }
}

/**
 * CDAlert
 *
 * Feedback notification component providing contextual feedback messages
 * for typical user actions and system events.
 */
export const CDAlert = forwardRef<HTMLDivElement, CDAlertProps>(
  (
    {
      type = "info",
      variant: variantProp = "subtle",
      title,
      description,
      children,
      icon,
      showIcon = true,
      closable = false,
      onClose,
      action,
      banner = false,
      className,
      style,
    }: CDAlertProps,
    ref,
  ): ReactElement | null => {
    const [closed, setClosed] = useState<boolean>(false);

    if (closed) {
      return null;
    }

    const effectiveVariant = banner ? "banner" : variantProp;
    const bodyContent = description ?? children;
    const hasHeader: boolean = title !== undefined && title !== null;

    const handleClose = (e: MouseEvent<HTMLButtonElement>): void => {
      setClosed(true);
      onClose?.(e);
    };

    // Resolve leading icon
    let renderedIcon: ReactNode = null;
    if (showIcon && icon !== false) {
      if (icon !== undefined && typeof icon !== "boolean") {
        renderedIcon = <span className="cinder-alert-icon-wrapper">{icon}</span>;
      } else {
        renderedIcon = (
          <span className="cinder-alert-icon-wrapper">{getDefaultIcon(type)}</span>
        );
      }
    }

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          "cinder-alert",
          `cinder-alert-type-${type}`,
          `cinder-alert-variant-${effectiveVariant}`,
          hasHeader && "cinder-alert-has-title",
          banner && "cinder-alert-banner",
          className,
        )}
        style={style}
      >
        {renderedIcon}

        <div className="cinder-alert-body">
          {hasHeader && <div className="cinder-alert-title">{title}</div>}
          {bodyContent && (
            <div className="cinder-alert-description">{bodyContent}</div>
          )}
        </div>

        {action && <div className="cinder-alert-action">{action}</div>}

        {closable && (
          <button
            type="button"
            className="cinder-alert-close-btn"
            onClick={handleClose}
            aria-label="Dismiss alert"
          >
            <CDCloseIcon size={14} />
          </button>
        )}
      </div>
    );
  },
);

CDAlert.displayName = "CDAlert";

// Backward-compatible aliases
export const Alert = CDAlert;
export const CDBanner = CDAlert;
export const Banner = CDAlert;
