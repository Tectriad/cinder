import { useState, type ReactElement } from "react";
import {
  CDDatePicker,
  CDDateRangePicker,
  CDTag,
  type CDDatePickerSize,
  type CDDatePickerMode,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable, type ApiPropItem } from "../../components/ApiTable";

export function DatePickerDocPage(): ReactElement {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<Date | null>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());
  const [selectedYear, setSelectedYear] = useState<Date | null>(new Date());
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);

  const [size, setSize] = useState<CDDatePickerSize>("md");
  const [mode, setMode] = useState<CDDatePickerMode>("date");

  // Disable weekends example
  const disableWeekends = (date: Date): boolean => {
    const day: number = date.getDay();
    return day === 0 || day === 6;
  };

  // Disable past dates example
  const disablePastDates = (date: Date): boolean => {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() < today.getTime();
  };

  const datePickerApi: ApiPropItem[] = [
    { property: "value", description: "Selected date value", type: "Date | null", default: "null" },
    { property: "defaultValue", description: "Initial selected date value", type: "Date | null", default: "null" },
    { property: "onChange", description: "Callback when date selection changes", type: "(date: Date | null, dateString: string) => void", default: "-" },
    { property: "picker", description: "Selection granularity mode ('date' | 'week' | 'month' | 'year')", type: "'date' | 'week' | 'month' | 'year'", default: "'date'" },
    { property: "size", description: "Input trigger height and typography size ('sm' | 'md' | 'lg')", type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "placeholder", description: "Input placeholder text", type: "string", default: "'Select date'" },
    { property: "disabled", description: "Whether the picker is disabled", type: "boolean", default: "false" },
    { property: "allowClear", description: "Whether to display the clear button when value is set", type: "boolean", default: "true" },
    { property: "format", description: "Display formatting token string (e.g. YYYY-MM-DD)", type: "string", default: "mode-dependent" },
    { property: "disabledDate", description: "Function predicate returning true to disable specific dates", type: "(date: Date) => boolean", default: "-" },
    { property: "minDate", description: "Minimum selectable date bound", type: "Date", default: "-" },
    { property: "maxDate", description: "Maximum selectable date bound", type: "Date", default: "-" },
    { property: "placement", description: "Preferred dropdown menu popup placement", type: "'bottom' | 'top'", default: "'bottom'" },
  ];

  const rangePickerApi: ApiPropItem[] = [
    { property: "value", description: "Selected date range tuple [start, end]", type: "[Date | null, Date | null]", default: "[null, null]" },
    { property: "onChange", description: "Callback when range selection changes", type: "(dates: [Date | null, Date | null], dateStrings: [string, string]) => void", default: "-" },
    { property: "separator", description: "Delimiter text between start and end inputs", type: "string", default: "'→'" },
    { property: "placeholder", description: "Start and end input placeholders", type: "[string, string]", default: "['Start date', 'End date']" },
    { property: "disabled", description: "Whether the range picker is disabled", type: "boolean", default: "false" },
  ];

  return (
    <div className="cinder-doc-page">
      {/* Page Header */}
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDDatePicker / DatePicker</h1>
        <p className="cinder-doc-lead">
          High-performance date picker and calendar matrix selector supporting day, ISO week, month, and year
          granularity, range selection bands, disabled bounds, and portal elevation.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDDatePicker, DatePicker, CDDateRangePicker, DateRangePicker &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      {/* When To Use Section */}
      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>When the user needs to select or enter a single calendar date, ISO week, month, or year.</li>
          <li>For booking scheduling, analytics interval filtering, or release date assignment.</li>
          <li>Use <code>CDDateRangePicker</code> to pick a continuous start and end date period with range hover highlights.</li>
          <li>Use <code>disabledDate</code> to prevent selecting invalid past dates, weekends, or company blackout dates.</li>
        </ul>
      </section>

      {/* Examples Section */}
      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Basic Usage */}
          <DemoCard
            title="Basic Usage"
            description="Click the input field to open the calendar popover and pick a date. Supports keyboard navigation and escape dismissal."
            code={`import { useState } from "react";
import { CDDatePicker } from "@cinder-ui/core";

export function BasicExample() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <CDDatePicker
      value={date}
      onChange={(d) => setDate(d)}
      placeholder="Select deployment date"
    />
  );
}`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "340px" }}>
              <CDDatePicker
                value={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                placeholder="Select deployment date"
              />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Selected:</span>
                <CDTag size="sm" variant="primary">{selectedDate ? selectedDate.toLocaleDateString() : "None"}</CDTag>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Granularity Modes */}
          <DemoCard
            title="Granularity Modes (Day, Week, Month, Year)"
            description="Switch between date, ISO week number, month grid, and year grid selection modes."
            code={`<CDDatePicker picker="date" placeholder="Day picker" />
<CDDatePicker picker="week" placeholder="ISO Week picker" />
<CDDatePicker picker="month" placeholder="Month picker" />
<CDDatePicker picker="year" placeholder="Year picker" />`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(["date", "week", "month", "year"] as CDDatePickerMode[]).map((m: CDDatePickerMode) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    style={{
                      padding: "5px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: mode === m ? "var(--cinder-primary)" : "var(--cinder-border)",
                      backgroundColor: mode === m ? "var(--cinder-primary)" : "transparent",
                      color: mode === m ? "#ffffff" : "var(--cinder-text)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    Mode: {m}
                  </button>
                ))}
              </div>

              <div style={{ width: "100%", maxWidth: "340px" }}>
                <CDDatePicker
                  key={mode}
                  picker={mode}
                  value={
                    mode === "week"
                      ? selectedWeek
                      : mode === "month"
                      ? selectedMonth
                      : mode === "year"
                      ? selectedYear
                      : selectedDate
                  }
                  onChange={(d: Date | null) => {
                    if (mode === "week") setSelectedWeek(d);
                    else if (mode === "month") setSelectedMonth(d);
                    else if (mode === "year") setSelectedYear(d);
                    else setSelectedDate(d);
                  }}
                  placeholder={`Select ${mode}`}
                />
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Date Range Picker (Full Width) */}
          <DemoCard
            title="Date Range Picker"
            description="Select start and end dates with interactive range band hover highlights and continuous date spans."
            fullWidth
            code={`import { useState } from "react";
import { CDDateRangePicker } from "@cinder-ui/core";

export function RangeExample() {
  const [range, setRange] = useState<[Date | null, Date | null]>([new Date(), null]);
  return <CDDateRangePicker value={range} onChange={setRange} />;
}`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "460px" }}>
              <CDDateRangePicker
                value={selectedRange}
                onChange={(dates: [Date | null, Date | null]) => setSelectedRange(dates)}
              />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Selected Range:</span>
                <CDTag size="sm" variant="primary">
                  {selectedRange[0]?.toLocaleDateString() ?? "Start"} → {selectedRange[1]?.toLocaleDateString() ?? "End"}
                </CDTag>
              </div>
            </div>
          </DemoCard>

          {/* Demo 4: Disabled Dates */}
          <DemoCard
            title="Disabled Dates & Past Restraints"
            description="Conditionally disable past dates or weekend dates using the disabledDate callback prop."
            code={`// Disable past dates
const disablePast = (date: Date) => date < new Date();

// Disable weekend days
const disableWeekends = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

<CDDatePicker disabledDate={disablePast} />
<CDDatePicker disabledDate={disableWeekends} />`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", maxWidth: "340px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--cinder-muted)" }}>Disable Past Dates:</span>
                <CDDatePicker
                  disabledDate={disablePastDates}
                  placeholder="Future dates only"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--cinder-muted)" }}>Disable Weekends:</span>
                <CDDatePicker
                  disabledDate={disableWeekends}
                  placeholder="Working days only"
                />
              </div>
            </div>
          </DemoCard>

          {/* Demo 5: Sizes & Disabled State */}
          <DemoCard
            title="Trigger Sizes & Disabled State"
            description="Supports sm (28px), md (36px), and lg (42px) heights, alongside full component disabling."
            code={`<CDDatePicker size="sm" placeholder="Small" />
<CDDatePicker size="md" placeholder="Medium" />
<CDDatePicker size="lg" placeholder="Large" />
<CDDatePicker disabled placeholder="Disabled" />`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {(["sm", "md", "lg"] as CDDatePickerSize[]).map((s: CDDatePickerSize) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    style={{
                      padding: "5px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: size === s ? "var(--cinder-primary)" : "var(--cinder-border)",
                      backgroundColor: size === s ? "var(--cinder-primary)" : "transparent",
                      color: size === s ? "#ffffff" : "var(--cinder-text)",
                    }}
                  >
                    Size: {s.toUpperCase()}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "340px" }}>
                <CDDatePicker size={size} placeholder={`Active (${size.toUpperCase()})`} />
                <CDDatePicker size={size} disabled placeholder={`Disabled (${size.toUpperCase()})`} />
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Specification Section */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          <ApiTable title="CDDatePicker API" data={datePickerApi} />
          <ApiTable title="CDDateRangePicker API" data={rangePickerApi} />
        </div>
      </section>
    </div>
  );
}
