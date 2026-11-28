import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@tec-triad/cinder-ui";
import { CinderLogo } from "./CinderLogo";
import { ExternalLink } from "lucide-react";

export function Footer(): ReactElement {
  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="app-container footer-container">
        {/* Top 4-Column Grid */}
        <div className="footer-columns-grid">
          {/* Brand Pillar */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-logo-box" aria-hidden="true">
                <CinderLogo size={24} />
              </div>
              <span className="footer-brand-title">CINDER UI</span>
            </div>
            <p className="footer-brand-desc">
              High-performance React component library and vector icon ecosystem engineered for
              velocity, strict accessibility, and token-driven design in Cinder Slate.
            </p>
            <div className="footer-brand-badges">
              <Badge variant="success" size="sm" dot>
                v0.1.2 Live
              </Badge>
              <Badge variant="primary" size="sm">
                MIT Licensed
              </Badge>
            </div>
          </div>

          {/* Links Column 1: Component Library */}
          <div className="footer-col">
            <h4 className="footer-col-title">Components</h4>
            <ul className="footer-links-list">
              <li><Link to="/components/overview" className="footer-link">All 50+ Components</Link></li>
              <li><Link to="/components/button" className="footer-link">Button &amp; Actions</Link></li>
              <li><Link to="/components/input" className="footer-link">Input &amp; Forms</Link></li>
              <li><Link to="/components/card" className="footer-link">Cards &amp; Panels</Link></li>
              <li><Link to="/components/modal" className="footer-link">Modals &amp; Drawers</Link></li>
              <li><Link to="/components/table" className="footer-link">Data Grid &amp; Table</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Ecosystem */}
          <div className="footer-col">
            <h4 className="footer-col-title">Ecosystem</h4>
            <ul className="footer-links-list">
              <li><Link to="/components/getting-started" className="footer-link">Getting Started Guide</Link></li>
              <li><Link to="/icons" className="footer-link">IconForge Studio</Link></li>
              <li><Link to="/tokens" className="footer-link">Design Tokens</Link></li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@tec-triad/cinder-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-external-link"
                >
                  <span>npm: @tec-triad/cinder-ui</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@tec-triad/iconforge-react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-external-link"
                >
                  <span>npm: @tec-triad/iconforge-react</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Community & Governance */}
          <div className="footer-col">
            <h4 className="footer-col-title">Governance</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://github.com/Tectriad/cinder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-external-link"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Tectriad/cinder/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-external-link"
                >
                  <span>Contributing Guidelines</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Tectriad/cinder/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-external-link"
                >
                  <span>Security Policy</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Tectriad/cinder/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-external-link"
                >
                  <span>MIT License</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} TecTriad. Designed with precision in Cinder Slate.
          </span>
          <div className="footer-bottom-meta">
            <span className="footer-build-tag">Dual ESM / CJS</span>
            <span className="footer-build-tag">Zero Emojis</span>
            <span className="footer-build-tag">Strict TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
