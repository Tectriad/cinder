import type { CSSProperties, ReactNode } from "react";

export interface CDMultiSelectOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
  extra?: ReactNode;
}

export interface CDMultiSelectGroup {
  groupName: string;
  options: CDMultiSelectOption[];
}

export interface CDMultiSelectProProps {
  /** Array of selected option values */
  value?: string[];
  /** Default selected values for uncontrolled usage */
  defaultValue?: string[];
  /** Callback fired when selection changes */
  onChange?: (selectedValues: string[], selectedOptions: CDMultiSelectOption[]) => void;
  /** Flat options list or grouped options */
  options?: CDMultiSelectOption[];
  /** Asynchronous options search/fetch loader */
  fetchOptions?: (query: string) => Promise<CDMultiSelectOption[]>;
  /** Input label */
  label?: string;
  /** Placeholder text when no items are selected */
  placeholder?: string;
  /** Maximum number of tags visible before collapsing into "+N more" badge. Defaults to 3. */
  maxTagCount?: number;
  /** Whether to show "Select All" and "Clear All" header actions. Defaults to true. */
  showSelectAll?: boolean;
  /** Whether search filtering is enabled. Defaults to true. */
  searchable?: boolean;
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
