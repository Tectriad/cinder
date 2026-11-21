import {
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDOTPInputProps,
  CDOTPRadius,
  GenerateOTPOptions,
} from "./types";

/**
 * Utility helper to generate a dynamic one-time password code.
 * Supports numeric (number alone), alphanumeric (word and number), or alpha (word alone).
 */
export function generateOTP(options: GenerateOTPOptions = {}): string {
  const { length = 4, type = "numeric" } = options;
  const digits = "0123456789";
  const alphas = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const alphanumerics = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

  let chars = digits;
  if (type === "alphanumeric") {
    chars = alphanumerics;
  } else if (type === "alpha") {
    chars = alphas;
  }

  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
}

function resolveBorderRadius(radius?: CDOTPRadius): string | undefined {
  if (radius === undefined) return undefined;
  if (typeof radius === "number") return `${radius}px`;
  switch (radius) {
    case "none":
      return "0px";
    case "sm":
      return "4px";
    case "md":
      return "8px";
    case "lg":
      return "14px";
    case "full":
      return "9999px";
    default:
      return radius;
  }
}

export function CDOTPInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  type = "numeric",
  radius = "md",
  size = "md",
  masked = false,
  showMaskToggle = false,
  grouped = length >= 6,
  autoFocus = false,
  disabled = false,
  error = false,
  helperText,
  label,
  extra,
  className,
  style,
}: CDOTPInputProps): ReactElement {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    const init: string[] = (value !== undefined ? value : defaultValue).split("");
    const arr: string[] = Array(length).fill("");
    for (let i = 0; i < length && i < init.length; i++) {
      arr[i] = init[i];
    }
    return arr;
  });

  // Sync internal value when controlled value or length dynamically updates
  useEffect(() => {
    if (value !== undefined) {
      const arr: string[] = Array(length).fill("");
      for (let i = 0; i < length && i < value.length; i++) {
        arr[i] = value[i];
      }
      setInternalValue(arr);
    }
  }, [value, length]);

  const slots: string[] = value !== undefined
    ? Array.from({ length }, (_, i: number) => value[i] || "")
    : internalValue;

  const [isMasked, setIsMasked] = useState<boolean>(masked);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const updateSlots = (newSlots: string[]): void => {
    if (value === undefined) {
      setInternalValue(newSlots);
    }
    const combined: string = newSlots.join("");
    if (onChange) onChange(combined);
    if (combined.length === length && !newSlots.includes("")) {
      if (onComplete) onComplete(combined);
    }
  };

  const isValidChar = (char: string): boolean => {
    if (type === "numeric") {
      return /^\d$/.test(char);
    }
    if (type === "alpha") {
      return /^[a-zA-Z]$/.test(char);
    }
    return /^[a-zA-Z0-9]$/.test(char);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const val: string = e.target.value;
    if (!val) {
      const next: string[] = [...slots];
      next[index] = "";
      updateSlots(next);
      return;
    }

    const char: string = val[val.length - 1];
    if (!isValidChar(char)) return;

    const next: string[] = [...slots];
    next[index] = type === "numeric" ? char : char.toUpperCase();
    updateSlots(next);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
      inputsRef.current[index + 1]?.select();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace") {
      if (!slots[index] && index > 0) {
        const next: string[] = [...slots];
        next[index - 1] = "";
        updateSlots(next);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasted: string = e.clipboardData.getData("text").trim();
    if (!pasted) return;

    const chars: string[] = pasted.split("").filter((c: string) => isValidChar(c));
    if (chars.length === 0) return;

    const next: string[] = [...slots];
    for (let i = 0; i < length && i < chars.length; i++) {
      next[i] = type === "numeric" ? chars[i] : chars[i].toUpperCase();
    }
    updateSlots(next);

    const focusIdx: number = Math.min(chars.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  const halfLength: number = Math.floor(length / 2);
  const customBorderRadius: string | undefined = resolveBorderRadius(radius);

  return (
    <div
      className={cn("cinder-otp-wrapper", className)}
      style={style}
    >
      <div className="cinder-otp-label-row">
        {label && <label className="cinder-otp-label">{label}</label>}
        {extra}
      </div>

      <div className="cinder-otp-controls-row">
        <div className="cinder-otp-inputs-row">
          {slots.map((char: string, idx: number) => {
            const showDivider: boolean = grouped && idx === halfLength;
            return (
              <div key={idx} className="cinder-otp-slot-container">
                {showDivider && <span className="cinder-otp-divider">&ndash;</span>}
                <input
                  ref={(el: HTMLInputElement | null): void => {
                    inputsRef.current[idx] = el;
                  }}
                  type={isMasked ? "password" : "text"}
                  inputMode={type === "numeric" ? "numeric" : "text"}
                  maxLength={1}
                  value={char}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => handleInputChange(e, idx)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>): void => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  disabled={disabled}
                  aria-label={`Digit ${idx + 1}`}
                  style={customBorderRadius ? { borderRadius: customBorderRadius } : undefined}
                  className={cn(
                    "cinder-otp-box",
                    `size-${size}`,
                    typeof radius === "string" && `radius-${radius}`,
                    char && "filled",
                    error && "error",
                  )}
                />
              </div>
            );
          })}
        </div>

        {showMaskToggle && (
          <button
            type="button"
            className="cinder-otp-toggle-btn"
            onClick={(): void => setIsMasked(!isMasked)}
            aria-label={isMasked ? "Show digits" : "Hide digits"}
            title={isMasked ? "Show digits" : "Hide digits"}
          >
            {isMasked ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>

      {helperText && (
        <p className={cn("cinder-otp-helper", error && "error")}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export const OTPInput = CDOTPInput;

