import { useState, type ReactElement } from "react";
import { IconForge } from "@tec-triad/iconforge-react";
import {
  generateSvgString,
  generateJsxSnippet,
  generateReactImport,
  downloadSvgFile,
  getRelatedIcons,
  type IconDefinition,
  type IconVariant,
} from "@tec-triad/iconforge-core";

interface IconDetailModalProps {
  icon: IconDefinition | null;
  currentVariant: IconVariant;
  primaryColor: string;
  secondaryColor: string;
  onClose: () => void;
  onSelectIcon: (icon: IconDefinition) => void;
}

type CodeTab = "jsx" | "import" | "svg" | "html";

const ALL_VARIANTS: IconVariant[] = [
  "outline",
  "filled",
  "duotone",
  "multicolor",
  "gradient",
  "rounded",
];

export function IconDetailModal({
  icon,
  currentVariant,
  primaryColor,
  secondaryColor,
  onClose,
  onSelectIcon,
}: IconDetailModalProps): ReactElement | null {
  const [activeVariant, setActiveVariant] = useState<IconVariant>(currentVariant);
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("jsx");
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);
  const [zoomSize, setZoomSize] = useState<number>(96);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!icon) return null;

  const relatedIcons = getRelatedIcons(icon, 5);

  const svgString = generateSvgString(icon, activeVariant, {
    size: 24,
    strokeWidth: 2,
    primaryColor,
    secondaryColor,
  });

  const jsxSnippet = generateJsxSnippet(icon.name, activeVariant, 24, primaryColor);
  const importSnippet = generateReactImport(icon.name);

  const getCodeContent = (): string => {
    switch (activeCodeTab) {
      case "jsx":
        return jsxSnippet;
      case "import":
        return importSnippet;
      case "svg":
      case "html":
        return svgString;
    }
  };

  const handleCopyCode = (): void => {
    navigator.clipboard.writeText(getCodeContent());
    setCopiedTab(activeCodeTab);
    setTimeout(() => setCopiedTab(null), 1800);
  };

  const handleDownload = (variantToDownload: IconVariant): void => {
    downloadSvgFile(icon, variantToDownload, {
      size: 24,
      strokeWidth: 2,
      primaryColor,
      secondaryColor,
    });
  };

  return (
    <div className="icon-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="icon-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="icon-modal-header">
          <div className="icon-modal-title-group">
            <h2 className="icon-modal-title">{icon.label}</h2>
            <span className="icon-modal-name-tag"><code>{icon.name}</code></span>
            <span className="icon-modal-cat-tag">{icon.category}</span>
          </div>
          <button
            type="button"
            className="icon-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="icon-modal-body">
          {/* Left: 24x24 Optical Grid Inspector */}
          <div className="icon-inspector-pane">
            <div className={`icon-grid-stage ${showGridOverlay ? "has-grid" : ""}`}>
              <IconForge
                name={icon.name}
                variant={activeVariant}
                size={zoomSize}
                strokeWidth={2}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </div>

            {/* Stage controls */}
            <div className="icon-stage-controls">
              <div className="icon-stage-zoom-group">
                <span className="icon-stage-label">Scale:</span>
                {[48, 96, 128].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`icon-stage-scale-btn ${zoomSize === s ? "active" : ""}`}
                    onClick={(): void => setZoomSize(s)}
                  >
                    {s}px
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={`icon-grid-toggle-btn ${showGridOverlay ? "active" : ""}`}
                onClick={(): void => setShowGridOverlay(!showGridOverlay)}
              >
                24x24 Grid
              </button>
            </div>

            {/* 6 Styles Gallery Bar */}
            <div className="icon-styles-gallery-heading">Available Styles (6)</div>
            <div className="icon-styles-gallery-row">
              {ALL_VARIANTS.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`icon-style-thumb ${activeVariant === v ? "active" : ""}`}
                  onClick={(): void => setActiveVariant(v)}
                >
                  <IconForge
                    name={icon.name}
                    variant={v}
                    size={28}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                  />
                  <span className="icon-style-thumb-label">{v}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Code, Metadata, and Export */}
          <div className="icon-metadata-pane">
            {/* Metadata tags */}
            <div className="icon-meta-section">
              <span className="icon-meta-label">Keywords &amp; Aliases</span>
              <div className="icon-tag-chips">
                {icon.tags.map((t) => (
                  <span key={t} className="icon-tag-chip">{t}</span>
                ))}
                {icon.aliases.map((a) => (
                  <span key={`alias-${a}`} className="icon-tag-chip alias">alias: {a}</span>
                ))}
              </div>
            </div>

            {/* Code Snippets Section */}
            <div className="icon-code-section">
              <div className="icon-code-tabs-header">
                <div className="icon-code-tabs">
                  {(["jsx", "import", "svg", "html"] as CodeTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`icon-code-tab ${activeCodeTab === tab ? "active" : ""}`}
                      onClick={(): void => setActiveCodeTab(tab)}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="icon-code-copy-btn"
                  onClick={handleCopyCode}
                >
                  {copiedTab === activeCodeTab ? "Copied!" : "Copy Code"}
                </button>
              </div>
              <pre className="icon-code-block">
                <code>{getCodeContent()}</code>
              </pre>
            </div>

            {/* Download Buttons for Current Style & All Styles */}
            <div className="icon-download-actions-row">
              <button
                type="button"
                className="icon-download-primary-btn"
                onClick={(): void => handleDownload(activeVariant)}
              >
                Download {activeVariant.toUpperCase()} SVG
              </button>
            </div>

            {/* Related icons */}
            {relatedIcons.length > 0 && (
              <div className="icon-related-section">
                <span className="icon-meta-label">Related Icons</span>
                <div className="icon-related-row">
                  {relatedIcons.map((rel) => (
                    <button
                      key={rel.name}
                      type="button"
                      className="icon-related-pill"
                      onClick={(): void => onSelectIcon(rel)}
                      title={`Open ${rel.name}`}
                    >
                      <IconForge name={rel.name} size={16} variant={activeVariant} />
                      <span>{rel.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
