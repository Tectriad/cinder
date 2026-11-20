import {
  forwardRef,
  useState,
  useId,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import { RadioContext } from "./RadioContext";
import { CDRadio } from "./CDRadio";
import type { CDRadioGroupProps, CDRadioOption } from "./types";

export const CDRadioGroup = forwardRef<HTMLDivElement, CDRadioGroupProps>(
  (
    {
      name: explicitName,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      size = "md",
      variant = "default",
      direction = "horizontal",
      buttonStyle = "outline",
      options,
      children,
      className,
      ...restProps
    }: CDRadioGroupProps,
    ref
  ): ReactElement => {
    const generatedName = useId();
    const groupName = explicitName || generatedName;

    const [internalValue, setInternalValue] = useState<string | number | undefined>(
      defaultValue
    );

    const activeValue = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (
      val: string | number,
      event: ChangeEvent<HTMLInputElement>
    ): void => {
      if (disabled) return;

      if (controlledValue === undefined) {
        setInternalValue(val);
      }

      if (onChange) {
        onChange(val, event);
      }
    };

    return (
      <RadioContext.Provider
        value={{
          name: groupName,
          value: activeValue,
          onChange: handleValueChange,
          disabled,
          size,
          variant,
          buttonStyle,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-disabled={disabled}
          className={cn(
            "cinder-radio-group",
            `cinder-radio-group-${direction}`,
            `cinder-radio-group-${size}`,
            className
          )}
          {...restProps}
        >
          {options && options.length > 0
            ? options.map((opt: CDRadioOption) => (
                <CDRadio
                  key={String(opt.value)}
                  value={opt.value}
                  disabled={opt.disabled}
                  description={opt.description}
                  icon={opt.icon}
                >
                  {opt.label}
                </CDRadio>
              ))
            : children}
        </div>
      </RadioContext.Provider>
    );
  }
);

CDRadioGroup.displayName = "CDRadioGroup";

export const RadioGroup = CDRadioGroup;
