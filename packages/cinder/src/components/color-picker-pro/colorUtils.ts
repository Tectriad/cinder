import type { CDGradientStop, CDGradientValue } from "./types";

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}

export function parseHexToRgba(hex: string): RGBA {
  let clean = hex.replace("#", "").trim();
  let a = 1;

  if (clean.length === 3) {
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  } else if (clean.length === 8) {
    a = parseInt(clean.substring(6, 8), 16) / 255;
    clean = clean.substring(0, 6);
  }

  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 59, g: 130, b: 246, a: 1 };

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
    a: Math.round(a * 100) / 100,
  };
}

export function rgbaToHex(rgba: RGBA): string {
  const r = Math.round(rgba.r).toString(16).padStart(2, "0");
  const g = Math.round(rgba.g).toString(16).padStart(2, "0");
  const b = Math.round(rgba.b).toString(16).padStart(2, "0");
  if (rgba.a < 1) {
    const a = Math.round(rgba.a * 255).toString(16).padStart(2, "0");
    return `#${r}${g}${b}${a}`;
  }
  return `#${r}${g}${b}`;
}

export function rgbaToHsva(rgba: RGBA): HSVA {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return {
    h,
    s: Math.round(s * 100) / 100,
    v: Math.round(v * 100) / 100,
    a: rgba.a,
  };
}

export function hsvaToRgba(hsva: HSVA): RGBA {
  const { h, s, v, a } = hsva;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r1 = 0, g1 = 0, b1 = 0;
  if (h >= 0 && h < 60) { r1 = c; g1 = x; b1 = 0; }
  else if (h >= 60 && h < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (h >= 120 && h < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (h >= 180 && h < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (h >= 240 && h < 300) { r1 = x; g1 = 0; b1 = c; }
  else if (h >= 300 && h < 360) { r1 = c; g1 = 0; b1 = x; }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a,
  };
}

export function buildGradientCss(val: CDGradientValue): string {
  const sortedStops = [...val.stops].sort((a, b) => a.offset - b.offset);
  const stopStr = sortedStops.map((s: CDGradientStop) => `${s.color} ${s.offset}%`).join(", ");
  if (val.type === "radial") {
    return `radial-gradient(circle, ${stopStr})`;
  }
  return `linear-gradient(${val.angle}deg, ${stopStr})`;
}

export const CINDER_SLATE_PALETTE: string[] = [
  "#3b82f6", // Royal Blue
  "#0ea5e9", // Sky Blue
  "#10b981", // Emerald Green
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#ec4899", // Rose
  "#06b6d4", // Cyan
  "#f43f5e", // Crimson
  "#18181b", // Surface Dark
  "#27272a", // Border Dark
  "#71717a", // Muted
  "#fafafa", // Canvas Light
];
