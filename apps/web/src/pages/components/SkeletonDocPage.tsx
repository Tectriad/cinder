import { useState, type ReactElement } from "react";
import {
  CDSkeleton,
  Skeleton,
  CDButton,
  CDCard,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function SkeletonDocPage(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);

  const skeletonProps = [
    { property: "variant", description: "Shape or layout preset ('text' | 'circle' | 'rect' | 'button' | 'card')", type: "string", default: "'text'" },
    { property: "animation", description: "Motion animation ('wave' | 'pulse' | 'none')", type: "string", default: "'wave'" },
    { property: "lines", description: "Number of text lines when variant='text'", type: "number", default: "3" },
    { property: "width", description: "Custom width (number or string)", type: "string | number", default: "-" },
    { property: "height", description: "Custom height (number or string)", type: "string | number", default: "-" },
    { property: "loading", description: "Whether to display skeleton or reveal children", type: "boolean", default: "true" },
    { property: "children", description: "Wrapped real content rendered when loading=false", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDSkeleton / Skeleton</h1>
        <p className="antd-doc-lead">
          Content placeholder preview indicating that a section is loading, reducing perceived latency before data arrives.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDSkeleton, Skeleton &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>To show a visual preview of incoming data during initial page loads and network queries.</li>
          <li>Provides a smoother, lower-stress experience compared to abrupt spinner popping.</li>
          <li>High-precision shimmer wave animation matching Cinder Slate surface tokens.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Multi-Line Text */}
          <DemoCard
            title="Multi-Line Paragraph"
            description="Simulates standard paragraph text with the final line naturally shorter."
            code={`import { CDSkeleton } from '@cinder-ui/core';

export default () => (
  <div style={{ maxWidth: '440px' }}>
    <CDSkeleton lines={4} />
  </div>
);`}
          >
            <div style={{ width: "100%", maxWidth: "440px" }}>
              <CDSkeleton lines={4} />
            </div>
          </DemoCard>

          {/* Demo 2: Primitives & Subcomponents */}
          <DemoCard
            title="Primitives & Subcomponents"
            description="Dedicated avatar circles, buttons, and image rectangles."
            code={`import { CDSkeleton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <CDSkeleton.Avatar />
    <CDSkeleton.Button />
    <CDSkeleton.Image width={140} height={40} />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <CDSkeleton.Avatar />
              <CDSkeleton.Button />
              <CDSkeleton.Image width={140} height={40} />
            </div>
          </DemoCard>

          {/* Demo 3: Card Preset */}
          <DemoCard
            title="Card Preset"
            description="Complete pre-composed card skeleton with avatar header and content body."
            code={`import { Skeleton } from '@cinder-ui/core';

export default () => (
  <div style={{ maxWidth: '400px' }}>
    <Skeleton variant="card" />
  </div>
);`}
          >
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Skeleton variant="card" />
            </div>
          </DemoCard>

          {/* Demo 4: Content Wrapping Toggle */}
          <DemoCard
            title="Dynamic Loading Toggle"
            description="Wraps real UI and automatically transitions between skeleton and content when loading completes."
            code={`import { useState } from 'react';
import { CDSkeleton, CDButton, CDCard } from '@cinder-ui/core';

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
        Toggle State: {loading ? 'Loading' : 'Loaded'}
      </CDButton>

      <CDSkeleton loading={loading} lines={3}>
        <CDCard title="API Key Information">
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--cinder-text)' }}>
            Key: cnd_live_948f21bc90aef
          </p>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--cinder-muted)' }}>
            Active since Nov 19, 2026. Granted read & write access.
          </p>
        </CDCard>
      </CDSkeleton>
    </div>
  );
};`}
          >
            <div style={{ width: "100%", maxWidth: "420px" }}>
              <CDButton
                variant="secondary"
                size="sm"
                onClick={(): void => setLoading(!loading)}
                style={{ marginBottom: "14px" }}
              >
                Toggle State: {loading ? "Loading" : "Loaded"}
              </CDButton>

              <CDSkeleton loading={loading} lines={3}>
                <CDCard title="API Key Information">
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--cinder-text)" }}>
                    Key: cnd_live_948f21bc90aef
                  </p>
                  <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--cinder-muted)" }}>
                    Active since Nov 19, 2026. Granted read & write access.
                  </p>
                </CDCard>
              </CDSkeleton>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={skeletonProps} />
      </section>
    </div>
  );
}
