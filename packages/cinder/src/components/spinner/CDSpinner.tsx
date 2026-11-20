import {
  forwardRef,
  useState,
  useEffect,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import type { CDSpinnerProps, CDSpinnerSize } from "./types";

function getDimension(size: CDSpinnerSize): number {
  switch (size) {
    case "xs":
      return 14;
    case "sm":
      return 18;
    case "lg":
      return 32;
    case "xl":
      return 44;
    case "md":
    default:
      return 24;
  }
}

/**
 * CDSpinner / Loader
 *
 * Visual loading indicator for asynchronous operations, background processing,
 * or content blur overlays.
 */
export const CDSpinner = forwardRef<HTMLDivElement, CDSpinnerProps>(
  (
    {
      size = "md",
      variant = "spin",
      tip,
      spinning = true,
      color,
      delay,
      children,
      className,
      style,
    }: CDSpinnerProps,
    ref,
  ): ReactElement => {
    const [shouldSpin, setShouldSpin] = useState<boolean>(
      delay ? false : Boolean(spinning),
    );

    useEffect(() => {
      if (!delay) {
        setShouldSpin(Boolean(spinning));
        return;
      }

      if (spinning) {
        const timer = setTimeout(() => {
          setShouldSpin(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setShouldSpin(false);
      }
    }, [spinning, delay]);

    const dimension: number = getDimension(size);
    const strokeWidth: number = size === "xs" || size === "sm" ? 2.5 : 3;

    // Render Indicator
    const renderIndicator = (): ReactElement => {
      if (variant === "dots") {
        return (
          <div className="cinder-spinner-dots" aria-hidden="true">
            <span className="cinder-spinner-dot" />
            <span className="cinder-spinner-dot" />
            <span className="cinder-spinner-dot" />
          </div>
        );
      }

      return (
        <svg
          className="cinder-spinner-svg"
          viewBox="0 0 24 24"
          width={dimension}
          height={dimension}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={color ? { color } : undefined}
        >
          <circle
            className="cinder-spinner-track"
            cx="12"
            cy="12"
            r="9.5"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            opacity="0.18"
          />
          <circle
            className="cinder-spinner-head"
            cx="12"
            cy="12"
            r="9.5"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray="40 60"
            strokeLinecap="round"
          />
        </svg>
      );
    };

    // If wrapping children, render content container with blur overlay
    if (children) {
      return (
        <div
          ref={ref}
          className={cn("cinder-spinner-nested-container", className)}
          style={style}
        >
          {shouldSpin && (
            <div
              role="status"
              aria-live="polite"
              className={cn(
                "cinder-spinner-mask",
                `cinder-spinner-size-${size}`,
              )}
            >
              {renderIndicator()}
              {tip && <div className="cinder-spinner-tip">{tip}</div>}
            </div>
          )}
          <div
            className={cn(
              "cinder-spinner-nested-content",
              shouldSpin && "cinder-spinner-nested-content-blur",
            )}
          >
            {children}
          </div>
        </div>
      );
    }

    if (!shouldSpin) {
      return <div ref={ref} />;
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "cinder-spinner",
          `cinder-spinner-size-${size}`,
          `cinder-spinner-variant-${variant}`,
          className,
        )}
        style={style}
      >
        {renderIndicator()}
        {tip && <div className="cinder-spinner-tip">{tip}</div>}
      </div>
    );
  },
);

CDSpinner.displayName = "CDSpinner";

// Backward-compatible aliases
export const Spinner = CDSpinner;
export const CDLoader = CDSpinner;
export const Loader = CDSpinner;
