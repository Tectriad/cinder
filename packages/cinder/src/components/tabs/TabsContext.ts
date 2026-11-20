import { createContext, useContext } from "react";
import type { CDTabsContextValue } from "./types";

export const TabsContext = createContext<CDTabsContextValue | null>(null);

export function useTabsContext(): CDTabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be rendered within a CDTabs parent.");
  }
  return context;
}
