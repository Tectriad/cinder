import { useState, type ReactElement } from "react";
import { CDPhoneInput, type CDPhoneValue } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function PhoneInputDocPage(): ReactElement {
  const [phoneData, setPhoneData] = useState<CDPhoneValue | null>(null);

  const apiProps = [
    { property: "value", description: "Phone number string or E.164 formatted value", type: "string", default: "-" },
    { property: "defaultCountry", description: "Default ISO country code (e.g. 'US', 'GB', 'IN')", type: "string", default: "'US'" },
    { property: "label", description: "Field label above input", type: "string", default: "-" },
    { property: "helperText", description: "Helper or validation message", type: "string", default: "-" },
    { property: "error", description: "Display error validation border", type: "boolean", default: "false" },
    { property: "disabled", description: "Disable input interaction", type: "boolean", default: "false" },
    { property: "onChange", description: "Callback fired with parsed country, national, and E.164 data", type: "function", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">PhoneInput</h1>
        <p className="cinder-doc-lead">
          International telephone input featuring searchable country selector, dial codes, automatic national number formatting, and clean vector country indicators.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDPhoneInput &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>User Onboarding &amp; Registration</strong>: Capturing verified international phone numbers for authentication.</li>
          <li><strong>Billing &amp; Shipping Profiles</strong>: International contact forms with country-specific masking patterns.</li>
          <li><strong>SMS Multi-factor Setup</strong>: Formatting phone numbers into standard E.164 representation.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            title="Formatted International Input"
            description="Type a phone number to see real-time mask formatting and parsed E.164 telephone output."
            code={`import { CDPhoneInput } from '@cinder-ui/core';

export default () => (
  <CDPhoneInput
    label="Primary Contact Number"
    defaultCountry="US"
    onChange={(val) => console.log(val.e164)}
  />
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <CDPhoneInput
                label="Primary Contact Number"
                defaultCountry="US"
                onChange={(val) => setPhoneData(val)}
              />

              {phoneData && (
                <div
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--cinder-font-mono)",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: "var(--cinder-bg-surface-elevated)",
                    border: "1px solid var(--cinder-border)",
                  }}
                >
                  <div>E.164: <strong>{phoneData.e164 || "-"}</strong></div>
                  <div>Dial Code: {phoneData.dialCode}</div>
                  <div>Country: {phoneData.country.name} ({phoneData.country.iso})</div>
                </div>
              )}
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable data={apiProps} />
      </section>
    </div>
  );
}
