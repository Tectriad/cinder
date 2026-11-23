import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Button } from "@tec-triad/cinder-ui";
import { IconForge } from "@tec-triad/iconforge-react";
import type { IconVariant } from "@tec-triad/iconforge-core";
import { ArrowRight } from "lucide-react";

interface StyleOption {
  readonly id: IconVariant;
  readonly label: string;
  readonly description: string;
}

const STYLES: readonly StyleOption[] = [
  { id: "outline", label: "Outline", description: "Crisp geometric stroke architecture." },
  { id: "filled", label: "Filled", description: "Solid silhouette with high optical contrast." },
  { id: "duotone", label: "Duotone", description: "Two-tone layered depth with 20% alpha secondary." },
  { id: "multicolor", label: "Multicolor", description: "Multi-hue thematic vector accenting." },
  { id: "gradient", label: "Gradient", description: "Precision radial & linear tonal transitions." },
  { id: "rounded", label: "Rounded", description: "Softened curvature with ergonomic cap joins." },
];

const SHOWCASE_ICONS: readonly { name: string; label: string }[] = [
  { name: "search", label: "Search" },
  { name: "heart", label: "Heart" },
  { name: "shield", label: "Shield" },
  { name: "sparkles", label: "Sparkles" },
  { name: "settings", label: "Settings" },
  { name: "user", label: "User" },
  { name: "bell", label: "Bell" },
  { name: "folder", label: "Folder" },
  { name: "lock", label: "Lock" },
  { name: "check-circle", label: "CheckCircle" },
  { name: "cpu", label: "Cpu" },
  { name: "zap", label: "Zap" },
];

export function LandingIconForgeSection(): ReactElement {
  const [selectedStyle, setSelectedStyle] = useState<IconVariant>("duotone");

  const activeStyleMeta: StyleOption =
    STYLES.find((s) => s.id === selectedStyle) || STYLES[0];

  return (
    <section className="section iconforge-section" aria-labelledby="iconforge-heading">
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <Badge variant="accent" size="md" dot>
              Vector Icon Engine
            </Badge>
          </div>
          <h2 id="iconforge-heading" className="section-title">
            IconForge: 1,000+ Icons in 6 Visual Styles
          </h2>
          <p className="section-desc">
            One API, zero runtime rasterization. Switch seamlessly between Outline, Filled, Duotone,
            Multicolor, Gradient, and Rounded styles across React, Vue, and raw SVG.
          </p>
        </div>

        {/* Style Selector Pills */}
        <div className="iconforge-styles-toolbar">
          <div className="iconforge-styles-pills" role="tablist" aria-label="Icon visual styles">
            {STYLES.map((style: StyleOption) => {
              const isSelected: boolean = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`iconforge-style-btn ${isSelected ? "iconforge-style-btn-active" : ""}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <span>{style.label}</span>
                </button>
              );
            })}
          </div>

          <p className="iconforge-style-caption">
            <strong>{activeStyleMeta.label} Style:</strong> {activeStyleMeta.description}
          </p>
        </div>

        {/* Icon Grid Showcase */}
        <div className="iconforge-grid">
          {SHOWCASE_ICONS.map((icon) => (
            <Card key={icon.name} variant="surface" interactive className="iconforge-card">
              <div className="iconforge-icon-preview">
                <IconForge
                  name={icon.name}
                  variant={selectedStyle}
                  size={32}
                  color="var(--cinder-primary)"
                  aria-label={`${icon.label} icon in ${selectedStyle} style`}
                />
              </div>
              <span className="iconforge-icon-name">{icon.label}</span>
              <span className="iconforge-icon-style-tag">{selectedStyle}</span>
            </Card>
          ))}
        </div>

        {/* Studio Banner Callout */}
        <div className="iconforge-studio-callout">
          <div className="iconforge-studio-text">
            <h3 className="iconforge-studio-title">IconForge Interactive Studio</h3>
            <p className="iconforge-studio-desc">
              Explore the entire 1,000+ vector icon catalog with multi-keyword search, color customization,
              SVG export, and single-click React component copying.
            </p>
          </div>
          <Button
            as={Link}
            to="/icons"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={16} aria-hidden="true" />}
          >
            Launch Icon Studio
          </Button>
        </div>
      </div>
    </section>
  );
}
