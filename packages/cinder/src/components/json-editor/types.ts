import type { CSSProperties, ReactNode } from "react";

export type CDJSONEditorViewMode = "tree" | "code";

export interface CDJSONParseError {
  message: string;
  line?: number;
  column?: number;
}

export type CDJSONValueType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "array"
  | "object";

export interface CDJSONEditorProps {
  /** JSON value (either string or parsed JavaScript object/array) */
  value?: unknown;
  /** Default JSON value for uncontrolled usage */
  defaultValue?: unknown;
  /** Callback fired when JSON content changes (passes parsed value and raw string) */
  onChange?: (parsedValue: unknown, rawString: string) => void;
  /** Active view mode ("tree" or "code"). Defaults to "tree". */
  viewMode?: CDJSONEditorViewMode;
  /** Callback fired when view mode changes */
  onViewModeChange?: (mode: CDJSONEditorViewMode) => void;
  /** Read-only mode. Defaults to false. */
  readOnly?: boolean;
  /** Initial tree depth to expand. Defaults to 2. */
  defaultExpandDepth?: number;
  /** Height of the editor container in pixels or CSS string. Defaults to 380. */
  height?: number | string;
  /** Width of the editor container. Defaults to "100%". */
  width?: number | string;
  /** Title displayed in the editor header bar */
  title?: string;
  /** Extra elements rendered in the header bar */
  extra?: ReactNode;
  /** Optional custom CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
}

export interface CDJSONTreeNodeProps {
  keyName?: string;
  value: unknown;
  depth: number;
  maxDepth: number;
  expandedKeys: Set<string>;
  onToggleKey: (path: string) => void;
  path: string;
  isLastItem?: boolean;
  searchQuery?: string;
  readOnly?: boolean;
  onValueChange?: (path: string, newValue: unknown) => void;
}
