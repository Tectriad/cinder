import { useState, useMemo, type ReactElement, type ChangeEvent } from "react";
import { Badge, Snippet, useCinderTheme } from "@cinder-ui/core";
import { Table, Copy, Check, Search } from "lucide-react";

type TokenCategory = "all" | "surface" | "brand" | "typography" | "status";

interface TokenContractItem {
  token: string;
  role: string;
  category: "surface" | "brand" | "typography" | "status";
  darkVal: string;
  lightVal: string;
  description: string;
}

const TOKENS_DATA: readonly TokenContractItem[] = [
  {
    token: "--cinder-bg",
    role: "Primary Canvas",
    category: "surface",
    darkVal: "#09090b",
    lightVal: "#fafafa",
    description: "Main application background and root canvas.",
  },
  {
    token: "--cinder-surface",
    role: "Cards & Modals",
    category: "surface",
    darkVal: "#121215",
    lightVal: "#ffffff",
    description: "Elevated surfaces, card containers, and modal sheets.",
  },
  {
    token: "--cinder-surface-hover",
    role: "Hover Surfaces",
    category: "surface",
    darkVal: "#1a1a1f",
    lightVal: "#f4f4f5",
    description: "Interactive hover state for table rows and menu items.",
  },
  {
    token: "--cinder-glass",
    role: "Frosted Panels",
    category: "surface",
    darkVal: "rgba(18, 18, 21, 0.8)",
    lightVal: "rgba(255, 255, 255, 0.82)",
    description: "Translucent backdrop blur overlays with 16px blur.",
  },
  {
    token: "--cinder-primary",
    role: "Primary Action",
    category: "brand",
    darkVal: "#3b82f6",
    lightVal: "#2563eb",
    description: "Main royal blue interactive call-to-action color.",
  },
  {
    token: "--cinder-primary-hover",
    role: "Primary Hover",
    category: "brand",
    darkVal: "#2563eb",
    lightVal: "#1d4ed8",
    description: "Interactive hover and pressed elevation state.",
  },
  {
    token: "--cinder-primary-text",
    role: "Action Text",
    category: "brand",
    darkVal: "#ffffff",
    lightVal: "#ffffff",
    description: "High-contrast text on primary filled buttons.",
  },
  {
    token: "--cinder-focus-ring",
    role: "Focus Outline",
    category: "brand",
    darkVal: "rgba(59, 130, 246, 0.35)",
    lightVal: "rgba(37, 99, 235, 0.25)",
    description: "Accessible WCAG keyboard focus ring aura.",
  },
  {
    token: "--cinder-border",
    role: "Subtle Divider",
    category: "typography",
    darkVal: "#27272a",
    lightVal: "#e4e4e7",
    description: "Structural borders, card outlines, and item separators.",
  },
  {
    token: "--cinder-text",
    role: "Primary Copy",
    category: "typography",
    darkVal: "#fafafa",
    lightVal: "#09090b",
    description: "High-contrast headings and readable body text.",
  },
  {
    token: "--cinder-muted",
    role: "Secondary Copy",
    category: "typography",
    darkVal: "#a1a1aa",
    lightVal: "#71717a",
    description: "Subtitles, secondary labels, and placeholder copy.",
  },
  {
    token: "--cinder-success",
    role: "Semantic Success",
    category: "status",
    darkVal: "#34d399",
    lightVal: "#059669",
    description: "Completed transactions, online badges, and confirmations.",
  },
  {
    token: "--cinder-warning",
    role: "Semantic Warning",
    category: "status",
    darkVal: "#fbbf24",
    lightVal: "#d97706",
    description: "Attention notices, cautionary banners, and alerts.",
  },
  {
    token: "--cinder-danger",
    role: "Semantic Danger",
    category: "status",
    darkVal: "#f87171",
    lightVal: "#dc2626",
    description: "Destructive buttons, critical errors, and alerts.",
  },
];

