import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDInputProps } from "./types";

export const CDInput = forwardRef<HTMLInputElement, CDInputProps>(
  (
    {
      size = "md",
      leftElement,
      rightElement,
      prefix,
      suffix,
      prefixIcon,
      suffixIcon,
      error = false,
      label,
      helperText,
      className,
      disabled = false,
      id,
      ...rest
    }: CDInputProps,
    ref
  ): ReactElement => {
    const inputId: string | undefined =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const sizeClass: string = {
      sm: "cinder-input-sm",
      md: "cinder-input-md",
      lg: "cinder-input-lg",
    }[size];

    const leftSlot = leftElement ?? prefixIcon ?? prefix;
    const rightSlot = rightElement ?? suffixIcon ?? suffix;

    return (
      <div className="cinder-input-wrapper">
        {label && (
          <label htmlFor={inputId} className="cinder-input-label">
            {label}
          </label>
        )}

        <div
          className={cn(
            "cinder-input-container",
            sizeClass,
            error && "cinder-input-error",
            disabled && "cinder-input-disabled"
          )}
        >
          {leftSlot && <span className="cinder-input-affix-left">{leftSlot}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn("cinder-input-field", className)}
            {...rest}
          />
          {rightSlot && <span className="cinder-input-affix-right">{rightSlot}</span>}
        </div>

        {helperText && (
          <span
            className={cn(
              "cinder-input-helper",
              error && "cinder-input-helper-error"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

CDInput.displayName = "CDInput";

export const Input = CDInput;
