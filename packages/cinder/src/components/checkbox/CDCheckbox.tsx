import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import { useCDCheckboxGroup } from "./context";
import { CDCheckIcon, CDMinusIcon } from "../icon";
import type { CDCheckboxProps } from "./types";

/**
 * CDCheckbox
 *
 * Senior UX/UI-grade multi-choice selector supporting checked, unchecked,
 * indeterminate, disabled, error states, rich description metadata, and card variants.
 */
export const CDCheckbox = forwardRef<HTMLInputElement, CDCheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      disabled: disabledProp = false,
      size: sizeProp,
      shape: shapeProp,
      round = false,
      variant = "default",
      label,
      description,
      error = false,
      value,
      name: nameProp,
      className,
      style,
      children,
      onChange,
      ...restProps
    }: CDCheckboxProps,
    forwardedRef,
  ): ReactElement => {
    const group = useCDCheckboxGroup();
    const inputRef = useRef<HTMLInputElement>(null);

    // Merge internal and forwarded ref
    useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

    // Group integration
    const isInGroup: boolean = group !== null && value !== undefined;
    const isGroupChecked: boolean = Boolean(
      isInGroup && group && value !== undefined && group.value.includes(value),
    );
    const groupDisabled: boolean = group?.disabled ?? false;
    const isDisabled: boolean = disabledProp || groupDisabled;
    const effectiveSize = sizeProp ?? group?.size ?? "md";
    const effectiveName = nameProp ?? group?.name;
    const isRound: boolean = Boolean(
      round || shapeProp === "round" || (!shapeProp && group?.shape === "round"),
    );

    // Local checked state for uncontrolled standalone usage
    const isControlled: boolean = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(Boolean(defaultChecked));

    const isChecked: boolean = isInGroup
      ? isGroupChecked
      : isControlled
        ? Boolean(controlledChecked)
        : uncontrolledChecked;

    // Synchronize native input indeterminate property
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    // Handle change
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (isDisabled) return;

      const nextChecked: boolean = event.target.checked;

      if (!isControlled && !isInGroup) {
        setUncontrolledChecked(nextChecked);
      }

      if (isInGroup && group && value !== undefined) {
        group.toggleOption(value);
      }

      onChange?.(nextChecked, event);
    };

    const hasError: boolean = Boolean(error);
    const errorMessage: string | null = typeof error === "string" ? error : null;
    const labelContent = label ?? children;
    const hasLabel: boolean = labelContent !== undefined && labelContent !== null;
    const hasDescription: boolean = description !== undefined && description !== null;

    // Checkmark icon sizing based on size prop
    const iconSize: number = effectiveSize === "sm" ? 11 : effectiveSize === "lg" ? 15 : 13;

    return (
      <label
        className={cn(
          "cinder-checkbox-wrapper",
          `cinder-checkbox-size-${effectiveSize}`,
          `cinder-checkbox-variant-${variant}`,
          isRound && "cinder-checkbox-shape-round",
          isChecked && "cinder-checkbox-checked",
          indeterminate && "cinder-checkbox-indeterminate",
          isDisabled && "cinder-checkbox-disabled",
          hasError && "cinder-checkbox-error",
          className,
        )}
        style={style}
      >
        <span className="cinder-checkbox">
          <input
            {...restProps}
            ref={inputRef}
            type="checkbox"
            name={effectiveName}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            className="cinder-checkbox-input"
            aria-checked={indeterminate ? "mixed" : isChecked}
            aria-disabled={isDisabled}
            aria-invalid={hasError}
          />
          <span
            className={cn(
              "cinder-checkbox-inner",
              isRound && "cinder-checkbox-inner-round",
            )}
          >
            {indeterminate ? (
              <CDMinusIcon size={iconSize} className="cinder-checkbox-icon" />
            ) : (
              <CDCheckIcon size={iconSize} className="cinder-checkbox-icon" />
            )}
          </span>
        </span>

        {(hasLabel || hasDescription) && (
          <span className="cinder-checkbox-content">
            {hasLabel && <span className="cinder-checkbox-label">{labelContent}</span>}
            {hasDescription && (
              <span className="cinder-checkbox-description">{description}</span>
            )}
            {errorMessage && (
              <span className="cinder-checkbox-error-message">{errorMessage}</span>
            )}
          </span>
        )}
      </label>
    );
  },
);

CDCheckbox.displayName = "CDCheckbox";

// Backward-compatible alias
export const Checkbox = CDCheckbox;
