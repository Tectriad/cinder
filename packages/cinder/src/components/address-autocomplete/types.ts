import type { CSSProperties, ReactNode } from "react";

export interface CDAddressDetails {
  formattedAddress: string;
  streetNumber?: string;
  streetName?: string;
  unit?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface CDAddressSuggestion {
  id: string;
  mainText: string;     // e.g. "1 Market Street"
  secondaryText: string; // e.g. "San Francisco, CA 94105, USA"
  details: CDAddressDetails;
  isRecent?: boolean;
}

export interface CDAddressAutocompleteProps {
  /** Selected or current address string */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when an address suggestion is selected */
  onSelectAddress?: (details: CDAddressDetails) => void;
  /** Callback fired when raw query input changes */
  onChange?: (query: string) => void;
  /** Custom async suggestion provider */
  fetchSuggestions?: (query: string) => Promise<CDAddressSuggestion[]>;
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to show expandable structured fields after selection */
  showStructuredFields?: boolean;
  /** Debounce delay in milliseconds. Defaults to 250. */
  debounceMs?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Extra elements in header */
  extra?: ReactNode;
}
