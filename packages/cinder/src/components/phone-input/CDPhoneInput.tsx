import {
  useState,
  useRef,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDPhoneInputProps,
  CDCountry,
} from "./types";
import { getCountryByIso } from "./countryData";
import { parsePhoneNumber } from "./phoneUtils";
import { CDCountryDropdown } from "./CDCountryDropdown";

export function CDPhoneInput({
  value,
  defaultValue = "",
  defaultCountry = "US",
  onChange,
  label,
  helperText,
  error = false,
  disabled = false,
  readOnly = false,
  placeholder,
  extra,
  className,
  style,
}: CDPhoneInputProps): ReactElement {
  const [country, setCountry] = useState<CDCountry>(() => getCountryByIso(defaultCountry));
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [rawInput, setRawInput] = useState<string>(() => {
    const init = value !== undefined ? value : defaultValue;
    return parsePhoneNumber(init, getCountryByIso(defaultCountry)).formatted;
  });

  const handleCountrySelect = (newCountry: CDCountry): void => {
    setCountry(newCountry);
    const parsed = parsePhoneNumber(rawInput, newCountry);
    setRawInput(parsed.formatted);

    if (onChange) {
      onChange({
        country: newCountry,
        dialCode: newCountry.dialCode,
        nationalNumber: parsed.nationalNumber,
        formattedNumber: parsed.formatted,
        e164: parsed.e164,
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputVal: string = e.target.value;
    const parsed = parsePhoneNumber(inputVal, country);
    setRawInput(parsed.formatted);

    if (onChange) {
      onChange({
        country,
        dialCode: country.dialCode,
        nationalNumber: parsed.nationalNumber,
        formattedNumber: parsed.formatted,
        e164: parsed.e164,
      });
    }
  };

  const handleClear = (): void => {
    setRawInput("");
    if (onChange) {
      onChange({
        country,
        dialCode: country.dialCode,
        nationalNumber: "",
        formattedNumber: "",
        e164: country.dialCode,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("cinder-phone-input-wrapper", className)}
      style={style}
    >
      {label && <label className="cinder-phone-label">{label}</label>}

      <div
        className={cn(
          "cinder-phone-field-box",
          error && "error",
          disabled && "disabled",
          dropdownOpen && "focused"
        )}
      >
        <button
          type="button"
          className="cinder-phone-country-trigger"
          onClick={() => !disabled && !readOnly && setDropdownOpen(!dropdownOpen)}
          disabled={disabled || readOnly}
          aria-expanded={dropdownOpen}
          aria-haspopup="listbox"
        >
          <span className="cinder-phone-trigger-iso">{country.iso}</span>
          <span className="cinder-phone-trigger-code">{country.dialCode}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <input
          type="tel"
          className="cinder-phone-input-control"
          value={rawInput}
          onChange={handleInputChange}
          placeholder={placeholder || country.format.replace(/#/g, "0")}
          disabled={disabled}
          readOnly={readOnly}
        />

        {rawInput && !disabled && !readOnly && (
          <button
            type="button"
            className="cinder-phone-clear-btn"
            onClick={handleClear}
            aria-label="Clear input"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {extra}

        <CDCountryDropdown
          selectedCountry={country}
          onSelect={handleCountrySelect}
          isOpen={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        />
      </div>

      {helperText && (
        <p className={cn("cinder-phone-helper", error && "error")}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export const PhoneInput = CDPhoneInput;
