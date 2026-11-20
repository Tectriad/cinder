import { forwardRef, Children, isValidElement, cloneElement, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDButtonGroupProps } from "./types";

export const CDButtonGroup = forwardRef<HTMLDivElement, CDButtonGroupProps>(
  (
    {
      children,
      isAttached = true,
      attached,
      orientation = "horizontal",
      size,
      variant,
      className,
      ...rest
    }: CDButtonGroupProps,
    ref
  ): ReactElement => {
    const validChildren = Children.toArray(children).filter(isValidElement);
    const resolvedAttached: boolean = attached !== undefined ? attached : isAttached;

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "cinder-btn-group",
          resolvedAttached && "cinder-btn-group-attached",
          orientation === "vertical" ? "cinder-btn-group-vertical" : "cinder-btn-group-horizontal",
          className
        )}
        {...rest}
      >
        {validChildren.map((child, index: number) => {
          const childProps = child.props as Record<string, any>;
          return cloneElement(child as ReactElement<any>, {
            key: child.key || index,
            size: childProps.size || size,
            variant: childProps.variant || variant,
          });
        })}
      </div>
    );
  }
);

CDButtonGroup.displayName = "CDButtonGroup";

export const ButtonGroup = CDButtonGroup;
