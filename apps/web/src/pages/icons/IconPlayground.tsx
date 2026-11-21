import { useState, useEffect, type ReactElement } from "react";
import { useCinderTheme } from "@cinder-ui/core";
import { IconForge } from "@tec-triad/iconforge-react";
import {
  ALL_ICONS,
  generateSvgString,
  generateJsxSnippet,
  type IconDefinition,
  type IconVariant,
} from "@tec-triad/iconforge-core";

export function IconPlayground(): ReactElement {
  const { resolvedMode } = useCinderTheme();
  const isLight = resolvedMode === "light";

  const [selectedIconName, setSelectedIconName] = useState<string>("react");
  const [variant, setVariant] = useState<IconVariant>("duotone");
  const [size, setSize] = useState<number>(64);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [primaryColor, setPrimaryColor] = useState<string>("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState<string>("#8b5cf6");
  const [gradientStart, setGradientStart] = useState<string>("#3b82f6");
  const [gradientEnd, setGradientEnd] = useState<string>("#8b5cf6");
  const [canvasBg, setCanvasBg] = useState<string>(isLight ? "#ffffff" : "#09090b");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Sync canvas background on theme change if using default
  useEffect((): void => {
    setCanvasBg(isLight ? "#ffffff" : "#09090b");
  }, [isLight]);

  const selectedDef: IconDefinition =
    ALL_ICONS.find((i: IconDefinition) => i.name === selectedIconName) || ALL_ICONS[0];

  const svgOutput = generateSvgString(selectedDef, variant, {
    size,
    strokeWidth,
    primaryColor,
    secondaryColor,
    gradientStart,
    gradientEnd,
  });

  const jsxOutput = generateJsxSnippet(selectedIconName, variant, size, primaryColor);

  const handleCopy = (type: "jsx" | "svg"): void => {
    const text = type === "jsx" ? jsxOutput : svgOutput;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  return (
    <div className="icon-playground-root">
      {/* Playground Left Controls */}
      <div className="icon-pg-controls-card">
        <h3 className="icon-pg-card-title">Customization Controls</h3>

        {/* Icon selector */}
        <div className="icon-pg-field">
          <label className="icon-pg-label" htmlFor="pg-icon-select">Choose Icon</label>
          <select
            id="pg-icon-select"
            className="icon-pg-select"
            value={selectedIconName}
            onChange={(e): void => setSelectedIconName(e.target.value)}
          >
            {ALL_ICONS.map((i: IconDefinition) => (
              <option key={i.name} value={i.name}>
                {i.label} ({i.category})
              </option>
            ))}
          </select>
        </div>

        {/* Style Variant */}
        <div className="icon-pg-field">
          <span className="icon-pg-label">Style Variant</span>
          <div className="icon-pg-button-group">
            {(["outline", "filled", "duotone", "multicolor", "gradient", "rounded"] as IconVariant[]).map((v) => (
              <button
                key={v}
                type="button"
                className={`icon-pg-btn ${variant === v ? "active" : ""}`}
                onClick={(): void => setVariant(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Size Slider */}
        <div className="icon-pg-field">
          <div className="icon-pg-label-row">
            <span className="icon-pg-label">Size</span>
            <span className="icon-pg-val">{size}px</span>
          </div>
          <input
            type="range"
            min="16"
            max="128"
            step="4"
            value={size}
            onChange={(e): void => setSize(Number(e.target.value))}
            className="icon-slider-input"
          />
        </div>

        {/* Stroke width */}
        {variant !== "filled" && (
          <div className="icon-pg-field">
            <div className="icon-pg-label-row">
              <span className="icon-pg-label">Stroke Width</span>
              <span className="icon-pg-val">{strokeWidth}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="3.5"
              step="0.25"
              value={strokeWidth}
              onChange={(e): void => setStrokeWidth(Number(e.target.value))}
              className="icon-slider-input"
            />
          </div>
        )}

        {/* Colors */}
        <div className="icon-pg-field">
          <span className="icon-pg-label">Primary Color</span>
          <div className="icon-pg-color-row">
            <input
              type="color"
              value={primaryColor}
              onChange={(e): void => setPrimaryColor(e.target.value)}
              className="icon-color-native-input"
            />
            <span className="icon-pg-hex">{primaryColor}</span>
          </div>
        </div>

        {variant === "duotone" && (
          <div className="icon-pg-field">
            <span className="icon-pg-label">Secondary Layer Color</span>
            <div className="icon-pg-color-row">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e): void => setSecondaryColor(e.target.value)}
                className="icon-color-native-input"
              />
              <span className="icon-pg-hex">{secondaryColor}</span>
            </div>
          </div>
        )}

        {variant === "gradient" && (
          <div className="icon-pg-field">
            <span className="icon-pg-label">Gradient Stops</span>
            <div className="icon-pg-gradient-row">
              <input
                type="color"
                value={gradientStart}
                onChange={(e): void => setGradientStart(e.target.value)}
                className="icon-color-native-input"
                title="Start color"
              />
              <input
                type="color"
                value={gradientEnd}
                onChange={(e): void => setGradientEnd(e.target.value)}
                className="icon-color-native-input"
                title="End color"
              />
              <span className="icon-pg-hex">{gradientStart} to {gradientEnd}</span>
            </div>
          </div>
        )}

        {/* Canvas Background */}
        <div className="icon-pg-field">
          <span className="icon-pg-label">Canvas Background</span>
          <div className="icon-pg-bg-options">
            {(isLight
              ? [
                  { label: "Pure White", color: "#ffffff" },
                  { label: "Light Surface", color: "#f4f4f5" },
                  { label: "Soft Slate", color: "#e4e4e7" },
                  { label: "Dark Contrast", color: "#09090b" },
                ]
              : [
                  { label: "Dark Canvas", color: "#09090b" },
                  { label: "Surface", color: "#121215" },
                  { label: "Slate", color: "#1e293b" },
                  { label: "Light Contrast", color: "#ffffff" },
                ]
            ).map((b) => (
              <button
                key={b.color}
                type="button"
                className={`icon-pg-bg-btn ${canvasBg === b.color ? "active" : ""}`}
                style={{ backgroundColor: b.color }}
                onClick={(): void => setCanvasBg(b.color)}
                title={b.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Playground Right: Live Render & Code */}
      <div className="icon-pg-preview-card">
        <div className="icon-pg-stage" style={{ backgroundColor: canvasBg }}>
          <IconForge
            name={selectedIconName}
            variant={variant}
            size={size}
            strokeWidth={strokeWidth}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
          />
        </div>

        {/* Code outputs */}
        <div className="icon-pg-code-container">
          <div className="icon-pg-code-box">
            <div className="icon-pg-code-header">
              <span className="icon-pg-code-title">React Component</span>
              <button
                type="button"
                className="icon-pg-copy-btn"
                onClick={(): void => handleCopy("jsx")}
              >
                {copiedType === "jsx" ? "Copied!" : "Copy JSX"}
              </button>
            </div>
            <pre className="icon-code-block">
              <code>{jsxOutput}</code>
            </pre>
          </div>

          <div className="icon-pg-code-box">
            <div className="icon-pg-code-header">
              <span className="icon-pg-code-title">Raw SVG Markup</span>
              <button
                type="button"
                className="icon-pg-copy-btn"
                onClick={(): void => handleCopy("svg")}
              >
                {copiedType === "svg" ? "Copied!" : "Copy SVG"}
              </button>
            </div>
            <pre className="icon-code-block">
              <code>{svgOutput}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
