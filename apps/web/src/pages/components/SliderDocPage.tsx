import { useState, type ReactElement } from "react";
import { CDSlider } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function SliderDocPage(): ReactElement {
  const [singleValue, setSingleValue] = useState<number | [number, number]>(35);
  const [rangeValue, setRangeValue] = useState<number | [number, number]>([20, 75]);

  const sliderProps = [
    { property: "value", description: "Controlled slider value (number or [min, max] range tuple)", type: "number | [number, number]", default: "-" },
    { property: "defaultValue", description: "Default initial value when uncontrolled", type: "number | [number, number]", default: "0" },
    { property: "min", description: "Minimum boundary threshold", type: "number", default: "0" },
    { property: "max", description: "Maximum boundary threshold", type: "number", default: "100" },
    { property: "step", description: "Granular step increment value", type: "number", default: "1" },
    { property: "range", description: "Dual-handle range selector mode", type: "boolean", default: "false" },
    { property: "disabled", description: "Disable slider drag and interaction", type: "boolean", default: "false" },
    { property: "vertical", description: "Render vertical track orientation", type: "boolean", default: "false" },
    { property: "marks", description: "Milestone points and custom labels along the track", type: "CDSliderMarks", default: "-" },
    { property: "dots", description: "Display snap dots at each step milestone", type: "boolean", default: "false" },
    { property: "tooltip", description: "Floating value bubble above handle on hover/drag", type: "boolean | CDSliderTooltipConfig", default: "true" },
    { property: "onChange", description: "Callback triggered during continuous slider dragging", type: "(val) => void", default: "-" },
    { property: "onAfterChange", description: "Callback triggered upon release of slider pointer", type: "(val) => void", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDSlider / Slider</h1>
        <p className="cinder-doc-lead">
          Continuous and discrete numerical value picker supporting single values, dual-handle range spans, milestones, and floating tooltips.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDSlider, Slider, RangeSlider &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>To choose a quantity or threshold within a known range (volume, memory allocation, budget filter).</li>
          <li>For dual-bound range filtering where min and max boundaries are selected simultaneously.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Basic Single Slider (Full Width) */}
          <DemoCard
            fullWidth
            title="Single Value Slider"
            description="Drag pointer or use keyboard arrows to adjust value with floating tooltip."
            code={`import { CDSlider } from '@cinder-ui/core';

export default () => {
  const [val, setVal] = useState(35);
  return (
    <div style={{ width: '100%' }}>
      <CDSlider value={val} onChange={setVal} />
      <div>Memory Limit: {val} GB</div>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <CDSlider value={singleValue} onChange={setSingleValue} />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                Selected Compute Allocation: <strong style={{ color: "var(--cinder-primary)" }}>{singleValue} GB / 100 GB</strong>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Dual Handle Range Slider (Full Width) */}
          <DemoCard
            fullWidth
            title="Dual Handle Range Slider"
            description="Two draggable handles representing a lower and upper threshold simultaneously."
            code={`import { CDSlider } from '@cinder-ui/core';

export default () => {
  const [range, setRange] = useState([20, 75]);
  return (
    <div style={{ width: '100%' }}>
      <CDSlider range value={range} onChange={setRange} />
      <div>Range: {range[0]}% - {range[1]}%</div>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <CDSlider range value={rangeValue} onChange={setRangeValue} />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                Active CPU Target Range:{" "}
                <strong style={{ color: "var(--cinder-primary)" }}>
                  {Array.isArray(rangeValue) ? `${rangeValue[0]}% - ${rangeValue[1]}%` : rangeValue}
                </strong>
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Milestones & Marks (Full Width) */}
          <DemoCard
            fullWidth
            title="Milestone Marks & Step Dots"
            description="Custom marks and discrete snap dots along the track."
            code={`import { CDSlider } from '@cinder-ui/core';

export default () => (
  <CDSlider
    defaultValue={50}
    step={25}
    dots
    marks={{
      0: '0°C',
      25: '25°C',
      50: '50°C',
      75: '75°C',
      100: { label: '100°C (Boiling)', style: { color: '#ef4444', fontWeight: 600 } }
    }}
  />
);`}
          >
            <div style={{ width: "100%", paddingBottom: "12px" }}>
              <CDSlider
                defaultValue={50}
                step={25}
                dots
                marks={{
                  0: "0°C",
                  25: "25°C",
                  50: "50°C",
                  75: "75°C",
                  100: { label: "100°C (Boiling)", style: { color: "#ef4444", fontWeight: 600 } },
                }}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={sliderProps} />
      </section>
    </div>
  );
}
