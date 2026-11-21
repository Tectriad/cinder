import {
  useState,
  useMemo,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDJSONEditorProps,
  CDJSONEditorViewMode,
  CDJSONParseError,
} from "./types";
import {
  safeStringify,
  safeParse,
  validateJSON,
  formatJSONString,
  minifyJSONString,
} from "./jsonUtils";
import { CDJSONTreeNode } from "./CDJSONTreeNode";

export function CDJSONEditor({
  value,
  defaultValue = {
    name: "Cinder Slate Architecture",
    version: "2.4.0",
    features: ["Type Safety", "Accessible Primitives", "Zero Emojis"],
    active: true,
    performance: { fps: 60, latencyMs: 1.2 },
    contributors: null,
  },
  onChange,
  viewMode: controlledViewMode,
  onViewModeChange,
  readOnly = false,
  defaultExpandDepth = 2,
  height = 380,
  width = "100%",
  title = "JSON Document",
  extra,
  className,
  style,
}: CDJSONEditorProps): ReactElement {
  const [internalViewMode, setInternalViewMode] = useState<CDJSONEditorViewMode>("tree");
  const activeViewMode: CDJSONEditorViewMode = controlledViewMode || internalViewMode;

  const [rawText, setRawText] = useState<string>(() =>
    safeStringify(value !== undefined ? value : defaultValue)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const parseError: CDJSONParseError | null = useMemo<CDJSONParseError | null>(
    () => validateJSON(rawText),
    [rawText]
  );

  const parsedObject: unknown = useMemo<unknown>(() => {
    return safeParse(rawText);
  }, [rawText]);

  // Pre-expand top-level keys up to defaultExpandDepth
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => {
    const keys = new Set<string>([""]);
    const obj = safeParse(value !== undefined ? value : defaultValue);
    if (obj && typeof obj === "object") {
      Object.keys(obj as Record<string, unknown>).forEach((k: string) => {
        keys.add(k);
      });
    }
    return keys;
  });

  const handleToggleKey = (path: string): void => {
    setExpandedKeys((prev: Set<string>) => {
      const next = new Set<string>(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleExpandAll = (): void => {
    const keys = new Set<string>([""]);
    const collectKeys = (obj: unknown, prefix: string = ""): void => {
      if (obj && typeof obj === "object") {
        Object.entries(obj as Record<string, unknown>).forEach(([k, v]: [string, unknown]) => {
          const currentPath: string = prefix ? `${prefix}.${k}` : k;
          keys.add(currentPath);
          if (v && typeof v === "object") {
            collectKeys(v, currentPath);
          }
        });
      }
    };
    collectKeys(parsedObject);
    setExpandedKeys(keys);
  };

  const handleCollapseAll = (): void => {
    setExpandedKeys(new Set<string>());
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newText: string = e.target.value;
    setRawText(newText);
    const err: CDJSONParseError | null = validateJSON(newText);
    if (!err && onChange) {
      onChange(safeParse(newText), newText);
    }
  };

  const handleFormat = (): void => {
    const formatted: string = formatJSONString(rawText, 2);
    setRawText(formatted);
    if (onChange) onChange(safeParse(formatted), formatted);
  };

  const handleMinify = (): void => {
    const minified: string = minifyJSONString(rawText);
    setRawText(minified);
    if (onChange) onChange(safeParse(minified), minified);
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleModeChange = (newMode: CDJSONEditorViewMode): void => {
    if (onViewModeChange) {
      onViewModeChange(newMode);
    } else {
      setInternalViewMode(newMode);
    }
  };

  const heightStyle: string = typeof height === "number" ? `${height}px` : height;
  const widthStyle: string = typeof width === "number" ? `${width}px` : width;

  return (
    <div
      className={cn("cinder-json-editor-card", className)}
      style={{ width: widthStyle, ...style }}
    >
      <div className="cinder-json-editor-header">
        <div className="cinder-json-header-left">
          <span className="cinder-json-editor-title">{title}</span>
          <div className="cinder-json-mode-switch">
            <button
              type="button"
              className={cn("cinder-json-mode-btn", activeViewMode === "tree" && "active")}
              onClick={() => handleModeChange("tree")}
            >
              Tree View
            </button>
            <button
              type="button"
              className={cn("cinder-json-mode-btn", activeViewMode === "code" && "active")}
              onClick={() => handleModeChange("code")}
            >
              Code View
            </button>
          </div>
        </div>

        <div className="cinder-json-header-actions">
          {activeViewMode === "tree" && (
            <>
              <input
                type="text"
                placeholder="Filter keys..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="cinder-json-search-input"
              />
              <button
                type="button"
                className="cinder-json-action-btn"
                onClick={handleExpandAll}
                title="Expand All"
              >
                Expand
              </button>
              <button
                type="button"
                className="cinder-json-action-btn"
                onClick={handleCollapseAll}
                title="Collapse All"
              >
                Collapse
              </button>
            </>
          )}

          {!readOnly && (
            <>
              <button
                type="button"
                className="cinder-json-action-btn"
                onClick={handleFormat}
                title="Beautify JSON"
              >
                Format
              </button>
              <button
                type="button"
                className="cinder-json-action-btn"
                onClick={handleMinify}
                title="Minify JSON"
              >
                Minify
              </button>
            </>
          )}

          <button
            type="button"
            className="cinder-json-action-btn"
            onClick={handleCopy}
            title="Copy JSON to clipboard"
          >
            {copied ? "Copied" : "Copy"}
          </button>

          {extra}
        </div>
      </div>

      {parseError && (
        <div className="cinder-json-error-banner">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            {parseError.message}
            {parseError.line !== undefined && ` (Line ${parseError.line}, Col ${parseError.column})`}
          </span>
        </div>
      )}

      <div className="cinder-json-editor-body" style={{ height: heightStyle }}>
        {activeViewMode === "tree" ? (
          <div className="cinder-json-tree-container">
            {parseError ? (
              <div className="cinder-json-parse-failed">
                Tree view unavailable while JSON syntax is invalid. Switch to Code View to repair.
              </div>
            ) : (
              <CDJSONTreeNode
                value={parsedObject}
                depth={0}
                maxDepth={defaultExpandDepth}
                expandedKeys={expandedKeys}
                onToggleKey={handleToggleKey}
                path=""
                isLastItem={true}
                searchQuery={searchQuery}
                readOnly={readOnly}
              />
            )}
          </div>
        ) : (
          <div className="cinder-json-code-container">
            <textarea
              className="cinder-json-textarea"
              value={rawText}
              onChange={handleTextChange}
              readOnly={readOnly}
              spellCheck={false}
              placeholder="Paste or write valid JSON here..."
            />
          </div>
        )}
      </div>

      <div className="cinder-json-editor-footer">
        <span className="cinder-json-status">
          {parseError ? (
            <span className="cinder-json-status-error">Syntax Error</span>
          ) : (
            <span className="cinder-json-status-valid">Valid JSON</span>
          )}
        </span>
        <span className="cinder-json-meta">
          {rawText.length.toLocaleString()} bytes
        </span>
      </div>
    </div>
  );
}

export const JSONEditor = CDJSONEditor;
