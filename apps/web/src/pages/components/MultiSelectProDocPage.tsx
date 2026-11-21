import { useState, type ReactElement } from "react";
import { CDMultiSelectPro, type CDMultiSelectOption } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function MultiSelectProDocPage(): ReactElement {
  const [selected, setSelected] = useState<string[]>(["k8s", "docker"]);

  const sampleOptions: CDMultiSelectOption[] = [
    { value: "k8s", label: "Kubernetes Engine", group: "Compute" },
    { value: "docker", label: "Container Registry", group: "Compute" },
    { value: "lambda", label: "Serverless Functions", group: "Compute" },
    { value: "postgres", label: "PostgreSQL Database", group: "Storage" },
    { value: "redis", label: "Redis Distributed Cache", group: "Storage" },
    { value: "s3", label: "Object Storage Buckets", group: "Storage" },
    { value: "datadog", label: "Datadog APM", group: "Observability" },
    { value: "grafana", label: "Grafana Dashboards", group: "Observability" },
  ];

  const apiProps = [
    { property: "options", description: "Array of options ({ value, label, group?, disabled? })", type: "CDMultiSelectOption[]", default: "[]" },
    { property: "value", description: "Array of selected values", type: "string[]", default: "[]" },
    { property: "maxTagCount", description: "Maximum visible tag pills before '+N more' badge", type: "number", default: "3" },
    { property: "showSelectAll", description: "Display Select All / Clear All batch header", type: "boolean", default: "true" },
    { property: "searchable", description: "Enable inline search query filtering", type: "boolean", default: "true" },
    { property: "fetchOptions", description: "Async options loader (query: string) => Promise<CDMultiSelectOption[]>", type: "function", default: "-" },
    { property: "onChange", description: "Callback fired on selection changes (values, optionObjects)", type: "function", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">MultiSelect Pro</h1>
        <p className="cinder-doc-lead">
          High-performance multi-selection system featuring grouped categorical headers, tag pills with '+N more' condensation, search highlighting, and async options streaming.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDMultiSelectPro &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>Cluster &amp; Service Tagging</strong>: Assigning multiple infrastructure resources, roles, or security tags.</li>
          <li><strong>Analytics Filters</strong>: Filtering complex multi-tenant datasets by regions, tiers, and event categories.</li>
          <li><strong>Async Entity Search</strong>: Fetching thousands of remote users, repos, or permissions without freezing the DOM.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            fullWidth
            title="Grouped Multi-Selection with Tag Condensation"
            description="Categorical option headers, batch Select All / Clear All, and compact tag overflow badges."
            code={`import { CDMultiSelectPro } from '@cinder-ui/core';

export default () => (
  <CDMultiSelectPro
    label="Assigned Cloud Services"
    options={[
      { value: 'k8s', label: 'Kubernetes Engine', group: 'Compute' },
      { value: 'postgres', label: 'PostgreSQL Database', group: 'Storage' },
    ]}
    maxTagCount={3}
  />
);`}
          >
            <div style={{ width: "100%", maxWidth: "540px" }}>
              <CDMultiSelectPro
                label="Assigned Cloud Services"
                options={sampleOptions}
                value={selected}
                onChange={(vals) => setSelected(vals)}
                maxTagCount={3}
                placeholder="Choose infrastructure components..."
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
