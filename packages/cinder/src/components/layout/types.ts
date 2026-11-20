import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";

export type CDSpacingValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | number
  | string;

export type CDContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "fluid";

/* Box */
export interface CDBoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  p?: CDSpacingValue;
  px?: CDSpacingValue;
  py?: CDSpacingValue;
  m?: CDSpacingValue;
  mx?: CDSpacingValue;
  my?: CDSpacingValue;
  bg?: "canvas" | "surface" | "card" | "glass" | "transparent" | string;
  border?: boolean | string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full" | string;
  shadow?: "none" | "sm" | "md" | "lg" | string;
  display?: "block" | "inline-block" | "flex" | "inline-flex" | "grid" | "none";
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type BoxProps = CDBoxProps;

/* Container */
export interface CDContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  size?: CDContainerSize;
  maxWidth?: number | string;
  gutter?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type ContainerProps = CDContainerProps;

/* Grid */
export interface CDGridProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  columns?: number | string;
  minItemWidth?: number | string;
  gap?: CDSpacingValue;
  rowGap?: CDSpacingValue;
  columnGap?: CDSpacingValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type GridProps = CDGridProps;

/* Grid Item */
export interface CDGridItemProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  colSpan?: number | "full";
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type GridItemProps = CDGridItemProps;

/* Stack */
export type CDStackDirection =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";

export type CDStackAlign =
  | "start"
  | "center"
  | "end"
  | "stretch"
  | "baseline";

export type CDStackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export interface CDStackProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  direction?: CDStackDirection;
  align?: CDStackAlign;
  justify?: CDStackJustify;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: CDSpacingValue;
  spacing?: CDSpacingValue;
  divider?: ReactNode;
  inline?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type StackProps = CDStackProps;
export type CDHStackProps = Omit<CDStackProps, "direction">;
export type HStackProps = CDHStackProps;
export type CDVStackProps = Omit<CDStackProps, "direction">;
export type VStackProps = CDVStackProps;

/* Divider */
export type CDDividerOrientation = "horizontal" | "vertical";
export type CDDividerTextPlacement = "left" | "center" | "right";
export type CDDividerVariant = "solid" | "dashed";

export interface CDDividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: CDDividerOrientation;
  textPlacement?: CDDividerTextPlacement;
  variant?: CDDividerVariant;
  plain?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type DividerProps = CDDividerProps;

/* Spacer */
export interface CDSpacerProps extends HTMLAttributes<HTMLDivElement> {
  x?: CDSpacingValue;
  y?: CDSpacingValue;
  size?: CDSpacingValue;
  flex?: number | string | boolean;
  className?: string;
  style?: CSSProperties;
}

export type SpacerProps = CDSpacerProps;
