import {
  useState,
  useRef,
  useCallback,
  type ReactElement,
  type ChangeEvent,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import { cn } from "../../utils/cn";
import type { CDCodeEditorProps, CDCodeEditorLanguage } from "./types";
import { highlightCode } from "./codeHighlight";

export function CDCodeEditor({
  value,
  defaultValue = `// Cinder Slate Monorepo Engine\nexport function computeThroughput(events: number[]): number {\n  const total = events.reduce((sum, val) => sum + val, 0);\n  return Math.round(total / events.length);\n}`,
  onChange,
  language = "typescript",
  showLineNumbers = true,
  readOnly = false,
  tabSize = 2,
  placeholder = "Write or paste source code...",
  height = 320,
  width = "100%",
  title,
  extra,
  className,
  style,
}: CDCodeEditorProps): ReactElement {
  const [internalCode, setInternalCode] = useState<string>(
    value !== undefined ? value : defaultValue
  );
  const code: string = value !== undefined ? value : internalCode;

  const [activeLang, setActiveLang] = useState<CDCodeEditorLanguage>(language);
  const [copied, setCopied] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ line: number; col: number }>({ line: 1, col: 1 });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines: string[] = code.split("\n");
  const lineCount: number = Math.max(lines.length, 1);

  const handleScroll = (e: UIEvent<HTMLTextAreaElement>): void => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }
  };

  const updateCursorPosition = useCallback((): void => {
    if (!textareaRef.current) return;
    const pos: number = textareaRef.current.selectionStart;
    const textBefore: string = code.substring(0, pos);
    const lineList: string[] = textBefore.split("\n");
    const currentLine: number = lineList.length;
    const currentCol: number = lineList[lineList.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  }, [code]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (readOnly) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (e.key === "Tab") {
      e.preventDefault();
      const start: number = textarea.selectionStart;
      const end: number = textarea.selectionEnd;
      const spaces: string = " ".repeat(tabSize);

      const updated: string = code.substring(0, start) + spaces + code.substring(end);
      if (onChange) onChange(updated);
      else setInternalCode(updated);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + tabSize;
        updateCursorPosition();
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const nextVal: string = e.target.value;
    if (onChange) onChange(nextVal);
    else setInternalCode(nextVal);
    updateCursorPosition();
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const highlightedHtml: string = highlightCode(code, activeLang);

  const heightStyle: string = typeof height === "number" ? `${height}px` : height;
  const widthStyle: string = typeof width === "number" ? `${width}px` : width;

  return (
    <div
      className={cn("cinder-code-editor-card", className)}
      style={{ width: widthStyle, ...style }}
    >
      <div className="cinder-code-editor-header">
        <div className="cinder-code-header-left">
          <span className="cinder-code-editor-title">
            {title || `Source (${activeLang})`}
          </span>
          <select
            className="cinder-code-lang-select"
            value={activeLang}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setActiveLang(e.target.value as CDCodeEditorLanguage)
            }
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="json">JSON</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="plaintext">Plaintext</option>
          </select>
        </div>

        <div className="cinder-code-header-actions">
          <button
            type="button"
            className="cinder-code-action-btn"
            onClick={handleCopy}
            title="Copy source code"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          {extra}
        </div>
      </div>

      <div className="cinder-code-editor-body" style={{ height: heightStyle }}>
        {showLineNumbers && (
          <div ref={gutterRef} className="cinder-code-gutter">
            {Array.from({ length: lineCount }).map((_, idx: number) => {
              const lineNum: number = idx + 1;
              const isActive: boolean = lineNum === cursorPos.line;
              return (
                <div
                  key={lineNum}
                  className={cn("cinder-code-line-number", isActive && "active")}
                >
                  {lineNum}
                </div>
              );
            })}
          </div>
        )}

        <div className="cinder-code-canvas-container">
          <pre
            ref={preRef}
            className="cinder-code-highlight-layer"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlightedHtml + "\n" }}
          />

          <textarea
            ref={textareaRef}
            className="cinder-code-textarea"
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            onKeyUp={updateCursorPosition}
            onClick={updateCursorPosition}
            readOnly={readOnly}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder={placeholder}
          />
        </div>
      </div>

      <div className="cinder-code-editor-footer">
        <span className="cinder-code-meta">
          Line {cursorPos.line}, Col {cursorPos.col}
        </span>
        <span className="cinder-code-meta">
          {lineCount} {lineCount === 1 ? "line" : "lines"} &bull; {code.length} chars
        </span>
      </div>
    </div>
  );
}

export const CodeEditor = CDCodeEditor;
