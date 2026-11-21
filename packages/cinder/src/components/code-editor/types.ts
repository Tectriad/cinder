import type { CSSProperties, ReactNode } from "react";

export type CDCodeEditorLanguage =
  | "typescript"
  | "javascript"
  | "json"
  | "html"
  | "css"
  | "python"
  | "sql"
  | "plaintext";

export interface CDCodeEditorProps {
  /** Source code content */
  value?: string;
  /** Default source code for uncontrolled mode */
  defaultValue?: string;
  /** Callback fired when code changes */
  onChange?: (value: string) => void;
  /** Programming language for syntax highlighting. Defaults to "typescript". */
  language?: CDCodeEditorLanguage;
  /** Whether to show the line numbers gutter. Defaults to true. */
  showLineNumbers?: boolean;
  /** Read-only mode. Defaults to false. */
  readOnly?: boolean;
  /** Tab size in spaces. Defaults to 2. */
  tabSize?: number;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Height in pixels or CSS string. Defaults to 320. */
  height?: number | string;
  /** Width in pixels or CSS string. Defaults to "100%". */
  width?: number | string;
  /** Title shown in header bar */
  title?: string;
  /** Extra elements rendered in header bar */
  extra?: ReactNode;
  /** Custom CSS class name */
  className?: string;
  /** Inline style overrides */
  style?: CSSProperties;
}
