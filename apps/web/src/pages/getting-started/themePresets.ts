export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "slate",
    name: "Cinder Slate (Default)",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
  },
  {
    id: "violet",
    name: "Electric Violet",
    primary: "#8b5cf6",
    primaryHover: "#7c3aed",
  },
  {
    id: "emerald",
    name: "Emerald Matrix",
    primary: "#10b981",
    primaryHover: "#059669",
  },
  {
    id: "amber",
    name: "Amber Sunset",
    primary: "#f59e0b",
    primaryHover: "#d97706",
  },
  {
    id: "crimson",
    name: "Crimson Flame",
    primary: "#f43f5e",
    primaryHover: "#e11d48",
  },
];
