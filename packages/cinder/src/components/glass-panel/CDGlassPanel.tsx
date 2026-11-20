import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDGlassPanelProps } from "./types";

export const CDGlassPanel = forwardRef<HTMLDivElement, CDGlassPanelProps>(
  (
    {
      blur = "md",
      elevated = false,
      children,
      className,
      ...rest
    }: CDGlassPanelProps,
    ref
  ): ReactElement => {
    const blurClass: string = {
      sm: "cinder-glass-sm",
      md: "cinder-glass-md",
      lg: "cinder-glass-lg",
    }[blur];

    return (
      <div
        ref={ref}
        className={cn(
          "cinder-glass-panel",
          blurClass,
          elevated && "cinder-glass-elevated",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CDGlassPanel.displayName = "CDGlassPanel";

export const GlassPanel = CDGlassPanel;
