import { forwardRef, type ReactElement } from "react";
import { CDIcon } from "../CDIcon";
import type { CDIconProps } from "../types";

export const CDArrowRightIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </CDIcon>
  ),
);
CDArrowRightIcon.displayName = "CDArrowRightIcon";
export const ArrowRightIcon = CDArrowRightIcon;

export const CDArrowLeftIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M19 12H5m6 6-6-6 6-6" />
    </CDIcon>
  ),
);
CDArrowLeftIcon.displayName = "CDArrowLeftIcon";
export const ArrowLeftIcon = CDArrowLeftIcon;

export const CDArrowUpIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M12 19V5m-6 6 6-6 6 6" />
    </CDIcon>
  ),
);
CDArrowUpIcon.displayName = "CDArrowUpIcon";
export const ArrowUpIcon = CDArrowUpIcon;

export const CDArrowDownIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M12 5v14m6-6-6 6-6-6" />
    </CDIcon>
  ),
);
CDArrowDownIcon.displayName = "CDArrowDownIcon";
export const ArrowDownIcon = CDArrowDownIcon;

export const CDChevronDownIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="m6 9 6 6 6-6" />
    </CDIcon>
  ),
);
CDChevronDownIcon.displayName = "CDChevronDownIcon";
export const ChevronDownIcon = CDChevronDownIcon;

export const CDChevronRightIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="m9 18 6-6-6-6" />
    </CDIcon>
  ),
);
CDChevronRightIcon.displayName = "CDChevronRightIcon";
export const ChevronRightIcon = CDChevronRightIcon;

export const CDChevronUpIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="m18 15-6-6-6 6" />
    </CDIcon>
  ),
);
CDChevronUpIcon.displayName = "CDChevronUpIcon";
export const ChevronUpIcon = CDChevronUpIcon;

export const CDChevronLeftIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="m15 18-6-6 6-6" />
    </CDIcon>
  ),
);
CDChevronLeftIcon.displayName = "CDChevronLeftIcon";
export const ChevronLeftIcon = CDChevronLeftIcon;

export const CDMenuIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </CDIcon>
  ),
);
CDMenuIcon.displayName = "CDMenuIcon";
export const MenuIcon = CDMenuIcon;

export const CDCloseIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </CDIcon>
  ),
);
CDCloseIcon.displayName = "CDCloseIcon";
export const CloseIcon = CDCloseIcon;

export const CDExternalLinkIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
    </CDIcon>
  ),
);
CDExternalLinkIcon.displayName = "CDExternalLinkIcon";
export const ExternalLinkIcon = CDExternalLinkIcon;
