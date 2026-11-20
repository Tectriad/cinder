import {
  forwardRef,
  Children,
  isValidElement,
  cloneElement,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import { StepperContext } from "./StepperContext";
import { CDStep } from "./CDStep";
import type { CDStepperProps, CDStepItem, CDStepProps } from "./types";

export const CDStepper = forwardRef<HTMLDivElement, CDStepperProps>(
  (
    {
      current = 0,
      status = "process",
      onChange,
      orientation = "horizontal",
      variant = "default",
      size = "md",
      items,
      children,
      className,
      ...restProps
    }: CDStepperProps,
    ref
  ): ReactElement => {
    return (
      <StepperContext.Provider
        value={{
          current,
          status,
          orientation,
          variant,
          size,
          onChange,
        }}
      >
        <div
          ref={ref}
          role="navigation"
          aria-label="Steps"
          className={cn(
            "cinder-stepper",
            `cinder-stepper-${orientation}`,
            `cinder-stepper-${variant}`,
            `cinder-stepper-${size}`,
            className
          )}
          {...restProps}
        >
          {items && items.length > 0
            ? items.map((item: CDStepItem, index: number) => (
                <CDStep
                  key={index}
                  stepIndex={index}
                  title={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                  icon={item.icon}
                  status={item.status}
                  disabled={item.disabled}
                />
              ))
            : Children.map(children, (child, index: number) => {
                if (isValidElement(child)) {
                  return cloneElement(child as ReactElement<CDStepProps>, {
                    stepIndex: (child.props as { stepIndex?: number }).stepIndex ?? index,
                  });
                }
                return child;
              })}
        </div>
      </StepperContext.Provider>
    );
  }
);

CDStepper.displayName = "CDStepper";

export const Stepper = CDStepper;
