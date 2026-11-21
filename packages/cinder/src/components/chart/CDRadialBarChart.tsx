import {
  useRef,
  useEffect,
  type ReactElement,
} from "react";
import { Chart as ChartJS, type ChartConfiguration } from "chart.js";
import { cn } from "../../utils/cn";
import type { CDRadialBarChartProps, CDRadialBarItem } from "./types";
import {
  resolveChartTheme,
  createBaseChartOptions,
  CINDER_CHART_COLORS,
} from "./chartTheme";

export function CDRadialBarChart({
  data,
  trackColor,
  centerLabel,
  centerValue,
  borderRadius = 8,
  title,
  subtitle,
  height = 320,
  width = "100%",
  themeMode = "auto",
  animate = true,
  showLegend = true,
  legendPosition = "right",
  showTooltip = true,
  extra,
  className,
  style,
}: CDRadialBarChartProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const resolvedTheme: "dark" | "light" = resolveChartTheme(themeMode);
  const isDark: boolean = resolvedTheme === "dark";

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const defaultTrack: string =
      trackColor || (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)");

    const baseOptions = createBaseChartOptions<"doughnut">({
      isDark,
      animate,
      showLegend: false, // Custom radial legend handles multi-ring display
      legendPosition,
      showTooltip,
    });

    // Create concentric doughnut rings from outer to inner
    const datasets = data.map((item: CDRadialBarItem, idx: number) => {
      const maxVal: number = item.max !== undefined && item.max > 0 ? item.max : 100;
      const progress: number = Math.min(Math.max(item.value, 0), maxVal);
      const remainder: number = Math.max(0, maxVal - progress);
      const color: string = item.color || CINDER_CHART_COLORS[idx % CINDER_CHART_COLORS.length];

      return {
        label: item.label,
        data: [progress, remainder],
        backgroundColor: [color, defaultTrack],
        borderWidth: 0,
        borderRadius: [borderRadius, 0],
        circumference: 360,
        rotation: -90,
      };
    });

    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: {
        datasets,
      },
      options: {
        ...baseOptions,
        cutout: "40%",
        plugins: {
          ...baseOptions.plugins,
          tooltip: {
            ...baseOptions.plugins?.tooltip,
            callbacks: {
              label: (context) => {
                if (context.dataIndex === 1) return ""; // Hide remainder track tooltip
                const item = data[context.datasetIndex];
                const maxVal = item.max || 100;
                const pct = Math.round((item.value / maxVal) * 100);
                return ` ${item.label}: ${item.value} / ${maxVal} (${pct}%)`;
              },
            },
          },
        },
      },
    };

    const instance = new ChartJS(canvasRef.current, config);
    chartInstanceRef.current = instance;

    return () => {
      instance.destroy();
      chartInstanceRef.current = null;
    };
  }, [
    data,
    trackColor,
    borderRadius,
    isDark,
    animate,
    showLegend,
    legendPosition,
    showTooltip,
  ]);

  const heightStyle: string = typeof height === "number" ? `${height}px` : height;
  const widthStyle: string = typeof width === "number" ? `${width}px` : width;

  // Average or total for center metric if none provided
  const computedCenterVal: string | number | undefined =
    centerValue !== undefined
      ? centerValue
      : data.length > 0
      ? `${Math.round(
          data.reduce((acc, curr) => acc + (curr.value / (curr.max || 100)) * 100, 0) /
            data.length
        )}%`
      : undefined;

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

      <div className="cinder-radial-chart-layout">
        <div className="cinder-chart-body cinder-radial-chart-body" style={{ height: heightStyle }}>
          <canvas ref={canvasRef} />

          {/* Center metric label */}
          {(centerLabel || computedCenterVal !== undefined) && (
            <div className="cinder-chart-center-overlay" aria-hidden="true">
              {computedCenterVal !== undefined && (
                <span className="cinder-chart-center-value">{computedCenterVal}</span>
              )}
              <span className="cinder-chart-center-label">{centerLabel || "Progress"}</span>
            </div>
          )}
        </div>

        {/* Radial legend items */}
        {showLegend && data.length > 0 && (
          <div className="cinder-radial-legend-list">
            {data.map((item: CDRadialBarItem, idx: number) => {
              const color: string =
                item.color || CINDER_CHART_COLORS[idx % CINDER_CHART_COLORS.length];
              const maxVal: number = item.max || 100;
              const pct: number = Math.round((item.value / maxVal) * 100);

              return (
                <div key={item.label} className="cinder-radial-legend-item">
                  <div className="cinder-radial-legend-left">
                    <span
                      className="cinder-radial-legend-bullet"
                      style={{ backgroundColor: color }}
                    />
                    <span className="cinder-radial-legend-label">{item.label}</span>
                  </div>
                  <div className="cinder-radial-legend-right">
                    <span className="cinder-radial-legend-val">
                      {item.formattedValue || `${item.value}`}
                    </span>
                    <span className="cinder-radial-legend-pct">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const RadialBarChart = CDRadialBarChart;
