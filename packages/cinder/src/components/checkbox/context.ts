import { createContext, useContext } from "react";
import type { CDCheckboxGroupContextValue } from "./types";

export const CDCheckboxGroupContext = createContext<CDCheckboxGroupContextValue | null>(null);

export function useCDCheckboxGroup(): CDCheckboxGroupContextValue | null {
  return useContext(CDCheckboxGroupContext);
}
