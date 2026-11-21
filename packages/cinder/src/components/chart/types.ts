import type { CSSProperties, ReactNode } from "react";

export type CDChartLegendPosition = "top" | "bottom" | "left" | "right";
export type CDChartThemeMode = "dark" | "light" | "auto";

export interface CDChartDataset {
  label: string;
  data: number[];
  color?: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  borderRadius?: number;
  borderDash?: number[];
  tension?: number;
  fill?: boolean | string;
  stepped?: boolean | "before" | "after" | "middle";
  pointRadius?: number;
  pointHoverRadius?: number;
}

export interface CDChartCommonProps {
  /** Title rendered in the chart card header */
  title?: string;
  /** Subtitle or description rendered below the title */
  subtitle?: string;
  /** Height of the chart canvas in pixels or CSS string. Defaults to 320. */
  height?: number | string;
  /** Width of the chart container in pixels or CSS string. Defaults to "100%". */
  width?: number | string;
  /** Optional custom CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Color theme mode. Defaults to "auto" (follows active Cinder theme). */
  themeMode?: CDChartThemeMode;
  /** Whether to animate chart transitions. Defaults to true. */
  animate?: boolean;
  /** Whether to display the legend. Defaults to true. */
  showLegend?: boolean;
  /** Position of the legend. Defaults to "top". */
  legendPosition?: CDChartLegendPosition;
  /** Whether to show grid lines. Defaults to true. */
  showGrid?: boolean;
  /** Whether to enable hover tooltips. Defaults to true. */
  showTooltip?: boolean;
  /** Extra element rendered in the top-right header */
  extra?: ReactNode;
}

export interface CDBarChartProps extends CDChartCommonProps {
  /** Category labels for the Y-axis */
  labels: string[];
  /** Series datasets */
  datasets: CDChartDataset[];
  /** Whether to stack bars on top of each other. Defaults to false. */
  stacked?: boolean;
  /** Bar corner radius in pixels. Defaults to 6. */
  borderRadius?: number;
  /** Category percentage width (0.1 to 1.0). Defaults to 0.7. */
  categoryPercentage?: number;
  /** Bar percentage width (0.1 to 1.0). Defaults to 0.8. */
  barPercentage?: number;
}

export interface CDColumnChartProps extends CDChartCommonProps {
  /** Category labels for the X-axis */
  labels: string[];
  /** Series datasets */
  datasets: CDChartDataset[];
  /** Whether to stack columns on top of each other. Defaults to false. */
  stacked?: boolean;
  /** Column corner radius in pixels. Defaults to 6. */
  borderRadius?: number;
  /** Category percentage width (0.1 to 1.0). Defaults to 0.7. */
  categoryPercentage?: number;
  /** Bar percentage width (0.1 to 1.0). Defaults to 0.8. */
  barPercentage?: number;
}

export interface CDPieChartProps extends CDChartCommonProps {
  /** Category labels for each slice */
  labels: string[];
  /** Numeric values for each slice */
  data: number[];
  /** Custom color array for slices (defaults to Cinder Slate semantic palette) */
  colors?: string[];
  /** Visual presentation variant ("pie" or "donut"). Defaults to "donut". */
  variant?: "pie" | "donut";
  /** Percentage cutout for donut variant (0 to 90). Defaults to 68. */
  innerRadius?: number;
  /** Primary metric label rendered in the center of the donut */
  centerLabel?: string;
  /** Primary metric value rendered in the center of the donut */
  centerValue?: string | number;
}

export interface CDRadialBarItem {
  label: string;
  value: number;
  max?: number;
  color?: string;
  formattedValue?: string;
}

export interface CDRadialBarChartProps extends CDChartCommonProps {
  /** Array of radial progress metrics */
  data: CDRadialBarItem[];
  /** Background track color for the uncompleted portion of the arc */
  trackColor?: string;
  /** Primary metric label rendered in the center */
  centerLabel?: string;
  /** Primary metric value rendered in the center */
  centerValue?: string | number;
  /** Arc corner radius in pixels. Defaults to 8. */
  borderRadius?: number;
}

export interface CDLineChartProps extends CDChartCommonProps {
  /** Category labels for the X-axis */
  labels: string[];
  /** Series datasets */
  datasets: CDChartDataset[];
  /** Whether line curves are smoothed using cubic bezier. Defaults to true. */
  smooth?: boolean;
  /** Bezier curve tension when smooth is true (0 to 1). Defaults to 0.35. */
  tension?: number;
  /** Whether to display data point markers. Defaults to true. */
  showPoints?: boolean;
  /** Radius of data points in pixels. Defaults to 4. */
  pointRadius?: number;
  /** Radius of data points on hover in pixels. Defaults to 6. */
  pointHoverRadius?: number;
  /** Line stroke width in pixels. Defaults to 2. */
  borderWidth?: number;
  /** Whether to render lines as step curves */
  stepped?: boolean | "before" | "after" | "middle";
}

export interface CDAreaChartProps extends CDChartCommonProps {
  /** Category labels for the X-axis */
  labels: string[];
  /** Series datasets */
  datasets: CDChartDataset[];
  /** Whether line curves are smoothed using cubic bezier. Defaults to true. */
  smooth?: boolean;
  /** Bezier curve tension when smooth is true (0 to 1). Defaults to 0.35. */
  tension?: number;
  /** Whether to apply a vertical gradient fill under the line. Defaults to true. */
  gradient?: boolean;
  /** Fill opacity for the area (0 to 1). Defaults to 0.25. */
  fillOpacity?: number;
  /** Whether to stack area layers on top of each other. Defaults to false. */
  stacked?: boolean;
  /** Whether to display data point markers. Defaults to false. */
  showPoints?: boolean;
  /** Radius of data points in pixels. Defaults to 3. */
  pointRadius?: number;
  /** Radius of data points on hover in pixels. Defaults to 5. */
  pointHoverRadius?: number;
  /** Line stroke width in pixels. Defaults to 2. */
  borderWidth?: number;
}
