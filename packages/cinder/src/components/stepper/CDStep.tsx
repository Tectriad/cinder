import { forwardRef, type ReactElement, type ReactNode } from "react";
import { CDCheckIcon, CDAlertCircleIcon } from "../icon";
import { cn } from "../../utils/cn";
import { useStepperContext } from "./StepperContext";
import type { CDStepProps, CDStepStatus } from "./types";

export const CDStep = forwardRef<HTMLDivElement, CDStepProps>(
  (
    {
      stepIndex = 0,
      title,
      description,
      subTitle,
      icon,
      status: explicitStatus,
      disabled = false,
      onClick,
      children,
      className,
      ...restProps
    }: CDStepProps,
    ref
  ): ReactElement => {
    const { current, status: contextStatus, variant, size, onChange } = useStepperContext();

    // Determine status
    let resolvedStatus: CDStepStatus = "wait";
    if (explicitStatus) {
      resolvedStatus = explicitStatus;
    } else if (stepIndex < current) {
      resolvedStatus = "finish";
    } else if (stepIndex === current) {
      resolvedStatus = contextStatus || "process";
    } else {
      resolvedStatus = "wait";
    }

    const isClickable: boolean = Boolean(onChange || onClick) && !disabled;

    const handleClick = (): void => {
      if (!isClickable) return;
      if (onClick) {
        onClick();
      } else if (onChange) {
        onChange(stepIndex);
      }
    };

    const renderIcon = (): ReactNode => {
      if (variant === "dots") {
        return <span className="cinder-step-dot" />;
      }

      if (icon !== undefined) {
        return icon;
      }

      if (resolvedStatus === "finish") {
        return <CDCheckIcon size={size === "sm" ? 12 : size === "lg" ? 16 : 14} />;
      }

      if (resolvedStatus === "error") {
        return <CDAlertCircleIcon size={size === "sm" ? 12 : size === "lg" ? 16 : 14} />;
      }

      return <span className="cinder-step-number">{stepIndex + 1}</span>;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "cinder-step",
          `cinder-step-${resolvedStatus}`,
          isClickable && "cinder-step-clickable",
          disabled && "cinder-step-disabled",
          className
        )}
        onClick={handleClick}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        {...restProps}
      >
        <div className="cinder-step-connector" aria-hidden="true" />

        <div className="cinder-step-header">
          <div className="cinder-step-icon-container">
            {renderIcon()}
          </div>
        </div>

        <div className="cinder-step-content">
          {(title || subTitle) && (
            <div className="cinder-step-title-row">
              {title && <span className="cinder-step-title">{title}</span>}
              {subTitle && <span className="cinder-step-subtitle">{subTitle}</span>}
            </div>
          )}
          {description && <div className="cinder-step-description">{description}</div>}
          {children}
        </div>
      </div>
    );
  }
);

CDStep.displayName = "CDStep";

export const Step = CDStep;
