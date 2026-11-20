import {
  forwardRef,
  type ReactElement,
  type MouseEvent,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import { useRadioContext } from "./RadioContext";
import type { CDRadioButtonProps } from "./types";

export const CDRadioButton = forwardRef<HTMLButtonElement, CDRadioButtonProps>(
  (
    {
      value,
      disabled: explicitDisabled,
      children,
      className,
      onClick,
      ...restProps
    }: CDRadioButtonProps,
    ref
  ): ReactElement => {
    const groupContext = useRadioContext();

    const isChecked: boolean =
      groupContext !== null &&
      groupContext.value !== undefined &&
      groupContext.value === value;

    const isDisabled: boolean = Boolean(
      explicitDisabled ?? (groupContext?.disabled ?? false)
    );

    const size = groupContext?.size ?? "md";
    const buttonStyle = groupContext?.buttonStyle ?? "outline";

    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
      if (isDisabled) return;
      if (groupContext?.onChange && value !== undefined) {
        const syntheticEvent = {
          target: { value, checked: true },
        } as unknown as ChangeEvent<HTMLInputElement>;
        groupContext.onChange(value, syntheticEvent);
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isChecked}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          "cinder-radio-button",
          `cinder-radio-button-${size}`,
          `cinder-radio-button-${buttonStyle}`,
          isChecked && "cinder-radio-button-checked",
          isDisabled && "cinder-radio-button-disabled",
          className
        )}
        {...restProps}
      >
        <span className="cinder-radio-button-label">{children}</span>
      </button>
    );
  }
);

CDRadioButton.displayName = "CDRadioButton";

export const RadioButton = CDRadioButton;
