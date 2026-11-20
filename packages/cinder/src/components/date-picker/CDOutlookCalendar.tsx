import {
  useState,
  useEffect,
  forwardRef,
  type ReactElement,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { CDButton } from "../button";
import { CDOutlookDayView } from "./CDOutlookDayView";
import { CDOutlookWeekView } from "./CDOutlookWeekView";
import { CDOutlookMonthView } from "./CDOutlookMonthView";
import { CDOutlookYearView } from "./CDOutlookYearView";
import { CDOutlookEventModal } from "./CDOutlookEventModal";
import {
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
  DAY_NAMES_FULL,
  getWeekDays,
} from "./utils";
import type {
  CDOutlookCalendarProps,
  CDOutlookCalendarView,
  CDCalendarEvent,
} from "./types";

/**
 * Chevron vector icons for navigation
 */
function ChevronLeftIcon(): ReactElement {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon(): ReactElement {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MaximizeIcon(): ReactElement {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function MinimizeIcon(): ReactElement {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

export const CDOutlookCalendar = forwardRef<HTMLDivElement, CDOutlookCalendarProps>(
  (
    {
      value: controlledDate,
      defaultValue,
      onChange,
      view: controlledView,
      defaultView = "week",
      onViewChange,
      events = [],
      onEventClick,
      onSlotClick,
      startHour = 8,
      endHour = 20,
      showCurrentTime = true,
      allowFullscreen = true,
      fullscreen: controlledFullscreen,
      defaultFullscreen = false,
      onFullscreenChange,
      openModalOnClick = true,
      renderEventModal,
      renderSlotModal,
      onEventCreate,
      onEventDelete,
      className,
      style,
      ...rest
    }: CDOutlookCalendarProps,
    ref
  ): ReactElement => {
    const isDateControlled: boolean = controlledDate !== undefined;
    const [internalDate, setInternalDate] = useState<Date>(
      controlledDate || defaultValue || new Date()
    );

    const isViewControlled: boolean = controlledView !== undefined;
    const [internalView, setInternalView] = useState<CDOutlookCalendarView>(
      controlledView || defaultView
    );

    const isFullscreenControlled: boolean = controlledFullscreen !== undefined;
    const [internalFullscreen, setInternalFullscreen] = useState<boolean>(
      controlledFullscreen ?? defaultFullscreen ?? false
    );

    // Modal state for event details or slot quick create
    const [activeModalEvent, setActiveModalEvent] = useState<CDCalendarEvent | null>(null);
    const [activeModalSlot, setActiveModalSlot] = useState<{ date: Date; hour: number } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const activeDate: Date = isDateControlled && controlledDate ? controlledDate : internalDate;
    const activeView: CDOutlookCalendarView = isViewControlled && controlledView ? controlledView : internalView;
    const activeFullscreen: boolean = isFullscreenControlled
      ? (controlledFullscreen as boolean)
      : internalFullscreen;

    const setDate = (newDate: Date): void => {
      if (!isDateControlled) {
        setInternalDate(newDate);
      }
      onChange?.(newDate);
    };

    const setView = (newView: CDOutlookCalendarView): void => {
      if (!isViewControlled) {
        setInternalView(newView);
      }
      onViewChange?.(newView);
    };

    const toggleFullscreen = (): void => {
      const nextVal: boolean = !activeFullscreen;
      if (!isFullscreenControlled) {
        setInternalFullscreen(nextVal);
      }
      onFullscreenChange?.(nextVal);
    };

    // Escape key listener to exit fullscreen
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === "Escape" && activeFullscreen) {
          toggleFullscreen();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeFullscreen]);

    // Lock background scroll when fullscreen is active
    useEffect(() => {
      if (activeFullscreen && typeof document !== "undefined") {
        const originalOverflow: string = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [activeFullscreen]);

    // Navigation handlers
    const handlePrev = (): void => {
      const nextDate: Date = new Date(activeDate);
      if (activeView === "day") {
        nextDate.setDate(nextDate.getDate() - 1);
      } else if (activeView === "week") {
        nextDate.setDate(nextDate.getDate() - 7);
      } else if (activeView === "month") {
        nextDate.setMonth(nextDate.getMonth() - 1);
      } else if (activeView === "year") {
        nextDate.setFullYear(nextDate.getFullYear() - 1);
      }
      setDate(nextDate);
    };

    const handleNext = (): void => {
      const nextDate: Date = new Date(activeDate);
      if (activeView === "day") {
        nextDate.setDate(nextDate.getDate() + 1);
      } else if (activeView === "week") {
        nextDate.setDate(nextDate.getDate() + 7);
      } else if (activeView === "month") {
        nextDate.setMonth(nextDate.getMonth() + 1);
      } else if (activeView === "year") {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
      setDate(nextDate);
    };

    const handleToday = (): void => {
      setDate(new Date());
    };

    // Event click wrapper with modal support
    const handleEventClick = (evt: CDCalendarEvent, e: MouseEvent): void => {
      onEventClick?.(evt, e);
      if (openModalOnClick && !e.defaultPrevented) {
        setActiveModalEvent(evt);
        setActiveModalSlot(null);
        setIsModalOpen(true);
      }
    };

    // Slot click wrapper with modal support
    const handleSlotClick = (date: Date, hour: number): void => {
      onSlotClick?.(date, hour);
      if (openModalOnClick) {
        setActiveModalSlot({ date, hour });
        setActiveModalEvent(null);
        setIsModalOpen(true);
      }
    };

    // Formatted header title based on current view
    const getHeaderTitle = (): string => {
      const year: number = activeDate.getFullYear();
      const monthIdx: number = activeDate.getMonth();

      if (activeView === "day") {
        return `${DAY_NAMES_FULL[activeDate.getDay()]}, ${MONTH_NAMES[monthIdx]} ${activeDate.getDate()}, ${year}`;
      }
      if (activeView === "week") {
        const weekDays: Date[] = getWeekDays(activeDate, true);
        const startDay: Date = weekDays[0];
        const endDay: Date = weekDays[6];

        if (startDay.getMonth() === endDay.getMonth()) {
          return `${MONTH_NAMES[startDay.getMonth()]} ${startDay.getDate()} – ${endDay.getDate()}, ${year}`;
        }
        return `${MONTH_NAMES_SHORT[startDay.getMonth()]} ${startDay.getDate()} – ${MONTH_NAMES_SHORT[endDay.getMonth()]} ${endDay.getDate()}, ${year}`;
      }
      if (activeView === "month") {
        return `${MONTH_NAMES[monthIdx]} ${year}`;
      }
      return `${year}`;
    };

    const viewOptions: { key: CDOutlookCalendarView; label: string }[] = [
      { key: "day", label: "Day" },
      { key: "week", label: "Week" },
      { key: "month", label: "Month" },
      { key: "year", label: "Year" },
    ];

    const calendarContent: ReactElement = (
      <div
        ref={ref}
        style={style}
        className={cn(
          "cinder-outlook-calendar",
          `cinder-outlook-view-${activeView}`,
          activeFullscreen && "cinder-outlook-fullscreen",
          className
        )}
        {...rest}
      >
        {/* Top Control Bar */}
        <div className="cinder-outlook-toolbar">
          <div className="cinder-outlook-toolbar-left">
            <CDButton size="sm" variant="secondary" onClick={handleToday}>
              Today
            </CDButton>
            <div className="cinder-outlook-nav-buttons">
              <CDButton
                size="sm"
                variant="ghost"
                onClick={handlePrev}
                aria-label="Previous period"
              >
                <ChevronLeftIcon />
              </CDButton>
              <CDButton
                size="sm"
                variant="ghost"
                onClick={handleNext}
                aria-label="Next period"
              >
                <ChevronRightIcon />
              </CDButton>
            </div>
            <h2 className="cinder-outlook-toolbar-title">{getHeaderTitle()}</h2>
          </div>

          <div className="cinder-outlook-toolbar-right">
            {/* View Switcher */}
            <div className="cinder-outlook-view-switcher">
              {viewOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={cn(
                    "cinder-outlook-switcher-btn",
                    activeView === opt.key && "cinder-outlook-switcher-active"
                  )}
                  onClick={(): void => setView(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Zoom / Fullscreen Button */}
            {allowFullscreen && (
              <CDButton
                size="sm"
                variant={activeFullscreen ? "primary" : "secondary"}
                onClick={toggleFullscreen}
                aria-label={activeFullscreen ? "Exit Zoom" : "Zoom Calendar"}
              >
                {activeFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
                <span>{activeFullscreen ? "Exit Zoom" : "Zoom"}</span>
              </CDButton>
            )}
          </div>
        </div>

        {/* View Content Display */}
        <div className="cinder-outlook-body">
          {activeView === "day" && (
            <CDOutlookDayView
              date={activeDate}
              events={events}
              startHour={startHour}
              endHour={endHour}
              showCurrentTime={showCurrentTime}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
            />
          )}

          {activeView === "week" && (
            <CDOutlookWeekView
              date={activeDate}
              events={events}
              startHour={startHour}
              endHour={endHour}
              showCurrentTime={showCurrentTime}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
              onDayHeaderClick={(d: Date): void => {
                setDate(d);
                setView("day");
              }}
            />
          )}

          {activeView === "month" && (
            <CDOutlookMonthView
              date={activeDate}
              events={events}
              onDateSelect={(d: Date): void => {
                setDate(d);
                setView("day");
              }}
              onEventClick={handleEventClick}
              onMoreClick={(d: Date): void => {
                setDate(d);
                setView("day");
              }}
            />
          )}

          {activeView === "year" && (
            <CDOutlookYearView
              date={activeDate}
              events={events}
              onDateClick={(d: Date): void => {
                setDate(d);
                setView("day");
              }}
              onMonthHeaderClick={(mIdx: number): void => {
                const nextDate: Date = new Date(activeDate);
                nextDate.setMonth(mIdx);
                setDate(nextDate);
                setView("month");
              }}
            />
          )}
        </div>

        {/* Event Detail & Slot Create Modal */}
        <CDOutlookEventModal
          open={isModalOpen}
          onClose={(): void => setIsModalOpen(false)}
          event={activeModalEvent}
          slot={activeModalSlot}
          renderEventModal={renderEventModal}
          renderSlotModal={renderSlotModal}
          onEventCreate={(newEvt: CDCalendarEvent): void => {
            onEventCreate?.(newEvt);
          }}
          onEventDelete={(evt: CDCalendarEvent): void => {
            onEventDelete?.(evt);
          }}
        />
      </div>
    );

    // When in fullscreen mode, render into document.body portal so it is never
    // occluded or trapped by parent layout stacking contexts (such as top navigation headers)
    if (activeFullscreen && typeof document !== "undefined") {
      return createPortal(calendarContent, document.body);
    }

    return calendarContent;
  }
);

CDOutlookCalendar.displayName = "CDOutlookCalendar";

// Backward-compatible alias
export const OutlookCalendar = CDOutlookCalendar;
