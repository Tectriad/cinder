import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { CDHelpCircleIcon } from "../icon";
import type { CDLabelProps } from "./types";

export const CDLabel = forwardRef<HTMLLabelElement, CDLabelProps>(
  (
    {
      size = "md",
      required = false,
      optional = false,
      tooltip,
      children,
      className,
      ...restProps
    }: CDLabelProps,
    ref
  ): ReactElement => {
    return (
      <label
        ref={ref}
        className={cn(
          "cinder-typography",
          "cinder-label",
          `cinder-label-${size}`,
          required && "cinder-label-required",
          className
        )}
        {...restProps}
      >
        <span className="cinder-label-text">{children}</span>

        {required && (
          <span className="cinder-label-asterisk" aria-hidden="true">
            *
          </span>
        )}

        {optional && (
          <span className="cinder-label-optional">
            {typeof optional === "boolean" ? "(optional)" : optional}
          </span>
        )}

        {tooltip && (
          <span
            className="cinder-label-tooltip-trigger"
            title={typeof tooltip === "string" ? tooltip : undefined}
          >
            <CDHelpCircleIcon size={13} />
          </span>
        )}
      </label>
    );
  }
);

CDLabel.displayName = "CDLabel";

export const Label = CDLabel;
