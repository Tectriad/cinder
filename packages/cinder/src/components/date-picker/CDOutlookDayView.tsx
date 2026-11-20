import { type ReactElement, type MouseEvent } from "react";
import { cn } from "../../utils/cn";
import {
  isSameDay,
  isEventOnDate,
  formatEventTimeRange,
  DAY_NAMES_FULL,
  MONTH_NAMES,
} from "./utils";
import type { CDCalendarEvent } from "./types";

export interface CDOutlookDayViewProps {
  /** Active date being displayed */
  date: Date;
  /** Schedule events */
  events?: CDCalendarEvent[];
  /** Grid starting hour (0-23, default: 8) */
  startHour?: number;
  /** Grid ending hour (0-23, default: 20) */
  endHour?: number;
  /** Display current live time indicator */
  showCurrentTime?: boolean;
  /** Callback when clicking an event */
  onEventClick?: (event: CDCalendarEvent, e: MouseEvent) => void;
  /** Callback when clicking a time slot */
  onSlotClick?: (date: Date, hour: number) => void;
  /** Additional CSS class */
  className?: string;
}

const SLOT_HEIGHT: number = 60; // 60px per hour

export function CDOutlookDayView({
  date,
  events = [],
  startHour = 8,
  endHour = 20,
  showCurrentTime = true,
  onEventClick,
  onSlotClick,
  className,
}: CDOutlookDayViewProps): ReactElement {
  const now: Date = new Date();
  const isCurrentDayToday: boolean = isSameDay(date, now);

  const hours: number[] = [];
  for (let h: number = startHour; h <= endHour; h++) {
    hours.push(h);
  }

  // Filter events belonging to this day
  const dayEvents: CDCalendarEvent[] = events.filter((e: CDCalendarEvent) =>
    isEventOnDate(e.startDate, e.endDate, date)
  );

  const allDayEvents: CDCalendarEvent[] = dayEvents.filter(
    (e: CDCalendarEvent) => e.allDay
  );
  const timedEvents: CDCalendarEvent[] = dayEvents.filter(
    (e: CDCalendarEvent) => !e.allDay
  );

  // Current time position calculation
  let currentTimeTop: number = -1;
  if (isCurrentDayToday) {
    const curHour: number = now.getHours();
    const curMinute: number = now.getMinutes();
    if (curHour >= startHour && curHour <= endHour) {
      currentTimeTop =
        (curHour - startHour) * SLOT_HEIGHT + (curMinute / 60) * SLOT_HEIGHT;
    }
  }

  const formatHourLabel = (h: number): string => {
    const ampm: string = h >= 12 ? "PM" : "AM";
    const h12: number = h % 12 === 0 ? 12 : h % 12;
    return `${h12} ${ampm}`;
  };

  return (
    <div className={cn("cinder-outlook-day-view", className)}>
      {/* Day Header */}
      <div className="cinder-outlook-day-header">
        <div className="cinder-outlook-day-header-left">
          <span className="cinder-outlook-day-title">
            {DAY_NAMES_FULL[date.getDay()]}, {MONTH_NAMES[date.getMonth()]}{" "}
            {date.getDate()}
          </span>
          {isCurrentDayToday && (
            <span className="cinder-outlook-today-badge">Today</span>
          )}
        </div>
      </div>

      {/* All-Day Events Section (if any) */}
      {allDayEvents.length > 0 && (
        <div className="cinder-outlook-allday-row">
          <div className="cinder-outlook-allday-label">all-day</div>
          <div className="cinder-outlook-allday-events">
            {allDayEvents.map((evt: CDCalendarEvent) => (
              <div
                key={evt.id}
                className={cn(
                  "cinder-outlook-event-chip",
                  evt.variant ? `cinder-outlook-variant-${evt.variant}` : "cinder-outlook-variant-primary"
                )}
                style={evt.color ? { backgroundColor: evt.color } : undefined}
                onClick={(e: MouseEvent): void => onEventClick?.(evt, e)}
              >
                <span className="cinder-outlook-event-chip-title">{evt.title}</span>
                {evt.location && (
                  <span className="cinder-outlook-event-chip-loc">{evt.location}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timed Grid */}
      <div className="cinder-outlook-grid-container">
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

        <div className="cinder-outlook-day-column">
          {/* Hour Horizontal Gridlines */}
          {hours.map((h: number) => (
            <div
              key={h}
              className="cinder-outlook-hour-slot"
              style={{ height: `${SLOT_HEIGHT}px` }}
              onClick={(): void => onSlotClick?.(date, h)}
            >
              <div className="cinder-outlook-half-hour-line" />
            </div>
          ))}

          {/* Current Live Time Indicator */}
          {showCurrentTime && currentTimeTop >= 0 && (
            <div
              className="cinder-outlook-current-time-line"
              style={{ top: `${currentTimeTop}px` }}
            >
              <div className="cinder-outlook-current-time-dot" />
            </div>
          )}

          {/* Timed Event Blocks */}
          {timedEvents.map((evt: CDCalendarEvent) => {
            const startH: number = evt.startDate.getHours();
            const startM: number = evt.startDate.getMinutes();
            const endH: number = evt.endDate.getHours();
            const endM: number = evt.endDate.getMinutes();

            const startMinutesFromBase: number =
              (startH - startHour) * 60 + startM;
            const durationMinutes: number =
              (endH - startH) * 60 + (endM - startM);

            const top: number = (startMinutesFromBase / 60) * SLOT_HEIGHT;
            const height: number = Math.max(
              28,
              (durationMinutes / 60) * SLOT_HEIGHT - 3
            );

            // Skip if completely outside grid range
            if (top + height < 0 || top > hours.length * SLOT_HEIGHT) {
              return null;
            }

            return (
              <div
                key={evt.id}
                className={cn(
                  "cinder-outlook-event-card",
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
                  <span className="cinder-outlook-event-time">
                    {formatEventTimeRange(evt.startDate, evt.endDate)}
                  </span>
                </div>
                {height > 44 && evt.location && (
                  <div className="cinder-outlook-event-location">
                    {evt.location}
                  </div>
                )}
                {height > 58 && evt.description && (
                  <div className="cinder-outlook-event-desc">
                    {evt.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
