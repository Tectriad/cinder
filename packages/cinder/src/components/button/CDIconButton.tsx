import { forwardRef, type ReactElement } from "react";
import { CDButton } from "./CDButton";
import { cn } from "../../utils/cn";
import type { CDIconButtonProps } from "./types";

export const CDIconButton = forwardRef<HTMLButtonElement, CDIconButtonProps>(
  (
    {
      icon,
      "aria-label": ariaLabel,
      variant = "ghost",
      size = "md",
      isRound = false,
      isLoading = false,
      customTheme,
      className,
      disabled,
      ...rest
    }: CDIconButtonProps,
    ref
  ): ReactElement => {
    return (
      <CDButton
        ref={ref}
        variant={variant}
        size={size}
        isLoading={isLoading}
        customTheme={customTheme}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          "cinder-icon-btn",
          isRound && "cinder-icon-btn-round",
          className
        )}
        {...rest}
      >
        <span className="cinder-icon-btn-content" aria-hidden="true">
          {icon}
        </span>
      </CDButton>
    );
  }
);

CDIconButton.displayName = "CDIconButton";

export const IconButton = CDIconButton;
