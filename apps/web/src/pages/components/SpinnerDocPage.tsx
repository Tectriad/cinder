import { useState, type ReactElement } from "react";
import {
  CDSpinner,
  Spinner,
  Loader,
  CDButton,
  CDCard,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function SpinnerDocPage(): ReactElement {
  const [nestedLoading, setNestedLoading] = useState<boolean>(true);

  const spinnerProps = [
    { property: "size", description: "Dimension preset ('xs' | 'sm' | 'md' | 'lg' | 'xl')", type: "string", default: "'md'" },
    { property: "variant", description: "Visual animation style ('spin' | 'dots' | 'track')", type: "string", default: "'spin'" },
    { property: "tip", description: "Informative label text shown with spinner", type: "ReactNode", default: "-" },
    { property: "spinning", description: "Whether actively spinning", type: "boolean", default: "true" },
    { property: "color", description: "Custom indicator color override", type: "string", default: "var(--cinder-primary)" },
    { property: "delay", description: "Delay in ms before showing spinner (prevents flicker)", type: "number", default: "-" },
    { property: "children", description: "Content wrapped behind a loading blur overlay", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDSpinner / Spinner / Loader</h1>
        <p className="cinder-doc-lead">
          Visual indicator for asynchronous operations, background processing, and content loading overlays.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDSpinner, Spinner, Loader &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>When data is being fetched or an action requires user waiting time.</li>
          <li>For inline button loading, page transitions, or container content blur.</li>
          <li>Provides both circular SVG rings and pulsating dots.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Sizes */}
          <DemoCard
            title="Size Presets"
            description="Five dimension presets: extra-small (14px), small (18px), medium (24px), large (32px), and extra-large (44px)."
            code={`import { CDSpinner, Spinner } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <CDSpinner size="xs" />
    <CDSpinner size="sm" />
    <Spinner size="md" />
    <CDSpinner size="lg" />
    <CDSpinner size="xl" />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <CDSpinner size="xs" />
              <CDSpinner size="sm" />
              <Spinner size="md" />
              <CDSpinner size="lg" />
              <CDSpinner size="xl" />
            </div>
          </DemoCard>

          {/* Demo 2: Variants */}
          <DemoCard
            title="Variants"
            description="Supports smooth circular SVG spin and synchronized pulsating dots."
            code={`import { CDSpinner } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
    <CDSpinner variant="spin" size="md" />
    <CDSpinner variant="dots" size="md" />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
              <CDSpinner variant="spin" size="md" />
              <CDSpinner variant="dots" size="md" />
            </div>
          </DemoCard>

          {/* Demo 3: Tip Copy */}
          <DemoCard
            title="Informative Tip"
            description="Accompany the loading indicator with descriptive status text."
            code={`import { Loader } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '32px' }}>
    <Loader tip="Connecting to cluster..." size="md" />
    <Loader variant="dots" tip="Processing request..." size="sm" />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "32px" }}>
              <Loader tip="Connecting to cluster..." size="md" />
              <Loader variant="dots" tip="Processing request..." size="sm" />
            </div>
          </DemoCard>

          {/* Demo 4: Nested Blur Overlay */}
          <DemoCard
            title="Nested Content Blur Overlay"
            description="Wrap content in CDSpinner to show a frosted glass blur overlay when spinning is active."
            code={`import { useState } from 'react';
import { CDSpinner, CDButton, CDCard } from '@cinder-ui/core';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <CDButton
        variant="secondary"
        size="sm"
        onClick={() => setLoading(!loading)}
        style={{ marginBottom: '14px' }}
      >
        Toggle Loading: {loading ? 'Active' : 'Off'}
      </CDButton>

      <CDSpinner spinning={loading} tip="Fetching container logs...">
        <CDCard title="Cluster Logs" style={{ maxWidth: '400px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--cinder-muted)' }}>
            Pod cinder-api-us-east-1 ready. Listening on port 8080.
            Health checks passing with 0 errors.
          </p>
        </CDCard>
      </CDSpinner>
    </div>
  );
};`}
          >
            <div style={{ width: "100%", maxWidth: "420px" }}>
              <CDButton
                variant="secondary"
                size="sm"
                onClick={(): void => setNestedLoading(!nestedLoading)}
                style={{ marginBottom: "14px" }}
              >
                Toggle Loading: {nestedLoading ? "Active" : "Off"}
              </CDButton>

              <CDSpinner spinning={nestedLoading} tip="Fetching container logs...">
                <CDCard title="Cluster Logs">
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--cinder-muted)" }}>
                    Pod cinder-api-us-east-1 ready. Listening on port 8080.
                    Health checks passing with 0 errors.
                  </p>
                </CDCard>
              </CDSpinner>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={spinnerProps} />
      </section>
    </div>
  );
}
