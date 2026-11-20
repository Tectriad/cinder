import { useState, useMemo, type ReactElement } from "react";
import {
  CDIcons,
  CDButton,
  CDInput,
  CDBadge,
  ALL_CD_ICONS,
  type CDIconMetadata,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function IconDocPage(): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = useMemo<CDIconMetadata[]>(() => {
    return ALL_CD_ICONS.filter((icon: CDIconMetadata) => {
      const matchesCategory =
        selectedCategory === "all" || icon.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        term === "" ||
        icon.name.toLowerCase().includes(term) ||
        icon.keywords.some((k: string) => k.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (iconName: string): void => {
    const snippet = `<${iconName} size="md" />`;
    navigator.clipboard.writeText(snippet);
    setCopiedIcon(iconName);
    setTimeout(() => {
      setCopiedIcon(null);
    }, 2000);
  };

  const iconProps = [
    {
      property: "size",
      description: "Dimensions of the icon ('xs' | 'sm' | 'md' | 'lg' | 'xl' | number)",
      type: "CDIconSize",
      default: "20 ('md')",
    },
    {
      property: "color",
      description: "Stroke color of the SVG. Inherits current text color by default",
      type: "string",
      default: "'currentColor'",
    },
    {
      property: "strokeWidth",
      description: "Stroke thickness following Hugeicons 1.5px baseline",
      type: "number | string",
      default: "1.5",
    },
    {
      property: "className",
      description: "Additional CSS classes applied to the root svg",
      type: "string",
      default: "undefined",
    },
    {
      property: "viewBox",
      description: "SVG coordinate space",
      type: "string",
      default: "'0 0 24 24'",
    },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDIcon / CDIcons</h1>
        <p className="cinder-doc-lead">
          Stroke-based vector iconography crafted with Hugeicons geometric
          precision (24x24 coordinate grid, 1.5px stroke width, rounded caps and
          joins). Includes 40+ essential icons across general, navigation,
          action, and system categories.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDIcon, CDIcons, CDSparklesIcon, ALL_CD_ICONS &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>
            Provide intuitive visual metaphors for actions, navigation, status,
            and data types.
          </li>
          <li>
            Embed as prefixes or suffixes in <code>CDButton</code> and{" "}
            <code>CDInput</code> components.
          </li>
          <li>
            Zero emoji requirement: Always use clean vector SVGs instead of
            unicode emoji glyphs across the interface.
          </li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            title="Standard Sizes"
            description="Built-in size presets: xs (14px), sm (16px), md (20px), lg (24px), xl (32px), or explicit numerical pixel values."
            code={`import { CDSparklesIcon, CDSunIcon, CDFlameIcon } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <CDSparklesIcon size="xs" />
    <CDSparklesIcon size="sm" />
    <CDSparklesIcon size="md" />
    <CDSparklesIcon size="lg" />
    <CDSparklesIcon size="xl" />
    <CDFlameIcon size={40} color="var(--cinder-primary)" />
  </div>
);`}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <CDIcons.Sparkles size="xs" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  xs (14px)
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Sparkles size="sm" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  sm (16px)
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Sparkles size="md" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  md (20px)
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Sparkles size="lg" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  lg (24px)
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Sparkles size="xl" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  xl (32px)
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Flame size={40} color="var(--cinder-primary)" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  Custom (40px)
                </div>
              </div>
            </div>
          </DemoCard>

          <DemoCard
            title="Stroke Width & Semantic Colors"
            description="Customize stroke thickness (1.0, 1.5 default, 2.0, 2.5) and pass any theme token color."
            code={`import { CDShieldIcon, CDCheckCircleIcon, CDAlertCircleIcon } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <CDShieldIcon strokeWidth={1} size="lg" />
    <CDShieldIcon strokeWidth={1.5} size="lg" />
    <CDShieldIcon strokeWidth={2} size="lg" />
    <CDShieldIcon strokeWidth={2.5} size="lg" />
    <CDCheckCircleIcon size="lg" color="var(--cinder-success)" />
    <CDAlertCircleIcon size="lg" color="var(--cinder-warning)" />
  </div>
);`}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <CDIcons.Shield strokeWidth={1} size="lg" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  1.0px
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Shield strokeWidth={1.5} size="lg" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  1.5px (Default)
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Shield strokeWidth={2} size="lg" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  2.0px
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.Shield strokeWidth={2.5} size="lg" />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                  2.5px
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.CheckCircle size="lg" color="var(--cinder-success)" />
                <div style={{ fontSize: "11px", color: "var(--cinder-success)", marginTop: "4px" }}>
                  Success
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <CDIcons.AlertCircle size="lg" color="var(--cinder-warning)" />
                <div style={{ fontSize: "11px", color: "var(--cinder-warning)", marginTop: "4px" }}>
                  Warning
                </div>
              </div>
            </div>
          </DemoCard>

          <DemoCard
            title="Component Integration"
            description="Seamlessly pass CDIcons as prefix or suffix icons into buttons and text inputs."
            code={`import { CDButton, CDInput, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px' }}>
    <CDInput
      placeholder="Search documentation..."
      prefixIcon={<CDIcons.Search size="sm" />}
    />
    <CDButton variant="primary" suffixIcon={<CDIcons.ArrowRight size="sm" />}>
      Explore Components
    </CDButton>
  </div>
);`}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "360px",
              }}
            >
              <CDInput
                placeholder="Search documentation..."
                prefixIcon={<CDIcons.Search size="sm" />}
              />
              <CDButton
                variant="primary"
                suffixIcon={<CDIcons.ArrowRight size="sm" />}
              >
                Explore Components
              </CDButton>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="gallery" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Interactive Icon Gallery</h2>
        <p className="cinder-doc-lead" style={{ marginBottom: "16px" }}>
          Click any icon to copy its JSX component snippet directly to your
          clipboard.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: "1 1 240px", maxWidth: "340px" }}>
            <CDInput
              placeholder="Filter icons by name or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefixIcon={<CDIcons.Search size="sm" />}
            />
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["all", "general", "navigation", "actions", "media"].map(
              (category: string) => (
                <CDButton
                  key={category}
                  size="sm"
                  variant={
                    selectedCategory === category ? "primary" : "secondary"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CDButton>
              ),
            )}
          </div>

          <CDBadge variant="default">
            {filteredIcons.length} {filteredIcons.length === 1 ? "icon" : "icons"}
          </CDBadge>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "12px",
          }}
        >
          {filteredIcons.map((icon: CDIconMetadata) => {
            const IconComponent = icon.component;
            const isCopied = copiedIcon === icon.name;

            return (
              <button
                key={icon.name}
                type="button"
                onClick={() => handleCopy(icon.name)}
                style={{
                  background: isCopied
                    ? "var(--cinder-surface-hover)"
                    : "var(--cinder-surface)",
                  border: isCopied
                    ? "1px solid var(--cinder-primary)"
                    : "1px solid var(--cinder-border)",
                  borderRadius: "8px",
                  padding: "16px 8px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  color: "var(--cinder-text)",
                  outline: "none",
                }}
                title={`Click to copy <${icon.name} />`}
              >
                <div
                  style={{
                    color: isCopied
                      ? "var(--cinder-primary)"
                      : "var(--cinder-text)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "36px",
                  }}
                >
                  <IconComponent size={24} />
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono, monospace)",
                    marginTop: "8px",
                    color: isCopied
                      ? "var(--cinder-primary)"
                      : "var(--cinder-muted)",
                    textAlign: "center",
                    wordBreak: "break-all",
                    lineHeight: 1.2,
                  }}
                >
                  {isCopied ? "Copied!" : icon.name.replace(/^CD/, "")}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <ApiTable title="CDIconProps API" data={iconProps} />
      </section>
    </div>
  );
}
