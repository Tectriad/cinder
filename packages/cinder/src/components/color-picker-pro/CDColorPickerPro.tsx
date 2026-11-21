import {
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDColorPickerProProps,
  CDColorMode,
  CDColorFormat,
  CDGradientValue,
} from "./types";
import {
  parseHexToRgba,
  rgbaToHex,
  rgbaToHsva,
  hsvaToRgba,
  buildGradientCss,
  CINDER_SLATE_PALETTE,
  type HSVA,
  type RGBA,
} from "./colorUtils";
import { CDColorSpectrum } from "./CDColorSpectrum";
import { CDGradientBar } from "./CDGradientBar";

export function CDColorPickerPro({
  value,
  defaultValue = "#3b82f6",
  onChange,
  mode = "both",
  format = "hex",
  showAlpha = true,
  presets = CINDER_SLATE_PALETTE,
  showEyeDropper = true,
  display = "inline",
  label = "Select Color",
  className,
  style,
  extra,
}: CDColorPickerProProps): ReactElement {
  const [activeMode, setActiveMode] = useState<CDColorMode>("solid");
  const [colorFormat, setColorFormat] = useState<CDColorFormat>(format);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial solid color
  const [hsva, setHsva] = useState<HSVA>(() => {
    const initialHex = typeof value === "string" && !value.includes("gradient") ? value : defaultValue;
    return rgbaToHsva(parseHexToRgba(initialHex));
  });

  // Initial gradient
  const [gradient, setGradient] = useState<CDGradientValue>({
    type: "linear",
    angle: 90,
    stops: [
      { id: "s1", color: "#3b82f6", offset: 0 },
      { id: "s2", color: "#8b5cf6", offset: 100 },
    ],
  });
  const [activeStopId, setActiveStopId] = useState<string>("s1");

  const currentRgba: RGBA = hsvaToRgba(hsva);
  const currentHex: string = rgbaToHex(currentRgba);

  // Close popover on outside click
  useEffect(() => {
    if (display !== "popover" || !isOpen) return;
    const handleClickOutside = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [display, isOpen]);

  const handleHsvaChange = (newHsva: HSVA): void => {
    setHsva(newHsva);
    const newRgba = hsvaToRgba(newHsva);
    const newHex = rgbaToHex(newRgba);

    if (activeMode === "solid") {
      if (onChange) onChange(newHex);
    } else {
      // update active stop in gradient
      const updated = {
        ...gradient,
        stops: gradient.stops.map((s) =>
          s.id === activeStopId ? { ...s, color: newHex } : s
        ),
      };
      setGradient(updated);
      if (onChange) onChange(buildGradientCss(updated));
    }
  };

  const handleGradientUpdate = (newGrad: CDGradientValue): void => {
    setGradient(newGrad);
    if (onChange) onChange(buildGradientCss(newGrad));
  };

  const handleSelectPreset = (hex: string): void => {
    const newHsva = rgbaToHsva(parseHexToRgba(hex));
    handleHsvaChange(newHsva);
  };

  const handleEyeDropper = async (): Promise<void> => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dropper = new (window as any).EyeDropper();
        const result = await dropper.open();
        if (result && result.sRGBHex) {
          handleSelectPreset(result.sRGBHex);
        }
      } catch {
        // User cancelled or not allowed
      }
    }
  };

  const displayPreview: string = activeMode === "solid" ? currentHex : buildGradientCss(gradient);

  const pickerPanel = (
    <div className="cinder-color-picker-card">
      {/* Header Mode Switch (Solid vs Gradient) */}
      {mode === "both" && (
        <div className="cinder-color-mode-nav">
          <button
            type="button"
            className={cn("cinder-color-tab-btn", activeMode === "solid" && "active")}
            onClick={() => {
              setActiveMode("solid");
              if (onChange) onChange(currentHex);
            }}
          >
            Solid
          </button>
          <button
            type="button"
            className={cn("cinder-color-tab-btn", activeMode === "gradient" && "active")}
            onClick={() => {
              setActiveMode("gradient");
              if (onChange) onChange(buildGradientCss(gradient));
            }}
          >
            Gradient
          </button>
        </div>
      )}

      {/* Gradient Track Bar when in gradient mode */}
      {activeMode === "gradient" && (
        <CDGradientBar
          gradient={gradient}
          activeStopId={activeStopId}
          onSelectStop={(id: string) => {
            setActiveStopId(id);
            const found = gradient.stops.find((s) => s.id === id);
            if (found) setHsva(rgbaToHsva(parseHexToRgba(found.color)));
          }}
          onUpdateGradient={handleGradientUpdate}
        />
      )}

      {/* 2D Spectrum & Sliders */}
      <CDColorSpectrum
        hsva={hsva}
        onChange={handleHsvaChange}
        showAlpha={showAlpha}
      />

      {/* Values & Format Row */}
      <div className="cinder-color-values-row">
        <div className="cinder-color-preview-swatch" style={{ background: displayPreview }} />

        {showEyeDropper && typeof window !== "undefined" && "EyeDropper" in window && (
          <button
            type="button"
            className="cinder-color-dropper-btn"
            onClick={handleEyeDropper}
            title="Pick screen color"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 7l3 3m-9 9l-5 1 1-5 12-12a2 2 0 013 3l-11 13z" />
            </svg>
          </button>
        )}

        <div className="cinder-color-input-container">
          <input
            type="text"
            className="cinder-color-hex-input"
            value={colorFormat === "hex" ? currentHex : `${currentRgba.r}, ${currentRgba.g}, ${currentRgba.b}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (colorFormat === "hex" && e.target.value.startsWith("#")) {
                setHsva(rgbaToHsva(parseHexToRgba(e.target.value)));
              }
            }}
          />
        </div>

        <select
          className="cinder-color-format-select"
          value={colorFormat}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setColorFormat(e.target.value as CDColorFormat)
          }
        >
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
        </select>
      </div>

      {/* Presets & Swatches Palette */}
      {presets.length > 0 && (
        <div className="cinder-color-presets-group">
          <span className="cinder-color-presets-label">Swatches</span>
          <div className="cinder-color-presets-grid">
            {presets.map((presetHex: string) => (
              <button
                key={presetHex}
                type="button"
                className={cn(
                  "cinder-color-preset-item",
                  presetHex.toLowerCase() === currentHex.toLowerCase() && "active"
                )}
                style={{ backgroundColor: presetHex }}
                onClick={() => handleSelectPreset(presetHex)}
                title={presetHex}
              />
            ))}
          </div>
        </div>
      )}

      {extra && <div className="cinder-color-extra">{extra}</div>}
    </div>
  );

  if (display === "popover") {
    return (
      <div ref={containerRef} className={cn("cinder-color-popover-wrapper", className)} style={style}>
        <button
          type="button"
          className="cinder-color-trigger-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="cinder-color-trigger-chip" style={{ background: displayPreview }} />
          <span className="cinder-color-trigger-text">{label}</span>
          <span className="cinder-color-trigger-value">{currentHex}</span>
        </button>

        {isOpen && (
          <div className="cinder-color-dropdown-pane">
            {pickerPanel}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("cinder-color-inline-wrapper", className)} style={style}>
      {pickerPanel}
    </div>
  );
}

export const ColorPickerPro = CDColorPickerPro;
