import { useState, type ReactElement } from "react";
import { CDTimePicker, CDTag, type CDDatePickerSize } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable, type ApiPropItem } from "../../components/ApiTable";

export function TimePickerDocPage(): ReactElement {
  const [basicTime, setBasicTime] = useState<Date | null>(new Date());
  const [ampmTime, setAmpmTime] = useState<Date | null>(new Date());
  const [steppedTime, setSteppedTime] = useState<Date | null>(null);
  const [size, setSize] = useState<CDDatePickerSize>("md");

  // Disable business off-hours (before 9am and after 6pm)
  const disabledHours = (): number[] => [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23];

  // Disable non-quarter minutes
  const disabledMinutes = (selectedHour: number): number[] => {
    if (selectedHour === 12) {
      // Lunch hour: only allow :00 and :30
      return Array.from({ length: 60 }, (_, i: number) => i).filter((m: number) => m !== 0 && m !== 30);
    }
    return [];
  };

  const timePickerApi: ApiPropItem[] = [
    { property: "value", description: "Selected time value", type: "Date | null", default: "null" },
    { property: "defaultValue", description: "Initial selected time value", type: "Date | null", default: "null" },
    { property: "onChange", description: "Callback triggered when time changes", type: "(time: Date | null, timeString: string) => void", default: "-" },
    { property: "format", description: "Time formatting token string", type: "string", default: "'HH:mm:ss'" },
    { property: "use12Hours", description: "Enable 12-hour AM/PM period selector", type: "boolean", default: "false" },
    { property: "showSecond", description: "Whether to display the seconds column", type: "boolean", default: "true" },
    { property: "hourStep", description: "Step interval for hours column", type: "number", default: "1" },
    { property: "minuteStep", description: "Step interval for minutes column", type: "number", default: "1" },
    { property: "secondStep", description: "Step interval for seconds column", type: "number", default: "1" },
    { property: "disabledHours", description: "Function returning an array of disabled hour indices (0-23)", type: "() => number[]", default: "-" },
    { property: "disabledMinutes", description: "Function returning an array of disabled minute indices (0-59)", type: "(selectedHour: number) => number[]", default: "-" },
    { property: "disabledSeconds", description: "Function returning an array of disabled second indices (0-59)", type: "(selectedHour: number, selectedMinute: number) => number[]", default: "-" },
    { property: "size", description: "Trigger input size tier ('sm' | 'md' | 'lg')", type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "placeholder", description: "Input placeholder text", type: "string", default: "'Select time'" },
    { property: "disabled", description: "Whether the time picker is disabled", type: "boolean", default: "false" },
    { property: "allowClear", description: "Whether to display the clear icon", type: "boolean", default: "true" },
  ];

  return (
    <div className="antd-doc-page">
      {/* Page Header */}
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDTimePicker / TimePicker</h1>
        <p className="antd-doc-lead">
          Precision time picker with columnar virtual scrolling, 12-hour AM/PM meridiem support, step intervals,
          disabled bounds, and body portal elevation.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDTimePicker, TimePicker &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      {/* When To Use Section */}
      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>When users need to select a precise time value (hours, minutes, seconds) rather than a full date.</li>
          <li>For scheduling meetings, batch job runtimes, operational maintenance intervals, or alarms.</li>
          <li>Use <code>use12Hours</code> for consumer-friendly AM/PM meridiem selection.</li>
          <li>Use <code>minuteStep</code> to enforce discrete booking intervals (e.g. 15-minute blocks).</li>
        </ul>
      </section>

      {/* Examples Section */}
      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic 24-Hour Picker */}
          <DemoCard
            title="Basic 24-Hour Time Picker"
            description="Standard 24-hour time selector with hour, minute, and second columns."
            code={`import { useState } from "react";
import { CDTimePicker } from "@cinder-ui/core";

export function TimeExample() {
  const [time, setTime] = useState<Date | null>(new Date());
  return <CDTimePicker value={time} onChange={setTime} />;
}`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "300px" }}>
              <CDTimePicker
                value={basicTime}
                onChange={(t: Date | null) => setBasicTime(t)}
                placeholder="Select time"
              />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Selected:</span>
                <CDTag size="sm" variant="primary">{basicTime ? basicTime.toLocaleTimeString() : "None"}</CDTag>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: 12-Hour AM/PM */}
          <DemoCard
            title="12-Hour Format with AM / PM"
            description="Displays a 12-hour clock alongside an AM/PM toggle column."
            code={`<CDTimePicker
  use12Hours
  format="hh:mm:ss a"
  placeholder="12h time"
/>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "300px" }}>
              <CDTimePicker
                use12Hours
                format="hh:mm:ss a"
                value={ampmTime}
                onChange={(t: Date | null) => setAmpmTime(t)}
                placeholder="Select 12h time"
              />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Selected:</span>
                <CDTag size="sm" variant="primary">
                  {ampmTime
                    ? ampmTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
                    : "None"}
                </CDTag>
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Step Intervals */}
          <DemoCard
            title="Step Intervals (15-Minute Steps)"
            description="Constrain selectable minutes and seconds with interval steps (e.g. 15-minute meeting blocks)."
            code={`<CDTimePicker
  minuteStep={15}
  secondStep={30}
  placeholder="15-min intervals"
/>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "300px" }}>
              <CDTimePicker
                minuteStep={15}
                secondStep={30}
                value={steppedTime}
                onChange={(t: Date | null) => setSteppedTime(t)}
                placeholder="15-min intervals"
              />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Quarter blocks:</span>
                <CDTag size="sm" variant="primary">{steppedTime ? steppedTime.toLocaleTimeString() : "None"}</CDTag>
              </div>
            </div>
          </DemoCard>

          {/* Demo 4: Disabled Bounds */}
          <DemoCard
            title="Disabled Time Bounds (Business Hours)"
            description="Disable off-hour periods (before 09:00 and after 18:00) using disabledHours."
            code={`// Disable hours before 9 and after 18
const disabledHours = () => [0,1,2,3,4,5,6,7,8,19,20,21,22,23];

<CDTimePicker
  disabledHours={disabledHours}
  placeholder="Business hours only"
/>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "300px" }}>
              <CDTimePicker
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
                placeholder="Business hours only"
              />
              <span style={{ fontSize: "12px", color: "var(--cinder-muted)" }}>
                Active window: 09:00 – 18:59 (Lunch :00 &amp; :30 only)
              </span>
            </div>
          </DemoCard>

          {/* Demo 5: Sizes & Disabled State */}
          <DemoCard
            title="Sizes & Disabled State"
            description="Available in sm (28px), md (36px), and lg (42px) heights."
            code={`<CDTimePicker size="sm" placeholder="Small" />
<CDTimePicker size="md" placeholder="Medium" />
<CDTimePicker size="lg" placeholder="Large" />
<CDTimePicker disabled placeholder="Disabled" />`}
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

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "300px" }}>
                <CDTimePicker size={size} placeholder={`Active (${size.toUpperCase()})`} />
                <CDTimePicker size={size} disabled placeholder={`Disabled (${size.toUpperCase()})`} />
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Specification Section */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Specification</h2>
        <ApiTable title="CDTimePicker API" data={timePickerApi} />
      </section>
    </div>
  );
}
