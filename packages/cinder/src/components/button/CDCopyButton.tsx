import { useState, type ReactElement } from "react";
import { CDButton } from "./CDButton";
import { cn } from "../../utils/cn";
import type { CDCopyButtonProps } from "./types";

const CopyIcon = (): ReactElement => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = (): ReactElement => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function CDCopyButton({
  value,
  variant = "tertiary",
  size = "md",
  label = "Copy",
  copiedLabel = "Copied!",
  timeout = 2000,
  onCopy,
  className,
  children,
  ...rest
}: CDCopyButtonProps): ReactElement {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);
      setTimeout(() => setCopied(false), timeout);
    } catch (err: unknown) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <CDButton
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn("cinder-copy-button", copied && "cinder-copy-button-copied", className)}
      prefix={
        copied ? (
          <span className="cinder-copy-icon cinder-copy-check">
            <CheckIcon />
          </span>
        ) : (
          <span className="cinder-copy-icon">
            <CopyIcon />
          </span>
        )
      }
      aria-live="polite"
      {...rest}
    >
      {children ? children : copied ? copiedLabel : label}
    </CDButton>
  );
}

export const CopyButton = CDCopyButton;
