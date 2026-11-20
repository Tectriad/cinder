import { Link } from "react-router-dom";
import { Button, Badge, IconButton, useCinderTheme } from "@cinder-ui/core";
import { Sparkles, Layers, Box, MousePointerClick, Sun, Moon } from "lucide-react";
import { CinderLogo } from "./CinderLogo";

export function Navbar() {
  const { resolvedMode, setMode } = useCinderTheme();

  return (
    <header className="site-header">
      <div className="app-container site-nav">
        {/* Brand */}
        <Link to="/" className="brand-wrapper">
          <div className="brand-logo-icon">
            <CinderLogo size={28} />
          </div>
          <span className="brand-name">CINDER</span>
          <Badge variant="primary" size="sm" dot pulse>
            Cinder Slate
          </Badge>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            <Sparkles size={15} color="var(--cinder-accent)" />
            <span>Home</span>
          </Link>
          <Link to="/components/button" className="nav-link" style={{ color: "var(--cinder-primary)", fontWeight: 600 }}>
            <Box size={15} color="var(--cinder-primary)" />
            <span>Components</span>
          </Link>
          <Link to="/tokens" className="nav-link">
            <Layers size={15} color="var(--cinder-muted)" />
            <span>Design Tokens</span>
          </Link>
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton
            icon={resolvedMode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            aria-label={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
            variant="ghost"
            size="sm"
            onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
            title={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
          />
          <Button
            as={Link}
            to="/components/overview"
            variant="glass"
            size="sm"
            prefix={<Box size={13} />}
          >
            Overview
          </Button>
          <Button
            as={Link}
            to="/components/button"
            variant="primary"
            size="sm"
            prefix={<MousePointerClick size={13} />}
          >
            Components
          </Button>
        </div>
      </div>
    </header>
  );
}
