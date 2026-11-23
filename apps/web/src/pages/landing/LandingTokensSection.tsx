import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardDescription, Badge, Button, useCinderTheme } from "@tec-triad/cinder-ui";
import { ArrowRight, Copy, Check, Sparkles, Layers, Sliders, Server, Zap } from "lucide-react";

interface ThemePreset {
  readonly id: string;
  readonly name: string;
  readonly primaryColor: string;
  readonly primaryHover: string;
  readonly description: string;
}

const THEME_PRESETS: readonly ThemePreset[] = [
  {
    id: "violet",
    name: "Violet Nebula",
    primaryColor: "#8b5cf6",
    primaryHover: "#7c3aed",
    description: "Modern electric violet brand highlights.",
  },
  {
    id: "slate",
    name: "Cinder Slate",
    primaryColor: "#3b82f6",
    primaryHover: "#2563eb",
    description: "Enterprise royal blue foundational tokens.",
  },
  {
    id: "emerald",
    name: "Cyber Emerald",
    primaryColor: "#10b981",
    primaryHover: "#059669",
    description: "Vibrant neon emerald action accents.",
  },
];

export function LandingTokensSection(): ReactElement {
  const { resolvedMode } = useCinderTheme();
  const isLight: boolean = resolvedMode === "light";

  const [selectedPresetId, setSelectedPresetId] = useState<string>("violet");
  const [isAutoMitigate, setIsAutoMitigate] = useState<boolean>(true);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const activePreset: ThemePreset =
    THEME_PRESETS.find((p) => p.id === selectedPresetId) || THEME_PRESETS[0];

  // Harmonized landing page background tokens
  const activeCanvasBg: string = isLight ? "#fafafa" : "#09090b";
  const activeSurfaceBg: string = isLight ? "#ffffff" : "#121215";
  const activeBorderColor: string = isLight ? "#e4e4e7" : "#27272a";
  const activeAccentBorder: string = `${activePreset.primaryColor}${isLight ? "40" : "55"}`;

  const codeSnippet: string = `:root {
  --cinder-primary: ${activePreset.primaryColor};
  --cinder-surface: ${activeSurfaceBg};
  --cinder-bg: ${activeCanvasBg};
}`;

  const handleCopySnippet = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      setHasCopied(false);
    }
  };

  return (
    <section className="section theming-section" aria-labelledby="theming-heading">
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <Badge variant="primary" size="md">
              Custom Theming Engine
            </Badge>
          </div>
          <h2 id="theming-heading" className="section-title">
            Tailored to Your Brand. Unlimited Themes.
          </h2>
          <p className="section-desc">
            Cinder Slate is just the beginning. Override semantic tokens in 3 lines of CSS,
            create multi-brand themes, or support tenant white-labeling with zero CSS-in-JS overhead.
          </p>
        </div>

        {/* Interactive Theming Canvas */}
        <div className="theme-showcase-wrapper">
          <Card variant="surface" className="theme-presets-card">
            {/* Preset Selector Toolbar */}
            <div className="theme-presets-header">
              <span className="theme-presets-label">Select Brand Preset:</span>
              <div className="theme-presets-pills" role="tablist" aria-label="Theme brand presets">
                {THEME_PRESETS.map((preset: ThemePreset) => {
                  const isSelected: boolean = preset.id === selectedPresetId;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      className={`theme-preset-btn ${isSelected ? "theme-preset-btn-active" : ""}`}
                      onClick={() => setSelectedPresetId(preset.id)}
                    >
                      <span
                        className="theme-preset-dot"
                        style={{ backgroundColor: preset.primaryColor }}
                        aria-hidden="true"
                      />
                      <span>{preset.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Preview Deck */}
            <div className="theme-preview-deck">
              {/* Left Column: Live Custom-Themed Preview Components */}
              <div
                className="theme-live-preview-box"
                style={{
                  backgroundColor: activeSurfaceBg,
                  borderColor: activeBorderColor,
                }}
              >
                <div className="theme-live-preview-top">
                  <span
                    className="theme-live-chip"
                    style={{
                      color: activePreset.primaryColor,
                      borderColor: activeAccentBorder,
                    }}
                  >
                    Live Themed Surface
                  </span>
                  <span className="theme-live-palette-name">{activePreset.name}</span>
                </div>

                <div className="theme-live-preview-body">
                  {/* Themed Tile Component */}
                  <div
                    className="theme-live-tile"
                    style={{
                      backgroundColor: activeCanvasBg,
                      borderColor: activeBorderColor,
                    }}
                  >
                    <div
                      className="theme-live-tile-icon"
                      style={{
                        backgroundColor: `${activePreset.primaryColor}18`,
                        borderColor: activeAccentBorder,
                        color: activePreset.primaryColor,
                      }}
                    >
                      <Server size={18} aria-hidden="true" />
                    </div>
                    <div className="theme-live-tile-info">
                      <span className="theme-live-tile-label">Enterprise Cluster</span>
                      <span className="theme-live-tile-val">US-East-1 &bull; 99.98% Uptime</span>
                    </div>
                    <span
                      className="theme-live-tile-badge"
                      style={{
                        backgroundColor: `${activePreset.primaryColor}18`,
                        color: activePreset.primaryColor,
                        borderColor: activeAccentBorder,
                      }}
                    >
                      Active
                    </span>
                  </div>

                  {/* Interactive Controls: Switch & Dynamic Progress */}
                  <div className="theme-live-controls-row">
                    <div className="theme-live-control-item">
                      <span className="theme-live-control-label">Auto-Mitigation</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isAutoMitigate}
                        aria-label="Toggle auto-mitigation rule"
                        className={`theme-live-switch ${isAutoMitigate ? "theme-live-switch-on" : ""}`}
                        style={{
                          backgroundColor: isAutoMitigate ? activePreset.primaryColor : "var(--cinder-border)",
                        }}
                        onClick={() => setIsAutoMitigate(!isAutoMitigate)}
                      >
                        <span className="theme-live-switch-thumb" />
                      </button>
                    </div>

                    <div className="theme-live-progress-box">
                      <div className="theme-live-progress-labels">
                        <span className="theme-live-control-label">Throughput</span>
                        <span className="theme-live-progress-val" style={{ color: activePreset.primaryColor }}>
                          {isAutoMitigate ? "840 MB/s" : "320 MB/s"}
                        </span>
                      </div>
                      <div className="theme-live-progress-track">
                        <div
                          className="theme-live-progress-bar"
                          style={{
                            width: isAutoMitigate ? "76%" : "35%",
                            backgroundColor: activePreset.primaryColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Themed Action Buttons */}
                  <div className="theme-live-actions">
                    <button
                      type="button"
                      className="theme-live-btn"
                      style={{
                        backgroundColor: activePreset.primaryColor,
                        color: "#ffffff",
                      }}
                    >
                      <Zap size={14} aria-hidden="true" />
                      <span>Deploy Cluster</span>
                    </button>
                    <button
                      type="button"
                      className="theme-live-btn-outline"
                      style={{
                        borderColor: activeAccentBorder,
                        color: activePreset.primaryColor,
                      }}
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Copyable CSS Override Snippet */}
              <div className="theme-code-box">
                <div className="theme-code-header">
                  <span className="theme-code-title">CSS Variables Override</span>
                  <button
                    type="button"
                    className="theme-copy-btn"
                    onClick={handleCopySnippet}
                    aria-label={hasCopied ? "Snippet copied" : "Copy theming CSS snippet"}
                  >
                    {hasCopied ? (
                      <>
                        <Check size={13} color="var(--cinder-success)" aria-hidden="true" />
                        <span style={{ color: "var(--cinder-success)" }}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="theme-code-block">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Bottom Footer Callout */}
            <div className="theme-card-footer">
              <span className="theme-footer-note">
                Need full control? All colors, radii, spacing, and typography are tokenized.
              </span>
              <Button
                as={Link}
                to="/tokens"
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight size={14} aria-hidden="true" />}
              >
                Explore All Tokens
              </Button>
            </div>
          </Card>

          {/* 3 Value Pillars */}
          <div className="theme-pillars-grid">
            <Card variant="surface" className="theme-pillar-card">
              <div className="theme-pillar-icon">
                <Sparkles size={20} color="var(--cinder-primary)" aria-hidden="true" />
              </div>
              <CardTitle className="theme-pillar-title">Zero Runtime Overhead</CardTitle>
              <CardDescription className="theme-pillar-desc">
                Pure CSS custom properties without runtime styling JavaScript or bundle penalty.
              </CardDescription>
            </Card>

            <Card variant="surface" className="theme-pillar-card">
              <div className="theme-pillar-icon">
                <Layers size={20} color="var(--cinder-primary)" aria-hidden="true" />
              </div>
              <CardTitle className="theme-pillar-title">Dark &amp; Light Duality</CardTitle>
              <CardDescription className="theme-pillar-desc">
                Seamless system preference detection (<code className="theme-pillar-code">prefers-color-scheme</code>) with manual overrides.
              </CardDescription>
            </Card>

            <Card variant="surface" className="theme-pillar-card">
              <div className="theme-pillar-icon">
                <Sliders size={20} color="var(--cinder-primary)" aria-hidden="true" />
              </div>
              <CardTitle className="theme-pillar-title">Enterprise Custom Themes</CardTitle>
              <CardDescription className="theme-pillar-desc">
                Effortlessly white-label your applications or support multi-tenant theming rules.
              </CardDescription>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
