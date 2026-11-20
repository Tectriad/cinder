import type { HTMLAttributes, ReactNode, CSSProperties } from "react";

export interface CDSliderMarkItem {
  label: ReactNode;
  style?: CSSProperties;
}

export type CDSliderMarks = Record<number, ReactNode | CDSliderMarkItem>;

export interface CDSliderTooltipConfig {
  formatter?: (value: number) => ReactNode;
  open?: boolean;
}

export interface CDSliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  marks?: CDSliderMarks;
  dots?: boolean;
  tooltip?: boolean | CDSliderTooltipConfig;
  onChange?: (value: number | [number, number]) => void;
  onAfterChange?: (value: number | [number, number]) => void;
  className?: string;
  style?: CSSProperties;
}

export type SliderProps = CDSliderProps;
export type CDRangeSliderProps = CDSliderProps;
export type RangeSliderProps = CDSliderProps;
