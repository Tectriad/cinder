import type { ReactNode, CSSProperties, FocusEvent } from "react";

export type CDDatePickerMode = "date" | "week" | "month" | "year";
export type CDDatePickerPlacement = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
export type CDDatePickerSize = "sm" | "md" | "lg";

export interface CDDatePickerProps {
  /** Selected date value */
  value?: Date | string | null;
  /** Initial selected date (uncontrolled) */
  defaultValue?: Date | string | null;
  /** Change callback with Date object and formatted date string */
  onChange?: (date: Date | null, dateString: string) => void;
  /** Selection granularity mode */
  mode?: CDDatePickerMode;
  /** Mode alias */
  picker?: CDDatePickerMode;
  /** Date format string (e.g. 'YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY') */
  format?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Function to specify disabled dates (e.g. past dates, weekends) */
  disabledDate?: (currentDate: Date) => boolean;
  /** Minimum selectable date */
  minDate?: Date | string;
  /** Maximum selectable date */
  maxDate?: Date | string;
  /** Placeholder text */
  placeholder?: string;
  /** Show clear button when value is present */
  allowClear?: boolean;
  /** Show 'Today' button in calendar footer */
  showToday?: boolean;
  /** Dimension size tier */
  size?: CDDatePickerSize;
  /** Validation status state */
  status?: "error" | "warning";
  /** Placement direction */
  placement?: CDDatePickerPlacement;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline style */
  style?: CSSProperties;
  /** Focus event handler */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export interface CDDateRangePickerProps {
  /** Range value [startDate, endDate] */
  value?: [Date | null, Date | null];
  /** Default range value */
  defaultValue?: [Date | null, Date | null];
  /** Change callback */
  onChange?: (dates: [Date | null, Date | null], dateStrings: [string, string]) => void;
  /** Granularity mode */
  mode?: CDDatePickerMode;
  /** Date format string */
  format?: string;
  /** Disabled state for either or both inputs */
  disabled?: boolean | [boolean, boolean];
  /** Function to specify disabled dates */
  disabledDate?: (currentDate: Date) => boolean;
  /** Placeholders [startPlaceholder, endPlaceholder] */
  placeholder?: [string, string];
  /** Show clear button */
  allowClear?: boolean;
  /** Dimension size tier */
  size?: CDDatePickerSize;
  /** Validation status */
  status?: "error" | "warning";
  /** Additional class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export interface CDTimePickerProps {
  /** Selected time value (Date object or time string) */
  value?: Date | string | null;
  /** Default time value */
  defaultValue?: Date | string | null;
  /** Change callback */
  onChange?: (time: Date | null, timeString: string) => void;
  /** Time format (e.g. 'HH:mm', 'HH:mm:ss', 'hh:mm a') */
  format?: string;
  /** 12-hour clock mode with AM/PM */
  use12Hours?: boolean;
  /** Step interval for hours */
  hourStep?: number;
  /** Step interval for minutes */
  minuteStep?: number;
  /** Step interval for seconds */
  secondStep?: number;
  /** Whether the time picker is disabled */
  disabled?: boolean;
  /** Disabled hours array generator */
  disabledHours?: () => number[];
  /** Disabled minutes array generator */
  disabledMinutes?: (selectedHour: number) => number[];
  /** Disabled seconds array generator */
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  /** Placeholder text */
  placeholder?: string;
  /** Show clear button */
  allowClear?: boolean;
  /** Show 'Now' button */
  showNow?: boolean;
  /** Dimension size tier */
  size?: CDDatePickerSize;
  /** Validation status */
  status?: "error" | "warning";
  /** Placement direction */
  placement?: CDDatePickerPlacement;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline style */
  style?: CSSProperties;
}

export interface CDCalendarProps {
  /** Selected calendar date */
  value?: Date;
  /** Default selected date */
  defaultValue?: Date;
  /** Change callback */
  onChange?: (date: Date) => void;
  /** Selection callback */
  onSelect?: (date: Date) => void;
  /** Display mode ('month' shows days, 'year' shows months, or Outlook views) */
  mode?: "day" | "week" | "month" | "year";
  /** Panel change callback */
  onPanelChange?: (date: Date, mode: "day" | "week" | "month" | "year") => void;
  /** Mode switch callback */
  onModeChange?: (mode: "day" | "week" | "month" | "year") => void;
  /** Disabled dates check */
  disabledDate?: (date: Date) => boolean;
  /** Custom date cell content render */
  dateCellRender?: (date: Date) => ReactNode;
  /** Custom month cell content render */
  monthCellRender?: (date: Date) => ReactNode;
  /** Optional events collection for Outlook-style scheduling */
  events?: CDCalendarEvent[];
  /** Event click callback */
  onEventClick?: (event: CDCalendarEvent, e: React.MouseEvent) => void;
  /** Time slot click callback */
  onSlotClick?: (date: Date, hour: number) => void;
  /** Additional class names */
  className?: string;
  /** Custom inline style */
  style?: CSSProperties;
}

export type CDCalendarEventVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "purple"
  | "cyan"
  | "orange";

export interface CDCalendarEvent {
  /** Unique event identifier */
  id: string;
  /** Event title */
  title: string;
  /** Event start date and time */
  startDate: Date;
  /** Event end date and time */
  endDate: Date;
  /** Whether the event spans the entire day */
  allDay?: boolean;
  /** Visual color theme accent */
  variant?: CDCalendarEventVariant;
  /** Custom hex background color override */
  color?: string;
  /** Description or agenda details */
  description?: string;
  /** Event location or virtual meeting URL */
  location?: string;
  /** Event category badge label */
  category?: string;
}

export type CDOutlookCalendarView = "day" | "week" | "month" | "year";

export interface CDOutlookCalendarProps {
  /** Currently active date */
  value?: Date;
  /** Default active date */
  defaultValue?: Date;
  /** Callback triggered when the active date changes */
  onChange?: (date: Date) => void;
  /** Active view mode */
  view?: CDOutlookCalendarView;
  /** Default view mode */
  defaultView?: CDOutlookCalendarView;
  /** Callback triggered when view mode switches */
  onViewChange?: (view: CDOutlookCalendarView) => void;
  /** Array of schedule events */
  events?: CDCalendarEvent[];
  /** Callback triggered when clicking on an event block */
  onEventClick?: (event: CDCalendarEvent, e: React.MouseEvent) => void;
  /** Callback triggered when clicking on a time slot */
  onSlotClick?: (date: Date, hour: number) => void;
  /** First hour displayed on day/week grid (0-23, default: 8) */
  startHour?: number;
  /** Last hour displayed on day/week grid (0-23, default: 20) */
  endHour?: number;
  /** Show live current time indicator line */
  showCurrentTime?: boolean;
  /** Show Zoom / Fullscreen action button in toolbar (default: true) */
  allowFullscreen?: boolean;
  /** Controlled fullscreen / zoom state */
  fullscreen?: boolean;
  /** Initial fullscreen state */
  defaultFullscreen?: boolean;
  /** Callback when fullscreen / zoom mode is toggled */
  onFullscreenChange?: (isFullscreen: boolean) => void;
  /** Automatically open detail modal when clicking an event or slot (default: true) */
  openModalOnClick?: boolean;
  /** Custom render function to pass a custom component or view into the event modal */
  renderEventModal?: (event: CDCalendarEvent, onClose: () => void) => ReactNode;
  /** Custom render function to pass a custom component or view when clicking an empty time slot */
  renderSlotModal?: (slot: { date: Date; hour: number }, onClose: () => void) => ReactNode;
  /** Callback when an event is created from the quick modal */
  onEventCreate?: (event: CDCalendarEvent) => void;
  /** Callback when an event is deleted from the detail modal */
  onEventDelete?: (event: CDCalendarEvent) => void;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export interface CDOutlookEventModalProps {
  /** Whether the modal dialog is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Active clicked event details (if any) */
  event?: CDCalendarEvent | null;
  /** Active clicked time slot details (if any) */
  slot?: { date: Date; hour: number } | null;
  /** Custom render function for event modal body */
  renderEventModal?: (event: CDCalendarEvent, onClose: () => void) => ReactNode;
  /** Custom render function for time slot modal body */
  renderSlotModal?: (slot: { date: Date; hour: number }, onClose: () => void) => ReactNode;
  /** Callback to create a new event */
  onEventCreate?: (event: CDCalendarEvent) => void;
  /** Callback to delete an event */
  onEventDelete?: (event: CDCalendarEvent) => void;
}
