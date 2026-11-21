import { useState, type ReactElement } from "react";
import { CDJSONEditor, Badge } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function JSONEditorDocPage(): ReactElement {
  const [data, setData] = useState<unknown>({
    service: "auth-gateway",
    cluster: "us-east-prod",
    replicas: 4,
    health: { status: "healthy", latencyMs: 2.4 },
    scopes: ["read:users", "write:tokens", "admin:keys"],
    tlsEnabled: true,
    metadata: null,
  });

  const apiProps = [
    { property: "value", description: "JSON data object or serialized string", type: "unknown", default: "-" },
    { property: "viewMode", description: "Active view mode ('tree' | 'code')", type: "string", default: "'tree'" },
    { property: "readOnly", description: "Disable editing and formatting actions", type: "boolean", default: "false" },
    { property: "defaultExpandDepth", description: "Initial tree depth to expand on mount", type: "number", default: "2" },
    { property: "height", description: "Viewport height in pixels or CSS string", type: "number | string", default: "380" },
    { property: "title", description: "Header title displayed on top bar", type: "string", default: "'JSON Document'" },
    { property: "onChange", description: "Callback fired when content changes (parsedValue, rawString)", type: "function", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">JSON Editor</h1>
        <p className="cinder-doc-lead">
          Interactive dual-mode JSON tree and code editor with collapsible branches, type badges, format/minify commands, key search, and real-time syntax validation.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDJSONEditor &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>API Payload Debugging</strong>: Inspecting and testing JSON payloads in developer consoles and admin dashboards.</li>
          <li><strong>Config Management</strong>: Editing structured system configurations, feature flags, and environment parameters.</li>
          <li><strong>Schema Diagnostics</strong>: Identifying and correcting JSON syntax errors with line/column highlighting.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            fullWidth
            title="Interactive Tree & Code Editor"
            description="Toggle between interactive collapsible tree view with type badges and raw code view with instant validation."
            code={`import { CDJSONEditor } from '@cinder-ui/core';

export default () => (
  <CDJSONEditor
    title="Cluster Configuration"
    value={{
      service: 'auth-gateway',
      cluster: 'us-east-prod',
      replicas: 4,
      health: { status: 'healthy', latencyMs: 2.4 },
      scopes: ['read:users', 'write:tokens'],
    }}
    height={360}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDJSONEditor
                title="Cluster Configuration Payload"
                value={data}
                onChange={(parsed) => setData(parsed)}
                height={360}
                extra={
                  <Badge variant="success" dot pulse>
                    Live Sync
                  </Badge>
                }
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
