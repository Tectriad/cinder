import { useState, type ReactElement } from "react";
import { Table, CDTag, CDBadge, CDButton, type CDTableColumn } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

interface DeploymentRecord {
  id: string;
  name: string;
  region: string;
  replicas: number;
  status: "Healthy" | "Syncing" | "Failed";
  latency: number;
  updated: string;
}

export function TableDocPage(): ReactElement {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(["dep-1"]);

  const sampleData: DeploymentRecord[] = [
    { id: "dep-1", name: "edge-gateway-service", region: "us-east-1", replicas: 12, status: "Healthy", latency: 24, updated: "2m ago" },
    { id: "dep-2", name: "auth-session-broker", region: "us-west-2", replicas: 6, status: "Healthy", latency: 18, updated: "12m ago" },
    { id: "dep-3", name: "realtime-event-pipeline", region: "eu-central-1", replicas: 24, status: "Syncing", latency: 85, updated: "Just now" },
    { id: "dep-4", name: "vector-similarity-cache", region: "ap-southeast-1", replicas: 4, status: "Failed", latency: 240, updated: "1h ago" },
    { id: "dep-5", name: "billing-ledger-processor", region: "us-east-2", replicas: 8, status: "Healthy", latency: 31, updated: "5m ago" },
    { id: "dep-6", name: "analytics-rollup-worker", region: "eu-west-1", replicas: 16, status: "Healthy", latency: 42, updated: "30m ago" },
  ];

  const columns: CDTableColumn<DeploymentRecord>[] = [
    {
      title: "Deployment Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (val: string) => (
        <span style={{ fontWeight: 600, color: "var(--cinder-text)" }}>
          {val}
        </span>
      ),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      align: "center",
      render: (val: string) => <CDTag variant="default" size="sm">{val}</CDTag>,
    },
    {
      title: "Replicas",
      dataIndex: "replicas",
      key: "replicas",
      align: "right",
      sorter: (a, b) => a.replicas - b.replicas,
      render: (val: number) => <code>{val} pods</code>,
    },
    {
      title: "Health",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (val: string) => {
        const variant = val === "Healthy" ? "success" : val === "Syncing" ? "accent" : "danger";
        return <CDBadge variant={variant} dot size="sm">{val}</CDBadge>;
      },
    },
    {
      title: "Latency",
      dataIndex: "latency",
      key: "latency",
      align: "right",
      sorter: (a, b) => a.latency - b.latency,
      render: (val: number) => <span>{val} ms</span>,
    },
    {
      title: "Last Update",
      dataIndex: "updated",
      key: "updated",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <CDButton size="sm" variant="ghost">
          Restart
        </CDButton>
      ),
    },
  ];

  const tableProps = [
    { property: "columns", description: "Array of column definition objects", type: "CDTableColumn[]", default: "[]" },
    { property: "dataSource", description: "Array of data records to display", type: "T[]", default: "[]" },
    { property: "rowKey", description: "Primary key field name or key extractor callback", type: "string | (record) => key", default: "'id'" },
    { property: "rowSelection", description: "Row selection configuration (selectedRowKeys, onChange)", type: "CDTableRowSelection", default: "-" },
    { property: "pagination", description: "Pagination options or false to disable", type: "CDTablePagination | false", default: "{ pageSize: 10 }" },
    { property: "loading", description: "Loading overlay spinner", type: "boolean", default: "false" },
    { property: "bordered", description: "Border outline around table", type: "boolean", default: "true" },
    { property: "striped", description: "Alternating zebra row striping", type: "boolean", default: "false" },
    { property: "size", description: "Density preset ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
  ];

  const columnProps = [
    { property: "title", description: "Header title text or element", type: "ReactNode", default: "-" },
    { property: "dataIndex", description: "Property name on record object", type: "string", default: "-" },
    { property: "key", description: "Unique key for column", type: "string", default: "-" },
    { property: "sorter", description: "Enable sorting or custom comparator (a, b) => number", type: "boolean | function", default: "-" },
    { property: "render", description: "Custom cell render function (value, record, index) => ReactNode", type: "function", default: "-" },
    { property: "align", description: "Cell text alignment ('left' | 'center' | 'right')", type: "string", default: "'left'" },
    { property: "width", description: "Column width (px or %)", type: "number | string", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDTable / Table / DataGrid</h1>
        <p className="antd-doc-lead">
          Enterprise-grade tabular data grid featuring column sorting, multi-row selection, pagination, and loading states.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDTable, Table, CDDataGrid, DataGrid &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>To display large volumes of structured records with sorting and pagination.</li>
          <li>When users need to compare numerical values or status across rows.</li>
          <li>When multi-select operations (bulk actions, exports, deletions) are needed.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Full Enterprise Table */}
          <DemoCard
            fullWidth
            title="Sortable Data Grid with Row Selection (Full Width)"
            description="Columns with sorting carets, row selection checkboxes, badges, and pagination footer."
            code={`import { Table, CDTag, CDBadge, CDButton } from '@cinder-ui/core';

export default () => (
  <Table
    columns={columns}
    dataSource={deployments}
    rowSelection={{
      selectedRowKeys: ['dep-1'],
      onChange: (keys) => console.log('Selected:', keys),
    }}
    pagination={{ pageSize: 4 }}
  />
);`}
          >
            <Table
              columns={columns}
              dataSource={sampleData}
              rowSelection={{
                selectedRowKeys: selectedKeys,
                onChange: (keys: (string | number)[]): void => setSelectedKeys(keys),
              }}
              pagination={{ pageSize: 4 }}
            />
          </DemoCard>

          {/* Demo 2: Compact Zebra Table */}
          <DemoCard
            title="Compact Striped Table"
            description="High-density compact sizing (size='sm') with alternating row striping."
            code={`import { Table } from '@cinder-ui/core';

export default () => (
  <Table
    size="sm"
    striped
    columns={columns.slice(0, 4)}
    dataSource={deployments.slice(0, 3)}
    pagination={false}
  />
);`}
          >
            <Table
              size="sm"
              striped
              columns={columns.slice(0, 4)}
              dataSource={sampleData.slice(0, 3)}
              pagination={false}
            />
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="CDTableProps API" data={tableProps} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable title="CDTableColumn API" data={columnProps} />
        </div>
      </section>
    </div>
  );
}
