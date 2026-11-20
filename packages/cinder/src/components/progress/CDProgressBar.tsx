import {
  forwardRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { CDCheckCircleIcon, CDAlertCircleIcon } from "../icon";
import type { CDProgressBarProps, CDProgressStatus } from "./types";

function getStatusIcon(status: CDProgressStatus): ReactNode | null {
  if (status === "success") {
    return <CDCheckCircleIcon size={14} className="cinder-progress-info-icon" />;
  }
  if (status === "danger") {
    return <CDAlertCircleIcon size={14} className="cinder-progress-info-icon" />;
  }
  return null;
}

/**
 * CDProgressBar
 *
 * Progress indicator visualizing the completion state of a task or process.
 */
export const CDProgressBar = forwardRef<HTMLDivElement, CDProgressBarProps>(
  (
    {
      value = 0,
      buffer,
      status: statusProp = "normal",
      size = "md",
      indeterminate = false,
      showInfo = true,
      format,
      color,
      trackColor,
      className,
      style,
    }: CDProgressBarProps,
    ref,
  ): ReactElement => {
    const clampedValue: number = Math.min(100, Math.max(0, value));
    const effectiveStatus: CDProgressStatus =
      statusProp === "normal" && clampedValue >= 100 ? "success" : statusProp;

    const clampedBuffer: number | null =
      buffer !== undefined ? Math.min(100, Math.max(0, buffer)) : null;

    // Render label info
    const renderInfo = (): ReactNode => {
      if (!showInfo || indeterminate) {
        return null;
      }

      if (format) {
        return <span className="cinder-progress-text">{format(clampedValue)}</span>;
      }

      const statusIcon = getStatusIcon(effectiveStatus);
      if (statusIcon) {
        return <span className="cinder-progress-text">{statusIcon}</span>;
      }

      return <span className="cinder-progress-text">{clampedValue}%</span>;
    };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "cinder-progress",
          `cinder-progress-status-${effectiveStatus}`,
          `cinder-progress-size-${size}`,
          indeterminate && "cinder-progress-indeterminate",
          className,
        )}
        style={style}
      >
        <div
          className="cinder-progress-track"
          style={trackColor ? { backgroundColor: trackColor } : undefined}
        >
          {clampedBuffer !== null && (
            <div
              className="cinder-progress-buffer"
              style={{ width: `${clampedBuffer}%` }}
            />
          )}
          <div
            className={cn(
              "cinder-progress-fill",
              effectiveStatus === "active" && "cinder-progress-fill-active",
            )}
            style={{
              width: indeterminate ? "100%" : `${clampedValue}%`,
              backgroundColor: color,
            }}
          />
        </div>

        {renderInfo()}
      </div>
    );
  },
);

CDProgressBar.displayName = "CDProgressBar";

// Backward-compatible aliases
export const ProgressBar = CDProgressBar;
export const CDProgress = CDProgressBar;
export const Progress = CDProgressBar;
