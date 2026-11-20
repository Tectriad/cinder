import { useState, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import type { CDSnippetProps } from "./types";

const CheckIcon = (): ReactElement => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ marginRight: "4px", verticalAlign: "-1px" }}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function CDSnippet({
  code,
  prefix = "$",
  showCopy = true,
  className,
  ...rest
}: CDSnippetProps): ReactElement {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      console.error("Failed to copy code to clipboard:", err);
    }
  };

  return (
    <div className={cn("cinder-snippet", className)} {...rest}>
      {prefix && <span className="cinder-snippet-prefix">{prefix}</span>}
      <code className="cinder-snippet-code">{code}</code>
      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          className="cinder-snippet-copy"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          title={copied ? "Copied" : "Copy"}
        >
          {copied ? (
            <>
              <CheckIcon />
              <span>Copied</span>
            </>
          ) : (
            <span>Copy</span>
          )}
        </button>
      )}
    </div>
  );
}

export const Snippet = CDSnippet;
