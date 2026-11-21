import { useState, type ReactElement } from "react";
import { CDTimeRangePicker, type CDTimeSlot } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function TimeRangePickerDocPage(): ReactElement {
  const [slots, setSlots] = useState<CDTimeSlot[]>([
    { id: "s1", start: "09:00", end: "13:00" },
    { id: "s2", start: "14:00", end: "18:00" },
  ]);

  const apiProps = [
    { property: "value", description: "Array of time slot objects ({ id, start, end })", type: "CDTimeSlot[]", default: "-" },
    { property: "maxIntervals", description: "Maximum number of simultaneous intervals", type: "number", default: "5" },
    { property: "step", description: "Minute increment step for inputs", type: "number", default: "15" },
    { property: "format", description: "Display format ('12h' | '24h')", type: "string", default: "'24h'" },
    { property: "presets", description: "Quick shift presets array", type: "CDTimeRangePreset[]", default: "-" },
    { property: "readOnly", description: "Disable editing and adding slots", type: "boolean", default: "false" },
    { property: "onChange", description: "Callback fired when intervals change", type: "function", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">TimeRangePicker</h1>
        <p className="cinder-doc-lead">
          Advanced multi-interval time scheduling component supporting split shifts, automatic conflict and overlap detection, cumulative duration metrics, and customizable operational presets.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDTimeRangePicker &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>Shift Schedules &amp; Rosters</strong>: Defining employee availability, morning/evening shifts, and break periods.</li>
          <li><strong>Opening Hours</strong>: Setting business hours with midday closures (e.g. 09:00 - 13:00 and 14:00 - 18:00).</li>
          <li><strong>Meeting Windows</strong>: Reserving multiple recurring appointment slots without time collisions.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            fullWidth
            title="Multi-Interval Schedule Manager"
            description="Manage multiple operational shifts with automatic overlap conflict detection and cumulative daily totals."
            code={`import { CDTimeRangePicker } from '@cinder-ui/core';

export default () => (
  <CDTimeRangePicker
    title="Store Operating Hours"
    defaultValue={[
      { id: 's1', start: '09:00', end: '13:00' },
      { id: 's2', start: '14:00', end: '18:00' },
    ]}
    maxIntervals={4}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDTimeRangePicker
                title="Store Operating Hours"
                value={slots}
                onChange={(newSlots) => setSlots(newSlots)}
                maxIntervals={4}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable data={apiProps} />
      </section>
    </div>
  );
}
