import { useState, type ReactElement, type MouseEvent } from "react";
import { IconForge } from "@tec-triad/iconforge-react";
import {
  generateSvgString,
  generateJsxSnippet,
  downloadSvgFile,
  type IconDefinition,
  type IconVariant,
} from "@tec-triad/iconforge-core";

interface IconCardProps {
  icon: IconDefinition;
  variant: IconVariant;
  size: number;
  strokeWidth: number;
  primaryColor: string;
  secondaryColor: string;
  viewMode: "grid" | "list";
  isBatchSelected: boolean;
  isFavorite: boolean;
  onSelect: (icon: IconDefinition) => void;
  onToggleBatch: (iconName: string) => void;
  onToggleFavorite: (iconName: string) => void;
}

export function IconCard({
  icon,
  variant,
  size,
  strokeWidth,
  primaryColor,
  secondaryColor,
  viewMode,
  isBatchSelected,
  isFavorite,
  onSelect,
  onToggleBatch,
  onToggleFavorite,
}: IconCardProps): ReactElement {
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  const handleCopySvg = (e: MouseEvent): void => {
    e.stopPropagation();
    const svgStr = generateSvgString(icon, variant, {
      size: 24,
      strokeWidth,
      primaryColor,
      secondaryColor,
    });
    navigator.clipboard.writeText(svgStr);
    setCopiedAction("svg");
    setTimeout(() => setCopiedAction(null), 1800);
  };

  const handleCopyJsx = (e: MouseEvent): void => {
    e.stopPropagation();
    const jsx = generateJsxSnippet(icon.name, variant, size, primaryColor);
    navigator.clipboard.writeText(jsx);
    setCopiedAction("jsx");
    setTimeout(() => setCopiedAction(null), 1800);
  };

  const handleDownload = (e: MouseEvent): void => {
    e.stopPropagation();
    downloadSvgFile(icon, variant, {
      size: 24,
      strokeWidth,
      primaryColor,
      secondaryColor,
    });
  };

  const handleBatchToggle = (e: MouseEvent): void => {
    e.stopPropagation();
    onToggleBatch(icon.name);
  };

  const handleFavoriteToggle = (e: MouseEvent): void => {
    e.stopPropagation();
    onToggleFavorite(icon.name);
  };

  return (
    <div
      className={`icon-card-root ${viewMode === "list" ? "list-mode" : ""} ${isBatchSelected ? "batch-selected" : ""}`}
      onClick={(): void => onSelect(icon)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(icon);
        }
      }}
    >
      {/* Top action icons */}
      <div className="icon-card-header-actions">
        {/* Batch selection checkbox */}
        <button
          type="button"
          className={`icon-batch-checkbox ${isBatchSelected ? "checked" : ""}`}
          onClick={handleBatchToggle}
          title={isBatchSelected ? "Remove from batch" : "Add to batch export"}
          aria-label="Toggle batch selection"
        >
          {isBatchSelected ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <span className="icon-checkbox-blank" />
          )}
        </button>

        {/* Favorite star */}
        <button
          type="button"
          className={`icon-fav-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteToggle}
          title={isFavorite ? "Remove from favorites" : "Save to favorites"}
          aria-label="Toggle favorite"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#f59e0b" : "none"}
            stroke={isFavorite ? "#f59e0b" : "currentColor"}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      {/* Main Vector Preview */}
      <div className="icon-card-preview-area">
        <IconForge
          name={icon.name}
          variant={variant}
          size={size}
          strokeWidth={strokeWidth}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>

      {/* Label & Category */}
      <div className="icon-card-meta">
        <span className="icon-card-name" title={icon.name}>
          {icon.name}
        </span>
        <span className="icon-card-category">{icon.category}</span>
      </div>

      {/* Hover action toolbar */}
      <div className="icon-card-hover-actions">
        <button
          type="button"
          className="icon-card-action-btn"
          onClick={handleCopySvg}
          title="Copy SVG XML"
        >
          {copiedAction === "svg" ? "Copied!" : "SVG"}
        </button>
        <button
          type="button"
          className="icon-card-action-btn"
          onClick={handleCopyJsx}
          title="Copy JSX Component"
        >
          {copiedAction === "jsx" ? "Copied!" : "JSX"}
        </button>
        <button
          type="button"
          className="icon-card-action-btn"
          onClick={handleDownload}
          title="Download .svg file"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
