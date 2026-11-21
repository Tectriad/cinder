import { useState, useRef, useEffect, type ReactElement } from "react";
import type { CDEditorToolbarProps, CDEditorColorPreset } from "./types";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconListBullet,
  IconListOrdered,
  IconListRoman,
  IconCode,
  IconTextColor,
  IconHighlight,
  IconAtSign,
  IconMessageComment,
  IconUndo,
  IconRedo,
  IconClearFormat,
} from "./EditorIcons";

const TEXT_COLOR_PRESETS: CDEditorColorPreset[] = [
  { name: "Default", value: "inherit" },
  { name: "Royal Blue", value: "#3b82f6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#ef4444" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Muted Slate", value: "#94a3b8" },
];

const HIGHLIGHT_COLOR_PRESETS: CDEditorColorPreset[] = [
  { name: "None", value: "transparent" },
  { name: "Soft Blue", value: "rgba(59, 130, 246, 0.28)" },
  { name: "Soft Cyan", value: "rgba(6, 182, 212, 0.28)" },
  { name: "Soft Green", value: "rgba(16, 185, 129, 0.28)" },
  { name: "Soft Amber", value: "rgba(245, 158, 11, 0.28)" },
  { name: "Soft Rose", value: "rgba(239, 68, 68, 0.28)" },
  { name: "Soft Purple", value: "rgba(139, 92, 246, 0.28)" },
  { name: "Soft Slate", value: "rgba(148, 163, 184, 0.25)" },
];

export function CDEditorToolbar({
  disabled = false,
  onFormat,
  onApplyList,
  onInsertCode,
  onApplyColor,
  onOpenMentions,
  onOpenAnnotation,
  onClearFormat,
  onUndo,
  onRedo,
  toolbarExtra,
}: CDEditorToolbarProps): ReactElement {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState<boolean>(false);
  const [showCodeMenu, setShowCodeMenu] = useState<boolean>(false);

  const colorRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (colorRef.current && !colorRef.current.contains(target)) {
        setShowColorPicker(false);
      }
      if (highlightRef.current && !highlightRef.current.contains(target)) {
        setShowHighlightPicker(false);
      }
      if (codeRef.current && !codeRef.current.contains(target)) {
        setShowCodeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="cinder-editor-toolbar" role="toolbar" aria-label="Rich Text Formatting">
      {/* History */}
      <div className="cinder-editor-btn-group">
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
          disabled={disabled}
          onClick={onUndo}
        >
          <IconUndo size={15} />
        </button>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
          disabled={disabled}
          onClick={onRedo}
        >
          <IconRedo size={15} />
        </button>
      </div>

      <div className="cinder-editor-divider" />

      {/* Basic Text Formats */}
      <div className="cinder-editor-btn-group">
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Bold (Ctrl+B)"
          aria-label="Bold"
          disabled={disabled}
          onClick={() => onFormat("bold")}
        >
          <IconBold size={15} />
        </button>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Italic (Ctrl+I)"
          aria-label="Italic"
          disabled={disabled}
          onClick={() => onFormat("italic")}
        >
          <IconItalic size={15} />
        </button>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Underline (Ctrl+U)"
          aria-label="Underline"
          disabled={disabled}
          onClick={() => onFormat("underline")}
        >
          <IconUnderline size={15} />
        </button>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Strikethrough"
          aria-label="Strikethrough"
          disabled={disabled}
          onClick={() => onFormat("strikeThrough")}
        >
          <IconStrikethrough size={15} />
        </button>
      </div>

      <div className="cinder-editor-divider" />

      {/* Lists (Ordered 1,2,3 - Roman Numerals - Bullets) */}
      <div className="cinder-editor-btn-group">
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Bullet List"
          aria-label="Bullet List"
          disabled={disabled}
          onClick={() => onApplyList("bullet")}
        >
          <IconListBullet size={15} />
        </button>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Numbered List (1, 2, 3)"
          aria-label="Numbered List (1, 2, 3)"
          disabled={disabled}
          onClick={() => onApplyList("number")}
        >
          <IconListOrdered size={15} />
        </button>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Roman Numeral List (i, ii, iii)"
          aria-label="Roman Numeral List"
          disabled={disabled}
          onClick={() => onApplyList("roman")}
        >
          <IconListRoman size={15} />
        </button>
      </div>

      <div className="cinder-editor-divider" />

      {/* Code Formatting */}
      <div className="cinder-editor-btn-group" ref={codeRef}>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Inline Code / Code Block"
          aria-label="Code"
          disabled={disabled}
          onClick={() => setShowCodeMenu(!showCodeMenu)}
        >
          <IconCode size={15} />
        </button>
        {showCodeMenu && (
          <div className="cinder-editor-dropdown-popover">
            <button
              type="button"
              className="cinder-editor-dropdown-item"
              onClick={() => {
                onInsertCode(false);
                setShowCodeMenu(false);
              }}
            >
              <span>Inline Code</span>
              <kbd className="cinder-editor-kbd">`code`</kbd>
            </button>
            <button
              type="button"
              className="cinder-editor-dropdown-item"
              onClick={() => {
                onInsertCode(true);
                setShowCodeMenu(false);
              }}
            >
              <span>Code Block</span>
              <kbd className="cinder-editor-kbd">```</kbd>
            </button>
          </div>
        )}
      </div>

      <div className="cinder-editor-divider" />

      {/* Colors (Text Color & Background Highlight) */}
      <div className="cinder-editor-btn-group" ref={colorRef}>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Text Color"
          aria-label="Text Color"
          disabled={disabled}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <IconTextColor size={15} />
        </button>
        {showColorPicker && (
          <div className="cinder-editor-color-popover">
            <div className="cinder-editor-color-title">Text Color</div>
            <div className="cinder-editor-color-grid">
              {TEXT_COLOR_PRESETS.map((preset: CDEditorColorPreset) => (
                <button
                  key={preset.name}
                  type="button"
                  className="cinder-editor-color-swatch"
                  style={{ backgroundColor: preset.value === "inherit" ? "var(--cinder-text)" : preset.value }}
                  title={preset.name}
                  onClick={() => {
                    onApplyColor(preset.value, false);
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="cinder-editor-btn-group" ref={highlightRef}>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Text Highlight Color"
          aria-label="Text Highlight Color"
          disabled={disabled}
          onClick={() => setShowHighlightPicker(!showHighlightPicker)}
        >
          <IconHighlight size={15} />
        </button>
        {showHighlightPicker && (
          <div className="cinder-editor-color-popover">
            <div className="cinder-editor-color-title">Highlight Background</div>
            <div className="cinder-editor-color-grid">
              {HIGHLIGHT_COLOR_PRESETS.map((preset: CDEditorColorPreset) => (
                <button
                  key={preset.name}
                  type="button"
                  className="cinder-editor-color-swatch"
                  style={{
                    backgroundColor: preset.value,
                    border: preset.value === "transparent" ? "1px dashed var(--cinder-border)" : "none",
                  }}
                  title={preset.name}
                  onClick={() => {
                    onApplyColor(preset.value, true);
                    setShowHighlightPicker(false);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="cinder-editor-divider" />

      {/* Mentions & Comment Annotations */}
      <div className="cinder-editor-btn-group">
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Mention Collaborator (@)"
          aria-label="Mention"
          disabled={disabled}
          onClick={onOpenMentions}
        >
          <IconAtSign size={15} />
        </button>
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Add Comment Annotation on Selection"
          aria-label="Add Comment"
          disabled={disabled}
          onClick={onOpenAnnotation}
        >
          <IconMessageComment size={15} />
        </button>
      </div>

      <div className="cinder-editor-divider" />

      {/* Clear Formatting */}
      <div className="cinder-editor-btn-group">
        <button
          type="button"
          className="cinder-editor-tool-btn"
          title="Clear Formatting"
          aria-label="Clear Formatting"
          disabled={disabled}
          onClick={onClearFormat}
        >
          <IconClearFormat size={15} />
        </button>
      </div>

      {toolbarExtra && (
        <div className="cinder-editor-toolbar-extra">
          {toolbarExtra}
        </div>
      )}
    </div>
  );
}