export function TokensTable(): ReactElement {
  const { resolvedMode } = useCinderTheme();
  const isDark: boolean = resolvedMode === "dark";

  const [selectedCategory, setSelectedCategory] = useState<TokenCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const filteredTokens = useMemo(() => {
    return TOKENS_DATA.filter((item: TokenContractItem) => {
      const matchesCategory: boolean =
        selectedCategory === "all" || item.category === selectedCategory;
      const normalizedQuery: string = searchQuery.toLowerCase().trim();
      const matchesSearch: boolean =
        !normalizedQuery ||
        item.token.toLowerCase().includes(normalizedQuery) ||
        item.role.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyVar = async (tokenName: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`var(${tokenName})`);
      setCopiedToken(tokenName);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      setCopiedToken(null);
    }
  };

  const categories: { id: TokenCategory; label: string; count: number }[] = [
    { id: "all", label: "All Tokens", count: TOKENS_DATA.length },
    {
      id: "surface",
      label: "Canvas & Surfaces",
      count: TOKENS_DATA.filter((t) => t.category === "surface").length,
    },
    {
      id: "brand",
      label: "Brand & Actions",
      count: TOKENS_DATA.filter((t) => t.category === "brand").length,
    },
    {
      id: "typography",
      label: "Text & Structural",
      count: TOKENS_DATA.filter((t) => t.category === "typography").length,
    },
    {
      id: "status",
      label: "Semantic Status",
      count: TOKENS_DATA.filter((t) => t.category === "status").length,
    },
  ];

  return (
    <section id="tokens" className="section" style={{ borderTop: "none", paddingTop: "0" }}>
      <div className="app-container" style={{ padding: "0" }}>
        <div className="token-table-container">
          {/* Header Row */}
          <div className="token-table-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Table size={18} color="var(--cinder-primary)" />
              <div>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--cinder-text)" }}>
                  Cinder Slate Token Contract
                </span>
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "12px",
                    color: "var(--cinder-muted)",
                    fontWeight: 500,
                  }}
                >
                  ({isDark ? "Dark Mode Active" : "Light Mode Active"})
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Badge variant="primary" size="sm">
                WCAG AAA
              </Badge>
              <Badge variant="default" size="sm">
                {resolvedMode.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Category Filter Toolbar & Search */}
          <div className="token-table-toolbar">
            <div className="token-category-pills" role="tablist" aria-label="Token Categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`token-category-pill ${selectedCategory === cat.id ? "active" : ""}`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            {/* Quick Search Box */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid var(--cinder-border)",
                backgroundColor: "var(--cinder-canvas)",
                minWidth: "220px",
              }}
            >
              <Search size={14} color="var(--cinder-muted)" />
              <input
                type="text"
                placeholder="Filter tokens..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "var(--cinder-text)",
                  fontSize: "12px",
                  width: "100%",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--cinder-muted)",
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "12px",
                  }}
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Interactive Tokens Table */}
          <div className="token-table-scroll">
            <table className="token-table">
              <thead>
                <tr>
                  <th style={{ width: "220px" }}>Token Variable</th>
                  <th style={{ width: "240px" }}>Semantic Role</th>
                  <th style={{ width: "140px" }}>Dark Mode</th>
                  <th style={{ width: "140px" }}>Light Mode</th>
                  <th>Active Live Preview</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "var(--cinder-muted)" }}>
                      No design tokens match &quot;{searchQuery}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredTokens.map((t: TokenContractItem) => {
                    const isCopied: boolean = copiedToken === t.token;
                    const activeVal: string = isDark ? t.darkVal : t.lightVal;
                    const isGlass: boolean = t.token === "--cinder-glass";

                    return (
                      <tr key={t.token}>
                        {/* Token Variable with Click-to-Copy */}
                        <td>
                          <button
                            type="button"
                            className="token-var-code"
                            onClick={() => handleCopyVar(t.token)}
                            title="Click to copy CSS variable"
                            aria-label={`Copy ${t.token}`}
                          >
                            <span>{t.token}</span>
                            {isCopied ? (
                              <Check size={12} color="var(--cinder-success)" />
                            ) : (
                              <Copy size={12} color="var(--cinder-muted)" />
                            )}
                          </button>
                        </td>

                        {/* Semantic Purpose */}
                        <td>
                          <div className="token-role-title">{t.role}</div>
                          <div className="token-role-sub">{t.description}</div>
                        </td>

                        {/* Dark Value */}
                        <td>
                          <span className={`token-val-badge ${isDark ? "active-mode" : "inactive-mode"}`}>
                            {t.darkVal}
                          </span>
                        </td>

                        {/* Light Value */}
                        <td>
                          <span className={`token-val-badge ${!isDark ? "active-mode" : "inactive-mode"}`}>
                            {t.lightVal}
                          </span>
                        </td>

                        {/* Active Live Swatch & Value */}
                        <td>
                          <div className="token-preview-cell">
                            <span
                              className={`token-swatch ${isGlass ? "token-swatch-glass" : ""}`}
                              style={{
                                backgroundColor: `var(${t.token})`,
                              }}
                              title={`Live swatch: ${activeVal}`}
                            />
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span
                                style={{
                                  fontFamily: "var(--cinder-font-mono)",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: "var(--cinder-text)",
                                }}
                              >
                                {activeVal}
                              </span>
                              <span style={{ fontSize: "11px", color: "var(--cinder-muted)" }}>
                                {isDark ? "Dark palette active" : "Light palette active"}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Import Code Snippet */}
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
          <Snippet
            code="import { Button, Card, Badge, Input, ThemeProvider } from '@tec-triad/cinder-ui';"
            prefix="import"
          />
        </div>
      </div>
    </section>
  );
}
