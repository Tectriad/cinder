import { forwardRef, type ReactElement } from "react";
import { CDIcon } from "../CDIcon";
import type { CDIconProps } from "../types";

export const CDSparklesIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M12 3c0 4.97-4.03 9-9 9 4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z" />
      <path d="M19 3v4m-2-2h4" />
    </CDIcon>
  ),
);
CDSparklesIcon.displayName = "CDSparklesIcon";
export const SparklesIcon = CDSparklesIcon;

export const CDSunIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14-1.41 1.41" />
    </CDIcon>
  ),
);
CDSunIcon.displayName = "CDSunIcon";
export const SunIcon = CDSunIcon;

export const CDMoonIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </CDIcon>
  ),
);
CDMoonIcon.displayName = "CDMoonIcon";
export const MoonIcon = CDMoonIcon;

export const CDFlameIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2-1.5-3-2-4.5-.5 1-1.5 1.5-2 1.5s-1-.5-1.5-1c-.5 1.5-1.5 2.5-1.5 4z" />
      <path d="M12 3c3.5 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2.5-7 6-11z" />
    </CDIcon>
  ),
);
CDFlameIcon.displayName = "CDFlameIcon";
export const FlameIcon = CDFlameIcon;

export const CDBoxIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </CDIcon>
  ),
);
CDBoxIcon.displayName = "CDBoxIcon";
export const BoxIcon = CDBoxIcon;

export const CDLayersIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="m12 2 10 5.5-10 5.5L2 7.5 12 2z" />
      <path d="m2 12.5 10 5.5 10-5.5" />
      <path d="m2 17.5 10 5.5 10-5.5" />
    </CDIcon>
  ),
);
CDLayersIcon.displayName = "CDLayersIcon";
export const LayersIcon = CDLayersIcon;

export const CDSettingsIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </CDIcon>
  ),
);
CDSettingsIcon.displayName = "CDSettingsIcon";
export const SettingsIcon = CDSettingsIcon;

export const CDInfoIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4m0-4h.01" />
    </CDIcon>
  ),
);
CDInfoIcon.displayName = "CDInfoIcon";
export const InfoIcon = CDInfoIcon;

export const CDAlertCircleIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </CDIcon>
  ),
);
CDAlertCircleIcon.displayName = "CDAlertCircleIcon";
export const AlertCircleIcon = CDAlertCircleIcon;

export const CDCheckCircleIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </CDIcon>
  ),
);
CDCheckCircleIcon.displayName = "CDCheckCircleIcon";
export const CheckCircleIcon = CDCheckCircleIcon;

export const CDHelpCircleIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m0 4h.01" />
    </CDIcon>
  ),
);
CDHelpCircleIcon.displayName = "CDHelpCircleIcon";
export const HelpCircleIcon = CDHelpCircleIcon;
