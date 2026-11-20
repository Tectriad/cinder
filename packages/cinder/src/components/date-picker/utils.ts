export const MONTH_NAMES: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MONTH_NAMES_SHORT: string[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const DAY_NAMES_SHORT: string[] = [
  "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
];

export interface CalendarDayItem {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

/**
 * Returns number of days in a given month (1-based month index: 1-12)
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Checks if two dates represent the exact same calendar day
 */
export function isSameDay(d1?: Date | null, d2?: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Checks if two dates fall into the same month and year
 */
export function isSameMonth(d1?: Date | null, d2?: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth()
  );
}

/**
 * Checks if two dates fall into the same year
 */
export function isSameYear(d1?: Date | null, d2?: Date | null): boolean {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear();
}

/**
 * Checks if a date falls strictly between start and end (inclusive)
 */
export function isDateInRange(target: Date, start?: Date | null, end?: Date | null): boolean {
  if (!start || !end) return false;
  const time = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return time >= Math.min(startTime, endTime) && time <= Math.max(startTime, endTime);
}

/**
 * Returns ISO week number for a given date
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Generates a full 42-day calendar matrix (6 rows x 7 days) for a given year and month (0-indexed month)
 */
export function getCalendarDays(year: number, month: number): CalendarDayItem[] {
  const days: CalendarDayItem[] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ...
  const daysInCurrentMonth = getDaysInMonth(year, month + 1);

  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth + 1);

  const today = new Date();

  // Previous month trailing days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i;
    const date = new Date(prevMonthYear, prevMonth, dayNumber);
    days.push({
      date,
      dayNumber,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    });
  }

  // Current month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
    });
  }

  // Next month leading days (to fill 42 cells)
  const remaining = 42 - days.length;
  const nextMonthYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(nextMonthYear, nextMonth, i);
    days.push({
      date,
      dayNumber: i,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    });
  }

  return days;
}

/**
 * Convenience wrapper returning 42-day calendar matrix for 1-based month (1-12)
 */
export function generateCalendarMatrix(year: number, month1Based: number): CalendarDayItem[] {
  return getCalendarDays(year, month1Based - 1);
}

/**
 * Formats a Date object according to standard pattern tokens
 */
export function formatDate(date: Date | null | undefined, pattern: string = "YYYY-MM-DD"): string {
  if (!date || isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours24 >= 12 ? "PM" : "AM";

  const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

  return pattern
    .replace(/YYYY/g, String(year))
    .replace(/YY/g, String(year).slice(-2))
    .replace(/MMMM/g, MONTH_NAMES[month - 1])
    .replace(/MMM/g, MONTH_NAMES_SHORT[month - 1])
    .replace(/MM/g, pad(month))
    .replace(/M/g, String(month))
    .replace(/DD/g, pad(day))
    .replace(/D/g, String(day))
    .replace(/HH/g, pad(hours24))
    .replace(/H/g, String(hours24))
    .replace(/hh/g, pad(hours12))
    .replace(/h/g, String(hours12))
    .replace(/mm/g, pad(minutes))
    .replace(/m/g, String(minutes))
    .replace(/ss/g, pad(seconds))
    .replace(/s/g, String(seconds))
    .replace(/a/g, ampm.toLowerCase())
    .replace(/A/g, ampm);
}

/**
 * Parses a date string into a Date object
 */
export function parseDate(str?: string | Date | null): Date | null {
  if (!str) return null;
  if (str instanceof Date) return isNaN(str.getTime()) ? null : str;

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  return null;
}

export const DAY_NAMES_FULL: string[] = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

/**
 * Returns an array of 7 consecutive dates representing the week containing the given date
 * (starts on Monday by default)
 */
export function getWeekDays(referenceDate: Date, startOnMonday: boolean = true): Date[] {
  const d: Date = new Date(referenceDate);
  d.setHours(0, 0, 0, 0);
  const dayIndex: number = d.getDay(); // 0 is Sunday, 1 is Monday ...
  const diff: number = startOnMonday ? (dayIndex === 0 ? -6 : 1 - dayIndex) : -dayIndex;
  d.setDate(d.getDate() + diff);

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const cur: Date = new Date(d);
    cur.setDate(d.getDate() + i);
    days.push(cur);
  }
  return days;
}

/**
 * Checks if an event falls on a specific date
 */
export function isEventOnDate(
  eventStart: Date,
  eventEnd: Date,
  targetDate: Date
): boolean {
  const start: number = new Date(
    eventStart.getFullYear(),
    eventStart.getMonth(),
    eventStart.getDate()
  ).getTime();
  const end: number = new Date(
    eventEnd.getFullYear(),
    eventEnd.getMonth(),
    eventEnd.getDate()
  ).getTime();
  const target: number = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  ).getTime();

  return target >= start && target <= end;
}

/**
 * Formats time range string e.g. "09:30 AM – 10:45 AM"
 */
export function formatEventTimeRange(start: Date, end: Date, allDay?: boolean): string {
  if (allDay) return "All day";
  const formatTime = (d: Date): string => {
    let hours: number = d.getHours();
    const minutes: number = d.getMinutes();
    const ampm: string = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const minStr: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minStr} ${ampm}`;
  };

  return `${formatTime(start)} – ${formatTime(end)}`;
}
