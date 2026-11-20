import { useState, type ReactElement } from "react";
import { CDStepper, Stepper, CDButton } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function StepperDocPage(): ReactElement {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepperProps = [
    { property: "current", description: "Current active step index (0-based)", type: "number", default: "0" },
    { property: "status", description: "Status of the active step ('wait' | 'process' | 'finish' | 'error')", type: "string", default: "'process'" },
    { property: "onChange", description: "Callback triggered when a step is clicked to navigate", type: "(current: number) => void", default: "-" },
    { property: "orientation", description: "Direction flow layout ('horizontal' | 'vertical')", type: "string", default: "'horizontal'" },
    { property: "variant", description: "Step node appearance ('default' | 'dots' | 'navigation')", type: "string", default: "'default'" },
    { property: "size", description: "Sizing scale ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "items", description: "Declarative array of step definition items", type: "CDStepItem[]", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDStepper / Stepper</h1>
        <p className="cinder-doc-lead">
          Workflow progress indicator for multi-step wizards, onboarding setups, and staged task progressions with full-width responsive connectors.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDStepper, CDStep, Stepper &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>For guiding users through structured multi-step forms or onboarding processes.</li>
          <li>To communicate completed, active, pending, or erroneous steps in a pipeline.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Full-Width Interactive Wizard */}
          <DemoCard
            fullWidth
            title="Interactive Wizard Stepper (Full Width)"
            description="Navigate forward and backward through step states with automated checkmarks on completion and full horizontal space."
            code={`import { CDStepper, CDButton } from '@cinder-ui/core';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ width: '100%' }}>
      <CDStepper
        current={current}
        onChange={setCurrent}
        items={[
          { title: 'Project Config', description: 'Name & repository settings' },
          { title: 'Environment', description: 'Production & staging variables' },
          { title: 'Cluster Deploy', description: 'Kubernetes node provision' },
          { title: 'Verification', description: 'Health check probe' },
        ]}
      />
      <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
        <CDButton
          variant="secondary"
          size="sm"
          disabled={current === 0}
          onClick={() => setCurrent(prev => Math.max(0, prev - 1))}
        >
          Previous
        </CDButton>
        <CDButton
          variant="primary"
          size="sm"
          disabled={current === 3}
          onClick={() => setCurrent(prev => Math.min(3, prev + 1))}
        >
          Next Step
        </CDButton>
      </div>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
              <CDStepper
                current={currentStep}
                onChange={setCurrentStep}
                items={[
                  { title: "Project Config", description: "Name & repository settings" },
                  { title: "Environment", description: "Production & staging variables" },
                  { title: "Cluster Deploy", description: "Kubernetes node provision" },
                  { title: "Verification", description: "Health check probe" },
                ]}
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <CDButton
                  variant="secondary"
                  size="sm"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((prev: number) => Math.max(0, prev - 1))}
                >
                  Previous
                </CDButton>
                <CDButton
                  variant="primary"
                  size="sm"
                  disabled={currentStep === 3}
                  onClick={() => setCurrentStep((prev: number) => Math.min(3, prev + 1))}
                >
                  Next Step
                </CDButton>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Error Status & Dots Variant */}
          <DemoCard
            fullWidth
            title="Dots Variant & Error State (Full Width)"
            description="Minimal dot markers with connector lines, status tracking, and error highlights across full width."
            code={`import { CDStepper } from '@cinder-ui/core';

export default () => (
  <CDStepper
    variant="dots"
    current={2}
    status="error"
    items={[
      { title: 'Source Code Pull', description: 'Git clone completed' },
      { title: 'Docker Build', description: 'Image build passed' },
      { title: 'Unit Tests', description: '2 assertions failed' },
      { title: 'Artifact Push', description: 'Pending approval' },
    ]}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDStepper
                variant="dots"
                current={2}
                status="error"
                items={[
                  { title: "Source Code Pull", description: "Git clone completed" },
                  { title: "Docker Build", description: "Image build passed" },
                  { title: "Unit Tests", description: "2 assertions failed" },
                  { title: "Artifact Push", description: "Pending approval" },
                ]}
              />
            </div>
          </DemoCard>

          {/* Demo 3: Vertical Flow Stepper */}
          <DemoCard
            fullWidth
            title="Vertical Flow Stepper"
            description="Vertical orientation stepper ideal for side panels, wizards, or step-by-step logs."
            code={`import { Stepper } from '@cinder-ui/core';

export default () => (
  <Stepper
    orientation="vertical"
    current={1}
    items={[
      { title: 'Cluster Created', description: 'us-east-1 VPC provisioned' },
      { title: 'Ingress Controller', description: 'Configuring ALB and DNS records' },
      { title: 'Deploy Workloads', description: 'Applying Kubernetes manifests' },
    ]}
  />
);`}
          >
            <div style={{ maxWidth: "480px" }}>
              <Stepper
                orientation="vertical"
                current={1}
                items={[
                  { title: "Cluster Created", description: "us-east-1 VPC provisioned" },
                  { title: "Ingress Controller", description: "Configuring ALB and DNS records" },
                  { title: "Deploy Workloads", description: "Applying Kubernetes manifests" },
                ]}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={stepperProps} />
      </section>
    </div>
  );
}
