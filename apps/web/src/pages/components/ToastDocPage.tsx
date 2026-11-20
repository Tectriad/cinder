import type { ReactElement } from "react";
import {
  toast,
  CDButton,
  CDToastContainer,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function ToastDocPage(): ReactElement {
  const toastOptionsProps = [
    { property: "placement", description: "Screen anchor location ('top' | 'top-left' | 'top-center' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right')", type: "string", default: "'top-right'" },
    { property: "animation", description: "Motion animation with ease-in/ease-out ('slide' | 'fade' | 'zoom' | 'bounce')", type: "string", default: "'slide'" },
    { property: "duration", description: "Display time in milliseconds before auto-dismiss (0 for persistent)", type: "number", default: "4000" },
    { property: "showProgress", description: "Display animated countdown progress bar at bottom", type: "boolean", default: "true" },
    { property: "pauseOnHover", description: "Pause auto-dismiss timer and countdown when hovered", type: "boolean", default: "true" },
    { property: "backgroundColor", description: "Custom background color override", type: "string", default: "-" },
    { property: "textColor", description: "Custom text color override", type: "string", default: "-" },
    { property: "borderColor", description: "Custom border color override", type: "string", default: "-" },
    { property: "borderRadius", description: "Custom border radius override (number or string)", type: "number | string", default: "-" },
    { property: "action", description: "Action slot (e.g. Button or Link)", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      {/* Toast container supporting multi-placement portals */}
      <CDToastContainer />

      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDToast / Toast / Snackbar</h1>
        <p className="cinder-doc-lead">
          Floating feedback message that slides in at any screen location with configurable ease-in/ease-out animations, countdown progress bar, and user-customizable surface colors and durations.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; toast, CDToastContainer, CDToast &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>To display non-blocking operational feedback in any screen location (top, bottom, left, center, right).</li>
          <li>Auto-dismisses with a visible countdown bar, with pause-on-hover capability.</li>
          <li>Elevated in body portals at `z-index: 2000` above modals, drawers, and headers.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Placement Locations */}
          <DemoCard
            title="Screen Placements & Locations"
            description="Display toasts in 6 distinct positions: top-left, top-center, top-right, bottom-left, bottom-center, and bottom-right."
            code={`import { toast, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
    <CDButton size="sm" onClick={() => toast.info("Top Left Notice", { placement: "top-left" })}>
      Top Left
    </CDButton>
    <CDButton size="sm" onClick={() => toast.info("Top Center Notice", { placement: "top-center" })}>
      Top Center
    </CDButton>
    <CDButton size="sm" onClick={() => toast.info("Top Right Notice", { placement: "top-right" })}>
      Top Right
    </CDButton>
    <CDButton size="sm" onClick={() => toast.info("Bottom Left Notice", { placement: "bottom-left" })}>
      Bottom Left
    </CDButton>
    <CDButton size="sm" onClick={() => toast.info("Bottom Center Notice", { placement: "bottom-center" })}>
      Bottom Center
    </CDButton>
    <CDButton size="sm" onClick={() => toast.info("Bottom Right Notice", { placement: "bottom-right" })}>
      Bottom Right
    </CDButton>
  </div>
);`}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", width: "100%" }}>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.info("Top Left Notice", { placement: "top-left" })}
              >
                Top Left
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.info("Top Center Notice", { placement: "top-center" })}
              >
                Top Center
              </CDButton>
              <CDButton
                size="sm"
                variant="primary"
                onClick={(): string => toast.info("Top Right Notice", { placement: "top-right" })}
              >
                Top Right
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.info("Bottom Left Notice", { placement: "bottom-left" })}
              >
                Bottom Left
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.info("Bottom Center Notice", { placement: "bottom-center" })}
              >
                Bottom Center
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.info("Bottom Right Notice", { placement: "bottom-right" })}
              >
                Bottom Right
              </CDButton>
            </div>
          </DemoCard>

          {/* Demo 2: Animations */}
          <DemoCard
            title="Animations (Ease-In & Ease-Out)"
            description="Motion presets with fluid cubic-bezier curves for entry and ease-out dismiss: Slide, Fade, Zoom, and Bounce."
            code={`import { toast, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <CDButton size="sm" onClick={() => toast.success("Slide Animation", { animation: "slide" })}>
      Slide (Default)
    </CDButton>
    <CDButton size="sm" onClick={() => toast.info("Fade Animation", { animation: "fade" })}>
      Fade In / Out
    </CDButton>
    <CDButton size="sm" onClick={() => toast.warning("Zoom Animation", { animation: "zoom" })}>
      Zoom Scale
    </CDButton>
    <CDButton size="sm" onClick={() => toast.error("Bounce Animation", { animation: "bounce" })}>
      Bounce Spring
    </CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.success("Slide Animation", { animation: "slide" })}
              >
                Slide (Default)
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.info("Fade Animation", { animation: "fade" })}
              >
                Fade In / Out
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.warning("Zoom Animation", { animation: "zoom" })}
              >
                Zoom Scale
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.error("Bounce Animation", { animation: "bounce" })}
              >
                Bounce Spring
              </CDButton>
            </div>
          </DemoCard>

          {/* Demo 3: Customizable Colors, Time, and Progress */}
          <DemoCard
            title="Custom Colors & Duration Timing"
            description="Customize surface background color, text color, border styling, and auto-dismiss countdown timer."
            code={`import { toast, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {/* Custom Time */}
    <CDButton
      size="sm"
      variant="secondary"
      onClick={() => toast.success("Quick 2s Toast", { duration: 2000 })}
    >
      Fast 2s Toast
    </CDButton>
    <CDButton
      size="sm"
      variant="secondary"
      onClick={() => toast.info("Persistent Toast (No auto-close)", { duration: 0 })}
    >
      Persistent (0ms)
    </CDButton>

    {/* Custom Colors & Borders */}
    <CDButton
      size="sm"
      variant="primary"
      onClick={() => toast.show({
        title: "Custom Indigo Surface",
        description: "Background set to #1e1b4b with vibrant violet border.",
        backgroundColor: "#1e1b4b",
        textColor: "#e0e7ff",
        borderColor: "#6366f1",
        borderRadius: 12,
        duration: 6000,
      })}
    >
      Custom Colors & Radius
    </CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string => toast.success("Quick 2s Toast", { duration: 2000 })}
              >
                Fast 2s Toast
              </CDButton>
              <CDButton
                size="sm"
                variant="secondary"
                onClick={(): string =>
                  toast.info("Persistent Toast (Click close button)", { duration: 0 })
                }
              >
                Persistent (0ms)
              </CDButton>
              <CDButton
                size="sm"
                variant="primary"
                onClick={(): string =>
                  toast.show({
                    title: "Custom Indigo Surface",
                    description: "Background set to #1e1b4b with vibrant violet border.",
                    backgroundColor: "#1e1b4b",
                    textColor: "#e0e7ff",
                    borderColor: "#6366f1",
                    borderRadius: 12,
                    duration: 6000,
                  })
                }
              >
                Custom Colors & Radius
              </CDButton>
            </div>
          </DemoCard>

          {/* Demo 4: Action Buttons & Pause on Hover */}
          <DemoCard
            title="Interactive Actions & Pause on Hover"
            description="Toasts support interactive buttons and automatically pause their countdown timer when hovered."
            code={`import { toast, CDButton } from '@cinder-ui/core';

export default () => (
  <CDButton
    variant="primary"
    onClick={() => {
      toast.show({
        type: "warning",
        title: "File Deleted",
        description: "Document report-2026.pdf was moved to the trash.",
        duration: 6000,
        action: (
          <CDButton size="sm" variant="glass" onClick={() => toast.success("File restored!")}>
            Undo
          </CDButton>
        ),
      });
    }}
  >
    Toast with Action & Pause on Hover
  </CDButton>
);`}
          >
            <CDButton
              variant="primary"
              onClick={(): string =>
                toast.show({
                  type: "warning",
                  title: "File Deleted",
                  description: "Document report-2026.pdf was moved to the trash.",
                  duration: 6000,
                  action: (
                    <CDButton
                      size="sm"
                      variant="glass"
                      onClick={(): string => toast.success("File restored!")}
                    >
                      Undo
                    </CDButton>
                  ),
                })
              }
            >
              Toast with Action & Pause on Hover
            </CDButton>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={toastOptionsProps} />
      </section>
    </div>
  );
}
