import type { CDCountry } from "./types";

export function formatWithMask(rawDigits: string, mask: string): string {
  let digitIndex = 0;
  let formatted = "";

  for (let i = 0; i < mask.length; i++) {
    const char = mask[i];
    if (char === "#") {
      if (digitIndex < rawDigits.length) {
        formatted += rawDigits[digitIndex];
        digitIndex++;
      } else {
        break;
      }
    } else {
      if (digitIndex < rawDigits.length) {
        formatted += char;
      }
    }
  }

  // If there are leftover digits beyond the mask, append them cleanly
  if (digitIndex < rawDigits.length) {
    formatted += " " + rawDigits.substring(digitIndex);
  }

  return formatted;
}

export function stripNonDigits(str: string): string {
  return str.replace(/\D/g, "");
}

export function parsePhoneNumber(
  input: string,
  country: CDCountry
): { nationalNumber: string; formatted: string; e164: string } {
  let cleaned = input.trim();
  if (cleaned.startsWith(country.dialCode)) {
    cleaned = cleaned.substring(country.dialCode.length);
  }

  const rawDigits = stripNonDigits(cleaned);
  const formatted = formatWithMask(rawDigits, country.format);
  const e164 = `${country.dialCode}${rawDigits}`;

  return { nationalNumber: rawDigits, formatted, e164 };
}
