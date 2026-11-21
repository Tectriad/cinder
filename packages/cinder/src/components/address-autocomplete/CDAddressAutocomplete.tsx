import {
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDAddressAutocompleteProps,
  CDAddressDetails,
  CDAddressSuggestion,
} from "./types";
import { defaultMockAddressProvider } from "./mockAddresses";

export function CDAddressAutocomplete({
  value,
  defaultValue = "",
  onSelectAddress,
  onChange,
  fetchSuggestions = defaultMockAddressProvider,
  label = "Street Address",
  placeholder = "Start typing an address, street, or city...",
  showStructuredFields = true,
  debounceMs = 250,
  disabled = false,
  readOnly = false,
  extra,
  className,
  style,
}: CDAddressAutocompleteProps): ReactElement {
  const [query, setQuery] = useState<string>(value !== undefined ? value : defaultValue);
  const [suggestions, setSuggestions] = useState<CDAddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDetails, setSelectedDetails] = useState<CDAddressDetails | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value !== undefined) setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const triggerSearch = (searchQuery: string): void => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchSuggestions(searchQuery);
        setSuggestions(results);
        setIsOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val: string = e.target.value;
    setQuery(val);
    if (onChange) onChange(val);
    triggerSearch(val);
  };

  const handleSelect = (item: CDAddressSuggestion): void => {
    setQuery(item.details.formattedAddress);
    setSelectedDetails(item.details);
    setIsOpen(false);
    if (onSelectAddress) onSelectAddress(item.details);
    if (onChange) onChange(item.details.formattedAddress);
  };

  const handleClear = (): void => {
    setQuery("");
    setSelectedDetails(null);
    setSuggestions([]);
    if (onChange) onChange("");
  };

  return (
    <div
      ref={containerRef}
      className={cn("cinder-address-wrapper", className)}
      style={style}
    >
      <div className="cinder-address-label-row">
        {label && <label className="cinder-address-label">{label}</label>}
        {extra}
      </div>

      <div
        className={cn(
          "cinder-address-input-box",
          isOpen && "open",
          disabled && "disabled"
        )}
      >
        <div className="cinder-address-search-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        <input
          type="text"
          className="cinder-address-input"
          value={query}
          onChange={handleInputChange}
          onFocus={() => triggerSearch(query)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
        />

        {isLoading && (
          <div className="cinder-address-spinner" aria-label="Searching...">
            <div className="cinder-address-spinner-circle" />
          </div>
        )}

        {query && !disabled && !readOnly && !isLoading && (
          <button
            type="button"
            className="cinder-address-clear-btn"
            onClick={handleClear}
            aria-label="Clear address"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {isOpen && suggestions.length > 0 && (
          <div className="cinder-address-dropdown-menu">
            {suggestions.map((item: CDAddressSuggestion) => (
              <div
                key={item.id}
                className="cinder-address-suggestion-item"
                onClick={() => handleSelect(item)}
              >
                <div className="cinder-address-pin">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="cinder-address-texts">
                  <span className="cinder-address-main-text">{item.mainText}</span>
                  <span className="cinder-address-secondary-text">{item.secondaryText}</span>
                </div>
                {item.isRecent && (
                  <span className="cinder-address-recent-badge">Recent</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional Structured Fields Decomposition View */}
      {showStructuredFields && selectedDetails && (
        <div className="cinder-address-structured-panel">
          <div className="cinder-address-structured-header">
            <span>Verified Address Components</span>
          </div>
          <div className="cinder-address-fields-grid">
            <div className="cinder-address-field-cell">
              <span className="cell-label">Street</span>
              <span className="cell-value">
                {selectedDetails.streetNumber} {selectedDetails.streetName || "-"}
              </span>
            </div>
            <div className="cinder-address-field-cell">
              <span className="cell-label">City</span>
              <span className="cell-value">{selectedDetails.city || "-"}</span>
            </div>
            <div className="cinder-address-field-cell">
              <span className="cell-label">State / Region</span>
              <span className="cell-value">{selectedDetails.state || "-"}</span>
            </div>
            <div className="cinder-address-field-cell">
              <span className="cell-label">Postal Code</span>
              <span className="cell-value">{selectedDetails.postalCode || "-"}</span>
            </div>
            <div className="cinder-address-field-cell full-width">
              <span className="cell-label">Country</span>
              <span className="cell-value">{selectedDetails.country || "-"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const AddressAutocomplete = CDAddressAutocomplete;
