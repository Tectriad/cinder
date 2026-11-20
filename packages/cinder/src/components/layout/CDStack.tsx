import {
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDStackProps,
  CDHStackProps,
  CDVStackProps,
  CDSpacingValue,
} from "./types";

function resolveSpacing(val?: CDSpacingValue): string | undefined {
  if (val === undefined) return undefined;
  if (typeof val === "number") {
    return `${val * 4}px`;
  }
  const scaleMap: Record<string, string> = {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  };
  return scaleMap[val] || String(val);
}

export const CDStack = forwardRef<HTMLDivElement, CDStackProps>(
  (
    {
      as: Component = "div",
      direction = "column",
      align,
      justify,
      wrap = "nowrap",
      gap,
      spacing = "md",
      divider,
      inline = false,
      children,
      className,
      style,
      ...restProps
    }: CDStackProps,
    ref
  ): ReactElement => {
    const effectiveGap: string | undefined = resolveSpacing(gap ?? spacing);

    const inlineStyles: CSSProperties = {
      display: inline ? "inline-flex" : "flex",
      flexDirection: direction,
      flexWrap: wrap,
      ...(effectiveGap ? { gap: effectiveGap } : {}),
      ...style,
    };

    // If divider is provided, inject divider clone between each child
    let renderedChildren: ReactNode = children;
    if (divider && children) {
      const childrenArray = Children.toArray(children).filter(Boolean);
      renderedChildren = childrenArray.map((child, index) => (
        <span key={index} style={{ display: "contents" }}>
          {child}
          {index < childrenArray.length - 1 &&
            (isValidElement(divider)
              ? cloneElement(divider as ReactElement, {
                  key: `divider-${index}`,
                })
              : divider)}
        </span>
      ));
    }

    return (
      <Component
        ref={ref}
        style={inlineStyles}
        className={cn(
          "cinder-stack",
          `cinder-stack-${direction}`,
          align && `cinder-stack-align-${align}`,
          justify && `cinder-stack-justify-${justify}`,
          className
        )}
        {...restProps}
      >
        {renderedChildren}
      </Component>
    );
  }
);

CDStack.displayName = "CDStack";

export const CDHStack = forwardRef<HTMLDivElement, CDHStackProps>(
  (props, ref): ReactElement => (
    <CDStack ref={ref} direction="row" align="center" {...props} />
  )
);
CDHStack.displayName = "CDHStack";

export const CDVStack = forwardRef<HTMLDivElement, CDVStackProps>(
  (props, ref): ReactElement => (
    <CDStack ref={ref} direction="column" {...props} />
  )
);
CDVStack.displayName = "CDVStack";

export const Stack = CDStack;
export const HStack = CDHStack;
export const VStack = CDVStack;
