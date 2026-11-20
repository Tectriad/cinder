import { createContext, useContext } from "react";
import type { CDStepperContextValue } from "./types";

export const StepperContext = createContext<CDStepperContextValue | null>(null);

export function useStepperContext(): CDStepperContextValue {
  const context = useContext(StepperContext);
  if (!context) {
    return {
      current: 0,
      status: "process",
      orientation: "horizontal",
      variant: "default",
      size: "md",
    };
  }
  return context;
}
