import { useState, type ReactElement } from "react";
import { CDAddressAutocomplete, type CDAddressDetails } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function AddressAutocompleteDocPage(): ReactElement {
  const [selected, setSelected] = useState<CDAddressDetails | null>(null);

  const apiProps = [
    { property: "value", description: "Current raw search or formatted address string", type: "string", default: "-" },
    { property: "fetchSuggestions", description: "Custom async provider function (query: string) => Promise<CDAddressSuggestion[]>", type: "function", default: "Built-in Global Mock" },
    { property: "label", description: "Input label above field", type: "string", default: "'Street Address'" },
    { property: "placeholder", description: "Placeholder prompt in search input", type: "string", default: "-" },
    { property: "showStructuredFields", description: "Expand verified structured sub-fields after selection", type: "boolean", default: "true" },
    { property: "debounceMs", description: "Query debounce wait in milliseconds", type: "number", default: "250" },
    { property: "onSelectAddress", description: "Callback fired when a suggestion is selected with full details", type: "function", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">Address Autocomplete</h1>
        <p className="cinder-doc-lead">
          Intelligent location search with asynchronous debounce querying, recent selections, pin markers, and automatic structured address decomposition (street, city, state, postal code, and country).
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDAddressAutocomplete &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>Checkout &amp; Shipping Flows</strong>: Accelerating address entry while eliminating clerical delivery typos.</li>
          <li><strong>Corporate Office Directories</strong>: Searching and locating regional facilities, data centers, and branches.</li>
          <li><strong>Map &amp; Geocoding Interfaces</strong>: Capturing coordinates along with verified postal addresses.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            fullWidth
            title="Search & Structured Address Decomposition"
            description="Type a street name (e.g. 'California', 'Hacker', '5th Avenue') to select an address and view parsed components."
            code={`import { CDAddressAutocomplete } from '@cinder-ui/core';

export default () => (
  <CDAddressAutocomplete
    label="Delivery Destination"
    showStructuredFields={true}
    onSelectAddress={(addr) => console.log(addr)}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDAddressAutocomplete
                label="Delivery Destination"
                showStructuredFields={true}
                onSelectAddress={(details) => setSelected(details)}
              />
              {selected && (
                <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--cinder-text-muted)" }}>
                  Confirmed Address: <code>{selected.formattedAddress}</code>
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
