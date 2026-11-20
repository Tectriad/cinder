/**
 * Cinder Design Token Specification & Official Themes
 *
 * Official Theme: Cinder Slate (Dark Default & Light)
 * Engineered with precision obsidian surfaces (#09090b), vibrant royal blue (#3b82f6 / #2563eb),
 * crisp zinc dividers, and high-legibility Plus Jakarta Sans typography.
 */

export interface SemanticColors {
  bg: string;             // Primary Canvas
  surface: string;        // Cards & Modals
  surfaceHover?: string;  // Interactive hover surfaces
  glass: string;          // Frosted Panels
  primary: string;        // Brand Primary Action
  primaryHover: string;
  primaryForeground: string;
  focusRing?: string;
  accent: string;         // Secondary / Links
  accentHover: string;
  accentForeground: string;
  border: string;         // Subtle Divider
  borderStrong?: string;  // Prominent Border
  text: string;           // Primary Copy
  muted: string;          // Secondary Copy
  success: string;
  successBg?: string;
  warning: string;
  warningBg?: string;
  danger: string;
  dangerHover?: string;
  dangerBg?: string;
}

export interface DesignTokenContract {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colors: SemanticColors;
  radii: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  typography: {
    fontSans: string;
    fontMono: string;
    fontEditorial?: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };
  blur: {
    glass: string;
  };
}

/**
 * Cinder Slate — Dark Theme (Official Default)
 */
export const cinderSlateDarkTheme: DesignTokenContract = {
  id: "dark",
  name: "Cinder Slate Dark",
  tagline: "Professional Obsidian Canvas & Vibrant Blue Focus",
  description:
    "Crafted for intensive development workflows with deep slate surfaces and high-contrast blue action points.",
  colors: {
    bg: "#09090b",
    surface: "#121215",
    surfaceHover: "#1a1a1f",
    glass: "rgba(18, 18, 21, 0.8)",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    primaryForeground: "#ffffff",
    focusRing: "rgba(59, 130, 246, 0.35)",
    accent: "#60a5fa",
    accentHover: "#3b82f6",
    accentForeground: "#09090b",
    border: "#27272a",
    borderStrong: "#3f3f46",
    text: "#fafafa",
    muted: "#a1a1aa",
    success: "#34d399",
    successBg: "rgba(52, 211, 153, 0.12)",
    warning: "#fbbf24",
    warningBg: "rgba(251, 191, 36, 0.12)",
    danger: "#f87171",
    dangerHover: "#ef4444",
    dangerBg: "rgba(248, 113, 113, 0.12)",
  },
  radii: {
    none: "0px",
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  typography: {
    fontSans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.5)",
    md: "0 8px 24px rgba(0, 0, 0, 0.55)",
    lg: "0 12px 32px rgba(0, 0, 0, 0.7)",
    glow: "0 0 24px -4px rgba(59, 130, 246, 0.35)",
  },
  blur: {
    glass: "16px",
  },
};

/**
 * Cinder Slate — Light Theme
 */
