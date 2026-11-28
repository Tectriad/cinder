import { useState, type ReactElement, type ChangeEvent } from "react";
import {
  CDButton,
  CDCard,
  CDCardHeader,
  CDCardTitle,
  CDCardDescription,
  CDCardContent,
  CDCardFooter,
  CDBadge,
  CDInput,
  CDIcons,
} from "@cinder-ui/core";
import { DemoCard } from "../components/DemoCard";
import { ThemeCustomizerCard } from "./getting-started/ThemeCustomizerCard";
import type { PackageManager } from "./getting-started/themePresets";

export function GettingStartedDocPage(): ReactElement {
  const [selectedPm, setSelectedPm] = useState<PackageManager>("pnpm");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("production-v2.1");

  const installCommands: Record<PackageManager, string> = {
    pnpm: "pnpm add @tec-triad/cinder-ui @tec-triad/iconforge-react",
    npm: "npm install @tec-triad/cinder-ui @tec-triad/iconforge-react",
    yarn: "yarn add @tec-triad/cinder-ui @tec-triad/iconforge-react",
    bun: "bun add @tec-triad/cinder-ui @tec-triad/iconforge-react",
  };

  const handleCopyInstall = (): void => {
    navigator.clipboard.writeText(installCommands[selectedPm]);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <CDBadge variant="primary" size="sm">Quickstart Guide</CDBadge>
          <CDBadge variant="default" size="sm">v0.1.2</CDBadge>
        </div>
        <h1 className="cinder-doc-title">Getting Started</h1>
        <p className="cinder-doc-lead">
          Install and integrate Cinder UI into your React application in under two minutes with zero-runtime CSS tokens, accessible primitives, and instant custom theme branding.
        </p>
      </div>

      {/* Step 1: Installation */}
      <section id="step-1-install" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Step 1: Install Dependencies</h2>
        <p style={{ color: "var(--cinder-muted)", fontSize: "14px", marginBottom: "16px", lineHeight: "1.6" }}>
          Add the core UI package and the companion IconForge vector icon suite to your project using your preferred package manager:
        </p>

        <div
          style={{
            backgroundColor: "var(--cinder-surface)",
            border: "1px solid var(--cinder-border)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Package Manager Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderBottom: "1px solid var(--cinder-border)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setSelectedPm(pm)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: selectedPm === pm ? "var(--cinder-primary)" : "transparent",
                    color: selectedPm === pm ? "#ffffff" : "var(--cinder-muted)",
                    transition: "all 150ms ease",
                  }}
                >
                  {pm}
                </button>
              ))}
            </div>

            <CDButton
              size="xs"
              variant="ghost"
              onClick={handleCopyInstall}
              prefixIcon={copiedInstall ? <CDIcons.Check size={13} color="var(--cinder-success)" /> : <CDIcons.Copy size={13} />}
            >
              {copiedInstall ? "Copied" : "Copy Command"}
            </CDButton>
          </div>

          {/* Command Code Display */}
          <div style={{ padding: "14px 16px", fontFamily: "var(--cinder-font-mono)", fontSize: "13px", color: "var(--cinder-text)" }}>
            <code>{installCommands[selectedPm]}</code>
          </div>
        </div>
      </section>

      {/* Step 2: Import Stylesheet */}
      <section id="step-2-styles" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Step 2: Import Foundational Stylesheet</h2>
        <p style={{ color: "var(--cinder-muted)", fontSize: "14px", marginBottom: "16px", lineHeight: "1.6" }}>
          Import the single compiled stylesheet once at your application root (e.g. <code>src/main.tsx</code> or <code>src/index.tsx</code>). It bundles all reset rules, Cinder Slate design tokens, and component animations:
        </p>

        <div
          style={{
            backgroundColor: "var(--cinder-surface)",
            border: "1px solid var(--cinder-border)",
            borderRadius: "10px",
            padding: "14px 16px",
            fontFamily: "var(--cinder-font-mono)",
            fontSize: "13px",
            color: "var(--cinder-text)",
          }}
        >
          <span style={{ color: "var(--cinder-muted)" }}>// In src/main.tsx or src/App.tsx</span>
          <br />
          <span style={{ color: "var(--cinder-primary)" }}>import</span> &quot;@tec-triad/cinder-ui/styles.css&quot;;
        </div>
      </section>

      {/* Step 3: Setup ThemeProvider */}
      <section id="step-3-provider" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Step 3: Setup ThemeProvider</h2>
        <p style={{ color: "var(--cinder-muted)", fontSize: "14px", marginBottom: "16px", lineHeight: "1.6" }}>
          Wrap your root tree with <code>ThemeProvider</code> to enable automatic system preference detection (<code>prefers-color-scheme</code>), dark/light switching, and token distribution:
        </p>

        <div
          style={{
            backgroundColor: "var(--cinder-surface)",
            border: "1px solid var(--cinder-border)",
            borderRadius: "10px",
            padding: "16px",
            fontFamily: "var(--cinder-font-mono)",
            fontSize: "13px",
            lineHeight: "1.6",
            overflowX: "auto",
          }}
        >
          <pre style={{ margin: 0 }}>
            <code>{`import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@tec-triad/cinder-ui";
import "@tec-triad/cinder-ui/styles.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultMode="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`}</code>
          </pre>
        </div>
      </section>

      {/* Step 4: Component Usage Example */}
      <section id="step-4-usage" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Step 4: Use Components in Your Views</h2>
        <p style={{ color: "var(--cinder-muted)", fontSize: "14px", marginBottom: "16px", lineHeight: "1.6" }}>
          All primitives support both official <code>CD</code> prefixes and backward-compatible aliases (e.g. <code>CDButton</code> or <code>Button</code>). Here is a standard production view snippet:
        </p>

        <DemoCard
          title="Basic Interactive Interface"
          description="A composition of Card, Badge, Input, and Button working cohesively."
          code={`import { CDCard, CDCardHeader, CDCardTitle, CDCardContent, CDBadge, CDButton, CDInput, CDIcons } from '@tec-triad/cinder-ui';

export function DeploymentCard() {
  return (
    <CDCard style={{ maxWidth: 440 }}>
      <CDCardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CDCardTitle>Production Cluster</CDCardTitle>
          <CDBadge variant="success" size="sm">Online</CDBadge>
        </div>
      </CDCardHeader>
      <CDCardContent>
        <CDInput label="Release Tag" defaultValue="v2.4.0-edge" />
      </CDCardContent>
      <CDCardFooter>
        <CDButton variant="primary" prefixIcon={<CDIcons.Rocket size="sm" />}>
          Deploy Revision
        </CDButton>
      </CDCardFooter>
    </CDCard>
  );
}`}
        >
          <CDCard style={{ maxWidth: 440, width: "100%" }}>
            <CDCardHeader>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CDIcons.Cpu size={18} color="var(--cinder-primary)" />
                  <CDCardTitle style={{ margin: 0 }}>Cluster Alpha</CDCardTitle>
                </div>
                <CDBadge variant="success" size="sm">Healthy</CDBadge>
              </div>
              <CDCardDescription>Autonomous Kubernetes edge nodes in us-east-1.</CDCardDescription>
            </CDCardHeader>
            <CDCardContent>
              <CDInput
                label="Active Deployment Tag"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                prefixIcon={<CDIcons.Terminal size={14} />}
                placeholder="e.g. v2.1.0-main"
              />
            </CDCardContent>
            <CDCardFooter>
              <div style={{ display: "flex", gap: "8px", width: "100%", justifyContent: "flex-end" }}>
                <CDButton variant="secondary" size="sm">Rollback</CDButton>
                <CDButton variant="primary" size="sm" prefixIcon={<CDIcons.Check size={14} />}>
                  Synchronize
                </CDButton>
              </div>
            </CDCardFooter>
          </CDCard>
        </DemoCard>
      </section>

      {/* Step 5: Custom Theming Injection */}
      <section id="step-5-custom-theme" className="cinder-doc-section">
        <h2 className="cinder-section-heading">How to Inject Custom Themes</h2>
        <p style={{ color: "var(--cinder-muted)", fontSize: "14px", marginBottom: "16px", lineHeight: "1.6" }}>
          Cinder UI was architected from day one for zero-runtime theming. You can brand your entire design system either via 3 pure CSS variables or dynamically via JavaScript.
        </p>

        {/* Method A: Pure CSS Variables */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--cinder-text)", marginBottom: "8px" }}>
            Method 1: Pure CSS Override (Recommended &amp; Zero JS Overhead)
          </h3>
          <p style={{ color: "var(--cinder-muted)", fontSize: "13px", marginBottom: "12px", lineHeight: "1.6" }}>
            Because all Cinder UI components read from standardized CSS variables, you only need to define your brand accent in your global CSS. Canvas background (<code>--cinder-bg</code>) and surface (<code>--cinder-surface</code>) tokens automatically adapt between Dark (<code>#09090b</code> / <code>#121215</code>) and Light (<code>#fafafa</code> / <code>#ffffff</code>) modes out of the box:
          </p>

          <div
            style={{
              backgroundColor: "var(--cinder-surface)",
              border: "1px solid var(--cinder-border)",
              borderRadius: "8px",
              padding: "16px",
              fontFamily: "var(--cinder-font-mono)",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            <pre style={{ margin: 0 }}>
              <code>{`:root {
  /* Brand primary accent */
  --cinder-primary: #8b5cf6;
  --cinder-primary-hover: #7c3aed;
}`}</code>
            </pre>
          </div>
        </div>

        {/* Method B: Programmatic ThemeProvider */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--cinder-text)", marginBottom: "8px" }}>
            Method 2: Multi-Tenant &amp; Dynamic Theming via ThemeProvider
          </h3>
          <p style={{ color: "var(--cinder-muted)", fontSize: "13px", marginBottom: "12px", lineHeight: "1.6" }}>
            For multi-tenant SaaS platforms or runtime theme pickers, pass custom token dictionaries directly to <code>ThemeProvider</code>:
          </p>

          <div
            style={{
              backgroundColor: "var(--cinder-surface)",
              border: "1px solid var(--cinder-border)",
              borderRadius: "8px",
              padding: "16px",
              fontFamily: "var(--cinder-font-mono)",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            <pre style={{ margin: 0 }}>
              <code>{`import { ThemeProvider } from "@tec-triad/cinder-ui";

const customTheme = {
  id: "violet-brand",
  colors: {
    primary: "#8b5cf6",
    primaryHover: "#7c3aed",
  },
};

export function App() {
  return (
    <ThemeProvider customThemes={{ "violet-brand": customTheme }} defaultThemeId="violet-brand">
      <MainWorkspace />
    </ThemeProvider>
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* Live Interactive Custom Theme Playground */}
        <ThemeCustomizerCard />
      </section>
    </div>
  );
}
