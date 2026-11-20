import { createContext, useContext } from "react";
import type { CDRadioContextValue } from "./types";

export const RadioContext = createContext<CDRadioContextValue | null>(null);

export function useRadioContext(): CDRadioContextValue | null {
  return useContext(RadioContext);
}
