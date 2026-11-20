import { type ReactElement } from "react";
import { cn } from "../../utils/cn";
import {
  isSameDay,
  isEventOnDate,
  generateCalendarMatrix,
  MONTH_NAMES,
  DAY_NAMES_SHORT,
  type CalendarDayItem,
} from "./utils";
import type { CDCalendarEvent } from "./types";

export interface CDOutlookYearViewProps {
  /** Active year reference date */
  date: Date;
  /** Schedule events */
  events?: CDCalendarEvent[];
  /** Callback when clicking a specific date in any mini-month */
  onDateClick?: (date: Date) => void;
  /** Callback when clicking a mini-month header to switch to Month view */
  onMonthHeaderClick?: (monthIndex: number) => void;
  /** Additional CSS class */
  className?: string;
}

export function CDOutlookYearView({
  date,
  events = [],
  onDateClick,
  onMonthHeaderClick,
  className,
}: CDOutlookYearViewProps): ReactElement {
  const year: number = date.getFullYear();
  const currentMonthIdx: number = date.getMonth();

  // Reorder day headers to start with Monday
  const headerDays: string[] = [
    DAY_NAMES_SHORT[1],
    DAY_NAMES_SHORT[2],
    DAY_NAMES_SHORT[3],
    DAY_NAMES_SHORT[4],
    DAY_NAMES_SHORT[5],
    DAY_NAMES_SHORT[6],
    DAY_NAMES_SHORT[0],
  ];

  return (
    <div className={cn("cinder-outlook-year-view", className)}>
      <div className="cinder-outlook-year-grid">
        {MONTH_NAMES.map((monthName: string, mIdx: number) => {
          const matrix: CalendarDayItem[] = generateCalendarMatrix(year, mIdx + 1);
          const isSelectedMonth: boolean = currentMonthIdx === mIdx;

          return (
            <div
              key={monthName}
              className={cn(
                "cinder-outlook-mini-month-card",
                isSelectedMonth && "cinder-outlook-mini-month-active"
              )}
            >
              {/* Mini-Month Title Header */}
              <div
                className="cinder-outlook-mini-month-header"
                onClick={(): void => onMonthHeaderClick?.(mIdx)}
              >
                <span className="cinder-outlook-mini-month-name">{monthName}</span>
              </div>

              {/* Day Abbreviations */}
              <div className="cinder-outlook-mini-day-headers">
                {headerDays.map((d: string) => (
                  <span key={d} className="cinder-outlook-mini-day-header">
                    {d}
                  </span>
                ))}
              </div>

              {/* Day Matrix Cells */}
              <div className="cinder-outlook-mini-matrix">
                {matrix.map((cell: CalendarDayItem) => {
                  const isSelectedDate: boolean = isSameDay(cell.date, date);
                  const hasEvents: boolean = events.some((e: CDCalendarEvent) =>
                    isEventOnDate(e.startDate, e.endDate, cell.date)
                  );

                  return (
                    <div
                      key={cell.date.toISOString()}
                      className={cn(
                        "cinder-outlook-mini-cell",
                        !cell.isCurrentMonth && "cinder-outlook-mini-cell-other",
                        cell.isToday && "cinder-outlook-mini-cell-today",
                        isSelectedDate && "cinder-outlook-mini-cell-selected"
                      )}
                      onClick={(): void => onDateClick?.(cell.date)}
                    >
                      <span className="cinder-outlook-mini-day-num">
                        {cell.dayNumber}
                      </span>
                      {hasEvents && cell.isCurrentMonth && (
                        <div className="cinder-outlook-mini-event-dot" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
