import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "@tec-triad/cinder-ui";
import { ArrowRight, Sparkles } from "lucide-react";

export function LandingCTASection(): ReactElement {
  return (
    <section className="section cta-section" aria-labelledby="cta-heading">
      <div className="app-container">
        <div className="cta-panel">
          <div className="cta-content">
            <Badge variant="accent" size="md" dot>
              Open-Source &bull; MIT Licensed
            </Badge>

            <h2 id="cta-heading" className="cta-title">
              Ready to Accelerate Your Design Engineering?
            </h2>

            <p className="cta-desc">
              Install the foundational library or import IconForge vector icons into your next project.
              Zero friction, completely customizable with Cinder Slate tokens.
            </p>

            <div className="cta-actions">
              <Button
                as={Link}
                to="/components/overview"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={16} aria-hidden="true" />}
              >
                Browse Documentation
              </Button>
              <Button
                as={Link}
                to="/icons"
                variant="glass"
                size="lg"
                leftIcon={<Sparkles size={16} color="var(--cinder-primary)" aria-hidden="true" />}
              >
                Open IconForge Studio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
