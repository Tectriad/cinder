import { createContext, useContext } from "react";
import type { CDSidebarContextValue } from "./types";

export const SidebarContext = createContext<CDSidebarContextValue | null>(null);

export function useSidebarContext(): CDSidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    return {
      collapsed: false,
      setCollapsed: () => {},
      collapsible: false,
      placement: "left",
      floating: false,
    };
  }
  return context;
}
