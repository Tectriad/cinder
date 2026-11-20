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
import { CDCalendarPanel } from "./CDCalendarPanel";
import { formatDate, parseDate } from "./utils";
import type {
  CDDatePickerProps,
  CDDateRangePickerProps,
  CDDatePickerPlacement,
} from "./types";

/**
 * Calendar vector icon
 */
function CalendarIcon({ size = 16 }: { size?: number }): ReactElement {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/**
 * Close/Clear vector icon
 */
function ClearIcon({ size = 14 }: { size?: number }): ReactElement {
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
 * CDDatePicker / DatePicker
 *
 * Professional date selector with day/week/month/year modes, min/max bounds, and body portal.
 */
export const CDDatePickerBase = forwardRef<HTMLDivElement, CDDatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      mode = "date",
      picker,
      format,
      disabled = false,
      disabledDate,
      minDate: minDateProp,
      maxDate: maxDateProp,
      placeholder,
      allowClear = true,
      showToday = true,
      size = "md",
      status,
      placement = "bottomLeft",
      className,
      style,
      onFocus,
      onBlur,
      ...rest
    }: CDDatePickerProps,
    ref
  ): ReactElement => {
    const activeMode = picker || mode;

    // Default formats by mode
    const defaultFormat =
      format ||
      (activeMode === "year"
        ? "YYYY"
        : activeMode === "month"
        ? "YYYY-MM"
        : activeMode === "week"
        ? "YYYY-[W]ww"
        : "YYYY-MM-DD");

    const defaultPlaceholder =
      placeholder ||
      (activeMode === "year"
        ? "Select year"
        : activeMode === "month"
        ? "Select month"
        : activeMode === "week"
        ? "Select week"
        : "Select date");

    const isControlled = controlledValue !== undefined;
    const [internalDate, setInternalDate] = useState<Date | null>(
      parseDate(defaultValue)
    );
    const currentDate = isControlled ? parseDate(controlledValue) : internalDate;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const [coords, setCoords] = useState<{ top: number; left: number; placement: CDDatePickerPlacement }>({
      top: 0,
      left: 0,
      placement,
    });

    // Update portal coordinates
    const updateCoords = (): void => {
      if (!triggerRef.current || typeof window === "undefined") return;
      const rect = triggerRef.current.getBoundingClientRect();
      const popupHeight = 330;
      const popupWidth = 288;
      const spaceBelow = window.innerHeight - rect.bottom;
      const shouldFlipTop = spaceBelow < popupHeight && rect.top > popupHeight;

      let top = shouldFlipTop
        ? rect.top + window.scrollY - popupHeight - 4
        : rect.bottom + window.scrollY + 4;

      let left = rect.left + window.scrollX;
      if (left + popupWidth > window.innerWidth) {
        left = rect.right + window.scrollX - popupWidth;
      }

      setCoords({
        top,
        left: Math.max(8, left),
        placement: shouldFlipTop ? "topLeft" : "bottomLeft",
      });
    };

    useEffect(() => {
      if (isOpen) {
        updateCoords();
        const handleScrollOrResize = (): void => updateCoords();
        window.addEventListener("resize", handleScrollOrResize);
        window.addEventListener("scroll", handleScrollOrResize, true);
        return () => {
          window.removeEventListener("resize", handleScrollOrResize);
          window.removeEventListener("scroll", handleScrollOrResize, true);
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

    const handleSelectDate = (date: Date): void => {
      if (!isControlled) {
        setInternalDate(date);
      }
      onChange?.(date, formatDate(date, defaultFormat));
      setIsOpen(false);
    };

    const handleClear = (e: MouseEvent): void => {
      e.stopPropagation();
      if (!isControlled) {
        setInternalDate(null);
      }
      onChange?.(null, "");
    };

    const formattedDisplay = currentDate ? formatDate(currentDate, defaultFormat) : "";

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "cinder-datepicker-wrapper",
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
            <CalendarIcon size={size === "sm" ? 14 : 16} />
          </span>

          <span
            className={cn(
              "cinder-datepicker-value",
              !formattedDisplay && "cinder-datepicker-placeholder"
            )}
          >
            {formattedDisplay || defaultPlaceholder}
          </span>

          {allowClear && !disabled && formattedDisplay && (
            <button
              type="button"
              className="cinder-datepicker-clear-btn"
              onClick={handleClear}
              aria-label="Clear date"
            >
              <ClearIcon size={12} />
            </button>
          )}
        </div>

        {/* Portal Calendar Dropdown */}
        {isOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              ref={popoverRef}
              role="dialog"
              aria-modal="false"
              className={cn("cinder-datepicker-popover", `cinder-datepicker-placement-${coords.placement}`)}
              style={{
                top: `${coords.top}px`,
                left: `${coords.left}px`,
              }}
              onClick={(e: MouseEvent): void => e.stopPropagation()}
            >
              <CDCalendarPanel
                value={currentDate}
                mode={activeMode}
                onSelect={handleSelectDate}
                disabledDate={disabledDate}
                minDate={parseDate(minDateProp) || undefined}
                maxDate={parseDate(maxDateProp) || undefined}
                showToday={showToday}
              />
            </div>,
            document.body
          )}
      </div>
    );
  }
);
CDDatePickerBase.displayName = "CDDatePicker";

/**
 * CDDateRangePicker / DateRangePicker
 */
export const CDDateRangePicker = forwardRef<HTMLDivElement, CDDateRangePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      format = "YYYY-MM-DD",
      disabled = false,
      disabledDate,
      placeholder = ["Start date", "End date"],
      allowClear = true,
      size = "md",
      status,
      className,
      style,
    }: CDDateRangePickerProps,
    ref
  ): ReactElement => {
    const isControlled = controlledValue !== undefined;
    const [internalRange, setInternalRange] = useState<[Date | null, Date | null]>(
      defaultValue || [null, null]
    );
    const range = isControlled ? controlledValue || [null, null] : internalRange;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [selectingStart, setSelectingStart] = useState<boolean>(true);

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

      document.addEventListener("mousedown", handleOutsideClick, true);
      document.addEventListener("touchstart", handleOutsideClick, true);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick, true);
        document.removeEventListener("touchstart", handleOutsideClick, true);
      };
    }, [isOpen]);

    const handleSelectDate = (date: Date): void => {
      if (selectingStart || !range[0] || (range[0] && date < range[0])) {
        // Start date selected
        const nextRange: [Date | null, Date | null] = [date, null];
        if (!isControlled) setInternalRange(nextRange);
        setSelectingStart(false);
      } else {
        // End date selected
        const nextRange: [Date | null, Date | null] = [range[0], date];
        if (!isControlled) setInternalRange(nextRange);
        setSelectingStart(true);
        setIsOpen(false);
        onChange?.(nextRange, [formatDate(nextRange[0], format), formatDate(nextRange[1], format)]);
      }
    };

    const handleClear = (e: MouseEvent): void => {
      e.stopPropagation();
      const empty: [Date | null, Date | null] = [null, null];
      if (!isControlled) setInternalRange(empty);
      onChange?.(empty, ["", ""]);
    };

    const startText = range[0] ? formatDate(range[0], format) : "";
    const endText = range[1] ? formatDate(range[1], format) : "";

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "cinder-datepicker-wrapper",
          "cinder-datepicker-range-wrapper",
          `cinder-datepicker-${size}`,
          disabled && "cinder-datepicker-disabled",
          status && `cinder-datepicker-status-${status}`,
          isOpen && "cinder-datepicker-focused",
          className
        )}
      >
        <div
          ref={triggerRef}
          className="cinder-datepicker-input cinder-datepicker-range-input"
          onClick={(): void => {
            if (!disabled) setIsOpen(!isOpen);
          }}
        >
          <span className="cinder-datepicker-prefix-icon">
            <CalendarIcon size={14} />
          </span>
          <span className={cn("cinder-datepicker-value", !startText && "cinder-datepicker-placeholder")}>
            {startText || placeholder[0]}
          </span>
          <span className="cinder-datepicker-range-separator">&#8594;</span>
          <span className={cn("cinder-datepicker-value", !endText && "cinder-datepicker-placeholder")}>
            {endText || placeholder[1]}
          </span>

          {allowClear && !disabled && (startText || endText) && (
            <button type="button" className="cinder-datepicker-clear-btn" onClick={handleClear}>
              <ClearIcon size={12} />
            </button>
          )}
        </div>

        {isOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              ref={popoverRef}
              className="cinder-datepicker-popover"
              style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
              onClick={(e: MouseEvent): void => e.stopPropagation()}
            >
              <CDCalendarPanel
                rangeStart={range[0]}
                rangeEnd={range[1]}
                hoverDate={hoverDate}
                onDayHover={setHoverDate}
                onSelect={handleSelectDate}
                disabledDate={disabledDate}
                showToday={false}
              />
            </div>,
            document.body
          )}
      </div>
    );
  }
);
CDDateRangePicker.displayName = "CDDateRangePicker";

export const CDDatePicker = Object.assign(CDDatePickerBase, {
  RangePicker: CDDateRangePicker,
});

// Backward-compatible aliases
export const DatePicker = CDDatePicker;
export const DateRangePicker = CDDateRangePicker;
