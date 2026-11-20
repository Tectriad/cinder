import { useState, type ReactElement } from "react";
import {
  CDProgressBar,
  ProgressBar,
  Progress,
  CDButton,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function ProgressDocPage(): ReactElement {
  const [percent, setPercent] = useState<number>(45);

  const handleIncrease = (): void => {
    setPercent((prev: number) => Math.min(100, prev + 15));
  };

  const handleDecrease = (): void => {
    setPercent((prev: number) => Math.max(0, prev - 15));
  };

  const progressProps = [
    { property: "value", description: "Current progress completion value (0 - 100)", type: "number", default: "0" },
    { property: "buffer", description: "Secondary buffer completion value (0 - 100)", type: "number", default: "-" },
    { property: "status", description: "Semantic status preset ('normal' | 'success' | 'warning' | 'danger' | 'active')", type: "string", default: "'normal'" },
    { property: "size", description: "Track height preset ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "indeterminate", description: "Continuous motion for ongoing processes", type: "boolean", default: "false" },
    { property: "showInfo", description: "Whether to render percentage label or status icon", type: "boolean", default: "true" },
    { property: "format", description: "Custom label formatting function", type: "(percent) => ReactNode", default: "-" },
    { property: "color", description: "Custom filled progress color override", type: "string", default: "-" },
    { property: "trackColor", description: "Custom background track color override", type: "string", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDProgressBar / ProgressBar / Progress</h1>
        <p className="cinder-doc-lead">
          Visual indicator communicating the completion percentage or active state of an operation or process.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDProgressBar, ProgressBar, Progress &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>To display upload, download, or step progression in real-time.</li>
          <li>For multi-stage forms, onboarding wizards, and quota indicators.</li>
          <li>Indeterminate sliding motion when the duration cannot be estimated.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Interactive Progress */}
          <DemoCard
            title="Interactive Progress"
            description="Dynamically adjust progress completion using controls."
            code={`import { useState } from 'react';
import { CDProgressBar, CDButton } from '@cinder-ui/core';

export default () => {
  const [val, setVal] = useState(45);

  return (
    <div style={{ maxWidth: '420px' }}>
      <CDProgressBar value={val} />
      <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
        <CDButton size="sm" variant="secondary" onClick={() => setVal(Math.max(0, val - 15))}>-15%</CDButton>
        <CDButton size="sm" variant="primary" onClick={() => setVal(Math.min(100, val + 15))}>+15%</CDButton>
      </div>
    </div>
  );
};`}
          >
            <div style={{ width: "100%", maxWidth: "440px" }}>
              <CDProgressBar value={percent} />
              <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                <CDButton size="sm" variant="secondary" onClick={handleDecrease}>
                  -15%
                </CDButton>
                <CDButton size="sm" variant="primary" onClick={handleIncrease}>
                  +15%
                </CDButton>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Statuses */}
          <DemoCard
            title="Status Schemes"
            description="Status schemes with automatic icon reflection for Success and Danger, plus active shimmer."
            code={`import { CDProgressBar, ProgressBar } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '420px' }}>
    <CDProgressBar value={100} status="success" />
    <CDProgressBar value={70} status="active" />
    <CDProgressBar value={60} status="warning" />
    <ProgressBar value={40} status="danger" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "440px" }}>
              <CDProgressBar value={100} status="success" />
              <CDProgressBar value={70} status="active" />
              <CDProgressBar value={60} status="warning" />
              <ProgressBar value={40} status="danger" />
            </div>
          </DemoCard>

          {/* Demo 3: Sizes */}
          <DemoCard
            title="Dimension Sizes"
            description="Three track height presets: small (4px), medium (8px default), and large (12px)."
            code={`import { CDProgressBar } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '420px' }}>
    <CDProgressBar size="sm" value={35} />
    <CDProgressBar size="md" value={55} />
    <CDProgressBar size="lg" value={75} />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "440px" }}>
              <CDProgressBar size="sm" value={35} />
              <CDProgressBar size="md" value={55} />
              <CDProgressBar size="lg" value={75} />
            </div>
          </DemoCard>

          {/* Demo 4: Indeterminate & Buffer */}
          <DemoCard
            title="Indeterminate & Buffer"
            description="Continuous sliding wave for unknown durations and secondary buffer tracks."
            code={`import { CDProgressBar, Progress } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
    <CDProgressBar indeterminate />
    <Progress value={50} buffer={80} />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "440px" }}>
              <CDProgressBar indeterminate />
              <Progress value={50} buffer={80} />
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={progressProps} />
      </section>
    </div>
  );
}
