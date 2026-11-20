import { useState, type ReactNode } from "react";
import { Code, Check, Copy } from "lucide-react";

export interface DemoCardProps {
  id?: string;
  title: string;
  description: string;
  code: string;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

export function DemoCard({
  id,
  title,
  description,
  code,
  fullWidth = false,
  className = "",
  children,
}: DemoCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={id}
      className={`antd-demo-card ${fullWidth ? "antd-demo-card-full-width" : ""} ${className}`.trim()}
    >
      {/* Live Preview Area */}
      <div className="antd-demo-preview">
        {children}
      </div>

      {/* Meta Area: Title & Description */}
      <div className="antd-demo-meta">
        <div className="antd-demo-title">{title}</div>
        <div className="antd-demo-desc">{description}</div>

        {/* Action Toolbar (Like AntD) */}
        <div className="antd-demo-actions">
          <button
            type="button"
            onClick={handleCopy}
            className="antd-demo-action-btn"
            title={copied ? "Copied code!" : "Copy code"}
            aria-label="Copy code"
          >
            {copied ? <Check size={14} color="var(--cinder-success)" /> : <Copy size={14} />}
          </button>
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className={`antd-demo-action-btn ${showCode ? "antd-demo-action-active" : ""}`}
            title={showCode ? "Hide source code" : "Show source code"}
            aria-label="Toggle code"
          >
            <Code size={14} />
          </button>
        </div>
      </div>

      {/* Expandable Code Area */}
      {showCode && (
        <div className="antd-demo-code-wrapper">
          <pre className="antd-demo-code">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
