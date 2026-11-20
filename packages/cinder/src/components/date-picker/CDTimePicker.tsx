import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactElement,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { CDButton } from "../button";
import { formatDate, parseDate } from "./utils";
import type { CDTimePickerProps } from "./types";

/**
 * Clock vector icon
 */
function ClockIcon({ size = 16 }: { size?: number }): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ClearIcon({ size = 12 }: { size?: number }): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * CDTimePicker / TimePicker
 *
 * Column-based scrollable time picker with 12h/24h formats, step intervals, and disabled bounds.
 */
export const CDTimePicker = forwardRef<HTMLDivElement, CDTimePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      format = "HH:mm",
      use12Hours = false,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      disabled = false,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      placeholder = "Select time",
      allowClear = true,
      showNow = true,
      size = "md",
      status,
      placement = "bottomLeft",
      className,
      style,
      ...rest
    }: CDTimePickerProps,
    ref
  ): ReactElement => {
    const isControlled = controlledValue !== undefined;
    const initialTime: Date | null = isControlled
      ? parseDate(controlledValue)
      : parseDate(defaultValue);

    const [internalTime, setInternalTime] = useState<Date | null>(initialTime);
    const currentTime: Date | null = isControlled
      ? parseDate(controlledValue)
      : internalTime;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const updateCoords = (): void => {
      if (!triggerRef.current || typeof window === "undefined") return;
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    };

    useEffect(() => {
      if (isOpen) {
        updateCoords();
        const handleResize = (): void => updateCoords();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize, true);
        return () => {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("scroll", handleResize, true);
        };
      }
    }, [isOpen]);

    // Outside click & Escape listener
    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: globalThis.MouseEvent | TouchEvent): void => {
        const target = e.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          popoverRef.current &&
          !popoverRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick, true);
      document.addEventListener("touchstart", handleOutsideClick, true);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick, true);
        document.removeEventListener("touchstart", handleOutsideClick, true);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    // Column values generator
    const selectedHour = currentTime ? currentTime.getHours() : 0;
    const selectedMinute = currentTime ? currentTime.getMinutes() : 0;
    const selectedSecond = currentTime ? currentTime.getSeconds() : 0;
    const isPM = selectedHour >= 12;

    const hoursList: number[] = [];
    const maxHour = use12Hours ? 12 : 23;
    const startHour = use12Hours ? 1 : 0;
    for (let h = startHour; h <= maxHour; h += hourStep) {
      hoursList.push(h);
    }

    const minutesList: number[] = [];
    for (let m = 0; m <= 59; m += minuteStep) {
      minutesList.push(m);
    }

    const hasSeconds = format.includes("ss") || format.includes("s");
    const secondsList: number[] = [];
    if (hasSeconds) {
      for (let s = 0; s <= 59; s += secondStep) {
        secondsList.push(s);
      }
    }

    const handleHourSelect = (hour: number): void => {
      const base = currentTime ? new Date(currentTime) : new Date();
      let resolvedHour = hour;
      if (use12Hours) {
        if (isPM && hour < 12) resolvedHour = hour + 12;
        if (!isPM && hour === 12) resolvedHour = 0;
      }
      base.setHours(resolvedHour);
      if (!isControlled) setInternalTime(base);
      onChange?.(base, formatDate(base, format));
    };

    const handleMinuteSelect = (min: number): void => {
      const base = currentTime ? new Date(currentTime) : new Date();
      base.setMinutes(min);
      if (!isControlled) setInternalTime(base);
      onChange?.(base, formatDate(base, format));
    };

    const handleSecondSelect = (sec: number): void => {
      const base = currentTime ? new Date(currentTime) : new Date();
      base.setSeconds(sec);
      if (!isControlled) setInternalTime(base);
      onChange?.(base, formatDate(base, format));
    };

    const handleAmPmSelect = (pm: boolean): void => {
      const base = currentTime ? new Date(currentTime) : new Date();
      const currentH = base.getHours();
      if (pm && currentH < 12) base.setHours(currentH + 12);
      if (!pm && currentH >= 12) base.setHours(currentH - 12);
      if (!isControlled) setInternalTime(base);
      onChange?.(base, formatDate(base, format));
    };

    const handleNowClick = (): void => {
      const now = new Date();
      if (!isControlled) setInternalTime(now);
      onChange?.(now, formatDate(now, format));
      setIsOpen(false);
    };

    const handleClear = (e: MouseEvent): void => {
      e.stopPropagation();
      if (!isControlled) setInternalTime(null);
      onChange?.(null, "");
    };

    const formattedDisplay = currentTime ? formatDate(currentTime, format) : "";
    const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "cinder-datepicker-wrapper",
          "cinder-timepicker-wrapper",
          `cinder-datepicker-${size}`,
          disabled && "cinder-datepicker-disabled",
          status && `cinder-datepicker-status-${status}`,
          isOpen && "cinder-datepicker-focused",
          className
        )}
        {...rest}
      >
        <div
          ref={triggerRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          tabIndex={disabled ? -1 : 0}
          onClick={(): void => {
            if (!disabled) setIsOpen(!isOpen);
          }}
          className="cinder-datepicker-input"
        >
          <span className="cinder-datepicker-prefix-icon">
            <ClockIcon size={size === "sm" ? 14 : 16} />
          </span>

          <span
            className={cn(
              "cinder-datepicker-value",
              !formattedDisplay && "cinder-datepicker-placeholder"
            )}
          >
            {formattedDisplay || placeholder}
          </span>

          {allowClear && !disabled && formattedDisplay && (
            <button
              type="button"
              className="cinder-datepicker-clear-btn"
              onClick={handleClear}
              aria-label="Clear time"
            >
              <ClearIcon size={12} />
            </button>
          )}
        </div>

        {isOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              ref={popoverRef}
              role="dialog"
              className="cinder-datepicker-popover cinder-timepicker-popover"
              style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
              onClick={(e: MouseEvent): void => e.stopPropagation()}
            >
              <div className="cinder-timepicker-columns">
                {/* Hours Column */}
                <div className="cinder-timepicker-col">
                  {hoursList.map((h: number) => {
                    const isDisabled = disabledHours?.().includes(h);
                    const isSelected = use12Hours
                      ? (selectedHour % 12 || 12) === h
                      : selectedHour === h;

                    return (
                      <button
                        key={`h-${h}`}
                        type="button"
                        disabled={isDisabled}
                        className={cn(
                          "cinder-timepicker-cell",
                          isSelected && "cinder-timepicker-cell-selected",
                          isDisabled && "cinder-timepicker-cell-disabled"
                        )}
                        onClick={(): void => handleHourSelect(h)}
                      >
                        {pad(h)}
                      </button>
                    );
                  })}
                </div>

                {/* Minutes Column */}
                <div className="cinder-timepicker-col">
                  {minutesList.map((m: number) => {
                    const isDisabled = disabledMinutes?.(selectedHour).includes(m);
                    const isSelected = selectedMinute === m;

                    return (
                      <button
                        key={`m-${m}`}
                        type="button"
                        disabled={isDisabled}
                        className={cn(
                          "cinder-timepicker-cell",
                          isSelected && "cinder-timepicker-cell-selected",
                          isDisabled && "cinder-timepicker-cell-disabled"
                        )}
                        onClick={(): void => handleMinuteSelect(m)}
                      >
                        {pad(m)}
                      </button>
                    );
                  })}
                </div>

                {/* Optional Seconds Column */}
                {hasSeconds && (
                  <div className="cinder-timepicker-col">
                    {secondsList.map((s: number) => {
                      const isDisabled = disabledSeconds?.(selectedHour, selectedMinute).includes(s);
                      const isSelected = selectedSecond === s;

                      return (
                        <button
                          key={`s-${s}`}
                          type="button"
                          disabled={isDisabled}
                          className={cn(
                            "cinder-timepicker-cell",
                            isSelected && "cinder-timepicker-cell-selected",
                            isDisabled && "cinder-timepicker-cell-disabled"
                          )}
                          onClick={(): void => handleSecondSelect(s)}
                        >
                          {pad(s)}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 12h AM/PM Column */}
                {use12Hours && (
                  <div className="cinder-timepicker-col cinder-timepicker-ampm-col">
                    <button
                      type="button"
                      className={cn(
                        "cinder-timepicker-cell",
                        !isPM && "cinder-timepicker-cell-selected"
                      )}
                      onClick={(): void => handleAmPmSelect(false)}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "cinder-timepicker-cell",
                        isPM && "cinder-timepicker-cell-selected"
                      )}
                      onClick={(): void => handleAmPmSelect(true)}
                    >
                      PM
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="cinder-timepicker-footer">
                {showNow && (
                  <button
                    type="button"
                    className="cinder-calendar-today-btn"
                    onClick={handleNowClick}
                  >
                    Now
                  </button>
                )}
                <CDButton
                  size="sm"
                  variant="primary"
                  onClick={(): void => setIsOpen(false)}
                >
                  OK
                </CDButton>
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

CDTimePicker.displayName = "CDTimePicker";

// Backward-compatible alias
export const TimePicker = CDTimePicker;
