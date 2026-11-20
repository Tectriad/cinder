import {
  useState,
  useMemo,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import { CDCheckboxGroupContext } from "./context";
import { CDCheckbox } from "./CDCheckbox";
import type {
  CDCheckboxGroupProps,
  CDCheckboxOption,
  CDCheckboxGroupContextValue,
} from "./types";

/**
 * CDCheckboxGroup
 *
 * Coordinates multi-selection across multiple checkboxes with uniform state,
 * direction flow, options mapping, and disabled propagation.
 */
export function CDCheckboxGroup({
  value: controlledValue,
  defaultValue = [],
  options,
  disabled = false,
  size = "md",
  shape = "default",
  round = false,
  direction = "horizontal",
  name,
  className,
  style,
  children,
  onChange,
}: CDCheckboxGroupProps): ReactElement {
  const isControlled: boolean = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<(string | number)[]>(defaultValue);

  const currentValue: (string | number)[] = isControlled
    ? (controlledValue ?? [])
    : uncontrolledValue;

  const toggleOption = (optionValue: string | number): void => {
    const exists: boolean = currentValue.includes(optionValue);
    const nextValue: (string | number)[] = exists
      ? currentValue.filter((item: string | number) => item !== optionValue)
      : [...currentValue, optionValue];

    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }

    onChange?.(nextValue);
  };

  const effectiveShape = round || shape === "round" ? "round" : shape;

  const contextValue: CDCheckboxGroupContextValue = useMemo(
    () => ({
      value: currentValue,
      disabled,
      size,
      shape: effectiveShape,
      name,
      toggleOption,
    }),
    [currentValue, disabled, size, effectiveShape, name],
  );

  return (
    <CDCheckboxGroupContext.Provider value={contextValue}>
      <div
        role="group"
        className={cn(
          "cinder-checkbox-group",
          `cinder-checkbox-group-${direction}`,
          className,
        )}
        style={style}
      >
        {options && options.length > 0
          ? options.map((opt: string | number | CDCheckboxOption) => {
              if (typeof opt === "string" || typeof opt === "number") {
                return (
                  <CDCheckbox
                    key={String(opt)}
                    value={opt}
                    label={String(opt)}
                    disabled={disabled}
                    size={size}
                    shape={effectiveShape}
                  />
                );
              }

              return (
                <CDCheckbox
                  key={String(opt.value)}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  disabled={disabled || opt.disabled}
                  size={size}
                  shape={opt.shape ?? (opt.round ? "round" : effectiveShape)}
                />
              );
            })
          : children}
      </div>
    </CDCheckboxGroupContext.Provider>
  );
}

CDCheckboxGroup.displayName = "CDCheckboxGroup";

// Backward-compatible alias
export const CheckboxGroup = CDCheckboxGroup;
