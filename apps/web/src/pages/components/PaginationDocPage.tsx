import { useState, type ReactElement } from "react";
import { CDPagination } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function PaginationDocPage(): ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const paginationProps = [
    { property: "current", description: "Controlled current active page number (1-based)", type: "number", default: "1" },
    { property: "total", description: "Total number of data items", type: "number", default: "0" },
    { property: "pageSize", description: "Number of data items per page", type: "number", default: "10" },
    { property: "pageSizeOptions", description: "Options for page size dropdown selector", type: "number[]", default: "[10, 20, 50, 100]" },
    { property: "onChange", description: "Callback triggered when page or page size changes", type: "(page: number, pageSize: number) => void", default: "-" },
    { property: "showSizeChanger", description: "Show page size select picker", type: "boolean", default: "false" },
    { property: "showQuickJumper", description: "Show 'Go to page' input jumper", type: "boolean", default: "false" },
    { property: "showTotal", description: "Show total items summary counter or custom renderer", type: "boolean | ((total, range) => ReactNode)", default: "false" },
    { property: "showFirstLast", description: "Show jump to first & last page buttons", type: "boolean", default: "false" },
    { property: "size", description: "Size scale ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "disabled", description: "Disable all pagination controls", type: "boolean", default: "false" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDPagination / Pagination</h1>
        <p className="cinder-doc-lead">
          Interactive page navigation control for splitting large datasets into manageable pages with page size changers and direct jumpers.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDPagination, Pagination &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>When tables, lists, or search results contain more than 10-25 items and require pagination.</li>
          <li>To allow users to switch page sizes and quickly jump across large data partitions.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Basic & Sizing */}
          <DemoCard
            title="Basic Pagination & Sizing"
            description="Explore standard pagination controls across sm, md, and lg dimensions."
            code={`import { CDPagination } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <CDPagination total={50} size="sm" />
    <CDPagination total={100} size="md" />
    <CDPagination total={200} size="lg" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <CDPagination total={50} size="sm" />
              <CDPagination total={100} size="md" />
              <CDPagination total={200} size="lg" />
            </div>
          </DemoCard>

          {/* Demo 2: Full Controls (Total + Size Changer + Quick Jumper) */}
          <DemoCard
            title="Complete Enterprise Toolbar"
            description="Full-featured pagination equipped with item count summary, items-per-page selector, and quick jumper."
            code={`import { CDPagination } from '@cinder-ui/core';

export default () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  return (
    <CDPagination
      current={page}
      pageSize={size}
      total={256}
      showTotal
      showSizeChanger
      showQuickJumper
      showFirstLast
      onChange={(p, s) => {
        setPage(p);
        setSize(s);
      }}
    />
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CDPagination
                current={currentPage}
                pageSize={pageSize}
                total={256}
                showTotal
                showSizeChanger
                showQuickJumper
                showFirstLast
                onChange={(p: number, s: number) => {
                  setCurrentPage(p);
                  setPageSize(s);
                }}
              />
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                Selected Page: <strong>{currentPage}</strong> | Items per page: <strong>{pageSize}</strong>
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={paginationProps} />
      </section>
    </div>
  );
}
