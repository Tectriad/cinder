import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@cinder-ui/core";
import {
  CATALOG_CATEGORIES,
  type CatalogCategory,
  type CatalogComponent,
} from "./overview/catalogData";

export function ComponentOverviewPage(): ReactElement {
  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">Overview</h1>
        <p className="antd-doc-lead">
          Visual catalog of all components available in Cinder UI, styled with the Cinder Slate design system.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {CATALOG_CATEGORIES.map((cat: CatalogCategory, idx: number) => (
          <div key={idx}>
            <h2 className="antd-section-heading" style={{ marginBottom: "16px" }}>
              {cat.category}
            </h2>
            <div className="antd-overview-grid">
              {cat.components.map((comp: CatalogComponent) => (
                <Link key={comp.name} to={comp.path} className="antd-overview-card">
                  <div className="antd-overview-card-header">
                    <div className="antd-overview-card-title-row">
                      <span className="antd-overview-card-title">{comp.name}</span>
                      {comp.badge && (
                        <Badge
                          variant="accent"
                          size="sm"
                          style={{ fontSize: "9px", padding: "1px 6px" }}
                        >
                          {comp.badge}
                        </Badge>
                      )}
                    </div>
                    <span className="antd-overview-card-sub">{comp.subtitle}</span>
                  </div>
                  <p className="antd-overview-card-desc">{comp.desc}</p>
                  <div className="antd-overview-card-preview">
                    {comp.preview}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentOverviewPage;
