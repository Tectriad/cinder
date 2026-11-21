import {
  useRef,
  useEffect,
  type ReactElement,
} from "react";
import { Chart as ChartJS, type ChartConfiguration } from "chart.js";
import { cn } from "../../utils/cn";
import type { CDLineChartProps, CDChartDataset } from "./types";
import {
  resolveChartTheme,
  createBaseChartOptions,
  CINDER_CHART_COLORS,
} from "./chartTheme";

export function CDLineChart({
  labels,
  datasets,
  smooth = true,
  tension = 0.35,
  showPoints = true,
  pointRadius = 4,
  pointHoverRadius = 6,
  borderWidth = 2,
  stepped,
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
}: CDLineChartProps): ReactElement {
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
      const ptHoverRadius: number = ds.pointHoverRadius !== undefined ? ds.pointHoverRadius : (showPoints ? pointHoverRadius : 0);

      return {
        label: ds.label,
        data: ds.data,
        borderColor: ds.borderColor || color,
        backgroundColor: ds.backgroundColor || color,
        borderWidth: ds.borderWidth !== undefined ? ds.borderWidth : borderWidth,
        borderDash: ds.borderDash || [],
        tension: curveTension,
        stepped: ds.stepped !== undefined ? ds.stepped : stepped,
        fill: false,
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
    showPoints,
    pointRadius,
    pointHoverRadius,
    borderWidth,
    stepped,
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

export const LineChart = CDLineChart;
