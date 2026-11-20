import {
  useState,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import {
  CDInfoIcon,
  CDCheckCircleIcon,
  CDAlertCircleIcon,
  CDCloseIcon,
} from "../icon";
import type { CDToastProps, CDToastType } from "./types";

function getDefaultToastIcon(type: CDToastType): ReactNode {
  switch (type) {
    case "success":
      return <CDCheckCircleIcon size={18} className="cinder-toast-status-icon" />;
    case "warning":
    case "error":
      return <CDAlertCircleIcon size={18} className="cinder-toast-status-icon" />;
    case "info":
    case "neutral":
    default:
      return <CDInfoIcon size={18} className="cinder-toast-status-icon" />;
  }
}

export function CDToast({ item, onDismiss }: CDToastProps): ReactElement {
  const {
    id,
    title,
    description,
    type = "neutral",
    duration = 4000,
    closable = true,
    action,
    icon,
    placement = "top-right",
    animation = "slide",
    showProgress = true,
    pauseOnHover = true,
    backgroundColor,
    textColor,
    borderColor,
    borderRadius,
    className,
    style,
  } = item;

  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const remainingRef = useRef<number>(duration);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startDismissTimer = (ms: number): void => {
    if (ms <= 0) return;
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      triggerExit();
    }, ms);
  };

  const clearDismissTimer = (): void => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const triggerExit = (): void => {
    clearDismissTimer();
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(id);
    }, 220); // Exit animation duration
  };

  useEffect(() => {
    if (duration > 0) {
      startDismissTimer(duration);
    }
    return () => clearDismissTimer();
  }, [id, duration]);

  const handleMouseEnter = (): void => {
    if (!pauseOnHover || duration <= 0) return;
    setIsPaused(true);
    clearDismissTimer();
    const elapsed: number = Date.now() - startTimeRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
  };

  const handleMouseLeave = (): void => {
    if (!pauseOnHover || duration <= 0 || isExiting) return;
    setIsPaused(false);
    startDismissTimer(remainingRef.current);
  };

  const handleClose = (_e?: MouseEvent<HTMLButtonElement>): void => {
    triggerExit();
  };

  // Determine icon
  let renderedIcon: ReactNode = null;
  if (icon !== false) {
    if (icon !== undefined && typeof icon !== "boolean") {
      renderedIcon = <span className="cinder-toast-icon-wrapper">{icon}</span>;
    } else {
      renderedIcon = (
        <span className="cinder-toast-icon-wrapper">{getDefaultToastIcon(type)}</span>
      );
    }
  }

  const isBottom: boolean = placement.startsWith("bottom");

  const customStyle: CSSProperties = {
    ...style,
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(textColor ? { color: textColor } : {}),
    ...(borderColor ? { borderColor } : {}),
    ...(borderRadius !== undefined
      ? { borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius }
      : {}),
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "cinder-toast",
        `cinder-toast-type-${type}`,
        `cinder-toast-anim-${animation}`,
        `cinder-toast-pos-${isBottom ? "bottom" : "top"}`,
        title && "cinder-toast-has-title",
        isExiting && "cinder-toast-exiting",
        isPaused && "cinder-toast-paused",
        className,
      )}
      style={customStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderedIcon}

      <div className="cinder-toast-body">
        {title && <div className="cinder-toast-title">{title}</div>}
        {description && (
          <div className="cinder-toast-description">{description}</div>
        )}
      </div>

      {action && <div className="cinder-toast-action">{action}</div>}

      {closable && (
        <button
          type="button"
          className="cinder-toast-close-btn"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <CDCloseIcon size={14} />
        </button>
      )}

      {showProgress && duration > 0 && (
        <div className="cinder-toast-progress-track">
          <div
            className="cinder-toast-progress-bar"
            style={{
              animationDuration: `${duration}ms`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          />
        </div>
      )}
    </div>
  );
}

CDToast.displayName = "CDToast";

// Backward-compatible alias
export const Toast = CDToast;
export const CDSnackbar = CDToast;
export const Snackbar = CDToast;
