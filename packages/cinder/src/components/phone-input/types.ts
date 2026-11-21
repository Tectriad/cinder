import type { CSSProperties, ReactNode } from "react";

export interface CDCountry {
  iso: string;        // e.g. "US", "GB", "IN"
  name: string;       // e.g. "United States"
  dialCode: string;   // e.g. "+1", "+44", "+91"
  format: string;     // e.g. "(###) ###-####"
}

export interface CDPhoneValue {
  country: CDCountry;
  dialCode: string;
  nationalNumber: string;
  formattedNumber: string;
  e164: string; // e.g. "+15551234567"
}

export interface CDPhoneInputProps {
  /** Value string (E.164 e.g. "+15551234567" or formatted) */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Default selected country ISO code. Defaults to "US". */
  defaultCountry?: string;
  /** Callback fired when phone number changes */
  onChange?: (value: CDPhoneValue) => void;
  /** Input label */
  label?: string;
  /** Helper description or validation error */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Preferred country codes listed at top of dropdown */
  preferredCountries?: string[];
  /** Extra elements rendered after input */
  extra?: ReactNode;
  /** Custom CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}
