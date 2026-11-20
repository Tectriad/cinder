import { type ReactElement, type MouseEvent } from "react";
import { cn } from "../../utils/cn";
import {
  isSameDay,
  isEventOnDate,
  formatEventTimeRange,
  getWeekDays,
  DAY_NAMES_SHORT,
} from "./utils";
import type { CDCalendarEvent } from "./types";

export interface CDOutlookWeekViewProps {
  /** Active date within the week */
  date: Date;
  /** Schedule events */
  events?: CDCalendarEvent[];
  /** Grid starting hour (0-23, default: 8) */
  startHour?: number;
  /** Grid ending hour (0-23, default: 20) */
  endHour?: number;
  /** Display live current time indicator */
  showCurrentTime?: boolean;
  /** Callback when clicking an event card */
  onEventClick?: (event: CDCalendarEvent, e: MouseEvent) => void;
  /** Callback when clicking an empty time slot */
  onSlotClick?: (date: Date, hour: number) => void;
  /** Callback when clicking a day header to drill down */
  onDayHeaderClick?: (date: Date) => void;
  /** Additional CSS class */
  className?: string;
}

const SLOT_HEIGHT: number = 60; // 60px per hour

export function CDOutlookWeekView({
  date,
  events = [],
  startHour = 8,
  endHour = 20,
  showCurrentTime = true,
  onEventClick,
  onSlotClick,
  onDayHeaderClick,
  className,
}: CDOutlookWeekViewProps): ReactElement {
  const now: Date = new Date();
  const weekDays: Date[] = getWeekDays(date, true); // Monday - Sunday

  const hours: number[] = [];
  for (let h: number = startHour; h <= endHour; h++) {
    hours.push(h);
  }

  // Pre-filter events per day
  const eventsByDay: Map<number, { allDay: CDCalendarEvent[]; timed: CDCalendarEvent[] }> =
    new Map();

  let hasAnyAllDay: boolean = false;

  weekDays.forEach((day: Date, idx: number) => {
    const dayEvts: CDCalendarEvent[] = events.filter((e: CDCalendarEvent) =>
      isEventOnDate(e.startDate, e.endDate, day)
    );
    const allDay: CDCalendarEvent[] = dayEvts.filter((e: CDCalendarEvent) => e.allDay);
    const timed: CDCalendarEvent[] = dayEvts.filter((e: CDCalendarEvent) => !e.allDay);
    if (allDay.length > 0) hasAnyAllDay = true;
    eventsByDay.set(idx, { allDay, timed });
  });

  const formatHourLabel = (h: number): string => {
    const ampm: string = h >= 12 ? "PM" : "AM";
    const h12: number = h % 12 === 0 ? 12 : h % 12;
    return `${h12} ${ampm}`;
  };

  return (
    <div className={cn("cinder-outlook-week-view", className)}>
      {/* Week Header Row */}
      <div className="cinder-outlook-week-header">
        <div className="cinder-outlook-gutter-placeholder" />
        <div className="cinder-outlook-week-header-columns">
          {weekDays.map((day: Date) => {
            const isToday: boolean = isSameDay(day, now);
            const isSelected: boolean = isSameDay(day, date);
            // Day index: Monday is 1, Sunday is 0
            const dayOfWeek: number = day.getDay();
            const dayLabel: string = DAY_NAMES_SHORT[dayOfWeek];

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "cinder-outlook-week-header-cell",
                  isToday && "cinder-outlook-header-today",
                  isSelected && "cinder-outlook-header-selected"
                )}
                onClick={(): void => onDayHeaderClick?.(day)}
              >
                <span className="cinder-outlook-week-day-name">{dayLabel}</span>
                <span className="cinder-outlook-week-day-num">{day.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* All-Day Events Row */}
      {hasAnyAllDay && (
        <div className="cinder-outlook-week-allday-row">
          <div className="cinder-outlook-allday-label">all-day</div>
          <div className="cinder-outlook-week-allday-columns">
            {weekDays.map((day: Date, idx: number) => {
              const dayGroup = eventsByDay.get(idx);
              const allDayList: CDCalendarEvent[] = dayGroup?.allDay || [];
              return (
                <div key={day.toISOString()} className="cinder-outlook-week-allday-col">
                  {allDayList.map((evt: CDCalendarEvent) => (
                    <div
                      key={evt.id}
                      className={cn(
                        "cinder-outlook-event-chip",
                        evt.variant
                          ? `cinder-outlook-variant-${evt.variant}`
                          : "cinder-outlook-variant-primary"
                      )}
                      style={evt.color ? { backgroundColor: evt.color } : undefined}
                      onClick={(e: MouseEvent): void => onEventClick?.(evt, e)}
                    >
                      <span className="cinder-outlook-event-chip-title">{evt.title}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timed Grid */}
      <div className="cinder-outlook-week-grid-container">
        {/* Left Time Gutter */}
        <div className="cinder-outlook-time-gutter">
          {hours.map((h: number) => (
            <div
              key={h}
              className="cinder-outlook-gutter-slot"
              style={{ height: `${SLOT_HEIGHT}px` }}
            >
              <span className="cinder-outlook-gutter-label">
                {formatHourLabel(h)}
              </span>
            </div>
          ))}
        </div>

        {/* 7 Day Columns */}
        <div className="cinder-outlook-week-columns">
          {weekDays.map((day: Date, colIdx: number) => {
            const isToday: boolean = isSameDay(day, now);
            const dayGroup = eventsByDay.get(colIdx);
            const timedList: CDCalendarEvent[] = dayGroup?.timed || [];

            // Current time calculation for this column
            let currentTimeTop: number = -1;
            if (isToday) {
              const curH: number = now.getHours();
              const curM: number = now.getMinutes();
              if (curH >= startHour && curH <= endHour) {
                currentTimeTop =
                  (curH - startHour) * SLOT_HEIGHT + (curM / 60) * SLOT_HEIGHT;
              }
            }

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "cinder-outlook-week-day-col",
                  isToday && "cinder-outlook-day-col-today"
                )}
              >
                {/* Hour slots */}
                {hours.map((h: number) => (
                  <div
                    key={h}
                    className="cinder-outlook-hour-slot"
                    style={{ height: `${SLOT_HEIGHT}px` }}
                    onClick={(): void => onSlotClick?.(day, h)}
                  >
                    <div className="cinder-outlook-half-hour-line" />
                  </div>
                ))}

                {/* Current Time Line in Today's column */}
                {showCurrentTime && currentTimeTop >= 0 && (
                  <div
                    className="cinder-outlook-current-time-line"
                    style={{ top: `${currentTimeTop}px` }}
                  >
                    <div className="cinder-outlook-current-time-dot" />
                  </div>
                )}

                {/* Timed Events */}
                {timedList.map((evt: CDCalendarEvent) => {
                  const startH: number = evt.startDate.getHours();
                  const startM: number = evt.startDate.getMinutes();
                  const endH: number = evt.endDate.getHours();
                  const endM: number = evt.endDate.getMinutes();

                  const startMinutes: number =
                    (startH - startHour) * 60 + startM;
                  const durationMinutes: number =
                    (endH - startH) * 60 + (endM - startM);

                  const top: number = (startMinutes / 60) * SLOT_HEIGHT;
                  const height: number = Math.max(
                    24,
                    (durationMinutes / 60) * SLOT_HEIGHT - 3
                  );

                  if (top + height < 0 || top > hours.length * SLOT_HEIGHT) {
                    return null;
                  }

                  return (
                    <div
                      key={evt.id}
                      className={cn(
                        "cinder-outlook-event-card",
                        "cinder-outlook-card-compact",
                        evt.variant
                          ? `cinder-outlook-card-${evt.variant}`
                          : "cinder-outlook-card-primary"
                      )}
                      style={{
                        top: `${Math.max(0, top)}px`,
                        height: `${height}px`,
                        backgroundColor: evt.color ? `${evt.color}20` : undefined,
                        borderLeftColor: evt.color || undefined,
                      }}
                      onClick={(e: MouseEvent): void => onEventClick?.(evt, e)}
                    >
                      <div className="cinder-outlook-event-header">
                        <span className="cinder-outlook-event-title">{evt.title}</span>
                      </div>
                      {height >= 36 && (
                        <span className="cinder-outlook-event-time">
                          {formatEventTimeRange(evt.startDate, evt.endDate)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
