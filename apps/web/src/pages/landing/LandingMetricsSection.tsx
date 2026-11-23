import type { ReactElement } from "react";
import { Card, CardTitle, CardDescription, Badge } from "@tec-triad/cinder-ui";
import { Zap, ShieldCheck, Cpu, Code2 } from "lucide-react";
import type { MetricCardItem } from "./types";

const METRICS: readonly MetricCardItem[] = [
  {
    title: "Zero Runtime CSS Bloat",
    value: "< 12KB",
    description: "Pure CSS custom properties and atomic classes. Zero CSS-in-JS parsing overhead.",
    icon: <Zap size={20} color="var(--cinder-primary)" aria-hidden="true" />,
  },
  {
    title: "Strict Polymorphic Types",
    value: "100%",
    description: "Full polymorphic `as` support, explicit parameter types, and zero implicit any.",
    icon: <Code2 size={20} color="var(--cinder-primary)" aria-hidden="true" />,
  },
  {
    title: "WCAG 2.2 AA Accessible",
    value: "AA Grade",
    description: "Portal-elevated dropdowns, 44px coarse hit targets, and full keyboard focus trapping.",
    icon: <ShieldCheck size={20} color="var(--cinder-primary)" aria-hidden="true" />,
  },
  {
    title: "Dual ESM & CommonJS",
    value: "Universal",
    description: "Tree-shakeable dual package bundling verified across Next.js, Vite, and Remix.",
    icon: <Cpu size={20} color="var(--cinder-primary)" aria-hidden="true" />,
  },
];

export function LandingMetricsSection(): ReactElement {
  return (
    <section className="section metrics-section" aria-labelledby="metrics-heading">
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <Badge variant="primary" size="md">Engineering Rigor</Badge>
          </div>
          <h2 id="metrics-heading" className="section-title">
            Architected for Velocity and Scale
          </h2>
          <p className="section-desc">
            Built without compromises. Every line of code adheres to senior design engineering standards.
          </p>
        </div>

        <div className="metrics-grid">
          {METRICS.map((metric: MetricCardItem) => (
            <Card key={metric.title} variant="surface" interactive className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-box">{metric.icon}</div>
                <span className="metric-value-badge">{metric.value}</span>
              </div>
              <CardTitle className="metric-title">{metric.title}</CardTitle>
              <CardDescription className="metric-desc">
                {metric.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
