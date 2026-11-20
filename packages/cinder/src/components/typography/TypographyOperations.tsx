import {
  useState,
  type ReactElement,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { CDCopyIcon, CDCheckIcon, CDEditIcon } from "../icon";
import type { CDCopyableConfig, CDEditableConfig } from "./types";

interface CopyBtnProps {
  textToCopy: string;
  config: CDCopyableConfig;
}

export function CopyButton({ textToCopy, config }: CopyBtnProps): ReactElement {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    const text = config.text !== undefined ? config.text : textToCopy;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      if (config.onCopy) {
        config.onCopy();
      }
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tooltip = copied
    ? config.tooltips?.[1] || "Copied!"
    : config.tooltips?.[0] || "Copy to clipboard";

  return (
    <button
      type="button"
      className="cinder-typography-copy-btn"
      onClick={handleCopy}
      aria-label={tooltip}
      title={tooltip}
    >
      {copied ? (
        <CDCheckIcon size={13} color="var(--cinder-success)" />
      ) : (
        <CDCopyIcon size={13} />
      )}
    </button>
  );
}

interface InlineEditorProps {
  initialText: string;
  config: CDEditableConfig;
  onFinish: (val: string) => void;
}

export function InlineEditor({
  initialText,
  config,
  onFinish,
}: InlineEditorProps): ReactElement {
  const [text, setText] = useState<string>(initialText);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      onFinish(text);
      if (config.onChange) {
        config.onChange(text);
      }
    } else if (e.key === "Escape") {
      onFinish(initialText);
      if (config.onCancel) {
        config.onCancel();
      }
    }
  };

  return (
    <span className="cinder-typography-inline-editor">
      <input
        type="text"
        value={text}
        maxLength={config.maxLength}
        autoFocus
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          onFinish(text);
          if (config.onChange) {
            config.onChange(text);
          }
        }}
        className="cinder-typography-inline-input"
      />
    </span>
  );
}

interface EditBtnProps {
  onStart: () => void;
}

export function EditButton({ onStart }: EditBtnProps): ReactElement {
  return (
    <button
      type="button"
      className="cinder-typography-edit-btn"
      onClick={onStart}
      aria-label="Edit text"
      title="Edit text"
    >
      <CDEditIcon size={13} />
    </button>
  );
}
