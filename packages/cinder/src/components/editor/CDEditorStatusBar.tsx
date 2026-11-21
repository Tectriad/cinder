import type { ReactElement } from "react";

export interface CDEditorStatusBarProps {
  wordCount: number;
  charCount: number;
  maxLength?: number;
  showWordCount?: boolean;
}

export function CDEditorStatusBar({
  wordCount,
  charCount,
  maxLength,
  showWordCount = true,
}: CDEditorStatusBarProps): ReactElement {
  return (
    <div className="cinder-editor-status-bar">
      <div className="cinder-editor-status-left">
        <span className="cinder-editor-status-tag">Markdown &amp; Rich Text</span>
        <span className="cinder-editor-status-hint">Type @ for mentions</span>
      </div>

      <div className="cinder-editor-status-right">
        {showWordCount && (
          <>
            <span className="cinder-editor-stat-item">
              <strong>{wordCount}</strong> {wordCount === 1 ? "word" : "words"}
            </span>
            <span className="cinder-editor-stat-divider">&bull;</span>
            <span className="cinder-editor-stat-item">
              <strong>{charCount}</strong>
              {maxLength ? ` / ${maxLength}` : ""}{" "}
              {charCount === 1 ? "char" : "chars"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
