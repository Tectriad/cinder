import { useState, useEffect, type ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Badge, IconButton, useCinderTheme } from "@tec-triad/cinder-ui";
import {
  Sparkles,
  Layers,
  Box,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { CinderLogo } from "./CinderLogo";

export function Navbar(): ReactElement {
  const { resolvedMode, setMode } = useCinderTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle Escape key to dismiss mobile drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleTheme = (): void => {
    setMode(resolvedMode === "dark" ? "light" : "dark");
  };

  return (
    <header className="site-header">
      <div className="app-container site-nav">
        {/* Brand */}
        <Link to="/" className="brand-wrapper" aria-label="Cinder Home">
          <div className="brand-logo-icon">
            <CinderLogo size={32} />
          </div>
          <span className="brand-name">CINDER</span>
          <Badge variant="primary" size="sm" dot pulse>
            v0.1.0
          </Badge>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" aria-label="Main Navigation">
          <Link
            to="/components/getting-started"
            className={`nav-link ${location.pathname === "/components/getting-started" ? "nav-link-active" : ""}`}
          >
            <Sparkles size={15} aria-hidden="true" />
            <span>Docs</span>
          </Link>
          <Link
            to="/components/overview"
            className={`nav-link ${location.pathname.startsWith("/components") && location.pathname !== "/components/getting-started" ? "nav-link-active" : ""}`}
          >
            <Box size={15} aria-hidden="true" />
            <span>Components</span>
          </Link>
          <Link
            to="/icons"
            className={`nav-link ${location.pathname.startsWith("/icons") ? "nav-link-active" : ""}`}
          >
            <Sparkles size={15} color="var(--cinder-primary)" aria-hidden="true" />
            <span>IconForge</span>
          </Link>
          <Link
            to="/tokens"
            className={`nav-link ${location.pathname.startsWith("/tokens") ? "nav-link-active" : ""}`}
          >
            <Layers size={15} aria-hidden="true" />
            <span>Tokens</span>
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="nav-right-actions">
          <IconButton
            icon={resolvedMode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            aria-label={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            title={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
          />

          <Button
            as={Link}
            to="/components/overview"
            variant="primary"
            size="sm"
            className="nav-cta-btn"
          >
            Explore Primitives
          </Button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Sheet */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="mobile-nav-drawer-content app-container">
            <nav className="mobile-nav-links" aria-label="Mobile Menu">
              <Link to="/components/getting-started" className="mobile-nav-link">
                <div className="mobile-nav-icon-box">
                  <Sparkles size={18} color="var(--cinder-primary)" aria-hidden="true" />
                </div>
                <div className="mobile-nav-link-text">
                  <span className="mobile-nav-link-title">Getting Started</span>
                  <span className="mobile-nav-link-sub">Installation &amp; custom theming setup</span>
                </div>
                <ArrowRight size={14} className="mobile-nav-arrow" aria-hidden="true" />
              </Link>

              <Link to="/components/overview" className="mobile-nav-link">
                <div className="mobile-nav-icon-box">
                  <Box size={18} color="var(--cinder-primary)" aria-hidden="true" />
                </div>
                <div className="mobile-nav-link-text">
                  <span className="mobile-nav-link-title">50+ Components</span>
                  <span className="mobile-nav-link-sub">Full interactive primitive library</span>
                </div>
                <ArrowRight size={14} className="mobile-nav-arrow" aria-hidden="true" />
              </Link>

              <Link to="/icons" className="mobile-nav-link">
                <div className="mobile-nav-icon-box">
                  <Sparkles size={18} color="var(--cinder-primary)" aria-hidden="true" />
                </div>
                <div className="mobile-nav-link-text">
                  <span className="mobile-nav-link-title">IconForge Studio</span>
                  <span className="mobile-nav-link-sub">1,000+ icons in 6 visual styles</span>
                </div>
                <ArrowRight size={14} className="mobile-nav-arrow" aria-hidden="true" />
              </Link>

              <Link to="/tokens" className="mobile-nav-link">
                <div className="mobile-nav-icon-box">
                  <Layers size={18} color="var(--cinder-primary)" aria-hidden="true" />
                </div>
                <div className="mobile-nav-link-text">
                  <span className="mobile-nav-link-title">Design Tokens</span>
                  <span className="mobile-nav-link-sub">Cinder Slate color and spacing system</span>
                </div>
                <ArrowRight size={14} className="mobile-nav-arrow" aria-hidden="true" />
              </Link>
            </nav>

            {/* Quick Category Badges on Mobile */}
            <div className="mobile-nav-quick-row">
              <span className="mobile-nav-quick-title">Quick Primitives:</span>
              <div className="mobile-nav-quick-chips">
                <Link to="/components/button" className="mobile-quick-chip">Button</Link>
                <Link to="/components/input" className="mobile-quick-chip">Input</Link>
                <Link to="/components/badge" className="mobile-quick-chip">Badge</Link>
                <Link to="/components/card" className="mobile-quick-chip">Card</Link>
                <Link to="/components/modal" className="mobile-quick-chip">Modal</Link>
                <Link to="/components/table" className="mobile-quick-chip">Table</Link>
              </div>
            </div>

            {/* Mobile Footer Row */}
            <div className="mobile-nav-footer">
              <span className="mobile-nav-version">Cinder UI &bull; @tec-triad/cinder-ui</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                leftIcon={resolvedMode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              >
                {resolvedMode === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
