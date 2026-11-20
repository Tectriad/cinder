import {
  forwardRef,
  useState,
  type ReactElement,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { CDSpinner } from "../spinner";
import { cn } from "../../utils/cn";
import type { CDSwitchProps } from "./types";

export const CDSwitch = forwardRef<HTMLButtonElement, CDSwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      loading = false,
      size = "md",
      checkedChildren,
      unCheckedChildren,
      thumbIcon,
      className,
      style,
      onClick,
      onKeyDown,
      ...restProps
    }: CDSwitchProps,
    ref
  ): ReactElement => {
    const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

    const isChecked: boolean =
      controlledChecked !== undefined ? controlledChecked : internalChecked;

    const isDisabled: boolean = disabled || loading;

    const handleToggle = (
      event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ): void => {
      if (isDisabled) return;

      const nextChecked = !isChecked;

      if (controlledChecked === undefined) {
        setInternalChecked(nextChecked);
      }

      if (onChange) {
        onChange(nextChecked, event);
      }
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
      handleToggle(e);
      if (onClick) {
        onClick(e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle(e);
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const renderedThumbIcon = loading ? (
      <CDSpinner size={size === "sm" ? "xs" : "sm"} />
    ) : typeof thumbIcon === "function" ? (
      thumbIcon(isChecked)
    ) : (
      thumbIcon
    );

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={style}
        className={cn(
          "cinder-switch",
          `cinder-switch-${size}`,
          isChecked && "cinder-switch-checked",
          isDisabled && "cinder-switch-disabled",
          loading && "cinder-switch-loading",
          className
        )}
        {...restProps}
      >
        <span className="cinder-switch-inner">
          {isChecked ? checkedChildren : unCheckedChildren}
        </span>

        <span className="cinder-switch-handle">
          {renderedThumbIcon && (
            <span className="cinder-switch-thumb-icon">{renderedThumbIcon}</span>
          )}
        </span>
      </button>
    );
  }
);

CDSwitch.displayName = "CDSwitch";

export const Switch = CDSwitch;
export const CDToggle = CDSwitch;
export const Toggle = CDSwitch;
