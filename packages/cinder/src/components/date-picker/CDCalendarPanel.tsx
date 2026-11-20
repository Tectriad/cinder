import {
  useState,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
} from "react";
import { cn } from "../../utils/cn";
import type { CDDatePickerMode } from "./types";
import {
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
  DAY_NAMES_SHORT,
  getCalendarDays,
  getWeekNumber,
  isSameDay,
  isSameMonth,
  isSameYear,
  isDateInRange,
  type CalendarDayItem,
} from "./utils";

export interface CDCalendarPanelProps {
  value?: Date | null;
  mode?: CDDatePickerMode;
  onSelect: (date: Date) => void;
  disabledDate?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  hoverDate?: Date | null;
  onDayHover?: (date: Date | null) => void;
  showToday?: boolean;
  onTodayClick?: () => void;
  dateCellRender?: (date: Date) => ReactNode;
  monthCellRender?: (date: Date) => ReactNode;
  className?: string;
}

export function CDCalendarPanel({
  value,
  mode = "date",
  onSelect,
  disabledDate,
  minDate,
  maxDate,
  rangeStart,
  rangeEnd,
  hoverDate,
  onDayHover,
  showToday = true,
  onTodayClick,
  dateCellRender,
  monthCellRender,
  className,
}: CDCalendarPanelProps): ReactElement {
  const initialDate = value || rangeStart || new Date();
  const [viewDate, setViewDate] = useState<Date>(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [panelView, setPanelView] = useState<"date" | "month" | "year">(
    mode === "month" ? "month" : mode === "year" ? "year" : "date"
  );

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const decadeStart = Math.floor(viewYear / 10) * 10;

  // Navigation handlers
  const handlePrevYear = (): void => {
    if (panelView === "year") {
      setViewDate(new Date(viewYear - 10, viewMonth, 1));
    } else {
      setViewDate(new Date(viewYear - 1, viewMonth, 1));
    }
  };

  const handleNextYear = (): void => {
    if (panelView === "year") {
      setViewDate(new Date(viewYear + 10, viewMonth, 1));
    } else {
      setViewDate(new Date(viewYear + 1, viewMonth, 1));
    }
  };

  const handlePrevMonth = (): void => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = (): void => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Date check helper
  const isDateDisabled = (target: Date): boolean => {
    if (minDate && target < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
      return true;
    }
    if (maxDate && target > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59)) {
      return true;
    }
    return Boolean(disabledDate?.(target));
  };

  // Calendar day selection
  const handleDayClick = (item: CalendarDayItem, e: MouseEvent): void => {
    e.preventDefault();
    if (isDateDisabled(item.date)) return;
    onSelect(item.date);
    if (!item.isCurrentMonth) {
      setViewDate(new Date(item.date.getFullYear(), item.date.getMonth(), 1));
    }
  };

  // Month selection
  const handleMonthSelect = (monthIdx: number): void => {
    const nextDate = new Date(viewYear, monthIdx, 1);
    setViewDate(nextDate);
    if (mode === "month") {
      onSelect(nextDate);
    } else {
      setPanelView("date");
    }
  };

  // Year selection
  const handleYearSelect = (yearNum: number): void => {
    const nextDate = new Date(yearNum, viewMonth, 1);
    setViewDate(nextDate);
    if (mode === "year") {
      onSelect(nextDate);
    } else {
      setPanelView("month");
    }
  };

  const calendarDays = getCalendarDays(viewYear, viewMonth);
  const activeEffectiveEnd = rangeEnd || hoverDate;

  return (
    <div className={cn("cinder-calendar-panel", className)}>
      {/* Header Bar */}
      <div className="cinder-calendar-header">
        <div className="cinder-calendar-header-nav">
          <button
            type="button"
            className="cinder-calendar-nav-btn"
            onClick={handlePrevYear}
            title={panelView === "year" ? "Previous Decade" : "Previous Year"}
          >
            &#171;
          </button>
          {panelView === "date" && (
            <button
              type="button"
              className="cinder-calendar-nav-btn"
              onClick={handlePrevMonth}
              title="Previous Month"
            >
              &#8249;
            </button>
          )}
        </div>

        <div className="cinder-calendar-header-titles">
          {panelView === "date" && (
            <button
              type="button"
              className="cinder-calendar-view-btn"
              onClick={(): void => setPanelView("month")}
            >
              {MONTH_NAMES[viewMonth]}
            </button>
          )}
          <button
            type="button"
            className="cinder-calendar-view-btn"
            onClick={(): void => setPanelView("year")}
          >
            {panelView === "year" ? `${decadeStart} - ${decadeStart + 9}` : viewYear}
          </button>
        </div>

        <div className="cinder-calendar-header-nav">
          {panelView === "date" && (
            <button
              type="button"
              className="cinder-calendar-nav-btn"
              onClick={handleNextMonth}
              title="Next Month"
            >
              &#8250;
            </button>
          )}
          <button
            type="button"
            className="cinder-calendar-nav-btn"
            onClick={handleNextYear}
            title={panelView === "year" ? "Next Decade" : "Next Year"}
          >
            &#187;
          </button>
        </div>
      </div>

      {/* Date View (Days Matrix) */}
      {panelView === "date" && (
        <div className="cinder-calendar-body">
          <table className="cinder-calendar-table" role="grid">
            <thead>
              <tr>
                {mode === "week" && (
                  <th className="cinder-calendar-th-week" scope="col">
                    Wk
                  </th>
                )}
                {DAY_NAMES_SHORT.map((dayName: string) => (
                  <th key={dayName} className="cinder-calendar-th" scope="col">
                    {dayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, rowIndex: number) => {
                const weekDays = calendarDays.slice(rowIndex * 7, (rowIndex + 1) * 7);
                const weekNum = getWeekNumber(weekDays[0].date);
                const isSelectedWeek =
                  mode === "week" &&
                  value &&
                  weekDays.some((d) => isSameDay(d.date, value));

                return (
                  <tr
                    key={`row-${rowIndex}`}
                    className={cn(
                      "cinder-calendar-row",
                      mode === "week" && "cinder-calendar-week-row",
                      isSelectedWeek && "cinder-calendar-week-selected"
                    )}
                    onClick={(): void => {
                      if (mode === "week") {
                        onSelect(weekDays[0].date);
                      }
                    }}
                  >
                    {mode === "week" && (
                      <td className="cinder-calendar-week-number">
                        {weekNum}
                      </td>
                    )}
                    {weekDays.map((item: CalendarDayItem) => {
                      const isDisabled = isDateDisabled(item.date);
                      const isSelected = isSameDay(item.date, value);
                      const isStart = isSameDay(item.date, rangeStart);
                      const isEnd = isSameDay(item.date, rangeEnd);
                      const isInRange = isDateInRange(item.date, rangeStart, activeEffectiveEnd);

                      return (
                        <td
                          key={item.date.toISOString()}
                          className={cn(
                            "cinder-calendar-cell",
                            !item.isCurrentMonth && "cinder-calendar-cell-overflow",
                            item.isToday && "cinder-calendar-cell-today",
                            isSelected && "cinder-calendar-cell-selected",
                            isStart && "cinder-calendar-cell-range-start",
                            isEnd && "cinder-calendar-cell-range-end",
                            isInRange && "cinder-calendar-cell-in-range",
                            isDisabled && "cinder-calendar-cell-disabled"
                          )}
                          onMouseEnter={(): void => onDayHover?.(item.date)}
                          onMouseLeave={(): void => onDayHover?.(null)}
                          onClick={(e): void => handleDayClick(item, e)}
                        >
                          <div className="cinder-calendar-date-value">
                            {item.dayNumber}
                          </div>
                          {dateCellRender && dateCellRender(item.date)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Month View (4x3 Grid) */}
      {panelView === "month" && (
        <div className="cinder-calendar-month-grid">
          {MONTH_NAMES_SHORT.map((name: string, idx: number) => {
            const isSelected = isSameMonth(new Date(viewYear, idx, 1), value);
            return (
              <button
                key={name}
                type="button"
                className={cn(
                  "cinder-calendar-month-cell",
                  isSelected && "cinder-calendar-month-selected"
                )}
                onClick={(): void => handleMonthSelect(idx)}
              >
                <span>{name}</span>
                {monthCellRender && monthCellRender(new Date(viewYear, idx, 1))}
              </button>
            );
          })}
        </div>
      )}

      {/* Year View (Decade Grid) */}
      {panelView === "year" && (
        <div className="cinder-calendar-year-grid">
          {Array.from({ length: 12 }).map((_, idx: number) => {
            const yearNum = decadeStart - 1 + idx;
            const isCurrentDecade = idx >= 1 && idx <= 10;
            const isSelected = isSameYear(new Date(yearNum, 0, 1), value);

            return (
              <button
                key={yearNum}
                type="button"
                className={cn(
                  "cinder-calendar-year-cell",
                  !isCurrentDecade && "cinder-calendar-year-overflow",
                  isSelected && "cinder-calendar-year-selected"
                )}
                onClick={(): void => handleYearSelect(yearNum)}
              >
                {yearNum}
              </button>
            );
          })}
        </div>
      )}

      {/* Footer Bar */}
      {showToday && panelView === "date" && mode !== "month" && mode !== "year" && (
        <div className="cinder-calendar-footer">
          <button
            type="button"
            className="cinder-calendar-today-btn"
            onClick={(): void => {
              const now = new Date();
              setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
              onTodayClick ? onTodayClick() : onSelect(now);
            }}
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
}
