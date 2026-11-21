import {
  useRef,
  useEffect,
  type ReactElement,
} from "react";
import { Chart as ChartJS, type ChartConfiguration } from "chart.js";
import { cn } from "../../utils/cn";
import type { CDPieChartProps } from "./types";
import {
  resolveChartTheme,
  createBaseChartOptions,
  CINDER_CHART_COLORS,
} from "./chartTheme";

export function CDPieChart({
  labels,
  data,
  colors,
  variant = "donut",
  innerRadius = 68,
  centerLabel,
  centerValue,
  title,
  subtitle,
  height = 320,
  width = "100%",
  themeMode = "auto",
  animate = true,
  showLegend = true,
  legendPosition = "bottom",
  showTooltip = true,
  extra,
  className,
  style,
}: CDPieChartProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const resolvedTheme: "dark" | "light" = resolveChartTheme(themeMode);
  const isDark: boolean = resolvedTheme === "dark";

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const baseOptions = createBaseChartOptions<"doughnut" | "pie">({
      isDark,
      animate,
      showLegend,
      legendPosition,
      showTooltip,
    });

    const sliceColors: string[] =
      colors && colors.length > 0
        ? colors
        : labels.map((_, idx: number) => CINDER_CHART_COLORS[idx % CINDER_CHART_COLORS.length]);

    const isDonut: boolean = variant === "donut";
    const cutoutValue: string = isDonut ? `${innerRadius}%` : "0%";
    const borderColor: string = isDark ? "#121215" : "#ffffff";

    const config: ChartConfiguration<"doughnut" | "pie"> = {
      type: isDonut ? "doughnut" : "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: sliceColors,
            borderColor,
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        ...baseOptions,
        cutout: cutoutValue,
      },
    };

    const instance = new ChartJS(canvasRef.current, config);
    chartInstanceRef.current = instance;

    return () => {
      instance.destroy();
      chartInstanceRef.current = null;
    };
  }, [
    labels,
    data,
    colors,
    variant,
    innerRadius,
    isDark,
    animate,
    showLegend,
    legendPosition,
    showTooltip,
  ]);

  const heightStyle: string = typeof height === "number" ? `${height}px` : height;
  const widthStyle: string = typeof width === "number" ? `${width}px` : width;
  const isDonut: boolean = variant === "donut";

  return (
    <div
      className={cn("cinder-chart-card", className)}
      style={{ width: widthStyle, ...style }}
    >
      {(title || subtitle || extra) && (
        <div className="cinder-chart-header">
          <div className="cinder-chart-title-group">
            {title && <h3 className="cinder-chart-title">{title}</h3>}
            {subtitle && <p className="cinder-chart-subtitle">{subtitle}</p>}
          </div>
          {extra && <div className="cinder-chart-extra">{extra}</div>}
        </div>
      )}

      <div className="cinder-chart-body cinder-pie-chart-body" style={{ height: heightStyle }}>
        <canvas ref={canvasRef} />

        {/* Center label and metric overlay for donut variant */}
        {isDonut && (centerLabel || centerValue !== undefined) && (
          <div className="cinder-chart-center-overlay" aria-hidden="true">
            {centerValue !== undefined && (
              <span className="cinder-chart-center-value">{centerValue}</span>
            )}
            {centerLabel && (
              <span className="cinder-chart-center-label">{centerLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const PieChart = CDPieChart;
