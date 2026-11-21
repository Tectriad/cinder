import type { CDCountry } from "./types";

export const COUNTRIES: CDCountry[] = [
  { iso: "US", name: "United States", dialCode: "+1", format: "(###) ###-####" },
  { iso: "GB", name: "United Kingdom", dialCode: "+44", format: "#### ######" },
  { iso: "CA", name: "Canada", dialCode: "+1", format: "(###) ###-####" },
  { iso: "AU", name: "Australia", dialCode: "+61", format: "#### ### ###" },
  { iso: "DE", name: "Germany", dialCode: "+49", format: "### ########" },
  { iso: "FR", name: "France", dialCode: "+33", format: "## ## ## ## ##" },
  { iso: "IN", name: "India", dialCode: "+91", format: "##### #####" },
  { iso: "JP", name: "Japan", dialCode: "+81", format: "## #### ####" },
  { iso: "SG", name: "Singapore", dialCode: "+65", format: "#### ####" },
  { iso: "NL", name: "Netherlands", dialCode: "+31", format: "## ########" },
  { iso: "BR", name: "Brazil", dialCode: "+55", format: "(##) #####-####" },
  { iso: "ES", name: "Spain", dialCode: "+34", format: "### ## ## ##" },
  { iso: "IT", name: "Italy", dialCode: "+39", format: "### #######" },
  { iso: "CH", name: "Switzerland", dialCode: "+41", format: "## ### ## ##" },
  { iso: "AE", name: "United Arab Emirates", dialCode: "+971", format: "## ### ####" },
];

export function getCountryByIso(iso: string): CDCountry {
  const match = COUNTRIES.find((c) => c.iso.toUpperCase() === iso.toUpperCase());
  return match || COUNTRIES[0];
}

export function findCountryByDialCode(dialCode: string): CDCountry | undefined {
  return COUNTRIES.find((c) => c.dialCode === dialCode);
}
