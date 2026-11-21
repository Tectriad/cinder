import { useState, type ReactElement } from "react";
import {
  ALL_ICONS,
  createZipArchive,
  generateSvgString,
  generateReactImport,
  type IconVariant,
  type IconDefinition,
} from "@iconforge/core";

interface IconBatchTrayProps {
  selectedNames: string[];
  currentVariant: IconVariant;
  primaryColor: string;
  secondaryColor: string;
  onClear: () => void;
  onSelectAll: () => void;
}

export function IconBatchTray({
  selectedNames,
  currentVariant,
  primaryColor,
  secondaryColor,
  onClear,
  onSelectAll,
}: IconBatchTrayProps): ReactElement | null {
  const [copiedBatch, setCopiedBatch] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  if (selectedNames.length === 0) return null;

  const handleCopyImports = (): void => {
    const importStatements = selectedNames
      .map((name: string) => generateReactImport(name))
      .join("\n");
    navigator.clipboard.writeText(importStatements);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  };

  const handleDownloadZip = (): void => {
    setIsZipping(true);
    try {
      const files: Array<{ name: string; content: string }> = [];

      for (const name of selectedNames) {
        const iconDef: IconDefinition | undefined = ALL_ICONS.find(
          (i: IconDefinition) => i.name === name,
        );
        if (iconDef) {
          const svgContent = generateSvgString(iconDef, currentVariant, {
            size: 24,
            strokeWidth: 2,
            primaryColor,
            secondaryColor,
          });
          files.push({
            name: `${name}-${currentVariant}.svg`,
            content: svgContent,
          });
        }
      }

      const zipBlob = createZipArchive(files);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `iconforge-${currentVariant}-bundle.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="icon-batch-tray-root">
      <div className="icon-batch-tray-inner">
        <div className="icon-batch-count-group">
          <span className="icon-batch-badge">{selectedNames.length}</span>
          <span className="icon-batch-label">icons selected for export</span>
        </div>

        <div className="icon-batch-actions-group">
          <button
            type="button"
            className="icon-batch-secondary-btn"
            onClick={onSelectAll}
          >
            Select All ({ALL_ICONS.length})
          </button>
          <button
            type="button"
            className="icon-batch-secondary-btn"
            onClick={handleCopyImports}
          >
            {copiedBatch ? "Copied!" : "Copy Imports"}
          </button>
          <button
            type="button"
            className="icon-batch-primary-btn"
            onClick={handleDownloadZip}
            disabled={isZipping}
          >
            {isZipping ? "Creating ZIP..." : `Download ZIP (${selectedNames.length})`}
          </button>
          <button
            type="button"
            className="icon-batch-clear-btn"
            onClick={onClear}
            title="Clear selection"
            aria-label="Clear batch selection"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
