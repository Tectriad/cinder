import {
  useState,
  forwardRef,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import { CDCalendarPanel } from "./CDCalendarPanel";
import { CDOutlookCalendar } from "./CDOutlookCalendar";
import { CDButton } from "../button";
import type { CDCalendarProps, CDOutlookCalendarView } from "./types";

/**
 * CDCalendar / Calendar
 *
 * Full-page or inline dashboard calendar with month/year/week/day mode switches and custom cell renderers.
 */
export const CDCalendar = forwardRef<HTMLDivElement, CDCalendarProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      onSelect,
      mode = "month",
      onPanelChange,
      onModeChange,
      disabledDate,
      dateCellRender,
      monthCellRender,
      events,
      onEventClick,
      onSlotClick,
      className,
      style,
      ...rest
    }: CDCalendarProps,
    ref
  ): ReactElement => {
    const isControlled = controlledValue !== undefined;
    const [internalDate, setInternalDate] = useState<Date>(
      controlledValue || defaultValue || new Date()
    );
    const [currentMode, setCurrentMode] = useState<"day" | "week" | "month" | "year">(mode);

    const activeDate = isControlled && controlledValue ? controlledValue : internalDate;

    const handleDateSelect = (date: Date): void => {
      if (!isControlled) {
        setInternalDate(date);
      }
      onChange?.(date);
      onSelect?.(date);
    };

    const handleModeSwitch = (nextMode: "day" | "week" | "month" | "year"): void => {
      setCurrentMode(nextMode);
      onPanelChange?.(activeDate, nextMode);
      onModeChange?.(nextMode);
    };

    // If events are passed or if day/week mode is requested, use Outlook Calendar layout
    if (events !== undefined || currentMode === "day" || currentMode === "week") {
      return (
        <CDOutlookCalendar
          ref={ref}
          value={activeDate}
          onChange={handleDateSelect}
          view={currentMode as CDOutlookCalendarView}
          onViewChange={(v: CDOutlookCalendarView): void => handleModeSwitch(v)}
          events={events}
          onEventClick={onEventClick}
          onSlotClick={onSlotClick}
          className={className}
          style={style}
          {...rest}
        />
      );
    }

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "cinder-calendar-standalone",
          `cinder-calendar-mode-${currentMode}`,
          className
        )}
        {...rest}
      >
        {/* Top Control Bar */}
        <div className="cinder-calendar-standalone-toolbar">
          <div className="cinder-calendar-standalone-mode-switch">
            <CDButton
              size="sm"
              variant={currentMode === "month" ? "primary" : "secondary"}
              onClick={(): void => handleModeSwitch("month")}
            >
              Month
            </CDButton>
            <CDButton
              size="sm"
              variant={currentMode === "year" ? "primary" : "secondary"}
              onClick={(): void => handleModeSwitch("year")}
            >
              Year
            </CDButton>
          </div>
        </div>

        {/* Panel Content */}
        <CDCalendarPanel
          value={activeDate}
          mode={currentMode === "year" ? "year" : "date"}
          onSelect={handleDateSelect}
          disabledDate={disabledDate}
          showToday={true}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          className="cinder-calendar-standalone-panel"
        />
      </div>
    );
  }
);

CDCalendar.displayName = "CDCalendar";

// Backward-compatible alias
export const Calendar = CDCalendar;
