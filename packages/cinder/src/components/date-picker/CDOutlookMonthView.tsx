import { type ReactElement, type MouseEvent } from "react";
import { cn } from "../../utils/cn";
import {
  isSameDay,
  isEventOnDate,
  generateCalendarMatrix,
  DAY_NAMES_SHORT,
  type CalendarDayItem,
} from "./utils";
import type { CDCalendarEvent } from "./types";

export interface CDOutlookMonthViewProps {
  /** Active month reference date */
  date: Date;
  /** Schedule events */
  events?: CDCalendarEvent[];
  /** Callback when selecting a date cell */
  onDateSelect?: (date: Date) => void;
  /** Callback when clicking on an event chip */
  onEventClick?: (event: CDCalendarEvent, e: MouseEvent) => void;
  /** Callback when clicking on '+X more' overflow badge */
  onMoreClick?: (date: Date, events: CDCalendarEvent[]) => void;
  /** Additional CSS class */
  className?: string;
}

const MAX_VISIBLE_EVENTS_PER_CELL: number = 3;

export function CDOutlookMonthView({
  date,
  events = [],
  onDateSelect,
  onEventClick,
  onMoreClick,
  className,
}: CDOutlookMonthViewProps): ReactElement {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // 1-based
  const matrix: CalendarDayItem[] = generateCalendarMatrix(year, month);

  // Reorder day headers to start with Monday: Mo, Tu, We, Th, Fr, Sa, Su
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
    <div className={cn("cinder-outlook-month-view", className)}>
      {/* Month Days Header */}
      <div className="cinder-outlook-month-header">
        {headerDays.map((name: string) => (
          <div key={name} className="cinder-outlook-month-header-cell">
            {name}
          </div>
        ))}
      </div>

      {/* 42-day Month Matrix Grid */}
      <div className="cinder-outlook-month-matrix">
        {matrix.map((cell: CalendarDayItem) => {
          const isSelected: boolean = isSameDay(cell.date, date);
          const cellEvents: CDCalendarEvent[] = events.filter((e: CDCalendarEvent) =>
            isEventOnDate(e.startDate, e.endDate, cell.date)
          );

          const visibleEvents: CDCalendarEvent[] = cellEvents.slice(
            0,
            MAX_VISIBLE_EVENTS_PER_CELL
          );
          const hiddenCount: number =
            cellEvents.length - MAX_VISIBLE_EVENTS_PER_CELL;

          return (
            <div
              key={cell.date.toISOString()}
              className={cn(
                "cinder-outlook-month-cell",
                !cell.isCurrentMonth && "cinder-outlook-cell-other-month",
                cell.isToday && "cinder-outlook-cell-today",
                isSelected && "cinder-outlook-cell-selected"
              )}
              onClick={(): void => onDateSelect?.(cell.date)}
            >
              {/* Day Number Header */}
              <div className="cinder-outlook-month-cell-header">
                <span
                  className={cn(
                    "cinder-outlook-month-day-number",
                    cell.isToday && "cinder-outlook-day-number-today"
                  )}
                >
                  {cell.dayNumber}
                </span>
              </div>

              {/* Event Stack */}
              <div className="cinder-outlook-month-events-stack">
                {visibleEvents.map((evt: CDCalendarEvent) => {
                  let timePrefix: string = "";
                  if (!evt.allDay) {
                    const h: number = evt.startDate.getHours();
                    const m: number = evt.startDate.getMinutes();
                    const mStr: string = m < 10 ? `0${m}` : `${m}`;
                    timePrefix = `${h}:${mStr} `;
                  }

                  return (
                    <div
                      key={evt.id}
                      className={cn(
                        "cinder-outlook-month-event-pill",
                        evt.variant
                          ? `cinder-outlook-pill-${evt.variant}`
                          : "cinder-outlook-pill-primary"
                      )}
                      style={evt.color ? { backgroundColor: evt.color } : undefined}
                      onClick={(e: MouseEvent): void => {
                        e.stopPropagation();
                        onEventClick?.(evt, e);
                      }}
                    >
                      <span className="cinder-outlook-pill-time">{timePrefix}</span>
                      <span className="cinder-outlook-pill-title">{evt.title}</span>
                    </div>
                  );
                })}

                {hiddenCount > 0 && (
                  <div
                    className="cinder-outlook-month-more-badge"
                    onClick={(e: MouseEvent): void => {
                      e.stopPropagation();
                      onMoreClick?.(cell.date, cellEvents);
                    }}
                  >
                    +{hiddenCount} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
