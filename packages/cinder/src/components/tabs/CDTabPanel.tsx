import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { useTabsContext } from "./TabsContext";
import type { CDTabPanelProps } from "./types";

export const CDTabPanel = forwardRef<HTMLDivElement, CDTabPanelProps>(
  (
    {
      value,
      children,
      className,
      ...restProps
    }: CDTabPanelProps,
    ref
  ): ReactElement | null => {
    const { activeKey } = useTabsContext();

    if (activeKey !== value) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`cinder-tabpanel-${value}`}
        aria-labelledby={`cinder-tab-${value}`}
        tabIndex={0}
        className={cn("cinder-tab-panel", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CDTabPanel.displayName = "CDTabPanel";

export const TabPanel = CDTabPanel;
