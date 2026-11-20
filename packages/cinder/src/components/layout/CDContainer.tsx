import {
  forwardRef,
  type ReactElement,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import type { CDContainerProps } from "./types";

export const CDContainer = forwardRef<HTMLDivElement, CDContainerProps>(
  (
    {
      as: Component = "div",
      size = "xl",
      maxWidth,
      gutter = "md",
      centered = true,
      children,
      className,
      style,
      ...restProps
    }: CDContainerProps,
    ref
  ): ReactElement => {
    const inlineStyles: CSSProperties = {
      ...(maxWidth !== undefined ? { maxWidth } : {}),
      ...style,
    };

    return (
      <Component
        ref={ref}
        style={inlineStyles}
        className={cn(
          "cinder-container",
          `cinder-container-${size}`,
          `cinder-container-gutter-${gutter}`,
          centered && "cinder-container-centered",
          className
        )}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

CDContainer.displayName = "CDContainer";

export const Container = CDContainer;
