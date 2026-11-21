import {
  useRef,
  useEffect,
  type ReactElement,
} from "react";
import { Chart as ChartJS, type ChartConfiguration } from "chart.js";
import { cn } from "../../utils/cn";
import type { CDColumnChartProps, CDChartDataset } from "./types";
import {
  resolveChartTheme,
  createBaseChartOptions,
  CINDER_CHART_COLORS,
} from "./chartTheme";

export function CDColumnChart({
  labels,
  datasets,
  stacked = false,
  borderRadius = 6,
  categoryPercentage = 0.7,
  barPercentage = 0.8,
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
}: CDColumnChartProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const resolvedTheme: "dark" | "light" = resolveChartTheme(themeMode);
  const isDark: boolean = resolvedTheme === "dark";

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const gridColor: string = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)";
    const tickColor: string = isDark ? "#a1a1aa" : "#71717a";

    const baseOptions = createBaseChartOptions<"bar">({
      isDark,
      animate,
      showLegend,
      legendPosition,
      showGrid,
      showTooltip,
    });

    const preparedDatasets = datasets.map((ds: CDChartDataset, idx: number) => {
      const color: string = ds.color || CINDER_CHART_COLORS[idx % CINDER_CHART_COLORS.length];
      return {
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.backgroundColor || color,
        borderColor: ds.borderColor || color,
        borderWidth: ds.borderWidth !== undefined ? ds.borderWidth : 0,
        borderRadius: ds.borderRadius !== undefined ? ds.borderRadius : borderRadius,
        borderSkipped: false as const,
        categoryPercentage,
        barPercentage,
      };
    });

    const config: ChartConfiguration<"bar"> = {
      type: "bar",
      data: {
        labels,
        datasets: preparedDatasets,
      },
      options: {
        ...baseOptions,
        indexAxis: "x",
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

    const instance: ChartJS<"bar"> = new ChartJS(canvasRef.current, config);
    chartInstanceRef.current = instance;

    return () => {
      instance.destroy();
      chartInstanceRef.current = null;
    };
  }, [
    labels,
    datasets,
    stacked,
    borderRadius,
    categoryPercentage,
    barPercentage,
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

export const ColumnChart = CDColumnChart;