export const cinderSlateLightTheme: DesignTokenContract = {
  id: "light",
  name: "Cinder Slate Light",
  tagline: "Crisp Clean Canvas & Enterprise Royal Blue",
  description:
    "Engineered for daytime productivity with crisp contrast, clean borders, and darkened semantic alerts.",
  colors: {
    bg: "#fafafa",
    surface: "#ffffff",
    surfaceHover: "#f4f4f5",
    glass: "rgba(255, 255, 255, 0.82)",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryForeground: "#ffffff",
    focusRing: "rgba(37, 99, 235, 0.25)",
    accent: "#3b82f6",
    accentHover: "#2563eb",
    accentForeground: "#ffffff",
    border: "#e4e4e7",
    borderStrong: "#d4d4d8",
    text: "#09090b",
    muted: "#71717a",
    success: "#059669",
    successBg: "rgba(5, 150, 105, 0.1)",
    warning: "#d97706",
    warningBg: "rgba(217, 119, 6, 0.1)",
    danger: "#dc2626",
    dangerHover: "#b91c1c",
    dangerBg: "rgba(220, 38, 38, 0.1)",
  },
  radii: {
    none: "0px",
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  typography: {
    fontSans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  shadows: {
    sm: "0 1px 2px rgba(9, 9, 11, 0.04)",
    md: "0 8px 24px rgba(9, 9, 11, 0.08)",
    lg: "0 12px 32px rgba(9, 9, 11, 0.12)",
    glow: "0 0 24px -4px rgba(37, 99, 235, 0.2)",
  },
  blur: {
    glass: "16px",
  },
};

/**
 * Backwards-compatible Smolder theme reference
 */
export const smolderTheme: DesignTokenContract = cinderSlateDarkTheme;

/**
 * Built-in Theme Registry
 */
export const defaultThemes: Record<string, DesignTokenContract> = {
  dark: cinderSlateDarkTheme,
  light: cinderSlateLightTheme,
  "cinder-slate": cinderSlateDarkTheme,
  "cinder-slate-dark": cinderSlateDarkTheme,
  "cinder-slate-light": cinderSlateLightTheme,
  smolder: cinderSlateDarkTheme,
};

/**
 * CSS Variable prefix
 */
export const CINDER_TOKEN_PREFIX = "--cinder";

/**
 * Convert a DesignTokenContract into CSS custom properties
 */
export function themeToCssVariables(theme: DesignTokenContract): Record<string, string> {
  const vars: Record<string, string> = {
    [`${CINDER_TOKEN_PREFIX}-bg`]: theme.colors.bg,
    [`${CINDER_TOKEN_PREFIX}-surface`]: theme.colors.surface,
    [`${CINDER_TOKEN_PREFIX}-glass`]: theme.colors.glass,
    [`${CINDER_TOKEN_PREFIX}-primary`]: theme.colors.primary,
    [`${CINDER_TOKEN_PREFIX}-primary-hover`]: theme.colors.primaryHover,
    [`${CINDER_TOKEN_PREFIX}-primary-text`]: theme.colors.primaryForeground,
    [`${CINDER_TOKEN_PREFIX}-primary-fg`]: theme.colors.primaryForeground,
    [`${CINDER_TOKEN_PREFIX}-accent`]: theme.colors.accent,
    [`${CINDER_TOKEN_PREFIX}-accent-hover`]: theme.colors.accentHover,
    [`${CINDER_TOKEN_PREFIX}-accent-fg`]: theme.colors.accentForeground,
    [`${CINDER_TOKEN_PREFIX}-border`]: theme.colors.border,
    [`${CINDER_TOKEN_PREFIX}-text`]: theme.colors.text,
    [`${CINDER_TOKEN_PREFIX}-muted`]: theme.colors.muted,
    [`${CINDER_TOKEN_PREFIX}-success`]: theme.colors.success,
    [`${CINDER_TOKEN_PREFIX}-warning`]: theme.colors.warning,
    [`${CINDER_TOKEN_PREFIX}-danger`]: theme.colors.danger,
    [`${CINDER_TOKEN_PREFIX}-radius-xs`]: theme.radii.xs,
    [`${CINDER_TOKEN_PREFIX}-radius-sm`]: theme.radii.sm,
    [`${CINDER_TOKEN_PREFIX}-radius-md`]: theme.radii.md,
    [`${CINDER_TOKEN_PREFIX}-radius-lg`]: theme.radii.lg,
    [`${CINDER_TOKEN_PREFIX}-radius-full`]: theme.radii.full,
    [`${CINDER_TOKEN_PREFIX}-font-sans`]: theme.typography.fontSans,
    [`${CINDER_TOKEN_PREFIX}-font-mono`]: theme.typography.fontMono,
    [`${CINDER_TOKEN_PREFIX}-shadow-sm`]: theme.shadows.sm,
    [`${CINDER_TOKEN_PREFIX}-shadow-md`]: theme.shadows.md,
    [`${CINDER_TOKEN_PREFIX}-shadow-lg`]: theme.shadows.lg,
    [`${CINDER_TOKEN_PREFIX}-shadow-glow`]: theme.shadows.glow,
    [`${CINDER_TOKEN_PREFIX}-blur-glass`]: theme.blur.glass,
  };

  if (theme.colors.surfaceHover) {
    vars[`${CINDER_TOKEN_PREFIX}-surface-hover`] = theme.colors.surfaceHover;
  }
  if (theme.colors.focusRing) {
    vars[`${CINDER_TOKEN_PREFIX}-focus-ring`] = theme.colors.focusRing;
  }
  if (theme.colors.borderStrong) {
    vars[`${CINDER_TOKEN_PREFIX}-border-strong`] = theme.colors.borderStrong;
  }
  if (theme.colors.successBg) {
    vars[`${CINDER_TOKEN_PREFIX}-success-bg`] = theme.colors.successBg;
  }
  if (theme.colors.warningBg) {
    vars[`${CINDER_TOKEN_PREFIX}-warning-bg`] = theme.colors.warningBg;
  }
  if (theme.colors.dangerBg) {
    vars[`${CINDER_TOKEN_PREFIX}-danger-bg`] = theme.colors.dangerBg;
  }

  return vars;
}
