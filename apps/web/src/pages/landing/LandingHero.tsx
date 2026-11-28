import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "@tec-triad/cinder-ui";
import { Sparkles, ArrowRight, Layers, Copy, Check, Terminal } from "lucide-react";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: "npm install @tec-triad/cinder-ui",
  pnpm: "pnpm add @tec-triad/cinder-ui",
  yarn: "yarn add @tec-triad/cinder-ui",
  bun: "bun add @tec-triad/cinder-ui",
};

export function LandingHero(): ReactElement {
  const [selectedPm, setSelectedPm] = useState<PackageManager>("npm");
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const activeCommand: string = INSTALL_COMMANDS[selectedPm];

  const handleCopyCommand = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(activeCommand);
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch {
      // Fallback if clipboard API is constrained
      setHasCopied(false);
    }
  };

  return (
    <section className="hero-section bg-grid-slate" aria-labelledby="hero-heading">
      <div className="app-container hero-container">
        {/* Pill Badge */}
        <div className="hero-pill-wrapper">
          <Badge variant="accent" size="md" dot pulse>
            v0.1.2 Released &bull; 50+ Primitives &amp; IconForge
          </Badge>
        </div>

        {/* Hero Title */}
        <h1 id="hero-heading" className="hero-title">
          The Component Engineering Engine Built in{" "}
          <span className="hero-highlight-text">Cinder Slate</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="hero-subtitle">
          Obsidian slate surfaces, royal blue accents, strict polymorphic TypeScript primitives,
          and a 1,000+ vector icon ecosystem. Designed for enterprise workflows with zero compromise.
        </p>

        {/* Interactive Install Snippet Switcher */}
        <div className="hero-install-card" role="region" aria-label="Package manager install command">
          <div className="hero-install-tabs" role="tablist" aria-label="Select package manager">
            {(["npm", "pnpm", "yarn", "bun"] as const).map((pm: PackageManager) => {
              const isSelected: boolean = selectedPm === pm;
              return (
                <button
                  key={pm}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`hero-install-tab ${isSelected ? "hero-install-tab-active" : ""}`}
                  onClick={() => setSelectedPm(pm)}
                >
                  {pm}
                </button>
              );
            })}
          </div>

          <div className="hero-install-code-row">
            <div className="hero-install-code-text">
              <Terminal size={14} className="hero-install-term-icon" aria-hidden="true" />
              <code>{activeCommand}</code>
            </div>

            <button
              type="button"
              className="hero-install-copy-btn"
              onClick={handleCopyCommand}
              aria-label={hasCopied ? "Command copied" : `Copy ${selectedPm} command`}
              title="Copy to clipboard"
            >
              {hasCopied ? (
                <>
                  <Check size={14} color="var(--cinder-success)" aria-hidden="true" />
                  <span className="hero-copy-label" style={{ color: "var(--cinder-success)" }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} aria-hidden="true" />
                  <span className="hero-copy-label">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Actions CTA */}
        <div className="hero-actions">
          <Button
            as={Link}
            to="/components/overview"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={16} aria-hidden="true" />}
          >
            Explore 50+ Components
          </Button>

          <Button
            as={Link}
            to="/icons"
            variant="glass"
            size="lg"
            leftIcon={<Sparkles size={16} color="var(--cinder-primary)" aria-hidden="true" />}
          >
            IconForge Studio
          </Button>

          <Button
            as={Link}
            to="/tokens"
            variant="outline"
            size="lg"
            leftIcon={<Layers size={16} color="var(--cinder-muted)" aria-hidden="true" />}
          >
            Design Tokens
          </Button>
        </div>
      </div>
    </section>
  );
}
