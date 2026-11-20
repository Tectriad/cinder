import { Badge } from "@cinder-ui/core";
import { CinderLogo } from "./CinderLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="app-container footer-content">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            backgroundColor: "rgba(59, 130, 246, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--cinder-primary)"
          }}>
            <CinderLogo size={22} />
          </div>
          <span style={{ fontWeight: 800, color: "var(--cinder-text)" }}>CINDER UI</span>
          <span>&mdash; React Component Library</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Badge variant="success" size="sm" dot>
            Components Live
          </Badge>
          <Badge variant="primary" size="sm">
            Cinder Slate
          </Badge>
          <span style={{ fontSize: "12px", color: "var(--cinder-muted)" }}>
            MIT License &copy; 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
