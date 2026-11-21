import type { ReactElement, ChangeEvent } from "react";
import { useCinderTheme } from "@cinder-ui/core";
import type { IconVariant } from "@iconforge/core";
import type { IconExplorerState, IconViewMode, CanvasBackground } from "./types";

interface IconToolbarProps {
  state: IconExplorerState;
  totalMatches: number;
  onSearchChange: (val: string) => void;
  onVariantChange: (variant: IconVariant) => void;
  onSizeChange: (size: number) => void;
  onStrokeWidthChange: (width: number) => void;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onCanvasBgChange: (bg: CanvasBackground) => void;
  onViewModeChange: (mode: IconViewMode) => void;
}

const VARIANTS: Array<{ id: IconVariant; label: string }> = [
  { id: "outline", label: "Outline" },
  { id: "filled", label: "Filled" },
  { id: "duotone", label: "Duotone" },
  { id: "multicolor", label: "Multicolor" },
  { id: "gradient", label: "Gradient" },
  { id: "rounded", label: "Rounded" },
];

const DARK_PRESET_COLORS: string[] = [
  "#fafafa",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
];

const LIGHT_PRESET_COLORS: string[] = [
  "#09090b",
  "#2563eb",
  "#7c3aed",
  "#059669",
  "#d97706",
  "#dc2626",
  "#0891b2",
  "#db2777",
];

export function IconToolbar({
  state,
  totalMatches,
  onSearchChange,
  onVariantChange,
  onSizeChange,
  onStrokeWidthChange,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onCanvasBgChange,
  onViewModeChange,
}: IconToolbarProps): ReactElement {
  const { resolvedMode } = useCinderTheme();
  const isLight = resolvedMode === "light";
  const presetColors = isLight ? LIGHT_PRESET_COLORS : DARK_PRESET_COLORS;

  const canvasOptions: Array<{ id: CanvasBackground; label: string; previewColor: string }> =
    isLight
      ? [
          { id: "canvas", label: "Light Canvas (#fafafa)", previewColor: "#fafafa" },
          { id: "surface", label: "Pure White (#ffffff)", previewColor: "#ffffff" },
          { id: "slate", label: "Light Slate (#f4f4f5)", previewColor: "#f4f4f5" },
          { id: "contrast", label: "Dark Contrast (#09090b)", previewColor: "#09090b" },
        ]
      : [
          { id: "canvas", label: "Dark Canvas (#09090b)", previewColor: "#09090b" },
          { id: "surface", label: "Surface Dark (#121215)", previewColor: "#121215" },
          { id: "slate", label: "Deep Slate (#1e293b)", previewColor: "#1e293b" },
          { id: "contrast", label: "Light Contrast (#ffffff)", previewColor: "#ffffff" },
        ];

  return (
    <div className="icon-toolbar-root">
      {/* Search Bar & Counter */}
      <div className="icon-toolbar-search-row">
        <div className="icon-search-input-wrapper">
          <svg
            className="icon-search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="icon-search-input"
            placeholder="Search 1,000+ icons by name, keyword, synonym, or category..."
            value={state.searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value)}
          />
          {state.searchTerm && (
            <button
              type="button"
              className="icon-search-clear-btn"
              onClick={(): void => onSearchChange("")}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className="icon-results-count-pill">
          <span>{totalMatches} icons</span>
        </div>
      </div>

      {/* Style Variant Switcher Bar */}
      <div className="icon-toolbar-styles-row">
        <div className="icon-variant-segmented-control" role="group" aria-label="Icon style variants">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`icon-variant-seg-btn ${state.selectedVariant === v.id ? "active" : ""}`}
              onClick={(): void => onVariantChange(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* View Mode & Canvas Toggle */}
        <div className="icon-toolbar-view-actions">
          {/* Canvas Background Selector */}
          <div className="icon-canvas-bg-picker" title="Toggle canvas background">
            {canvasOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`icon-canvas-dot ${state.canvasBg === opt.id ? "active" : ""}`}
                style={{ backgroundColor: opt.previewColor }}
                data-bg={opt.id}
                onClick={(): void => onCanvasBgChange(opt.id)}
                title={opt.label}
                aria-label={opt.label}
              />
            ))}
          </div>

          {/* View mode grid/list */}
          <div className="icon-view-mode-group">
            <button
              type="button"
              className={`icon-view-btn ${state.viewMode === "grid" ? "active" : ""}`}
              onClick={(): void => onViewModeChange("grid")}
              title="Grid View"
              aria-label="Grid view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              className={`icon-view-btn ${state.viewMode === "list" ? "active" : ""}`}
              onClick={(): void => onViewModeChange("list")}
              title="List View"
              aria-label="List view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sizing, Stroke, and Color Controls */}
      <div className="icon-toolbar-controls-row">
        {/* Size Slider */}
        <div className="icon-control-item">
          <span className="icon-control-label">Size: {state.iconSize}px</span>
          <input
            type="range"
            min="16"
            max="64"
            step="4"
            value={state.iconSize}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => onSizeChange(Number(e.target.value))}
            className="icon-slider-input"
          />
          <div className="icon-preset-pills">
            {[16, 20, 24, 32, 48].map((s) => (
              <button
                key={s}
                type="button"
                className={`icon-size-pill ${state.iconSize === s ? "active" : ""}`}
                onClick={(): void => onSizeChange(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Width Slider (active for outline/rounded) */}
        {state.selectedVariant !== "filled" && (
          <div className="icon-control-item">
            <span className="icon-control-label">Stroke: {state.strokeWidth}px</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.25"
              value={state.strokeWidth}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => onStrokeWidthChange(Number(e.target.value))}
              className="icon-slider-input"
            />
          </div>
        )}

        {/* Color Palette */}
        <div className="icon-control-item">
          <span className="icon-control-label">Color:</span>
          <div className="icon-color-swatches">
            {presetColors.map((c, idx) => {
              const isDefaultContrast = idx === 0;
              const isActive = isDefaultContrast
                ? state.primaryColor === "currentColor" ||
                  state.primaryColor === c ||
                  state.primaryColor === (isLight ? "#09090b" : "#fafafa")
                : state.primaryColor === c;

              return (
                <button
                  key={c}
                  type="button"
                  className={`icon-swatch-circle ${isActive ? "active" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={(): void => onPrimaryColorChange(isDefaultContrast ? "currentColor" : c)}
                  title={isDefaultContrast ? `Adaptive Theme Color (${c})` : c}
                  aria-label={isDefaultContrast ? "Adaptive Theme Color" : c}
                />
              );
            })}
            <input
              type="color"
              value={state.primaryColor === "currentColor" ? (isLight ? "#09090b" : "#fafafa") : state.primaryColor}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => onPrimaryColorChange(e.target.value)}
              className="icon-color-native-input"
              title="Custom color"
            />
          </div>
        </div>

        {/* Secondary color for duotone */}
        {state.selectedVariant === "duotone" && (
          <div className="icon-control-item">
            <span className="icon-control-label">Secondary Layer:</span>
            <div className="icon-color-swatches">
              {presetColors.map((c, idx) => {
                const isActive =
                  idx === 1
                    ? !state.secondaryColor || state.secondaryColor === c
                    : state.secondaryColor === c;
                return (
                  <button
                    key={`sec-${c}`}
                    type="button"
                    className={`icon-swatch-circle ${isActive ? "active" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={(): void => onSecondaryColorChange(c)}
                    title={c}
                    aria-label={c}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
