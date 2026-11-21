import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarController,
  BarElement,
  PieController,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  type ChartType,
  type ChartOptions,
} from "chart.js";
import type { CDChartLegendPosition, CDChartThemeMode } from "./types";

// Register Chart.js required primitives
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarController,
  BarElement,
  PieController,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const CINDER_CHART_COLORS: string[] = [
  "#3b82f6", // Royal Blue (Primary)
  "#0ea5e9", // Sky Blue
  "#10b981", // Emerald Green
  "#f59e0b", // Amber Gold
  "#8b5cf6", // Violet Purple
  "#ec4899", // Pink / Rose
  "#06b6d4", // Cyan
  "#64748b", // Slate
];

/**
 * Converts a hex color string (e.g. #3b82f6) to an rgba(...) string with given alpha.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace("#", "");
  let r = 59;
  let g = 130;
  let b = 246;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function resolveChartTheme(mode?: CDChartThemeMode): "dark" | "light" {
  if (mode === "dark" || mode === "light") {
    return mode;
  }
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      return attr;
    }
  }
  return "dark";
}

export interface ChartBaseConfig {
  isDark: boolean;
  animate?: boolean;
  showLegend?: boolean;
  legendPosition?: CDChartLegendPosition;
  showGrid?: boolean;
  showTooltip?: boolean;
}

export function createBaseChartOptions<TType extends ChartType = ChartType>(
  config: ChartBaseConfig
): ChartOptions<TType> {
  const {
    isDark,
    animate = true,
    showLegend = true,
    legendPosition = "top",
    showTooltip = true,
  } = config;

  const textColor: string = isDark ? "#fafafa" : "#09090b";
  const mutedColor: string = isDark ? "#a1a1aa" : "#71717a";
  const tooltipBg: string = isDark ? "rgba(18, 18, 21, 0.95)" : "rgba(255, 255, 255, 0.98)";
  const tooltipBorder: string = isDark ? "rgba(59, 130, 246, 0.35)" : "rgba(228, 228, 231, 0.9)";

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: animate ? { duration: 650, easing: "easeOutQuart" } : false,
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
        align: "end",
        labels: {
          color: textColor,
          font: {
            family: "'Plus Jakarta Sans', -apple-system, sans-serif",
            size: 12,
            weight: 500,
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: showTooltip,
        backgroundColor: tooltipBg,
        borderColor: tooltipBorder,
        borderWidth: 1,
        titleColor: textColor,
        bodyColor: mutedColor,
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        titleFont: {
          family: "'Plus Jakarta Sans', -apple-system, sans-serif",
          size: 13,
          weight: "bold",
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', -apple-system, sans-serif",
          size: 12,
        },
      },
    },
  } as unknown as ChartOptions<TType>;
}
