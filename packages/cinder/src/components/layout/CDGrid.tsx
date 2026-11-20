import {
  forwardRef,
  type ReactElement,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDGridProps,
  CDGridItemProps,
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

export const CDGrid = forwardRef<HTMLDivElement, CDGridProps>(
  (
    {
      as: Component = "div",
      columns = 12,
      minItemWidth,
      gap = "md",
      rowGap,
      columnGap,
      children,
      className,
      style,
      ...restProps
    }: CDGridProps,
    ref
  ): ReactElement => {
    let gridTemplateColumns: string | undefined = undefined;

    if (minItemWidth) {
      const minVal =
        typeof minItemWidth === "number"
          ? `${minItemWidth}px`
          : minItemWidth;
      gridTemplateColumns = `repeat(auto-fit, minmax(${minVal}, 1fr))`;
    } else if (typeof columns === "number") {
      gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    } else if (typeof columns === "string") {
      gridTemplateColumns = columns;
    }

    const inlineStyles: CSSProperties = {
      display: "grid",
      ...(gridTemplateColumns ? { gridTemplateColumns } : {}),
      ...(gap !== undefined ? { gap: resolveSpacing(gap) } : {}),
      ...(rowGap !== undefined ? { rowGap: resolveSpacing(rowGap) } : {}),
      ...(columnGap !== undefined
        ? { columnGap: resolveSpacing(columnGap) }
        : {}),
      ...style,
    };

    return (
      <Component
        ref={ref}
        style={inlineStyles}
        className={cn("cinder-grid", className)}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

CDGrid.displayName = "CDGrid";

export const CDGridItem = forwardRef<HTMLDivElement, CDGridItemProps>(
  (
    {
      as: Component = "div",
      colSpan,
      rowSpan,
      colStart,
      rowStart,
      children,
      className,
      style,
      ...restProps
    }: CDGridItemProps,
    ref
  ): ReactElement => {
    let gridColumn: string | undefined = undefined;
    if (colSpan === "full") {
      gridColumn = "1 / -1";
    } else if (typeof colSpan === "number") {
      gridColumn = `span ${colSpan} / span ${colSpan}`;
    }

    let gridRow: string | undefined = undefined;
    if (typeof rowSpan === "number") {
      gridRow = `span ${rowSpan} / span ${rowSpan}`;
    }

    const inlineStyles: CSSProperties = {
      ...(gridColumn ? { gridColumn } : {}),
      ...(gridRow ? { gridRow } : {}),
      ...(colStart ? { gridColumnStart: colStart } : {}),
      ...(rowStart ? { gridRowStart: rowStart } : {}),
      ...style,
    };

    return (
      <Component
        ref={ref}
        style={inlineStyles}
        className={cn("cinder-grid-item", className)}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

CDGridItem.displayName = "CDGridItem";

export const Grid = CDGrid;
export const GridItem = CDGridItem;
