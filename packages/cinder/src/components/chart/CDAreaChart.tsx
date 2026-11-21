import {
  useRef,
  useEffect,
  type ReactElement,
} from "react";
import {
  Chart as ChartJS,
  type ChartConfiguration,
  type ScriptableContext,
} from "chart.js";
import { cn } from "../../utils/cn";
import type { CDAreaChartProps, CDChartDataset } from "./types";
import {
  resolveChartTheme,
  createBaseChartOptions,
  CINDER_CHART_COLORS,
  hexToRgba,
} from "./chartTheme";

export function CDAreaChart({
  labels,
  datasets,
  smooth = true,
  tension = 0.35,
  gradient = true,
  fillOpacity = 0.25,
  stacked = false,
  showPoints = false,
  pointRadius = 3,
  pointHoverRadius = 5,
  borderWidth = 2,
  title,
  subtitle,
  height = 320,
  width = "100%",
  themeMode = "auto",
  animate = true,
  showLegend = true,
  legendPosition = "top",
  showGrid = true,
  showTooltip = true,
  extra,
  className,
  style,
}: CDAreaChartProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS<"line"> | null>(null);

  const resolvedTheme: "dark" | "light" = resolveChartTheme(themeMode);
  const isDark: boolean = resolvedTheme === "dark";

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const gridColor: string = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)";
    const tickColor: string = isDark ? "#a1a1aa" : "#71717a";
    const pointBgColor: string = isDark ? "#121215" : "#ffffff";

    const baseOptions = createBaseChartOptions<"line">({
      isDark,
      animate,
      showLegend,
      legendPosition,
      showGrid,
      showTooltip,
    });

    const preparedDatasets = datasets.map((ds: CDChartDataset, idx: number) => {
      const color: string = ds.color || CINDER_CHART_COLORS[idx % CINDER_CHART_COLORS.length];
      const curveTension: number = ds.tension !== undefined ? ds.tension : (smooth ? tension : 0);
      const ptRadius: number = ds.pointRadius !== undefined ? ds.pointRadius : (showPoints ? pointRadius : 0);
      const ptHoverRadius: number = ds.pointHoverRadius !== undefined ? ds.pointHoverRadius : (showPoints ? pointHoverRadius : 5);

      return {
        label: ds.label,
        data: ds.data,
        borderColor: ds.borderColor || color,
        borderWidth: ds.borderWidth !== undefined ? ds.borderWidth : borderWidth,
        borderDash: ds.borderDash || [],
        tension: curveTension,
        fill: stacked ? true : "origin",
        backgroundColor: (context: ScriptableContext<"line">) => {
          if (ds.backgroundColor && typeof ds.backgroundColor === "string") {
            return ds.backgroundColor;
          }
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!gradient || !chartArea) {
            return hexToRgba(color, fillOpacity);
          }
          const grad = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          grad.addColorStop(0, hexToRgba(color, fillOpacity));
          grad.addColorStop(1, hexToRgba(color, 0.01));
          return grad;
        },
        pointBackgroundColor: pointBgColor,
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointRadius: ptRadius,
        pointHoverRadius: ptHoverRadius,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: pointBgColor,
        pointHoverBorderWidth: 2,
      };
    });

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels,
        datasets: preparedDatasets,
      },
      options: {
        ...baseOptions,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            stacked,
            grid: {
              display: false,
            },
            ticks: {
              color: tickColor,
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 11,
                weight: 500,
              },
            },
            border: {
              display: false,
            },
          },
          y: {
            stacked,
            grid: {
              display: showGrid,
              color: gridColor,
            },
            ticks: {
              color: tickColor,
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 11,
              },
            },
            border: {
              display: false,
            },
          },
        },
      },
    };

    const instance: ChartJS<"line"> = new ChartJS(canvasRef.current, config);
    chartInstanceRef.current = instance;

    return () => {
      instance.destroy();
      chartInstanceRef.current = null;
    };
  }, [
    labels,
    datasets,
    smooth,
    tension,
    gradient,
    fillOpacity,
    stacked,
    showPoints,
    pointRadius,
    pointHoverRadius,
    borderWidth,
    isDark,
    animate,
    showLegend,
    legendPosition,
    showGrid,
    showTooltip,
  ]);

  const heightStyle: string = typeof height === "number" ? `${height}px` : height;
  const widthStyle: string = typeof width === "number" ? `${width}px` : width;

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

      <div className="cinder-chart-body" style={{ height: heightStyle }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export const AreaChart = CDAreaChart;
