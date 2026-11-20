import {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  type ReactElement,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { CDCloseIcon } from "../icon";
import { cn } from "../../utils/cn";
import type { CDTextAreaProps, CDTextAreaAutoSizeConfig } from "./types";

export const CDTextArea = forwardRef<HTMLTextAreaElement, CDTextAreaProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      placeholder,
      rows = 4,
      size = "md",
      status,
      resize = "vertical",
      autoSize = false,
      maxLength,
      showCount = false,
      allowClear = false,
      onClear,
      disabled = false,
      readOnly = false,
      className,
      style,
      onChange,
      ...restProps
    }: CDTextAreaProps,
    ref
  ): ReactElement => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

    const [internalValue, setInternalValue] = useState<string>(
      defaultValue !== undefined ? String(defaultValue) : ""
    );

    const activeValue: string =
      controlledValue !== undefined ? String(controlledValue) : internalValue;

    // AutoSize dynamic height adjustment
    useEffect(() => {
      if (!autoSize || !internalRef.current) return;

      const textarea = internalRef.current;
      textarea.style.height = "auto";

      const config: CDTextAreaAutoSizeConfig =
        typeof autoSize === "object" ? autoSize : {};

      const minRows = config.minRows || rows;
      const maxRows = config.maxRows;

      const computedLineHeight =
        parseFloat(window.getComputedStyle(textarea).lineHeight) || 20;

      const minHeight = minRows * computedLineHeight + 16;
      let newHeight = Math.max(textarea.scrollHeight, minHeight);

      if (maxRows) {
        const maxHeight = maxRows * computedLineHeight + 16;
        newHeight = Math.min(newHeight, maxHeight);
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
      } else {
        textarea.style.overflowY = "hidden";
      }

      textarea.style.height = `${newHeight}px`;
    }, [activeValue, autoSize, rows]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
      if (disabled || readOnly) return;

      if (controlledValue === undefined) {
        setInternalValue(e.target.value);
      }

      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = (): void => {
      if (disabled || readOnly) return;

      if (controlledValue === undefined) {
        setInternalValue("");
      }

      if (internalRef.current) {
        internalRef.current.value = "";
        const syntheticEvent = {
          target: internalRef.current,
          currentTarget: internalRef.current,
        } as ChangeEvent<HTMLTextAreaElement>;

        if (onChange) {
          onChange(syntheticEvent);
        }
      }

      if (onClear) {
        onClear();
      }
    };

    const count: number = activeValue.length;
    const isExceeded: boolean = maxLength !== undefined && count > maxLength;

    const renderCount = (): ReactNode => {
      if (typeof showCount === "function") {
        return showCount(count, maxLength);
      }
      return maxLength !== undefined ? `${count} / ${maxLength}` : `${count}`;
    };

    return (
      <div
        style={style}
        className={cn(
          "cinder-textarea-wrapper",
          `cinder-textarea-${size}`,
          status && `cinder-textarea-${status}`,
          disabled && "cinder-textarea-disabled",
          readOnly && "cinder-textarea-readonly",
          className
        )}
      >
        <textarea
          ref={internalRef}
          rows={rows}
          value={activeValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          onChange={handleChange}
          style={{ resize: autoSize ? "none" : resize }}
          className="cinder-textarea"
          {...restProps}
        />

        {/* Clear Action Button */}
        {allowClear && !disabled && !readOnly && activeValue.length > 0 && (
          <button
            type="button"
            className="cinder-textarea-clear-btn"
            onClick={handleClear}
            aria-label="Clear input text"
            title="Clear text"
          >
            <CDCloseIcon size={12} />
          </button>
        )}

        {/* Character Count Indicator */}
        {showCount && (
          <div
            className={cn(
              "cinder-textarea-count",
              isExceeded && "cinder-textarea-count-exceeded"
            )}
          >
            {renderCount()}
          </div>
        )}
      </div>
    );
  }
);

CDTextArea.displayName = "CDTextArea";

export const TextArea = CDTextArea;
export const Textarea = CDTextArea;
export const CDTextarea = CDTextArea;
