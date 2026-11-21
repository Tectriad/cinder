import { Link } from "react-router-dom";
import { Button, Badge, Card, CardTitle, CardDescription, Snippet } from "@cinder-ui/core";
import { Sparkles, ArrowRight, Box, ShieldCheck, Cpu } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CinderLogo } from "../components/CinderLogo";

export function HomePage() {
  return (
    <div className="cinder-app">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="hero-section bg-grid-slate">
          <div className="glow-slate" />
          <div className="app-container">
            <div className="hero-pill-wrapper">
              <Badge variant="accent" size="md" dot pulse>
                Cinder Style Documentation &amp; Multiple Libraries Ready
              </Badge>
            </div>

            <h1 className="hero-title">
              The React Component Library Engine Built in{" "}
              <span className="hero-gradient-text">Cinder Slate</span>
            </h1>

            <p className="hero-subtitle">
              Engineered for precision enterprise workflows and long reading sessions. Obsidian slate surfaces, vibrant royal blue action points, crisp dividers, and fluid Dark &amp; Light duality.
            </p>

            <div className="hero-snippet-wrapper">
              <Snippet code="npm install @cinder-ui/core" prefix="$" />
            </div>

            <div className="hero-actions">
              <Button
                as={Link}
                to="/components/button"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
              >
                Explore Components
              </Button>
              <Button
                as={Link}
                to="/tokens"
                variant="outline"
                size="lg"
                leftIcon={<Sparkles size={16} color="var(--cinder-accent)" />}
              >
                Design Tokens
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid-4">
              <Card variant="surface" interactive>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "var(--cinder-success-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--cinder-success)",
                    border: "1px solid var(--cinder-border)"
                  }}>
                    <Box size={16} />
                  </div>
                  <Badge variant="success" size="sm">Workspace</Badge>
                </div>
                <CardTitle style={{ fontSize: "16px" }}>Monorepo Multi-Lib</CardTitle>
                <CardDescription style={{ fontSize: "12px", marginTop: "6px" }}>
                  Ready to host multiple component packages: <code style={{ color: "var(--cinder-accent)" }}>@cinder-ui/core</code>, <code style={{ color: "var(--cinder-accent)" }}>@cinder-ui/forms</code>, and more.
                </CardDescription>
              </Card>

              <Card variant="surface" interactive>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "var(--cinder-success-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--cinder-success)",
                    border: "1px solid var(--cinder-border)"
                  }}>
                    <Cpu size={16} />
                  </div>
                  <Badge variant="success" size="sm">tsup Bundler</Badge>
                </div>
                <CardTitle style={{ fontSize: "16px" }}>Dual ESM / CJS</CardTitle>
                <CardDescription style={{ fontSize: "12px", marginTop: "6px" }}>
                  High-speed tree-shakeable packaging producing ESM, CommonJS, and strict <code style={{ color: "var(--cinder-accent)" }}>.d.ts</code> declarations.
                </CardDescription>
              </Card>

              <Card variant="surface" interactive>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "var(--cinder-success-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--cinder-success)",
                    border: "1px solid var(--cinder-border)"
                  }}>
                    <ShieldCheck size={16} />
                  </div>
                  <Badge variant="success" size="sm">Cinder Style</Badge>
                </div>
                <CardTitle style={{ fontSize: "16px" }}>Rich Documentation</CardTitle>
                <CardDescription style={{ fontSize: "12px", marginTop: "6px" }}>
                  Sidebar navigation, categorized component trees, interactive live code demos, and API specification tables.
                </CardDescription>
              </Card>

              <Card variant="glass" interactive>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--cinder-primary)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    flexShrink: 0,
                    overflow: "hidden"
                  }}>
                    <CinderLogo size={28} />
                  </div>
                  <Badge variant="primary" size="sm" dot>Cinder Slate</Badge>
                </div>
                <CardTitle style={{ fontSize: "16px" }}>Zero Glare &amp; Dual Theme</CardTitle>
                <CardDescription style={{ fontSize: "12px", marginTop: "6px" }}>
                  Deep slate surfaces (#09090b / #121215), precision royal blue (#3b82f6 / #2563eb), and crisp light/dark mode.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Component Directory section */}
        <section className="section">
          <div className="app-container">
            <div className="section-header">
              <div className="section-tag">
                <Badge variant="primary" size="md">Direct Component Access</Badge>
              </div>
              <h2 className="section-title">Component Categories</h2>
              <p className="section-desc">
                Browse our primitives organized in Cinder category patterns.
              </p>
            </div>

            <div className="grid-3">
              <Link to="/components/button" style={{ textDecoration: "none" }}>
                <Card variant="surface" interactive>
                  <CardTitle style={{ fontSize: "18px", color: "var(--cinder-primary)" }}>Button</CardTitle>
                  <CardDescription style={{ marginTop: "8px" }}>
                    Primary, Secondary, Tertiary, Loading, Prefix/Suffix, Dropdown, and CopyButton.
                  </CardDescription>
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px", color: "var(--cinder-accent)", fontSize: "13px", fontWeight: 600 }}>
                    <span>Open Documentation</span>
                    <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>

              <Link to="/components/input" style={{ textDecoration: "none" }}>
                <Card variant="surface" interactive>
                  <CardTitle style={{ fontSize: "18px", color: "var(--cinder-primary)" }}>Input</CardTitle>
                  <CardDescription style={{ marginTop: "8px" }}>
                    Slate surface input, vibrant blue focus ring, prefix/suffix affixes, and sizes.
                  </CardDescription>
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px", color: "var(--cinder-accent)", fontSize: "13px", fontWeight: 600 }}>
                    <span>Open Documentation</span>
                    <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>

              <Link to="/components/badge" style={{ textDecoration: "none" }}>
                <Card variant="surface" interactive>
                  <CardTitle style={{ fontSize: "18px", color: "var(--cinder-primary)" }}>Badge</CardTitle>
                  <CardDescription style={{ marginTop: "8px" }}>
                    Crisp status indicators, pulsing live dots, and high-contrast semantic tints.
                  </CardDescription>
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px", color: "var(--cinder-accent)", fontSize: "13px", fontWeight: 600 }}>
                    <span>Open Documentation</span>
                    <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
