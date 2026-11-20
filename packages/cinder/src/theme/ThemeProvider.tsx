import { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  cinderSlateDarkTheme,
  cinderSlateLightTheme,
  defaultThemes,
  themeToCssVariables,
  type DesignTokenContract,
} from "../tokens";

export type ThemeMode = "dark" | "light" | "system";

export interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: "dark" | "light";
  setMode: (mode: ThemeMode) => void;
  activeTheme: DesignTokenContract;
  setActiveThemeId: (id: string) => void;
  availableThemes: Record<string, DesignTokenContract>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultThemeId?: string;
  storageKey?: string;
  customThemes?: Record<string, DesignTokenContract>;
}

export function ThemeProvider({
  children,
  defaultMode = "dark",
  defaultThemeId = "dark",
  storageKey = "cinder-theme-mode",
  customThemes = {},
}: ThemeProviderProps) {
  const mergedThemes = useMemo(
    () => ({ ...defaultThemes, ...customThemes }),
    [customThemes]
  );

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultMode;
    const saved = localStorage.getItem(storageKey);
    return (saved as ThemeMode) || defaultMode;
  });

  const [activeThemeId, setActiveThemeId] = useState<string>(defaultThemeId);

  const [resolvedMode, setResolvedMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const computeResolved = (): "dark" | "light" => {
      if (mode === "system") {
        return mediaQuery.matches ? "dark" : "light";
      }
      return mode;
    };

    const currentResolved = computeResolved();
    setResolvedMode(currentResolved);

    const root = document.documentElement;
    root.setAttribute("data-theme-mode", currentResolved);
    root.setAttribute("data-theme", currentResolved);

    // Pick active theme based on resolution or explicit theme ID
    const selectedTheme =
      activeThemeId && activeThemeId !== "dark" && activeThemeId !== "light" && mergedThemes[activeThemeId]
        ? mergedThemes[activeThemeId]
        : currentResolved === "light"
        ? mergedThemes["light"] || cinderSlateLightTheme
        : mergedThemes["dark"] || cinderSlateDarkTheme;

    // Inject CSS variables
    const cssVars = themeToCssVariables(selectedTheme);
    for (const [key, value] of Object.entries(cssVars)) {
      root.style.setProperty(key, value);
    }

    const listener = () => {
      if (mode === "system") {
        const updated = mediaQuery.matches ? "dark" : "light";
        setResolvedMode(updated);
        root.setAttribute("data-theme-mode", updated);
        root.setAttribute("data-theme", updated);

        const updatedTheme =
          updated === "light"
            ? mergedThemes["light"] || cinderSlateLightTheme
            : mergedThemes["dark"] || cinderSlateDarkTheme;
        const updatedVars = themeToCssVariables(updatedTheme);
        for (const [key, value] of Object.entries(updatedVars)) {
          root.style.setProperty(key, value);
        }
      }
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [mode, activeThemeId, mergedThemes]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newMode);
    }
  };

  const activeTheme = useMemo(() => {
    if (activeThemeId && activeThemeId !== "dark" && activeThemeId !== "light" && mergedThemes[activeThemeId]) {
      return mergedThemes[activeThemeId];
    }
    return resolvedMode === "light"
      ? mergedThemes["light"] || cinderSlateLightTheme
      : mergedThemes["dark"] || cinderSlateDarkTheme;
  }, [activeThemeId, resolvedMode, mergedThemes]);

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      setMode,
      activeTheme,
      setActiveThemeId,
      availableThemes: mergedThemes,
    }),
    [mode, resolvedMode, activeTheme, mergedThemes]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useCinderTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useCinderTheme must be used within a <ThemeProvider>");
  }
  return context;
}
