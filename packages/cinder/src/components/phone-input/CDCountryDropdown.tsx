import {
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type ChangeEvent,
} from "react";
import type { CDCountry } from "./types";
import { COUNTRIES } from "./countryData";

interface CDCountryDropdownProps {
  selectedCountry: CDCountry;
  onSelect: (country: CDCountry) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CDCountryDropdown({
  selectedCountry,
  onSelect,
  isOpen,
  onClose,
}: CDCountryDropdownProps): ReactElement | null {
  const [search, setSearch] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = COUNTRIES.filter((c: CDCountry) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search) ||
    c.iso.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="cinder-phone-dropdown-menu">
      <div className="cinder-phone-search-box">
        <input
          type="text"
          className="cinder-phone-search-input"
          placeholder="Search country or code..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          autoFocus
        />
      </div>

      <div className="cinder-phone-countries-list">
        {filtered.map((country: CDCountry) => {
          const isSelected: boolean = country.iso === selectedCountry.iso;
          return (
            <button
              key={country.iso}
              type="button"
              className={`cinder-phone-country-item ${isSelected ? "selected" : ""}`}
              onClick={() => {
                onSelect(country);
                onClose();
              }}
            >
              <span className="cinder-phone-iso-badge">{country.iso}</span>
              <span className="cinder-phone-country-name">{country.name}</span>
              <span className="cinder-phone-dial-code">{country.dialCode}</span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="cinder-phone-empty">No countries match query</div>
        )}
      </div>
    </div>
  );
}
