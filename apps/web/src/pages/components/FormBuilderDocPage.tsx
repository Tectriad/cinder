import { useState, type ReactElement } from "react";
import { CDFormBuilder, FormBuilder } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";
import {
  FORM_PROPS,
  FIELD_CONFIG_PROPS,
  ACTIONS_PROPS,
  HEADER_CONFIG_PROPS,
} from "./formBuilderApiData";
import {
  COMPREHENSIVE_FIELDS,
  ACTION_BUTTONS_CONFIG,
  SURVEY_FIELDS,
  REGEX_VALIDATION_FIELDS,
  CONDITIONAL_FIELDS,
} from "./formBuilderDemoData";

export function FormBuilderDocPage(): ReactElement {
  const [submittedData, setSubmittedData] = useState<string | null>(null);
  const [surveyData, setSurveyData] = useState<string | null>(null);
  const [conditionalData, setConditionalData] = useState<string | null>(null);

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDFormBuilder / FormBuilder</h1>
        <p className="cinder-doc-lead">
          Enterprise declarative form builder supporting multi-column grids, Google & Microsoft Forms straight card layouts, custom regex validations, conditional visibility, and configurable action buttons.
        </p>

        <div className="cinder-doc-import">
          <code>
            import &#123; CDFormBuilder, FormBuilder, type CDFormFieldConfig &#125; from &apos;@cinder-ui/core&apos;;
          </code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>When designing complex forms driven declaratively by JSON schemas or metadata.</li>
          <li>For straight, survey-style forms with Google Forms or Microsoft Forms question cards (via <code>variant=&quot;cards&quot;</code>).</li>
          <li>For forms requiring diverse controls (Text, Decimal, Dropdown, MultiSelect, Radio, DatePicker, FileUpload) in a unified grid.</li>
          <li>When fields require strict custom regex validation rules, presets, and real-time error messaging.</li>
          <li>For multi-action workflows requiring 2 or more buttons (Submit, Save Draft, Reset, Cancel) with custom alignment.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Google & Microsoft Forms Card Style */}
          <DemoCard
            fullWidth
            title="Google & Microsoft Forms Card Style (Straight Layout)"
            description="Render a straight single-column question flow using variant='cards' and header banner configuration with dedicated question cards, question numbers, and active card focus borders."
            code={`import { FormBuilder, type CDFormFieldConfig } from '@cinder-ui/core';

const fields: CDFormFieldConfig[] = [
  {
    name: 'satisfaction',
    label: 'Overall Experience',
    subtitle: 'How satisfied are you with the component primitives?',
    type: 'radio',
    required: true,
    options: [
      { label: 'Very Satisfied', value: 'very_satisfied' },
      { label: 'Satisfied', value: 'satisfied' },
    ],
  },
  {
    name: 'primaryUseCase',
    label: 'Primary Application Domain',
    type: 'select',
    options: [...],
  },
  {
    name: 'priorityFeatures',
    label: 'Requested Primitives',
    type: 'multiselect',
    options: [...],
  },
];

export default () => (
  <FormBuilder
    variant="cards"
    centered
    header={{
      title: 'Product Feedback & Feature Survey',
      description: 'Share your feedback to help shape upcoming Cinder UI releases.',
      badge: 'Survey',
      requiredNotice: '* Indicates required question',
    }}
    fields={fields}
    actions={{
      align: 'between',
      submitText: 'Submit Feedback',
      showReset: true,
      resetText: 'Clear Form',
    }}
    onSubmit={(values) => console.log(values)}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <FormBuilder
                variant="cards"
                centered
                header={{
                  title: "Product Feedback & Feature Survey",
                  description: "Share your feedback to help shape upcoming Cinder UI releases. Responses are processed in real-time.",
                  badge: "Survey",
                  requiredNotice: "* Indicates required question",
                }}
                fields={SURVEY_FIELDS}
                actions={{
                  align: "between",
                  showSubmit: true,
                  submitText: "Submit Feedback",
                  showReset: true,
                  resetText: "Clear Form",
                }}
                onSubmit={(values) => {
                  setSurveyData(JSON.stringify(values, null, 2));
                }}
              />

              {surveyData && (
                <div style={{ marginTop: "16px", padding: "12px", borderRadius: "8px", background: "var(--cinder-canvas)", border: "1px solid var(--cinder-border)", maxWidth: "720px", margin: "16px auto 0 auto" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--cinder-text)", marginBottom: "6px" }}>
                    Submitted Survey Data:
                  </div>
                  <pre style={{ margin: 0, fontSize: "11px", fontFamily: "var(--cinder-font-mono)", color: "var(--cinder-primary)" }}>
                    {surveyData}
                  </pre>
                </div>
              )}
            </div>
          </DemoCard>

          {/* Demo 2: Comprehensive Multi-Field Grid Form */}
          <DemoCard
            fullWidth
            title="Comprehensive Multi-Field Grid Form"
            description="Complete enterprise deployment form demonstrating Text, Decimal, Select, MultiSelect, Radio, DatePicker, Switch, Slider, and FileUpload controls."
            code={`import { FormBuilder } from '@cinder-ui/core';

export default () => (
  <FormBuilder
    fields={fields}
    actions={{
      align: 'between',
      showSubmit: true,
      submitText: 'Deploy Cluster',
      showReset: true,
      showCancel: true,
      extraButtons: [{ key: 'draft', label: 'Save Draft' }],
    }}
    onSubmit={(values) => console.log(values)}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <FormBuilder
                fields={COMPREHENSIVE_FIELDS}
                actions={ACTION_BUTTONS_CONFIG}
                onSubmit={(values) => {
                  setSubmittedData(JSON.stringify(values, null, 2));
                }}
              />

              {submittedData && (
                <div style={{ marginTop: "16px", padding: "12px", borderRadius: "6px", background: "var(--cinder-canvas)", border: "1px solid var(--cinder-border)" }}>
                  <pre style={{ margin: 0, fontSize: "11px", fontFamily: "var(--cinder-font-mono)", color: "var(--cinder-text)" }}>
                    {submittedData}
                  </pre>
                </div>
              )}
            </div>
          </DemoCard>

          {/* Demo 3: Regex Validation */}
          <DemoCard
            fullWidth
            title="Custom Regex Injection & Validation Presets"
            description="Inject custom regex patterns (e.g. IPv4 CIDR blocks) or choose standard presets (email, strong-password, number limits)."
            code={`import { CDFormBuilder } from '@cinder-ui/core';

const fields = [
  {
    name: 'cidrBlock',
    label: 'IPv4 CIDR',
    validation: { pattern: /^([0-9]{1,3}\\.){3}[0-9]{1,3}\\/([0-9]|[1-2][0-9]|3[0-2])$/ },
  },
  {
    name: 'adminEmail',
    label: 'Email',
    validation: { preset: 'email' },
  },
];

export default () => <CDFormBuilder fields={fields} />;`}
          >
            <div style={{ width: "100%" }}>
              <CDFormBuilder
                fields={REGEX_VALIDATION_FIELDS}
                actions={{
                  align: "right",
                  showSubmit: true,
                  submitText: "Validate Network Rules",
                  showReset: true,
                }}
                onSubmit={() => {
                  alert("Network configuration passed validation!");
                }}
              />
            </div>
          </DemoCard>

          {/* Demo 4: Conditional Visibility */}
          <DemoCard
            fullWidth
            title="Dynamic Conditional Field Visibility"
            description="Toggle the switch below to reveal dependent fields dynamically based on live form state."
            code={`import { FormBuilder } from '@cinder-ui/core';

const fields = [
  { name: 'useCustomDns', label: 'DNS Option', type: 'switch' },
  {
    name: 'primaryDnsServer',
    label: 'Nameserver IP',
    type: 'text',
    visible: (values) => Boolean(values.useCustomDns),
  },
];

export default () => <FormBuilder fields={fields} />;`}
          >
            <div style={{ width: "100%" }}>
              <FormBuilder
                fields={CONDITIONAL_FIELDS}
                actions={{
                  align: "left",
                  showSubmit: true,
                  submitText: "Save DNS Settings",
                }}
                onSubmit={(values) => {
                  setConditionalData(JSON.stringify(values, null, 2));
                }}
              />

              {conditionalData && (
                <div style={{ marginTop: "16px", padding: "12px", borderRadius: "6px", background: "var(--cinder-canvas)", border: "1px solid var(--cinder-border)" }}>
                  <pre style={{ margin: 0, fontSize: "11px", fontFamily: "var(--cinder-font-mono)", color: "var(--cinder-text)" }}>
                    {conditionalData}
                  </pre>
                </div>
              )}
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Specification */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable title="CDFormBuilder / FormBuilder Props" data={FORM_PROPS} />
        <ApiTable title="CDFormFieldConfig Properties" data={FIELD_CONFIG_PROPS} />
        <ApiTable title="CDFormHeaderConfig Properties (Cards & Survey Mode)" data={HEADER_CONFIG_PROPS} />
        <ApiTable title="CDFormActionsConfig Options" data={ACTIONS_PROPS} />
      </section>
    </div>
  );
}

export default FormBuilderDocPage;
