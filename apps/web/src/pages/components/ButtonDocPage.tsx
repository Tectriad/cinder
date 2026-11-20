import { useState, type ReactElement, type FormEvent } from "react";
import {
  CDButton,
  Button,
  ButtonGroup,
  ButtonDropdown,
  CopyButton,
  CDFloatButton,
  CDIcons,
  CDInput,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function ButtonDocPage(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [formData, setFormData] = useState<{ email: string; project: string }>({
    email: "",
    project: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitSuccess("");
    setTimeout(() => {
      setSubmitLoading(false);
      setSubmitSuccess(`Form submitted successfully for ${formData.email || "user"}!`);
    }, 1200);
  };

  const buttonProps = [
    { property: "variant", description: "Button visual hierarchy style", type: "'primary' | 'secondary' | 'tertiary' | 'ghost' | 'glass' | 'danger'", default: "'primary'" },
    { property: "size", description: "Dimensions of the button", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'" },
    { property: "shape", description: "Geometry shape preset ('default' | 'round' | 'circle')", type: "CDButtonShape", default: "'default'" },
    { property: "isRound", description: "Pill/stadium shaped button with full rounded ends", type: "boolean", default: "false" },
    { property: "radius", description: "Precise border radius control preset or custom px number", type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full' | number", default: "-" },
    { property: "shadow", description: "Normal state elevation shadow", type: "'none' | 'sm' | 'md' | 'lg' | boolean", default: "variant-based" },
    { property: "hoverShadow", description: "Elevation shadow and smooth lift on hover", type: "'none' | 'sm' | 'md' | 'lg' | boolean", default: "-" },
    { property: "htmlType / type", description: "HTML button type ('button' | 'submit' | 'reset')", type: "CDButtonHtmlType", default: "'button'" },
    { property: "isSubmit", description: "Convenience flag to configure button for form submission", type: "boolean", default: "false" },
    { property: "prefixIcon / prefix", description: "Icon or element placed before children", type: "ReactNode", default: "-" },
    { property: "suffixIcon / suffix", description: "Icon or element placed after children", type: "ReactNode", default: "-" },
    { property: "isLoading", description: "Display spinning indicator while preserving layout", type: "boolean", default: "false" },
    { property: "disabled", description: "Prevent click interactions and dim appearance", type: "boolean", default: "false" },
    { property: "customTheme", description: "Inject custom CSS variables for theme overrides", type: "CDButtonCustomTheme", default: "-" },
    { property: "fullWidth", description: "Expand button to fill parent container width", type: "boolean", default: "false" },
    { property: "as", description: "Polymorphic element to render as (e.g. 'a', Link)", type: "ElementType", default: "'button'" },
    { property: "onClick", description: "Click event handler", type: "(event: MouseEvent) => void", default: "-" },
  ];

  const dropdownItems = [
    { label: "Create Revision", icon: <CDIcons.Plus size="sm" />, onClick: () => alert("Revision created!") },
    { label: "Export Bundle", icon: <CDIcons.Download size="sm" />, onClick: () => alert("Bundle exported!") },
    { label: "Share Permissions", icon: <CDIcons.Share size="sm" />, onClick: () => alert("Share dialog opened!") },
    { divider: true, label: "" },
    { label: "Delete Artifact", icon: <CDIcons.Trash size="sm" />, danger: true, onClick: () => alert("Deleted!") },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDButton / Button</h1>
        <p className="antd-doc-lead">
          To trigger an operation, navigate, or submit form data with flexible hierarchy, shapes, controlled border radius, and elevation hover states.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDButton, Button, CDButtonGroup, CDButtonDropdown, CDCopyButton &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li><strong>Primary Action</strong>: Use vibrant Slate Blue for the single main call to action on the screen.</li>
          <li><strong>Round Buttons</strong>: Use <code>isRound</code> or <code>shape="round"</code> for friendly CTAs, badges, floating triggers, and pill designs.</li>
          <li><strong>Controlled Radius &amp; Shadows</strong>: Tune border radius (<code>none</code> to <code>full</code>) and elevation hover responses (<code>sm</code>, <code>md</code>, <code>lg</code>) to harmonize with your layout.</li>
          <li><strong>Submit Buttons</strong>: Use <code>isSubmit</code> or <code>htmlType="submit"</code> within forms to safely execute submissions with built-in loading feedback.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Button Hierarchy */}
          <DemoCard
            title="Button Hierarchy"
            description="Visual hierarchy variants: Primary (Slate Blue), Secondary (Surface), Tertiary (Border), Ghost, Glass (Blur), and Danger."
            code={`import { CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <CDButton variant="primary">Primary</CDButton>
    <CDButton variant="secondary">Secondary</CDButton>
    <CDButton variant="tertiary">Tertiary</CDButton>
    <CDButton variant="ghost">Ghost</CDButton>
    <CDButton variant="glass">Glass</CDButton>
    <CDButton variant="danger">Danger</CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CDButton variant="primary">Primary</CDButton>
              <CDButton variant="secondary">Secondary</CDButton>
              <CDButton variant="tertiary">Tertiary</CDButton>
              <CDButton variant="ghost">Ghost</CDButton>
              <CDButton variant="glass">Glass</CDButton>
              <CDButton variant="danger">Danger</CDButton>
            </div>
          </DemoCard>

          {/* Demo 2: Round & Circle Buttons */}
          <DemoCard
            title="Round & Circle Buttons"
            description="Use isRound or shape='round' for pill buttons, and shape='circle' for circular buttons."
            code={`import { CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
    <CDButton variant="primary" isRound prefixIcon={<CDIcons.Sparkles size="sm" />}>
      Pill Button
    </CDButton>
    <CDButton variant="secondary" shape="round">
      Round Secondary
    </CDButton>
    <CDButton variant="glass" isRound suffixIcon={<CDIcons.ArrowRight size="sm" />}>
      Explore More
    </CDButton>
    <CDButton variant="primary" shape="circle" aria-label="Search">
      <CDIcons.Search size="sm" />
    </CDButton>
    <CDButton variant="secondary" shape="circle" aria-label="Settings">
      <CDIcons.Settings size="sm" />
    </CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <CDButton variant="primary" isRound prefixIcon={<CDIcons.Sparkles size="sm" />}>
                Pill Button
              </CDButton>
              <CDButton variant="secondary" shape="round">
                Round Secondary
              </CDButton>
              <CDButton variant="glass" isRound suffixIcon={<CDIcons.ArrowRight size="sm" />}>
                Explore More
              </CDButton>
              <CDButton variant="primary" shape="circle" aria-label="Search">
                <CDIcons.Search size="sm" />
              </CDButton>
              <CDButton variant="secondary" shape="circle" aria-label="Settings">
                <CDIcons.Settings size="sm" />
              </CDButton>
            </div>
          </DemoCard>

          {/* Demo 3: Controlled Border Radius */}
          <DemoCard
            title="Controlled Border Radius"
            description="Explicitly control corner rounding: 'none' (0px), 'xs' (4px), 'sm' (6px), 'md' (8px), 'lg' (12px), 'full' (9999px), or any custom number."
            code={`import { CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
    <CDButton variant="secondary" radius="none">radius="none"</CDButton>
    <CDButton variant="secondary" radius="xs">radius="xs"</CDButton>
    <CDButton variant="secondary" radius="sm">radius="sm"</CDButton>
    <CDButton variant="secondary" radius="md">radius="md"</CDButton>
    <CDButton variant="secondary" radius="lg">radius="lg"</CDButton>
    <CDButton variant="secondary" radius="full">radius="full"</CDButton>
    <CDButton variant="primary" radius={24}>radius={24}</CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <CDButton variant="secondary" radius="none">none</CDButton>
              <CDButton variant="secondary" radius="xs">xs</CDButton>
              <CDButton variant="secondary" radius="sm">sm</CDButton>
              <CDButton variant="secondary" radius="md">md</CDButton>
              <CDButton variant="secondary" radius="lg">lg</CDButton>
              <CDButton variant="secondary" radius="full">full</CDButton>
              <CDButton variant="primary" radius={24}>Custom 24px</CDButton>
            </div>
          </DemoCard>

          {/* Demo 4: Controlled Shadow & On-Hover Elevation */}
          <DemoCard
            title="Shadow & On-Hover Elevation"
            description="Control normal state shadow and on-hover elevation (none, sm, md, lg) with smooth translateY transitions."
            code={`import { CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
    <CDButton variant="secondary" shadow="none" hoverShadow="none">
      Flat (No Shadow)
    </CDButton>
    <CDButton variant="secondary" shadow="sm" hoverShadow="md">
      Hover Lift (MD)
    </CDButton>
    <CDButton variant="primary" shadow="md" hoverShadow="lg">
      Hover Elevation (LG)
    </CDButton>
    <CDButton variant="glass" shadow="sm" hoverShadow="md">
      Glass Elevated
    </CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
              <CDButton variant="secondary" shadow="none" hoverShadow="none">
                Flat (No Shadow)
              </CDButton>
              <CDButton variant="secondary" shadow="sm" hoverShadow="md">
                Hover Lift (MD)
              </CDButton>
              <CDButton variant="primary" shadow="md" hoverShadow="lg">
                Hover Elevation (LG)
              </CDButton>
              <CDButton variant="glass" shadow="sm" hoverShadow="md">
                Glass Elevated
              </CDButton>
            </div>
          </DemoCard>

          {/* Demo 5: Form Submit Button */}
          <DemoCard
            title="Form Submit Button"
            description="Set isSubmit or htmlType='submit' to trigger standard HTML form submission with automatic loading feedback."
            code={`import { useState } from 'react';
import { CDButton, CDInput, CDIcons } from '@cinder-ui/core';

export default () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
      <CDInput placeholder="user@company.com" label="Work Email" required />
      <CDButton isSubmit variant="primary" isLoading={loading} suffixIcon={<CDIcons.ArrowRight size="sm" />}>
        Submit Project
      </CDButton>
    </form>
  );
};`}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "380px" }}>
              <CDInput
                label="Work Email"
                placeholder="developer@domain.com"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                prefixIcon={<CDIcons.Mail size="sm" />}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <CDButton
                  isSubmit
                  variant="primary"
                  isLoading={submitLoading}
                  prefixIcon={<CDIcons.Check size="sm" />}
                >
                  Submit Form
                </CDButton>
                <CDButton
                  type="reset"
                  variant="ghost"
                  onClick={() => {
                    setFormData({ email: "", project: "" });
                    setSubmitSuccess("");
                  }}
                >
                  Reset
                </CDButton>
              </div>
              {submitSuccess && (
                <div style={{ fontSize: "12px", color: "var(--cinder-success)", fontWeight: 500 }}>
                  {submitSuccess}
                </div>
              )}
            </form>
          </DemoCard>

          {/* Demo 6: Prefix & Suffix Icons */}
          <DemoCard
            title="Prefix & Suffix Icons"
            description="Buttons seamlessly accept CDIcons as prefix or suffix slots with automatic spacing."
            code={`import { CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <CDButton variant="primary" prefixIcon={<CDIcons.Download size="sm" />}>Download</CDButton>
    <CDButton variant="secondary" suffixIcon={<CDIcons.ArrowRight size="sm" />}>Next</CDButton>
    <CDButton variant="glass" prefixIcon={<CDIcons.Sparkles size="sm" />} suffixIcon={<CDIcons.ArrowRight size="sm" />}>
      Generate
    </CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CDButton variant="primary" prefixIcon={<CDIcons.Download size="sm" />}>Download</CDButton>
              <CDButton variant="secondary" suffixIcon={<CDIcons.ArrowRight size="sm" />}>Next</CDButton>
              <CDButton variant="glass" prefixIcon={<CDIcons.Sparkles size="sm" />} suffixIcon={<CDIcons.ArrowRight size="sm" />}>
                Generate
              </CDButton>
            </div>
          </DemoCard>

          {/* Demo 7: Loading & Disabled States */}
          <DemoCard
            title="Loading & Disabled States"
            description="Set isLoading to show a spinning indicator without layout shift. Set disabled to prevent user interaction."
            code={`import { CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <CDButton variant="primary" isLoading={loading} onClick={() => setLoading(!loading)}>
      Click to Load
    </CDButton>
    <CDButton variant="tertiary" isLoading>Loading...</CDButton>
    <CDButton variant="primary" disabled>Disabled Primary</CDButton>
    <CDButton variant="tertiary" disabled>Disabled Tertiary</CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CDButton variant="primary" isLoading={loading} onClick={() => setLoading(!loading)}>
                Click to Load
              </CDButton>
              <CDButton variant="tertiary" isLoading>Loading...</CDButton>
              <CDButton variant="primary" disabled>Disabled</CDButton>
              <CDButton variant="tertiary" disabled>Disabled</CDButton>
            </div>
          </DemoCard>

          {/* Demo 8: Button Sizes */}
          <DemoCard
            title="Button Sizes"
            description="Cinder UI supports 5 standard sizes: xs (26px), sm (32px), md (40px, default), lg (48px), and xl (54px)."
            code={`import { CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
    <CDButton size="xs" variant="primary">XS (26px)</CDButton>
    <CDButton size="sm" variant="primary">SM (32px)</CDButton>
    <CDButton size="md" variant="primary">MD (40px)</CDButton>
    <CDButton size="lg" variant="primary">LG (48px)</CDButton>
    <CDButton size="xl" variant="primary">XL (54px)</CDButton>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <CDButton size="xs" variant="primary">XS</CDButton>
              <CDButton size="sm" variant="primary">SM</CDButton>
              <CDButton size="md" variant="primary">MD</CDButton>
              <CDButton size="lg" variant="primary">LG</CDButton>
              <CDButton size="xl" variant="primary">XL</CDButton>
            </div>
          </DemoCard>

          {/* Demo 9: Dropdown & Split Button */}
          <DemoCard
            title="Dropdown & Split Button"
            description="Standard dropdown button and split-action button with menu items, keyboard escape, and divider lines."
            code={`import { ButtonDropdown, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
    <ButtonDropdown label="Export Options" variant="primary" items={items} />
    <ButtonDropdown split label="Deploy Release" variant="secondary" items={items} />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <ButtonDropdown label="Export Options" variant="primary" items={dropdownItems} />
              <ButtonDropdown split label="Deploy Release" variant="secondary" items={dropdownItems} />
            </div>
          </DemoCard>

          {/* Demo 10: CopyButton & ButtonGroup */}
          <DemoCard
            title="CopyButton & ButtonGroup"
            description="One-click clipboard copy utility and fused button groups with unified corner radii."
            code={`import { CopyButton, ButtonGroup, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
    <CopyButton value="npm install @cinder-ui/core" label="Copy Command" copiedLabel="Copied!" />
    <ButtonGroup attached>
      <CDButton variant="tertiary" size="sm">Day</CDButton>
      <CDButton variant="primary" size="sm">Week</CDButton>
      <CDButton variant="tertiary" size="sm">Month</CDButton>
    </ButtonGroup>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <CopyButton value="npm install @cinder-ui/core" label="Copy Command" copiedLabel="Copied!" />
                <CopyButton value="npx cinder-ui init" variant="primary" label="Quick Copy" />
              </div>
              <ButtonGroup attached>
                <Button variant="tertiary" size="sm">Day</Button>
                <Button variant="primary" size="sm">Week</Button>
                <Button variant="tertiary" size="sm">Month</Button>
                <Button variant="tertiary" size="sm">Year</Button>
              </ButtonGroup>
            </div>
          </DemoCard>

          {/* Demo 11: Floating Actions (Speed Dial) */}
          <DemoCard
            title="Floating Button & Multi-Actions"
            description="Square small floating action button with expandable speed-dial actions on click."
            code={`import { CDFloatButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ position: 'relative', height: '140px', width: '100%' }}>
    <CDFloatButton
      fixed={false}
      position="bottom-right"
      shape="square"
      size="sm"
      variant="primary"
      icon={<CDIcons.Plus size="sm" />}
      actions={[
        { icon: <CDIcons.Sparkles size="sm" />, label: 'AI Assist' },
        { icon: <CDIcons.Edit size="sm" />, label: 'Edit' },
        { icon: <CDIcons.Share size="sm" />, label: 'Share' },
      ]}
    />
  </div>
);`}
          >
            <div
              style={{
                position: "relative",
                height: "140px",
                width: "100%",
                maxWidth: "340px",
                border: "1px dashed var(--cinder-border)",
                borderRadius: "8px",
                background: "var(--cinder-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "var(--cinder-muted)",
              }}
            >
              <span>Click square small FAB</span>
              <CDFloatButton
                fixed={false}
                position="bottom-right"
                shape="square"
                size="sm"
                variant="primary"
                icon={<CDIcons.Plus size="sm" />}
                actions={[
                  { icon: <CDIcons.Sparkles size="sm" />, label: "AI Assist" },
                  { icon: <CDIcons.Edit size="sm" />, label: "Edit Note" },
                  { icon: <CDIcons.Share size="sm" />, label: "Share" },
                ]}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="CDButtonProps API" data={buttonProps} />
      </section>
    </div>
  );
}
