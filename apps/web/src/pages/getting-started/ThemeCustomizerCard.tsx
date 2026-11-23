import { useState, type ReactElement, type ChangeEvent } from "react";
import {
  CDButton,
  CDBadge,
  CDIcons,
  CDInput,
  CDSwitch,
  CDSlider,
} from "@cinder-ui/core";
import { THEME_PRESETS, type ThemePreset } from "./themePresets";

export function ThemeCustomizerCard(): ReactElement {
  const [activePreset, setActivePreset] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [customPrimary, setCustomPrimary] = useState<string>(THEME_PRESETS[0].primary);
  const [copiedCss, setCopiedCss] = useState<boolean>(false);
  const [isSwitchActive, setIsSwitchActive] = useState<boolean>(true);
  const [sliderValue, setSliderValue] = useState<number>(68);
  const [testInput, setTestInput] = useState<string>("Production v2.4");

  const generatedCss: string = `:root {
  /* Brand Accent Tokens */
  --cinder-primary: ${customPrimary};
  --cinder-primary-hover: ${activePreset.primaryHover};
}`;

  const handleCopyCss = (): void => {
    navigator.clipboard.writeText(generatedCss);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const handlePresetSelect = (preset: ThemePreset): void => {
    setActivePreset(preset);
    setCustomPrimary(preset.primary);
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid var(--cinder-border)",
        backgroundColor: "var(--cinder-surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", color: "var(--cinder-text)" }}>
            Interactive Theme Previewer
          </h3>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "var(--cinder-muted)" }}>
            Select a preset or pick a custom primary color to see how Cinder UI components instantly react.
          </p>
        </div>

        <CDButton
          size="sm"
          variant="secondary"
          onClick={handleCopyCss}
          prefixIcon={
            copiedCss ? (
              <CDIcons.Check size={14} color="var(--cinder-success)" />
            ) : (
              <CDIcons.Copy size={14} />
            )
          }
        >
          {copiedCss ? "CSS Copied!" : "Copy Theme CSS"}
        </CDButton>
      </div>

      {/* Theme Preset Selector Pills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {THEME_PRESETS.map((preset: ThemePreset) => {
          const isSelected: boolean = activePreset.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                border: `1px solid ${isSelected ? preset.primary : "var(--cinder-border)"}`,
                backgroundColor: isSelected ? "rgba(255,255,255,0.06)" : "transparent",
                color: "var(--cinder-text)",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: isSelected ? 600 : 400,
                transition: "all 150ms ease",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: preset.primary,
                  display: "inline-block",
                }}
              />
              {preset.name}
            </button>
          );
        })}
      </div>

      {/* Live Dynamic Preview Container without Altering Canvas Background */}
      <div
        style={
          {
            padding: "24px",
            borderRadius: "10px",
            backgroundColor: "var(--cinder-canvas)",
            border: "1px solid var(--cinder-border)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            "--cinder-primary": customPrimary,
            "--cinder-primary-hover": activePreset.primaryHover,
          } as React.CSSProperties
        }
      >
        {/* Controls & Color Picker Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--cinder-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "13px", color: "var(--cinder-muted)", fontWeight: 500 }}>
              Custom Primary Accent:
            </span>
            <input
              type="color"
              value={customPrimary}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomPrimary(e.target.value)}
              style={{
                width: "28px",
                height: "28px",
                padding: 0,
                borderRadius: "6px",
                border: "1px solid var(--cinder-border)",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
              title="Pick custom primary color"
            />
            <code style={{ fontSize: "12px", color: "var(--cinder-text)", fontFamily: "var(--cinder-font-mono)" }}>
              {customPrimary}
            </code>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CDBadge variant="primary" size="sm" dot pulse>
              Live Themed Primitives
            </CDBadge>
          </div>
        </div>

        {/* Buttons & Badges Deck */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <CDButton variant="primary" prefixIcon={<CDIcons.Check size={14} />}>
            Primary Trigger
          </CDButton>
          <CDButton variant="secondary">
            Secondary Action
          </CDButton>
          <CDButton variant="ghost">
            Ghost Link
          </CDButton>
          <CDBadge variant="primary">
            Themed Badge
          </CDBadge>
        </div>

        {/* Form Controls Row: Input, Switch & Slider */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <CDInput
            label="Themed Focus Ring"
            value={testInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTestInput(e.target.value)}
            prefixIcon={<CDIcons.Terminal size={14} />}
            placeholder="Focus input to see themed outline"
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "12px 14px",
              borderRadius: "8px",
              backgroundColor: "var(--cinder-surface)",
              border: "1px solid var(--cinder-border)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--cinder-muted)", fontWeight: 600 }}>
                Themed Switch Track:
              </span>
              <CDSwitch
                checked={isSwitchActive}
                onChange={(checked: boolean) => setIsSwitchActive(checked)}
              />
            </div>
            <span style={{ fontSize: "11px", color: "var(--cinder-muted)" }}>
              Active state inherits brand accent
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "12px 14px",
              borderRadius: "8px",
              backgroundColor: "var(--cinder-surface)",
              border: "1px solid var(--cinder-border)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--cinder-muted)", fontWeight: 600 }}>
                Themed Range Track:
              </span>
              <span style={{ fontSize: "12px", color: "var(--cinder-primary)", fontWeight: 700 }}>
                {sliderValue}%
              </span>
            </div>
            <CDSlider
              value={sliderValue}
              min={0}
              max={100}
              onChange={(val: number | [number, number]) => {
                if (typeof val === "number") {
                  setSliderValue(val);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
