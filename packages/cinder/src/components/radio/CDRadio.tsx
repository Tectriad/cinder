import {
  forwardRef,
  useState,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import { useRadioContext } from "./RadioContext";
import type { CDRadioProps } from "./types";

export const CDRadio = forwardRef<HTMLInputElement, CDRadioProps>(
  (
    {
      value,
      checked: controlledChecked,
      defaultChecked = false,
      disabled: explicitDisabled,
      size: explicitSize,
      variant: explicitVariant,
      description,
      icon,
      children,
      className,
      style,
      name: explicitName,
      onChange,
      ...restProps
    }: CDRadioProps,
    ref
  ): ReactElement => {
    const groupContext = useRadioContext();

    const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

    const isChecked: boolean =
      groupContext !== null && groupContext.value !== undefined && value !== undefined
        ? groupContext.value === value
        : controlledChecked !== undefined
        ? controlledChecked
        : internalChecked;

    const isDisabled: boolean = Boolean(
      explicitDisabled ?? (groupContext?.disabled ?? false)
    );

    const size = explicitSize ?? groupContext?.size ?? "md";
    const variant = explicitVariant ?? groupContext?.variant ?? "default";
    const name = explicitName ?? groupContext?.name;

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      if (isDisabled) return;

      if (!groupContext && controlledChecked === undefined) {
        setInternalChecked(e.target.checked);
      }

      if (groupContext?.onChange && value !== undefined) {
        groupContext.onChange(value, e);
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <label
        style={style}
        className={cn(
          "cinder-radio",
          `cinder-radio-${size}`,
          `cinder-radio-${variant}`,
          isChecked && "cinder-radio-checked",
          isDisabled && "cinder-radio-disabled",
          className
        )}
      >
        <span className="cinder-radio-input-wrapper">
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            className="cinder-radio-input"
            {...restProps}
          />
          <span className="cinder-radio-circle" aria-hidden="true">
            <span className="cinder-radio-dot" />
          </span>
        </span>

        {(children || description || icon) && (
          <span className="cinder-radio-content">
            {icon && <span className="cinder-radio-icon">{icon}</span>}
            <span className="cinder-radio-text-group">
              {children && <span className="cinder-radio-label">{children}</span>}
              {description && (
                <span className="cinder-radio-description">{description}</span>
              )}
            </span>
          </span>
        )}
      </label>
    );
  }
);

CDRadio.displayName = "CDRadio";

export const Radio = CDRadio;
