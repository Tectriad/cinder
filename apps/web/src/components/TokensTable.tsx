import { Card, Badge, Snippet, useCinderTheme } from "@cinder-ui/core";
import { Table } from "lucide-react";

export function TokensTable() {
  const { resolvedMode } = useCinderTheme();

  const tokens = [
    { token: "--cinder-bg", role: "Primary Canvas", darkVal: "#09090b", lightVal: "#fafafa", name: "Deep Obsidian / Clean White" },
    { token: "--cinder-surface", role: "Cards & Modals", darkVal: "#121215", lightVal: "#ffffff", name: "Slate Surface / Pure Surface" },
    { token: "--cinder-surface-hover", role: "Hover Surfaces", darkVal: "#1a1a1f", lightVal: "#f4f4f5", name: "Slate Hover / Zinc Hover" },
    { token: "--cinder-glass", role: "Frosted Panels", darkVal: "rgba(18, 18, 21, 0.8)", lightVal: "rgba(255, 255, 255, 0.82)", name: "Backdrop Blur 16px" },
    { token: "--cinder-primary", role: "Primary Action", darkVal: "#3b82f6", lightVal: "#2563eb", name: "Slate Blue / Royal Blue" },
    { token: "--cinder-primary-hover", role: "Primary Hover", darkVal: "#2563eb", lightVal: "#1d4ed8", name: "Deep Blue / Navy Blue" },
    { token: "--cinder-primary-text", role: "Action Text", darkVal: "#ffffff", lightVal: "#ffffff", name: "Pure White" },
    { token: "--cinder-focus-ring", role: "Focus Outline", darkVal: "rgba(59, 130, 246, 0.35)", lightVal: "rgba(37, 99, 235, 0.25)", name: "Focus Halo" },
    { token: "--cinder-border", role: "Subtle Divider", darkVal: "#27272a", lightVal: "#e4e4e7", name: "Slate Line / Light Zinc Line" },
    { token: "--cinder-text", role: "Primary Copy", darkVal: "#fafafa", lightVal: "#09090b", name: "High Contrast Copy" },
    { token: "--cinder-muted", role: "Secondary Copy", darkVal: "#a1a1aa", lightVal: "#71717a", name: "Muted Zinc Copy" },
    { token: "--cinder-success", role: "Semantic Success", darkVal: "#34d399", lightVal: "#059669", name: "Emerald Success" },
    { token: "--cinder-warning", role: "Semantic Warning", darkVal: "#fbbf24", lightVal: "#d97706", name: "Amber Warning" },
    { token: "--cinder-danger", role: "Semantic Danger", darkVal: "#f87171", lightVal: "#dc2626", name: "Coral Red Danger" },
  ];

  return (
    <section id="tokens" className="section" style={{ borderTop: "none", paddingTop: "0" }}>
      <div className="app-container" style={{ padding: "0" }}>
        <Card variant="surface" style={{ padding: "0", overflow: "hidden" }}>
          <div style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--cinder-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Table size={16} color="var(--cinder-primary)" />
              <span style={{ fontSize: "14px", fontWeight: 700 }}>
                Cinder Slate Token Contract ({resolvedMode === "dark" ? "Dark Mode Active" : "Light Mode Active"})
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Badge variant="primary" size="sm">WCAG AAA</Badge>
              <Badge variant="accent" size="sm">{resolvedMode.toUpperCase()}</Badge>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="token-table">
              <thead>
                <tr>
                  <th>Token Variable</th>
                  <th>Semantic Role</th>
                  <th>Dark Value</th>
                  <th>Light Value</th>
                  <th>Active Live Preview</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((t, idx) => {
                  const activeVal = resolvedMode === "dark" ? t.darkVal : t.lightVal;
                  return (
                    <tr key={idx}>
                      <td>
                        <span className="token-name">{t.token}</span>
                      </td>
                      <td>{t.role}</td>
                      <td>
                        <span className="token-value" style={{ opacity: resolvedMode === "dark" ? 1 : 0.6 }}>
                          {t.darkVal}
                        </span>
                      </td>
                      <td>
                        <span className="token-value" style={{ opacity: resolvedMode === "light" ? 1 : 0.6 }}>
                          {t.lightVal}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            className="token-chip"
                            style={{
                              backgroundColor: `var(${t.token})`,
                            }}
                          />
                          <span style={{ color: "var(--cinder-muted)", fontSize: "12px" }}>
                            {activeVal}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Code Snippet Box */}
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
          <Snippet
            code="import { Button, Card, Badge, Input, GlassPanel, ThemeProvider } from '@cinder-ui/core';"
            prefix="import"
          />
        </div>
      </div>
    </section>
  );
}
