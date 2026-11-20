import { forwardRef, type ReactElement } from "react";
import { CDIcon } from "../CDIcon";
import type { CDIconProps } from "../types";

export const CDSearchIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </CDIcon>
  ),
);
CDSearchIcon.displayName = "CDSearchIcon";
export const SearchIcon = CDSearchIcon;

export const CDCopyIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </CDIcon>
  ),
);
CDCopyIcon.displayName = "CDCopyIcon";
export const CopyIcon = CDCopyIcon;

export const CDCheckIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </CDIcon>
  ),
);
CDCheckIcon.displayName = "CDCheckIcon";
export const CheckIcon = CDCheckIcon;

export const CDPlusIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </CDIcon>
  ),
);
CDPlusIcon.displayName = "CDPlusIcon";
export const PlusIcon = CDPlusIcon;

export const CDMinusIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </CDIcon>
  ),
);
CDMinusIcon.displayName = "CDMinusIcon";
export const MinusIcon = CDMinusIcon;

export const CDTrashIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </CDIcon>
  ),
);
CDTrashIcon.displayName = "CDTrashIcon";
export const TrashIcon = CDTrashIcon;

export const CDDownloadIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3" />
    </CDIcon>
  ),
);
CDDownloadIcon.displayName = "CDDownloadIcon";
export const DownloadIcon = CDDownloadIcon;

export const CDUploadIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12" />
    </CDIcon>
  ),
);
CDUploadIcon.displayName = "CDUploadIcon";
export const UploadIcon = CDUploadIcon;

export const CDShareIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </CDIcon>
  ),
);
CDShareIcon.displayName = "CDShareIcon";
export const ShareIcon = CDShareIcon;

export const CDRefreshIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </CDIcon>
  ),
);
CDRefreshIcon.displayName = "CDRefreshIcon";
export const RefreshIcon = CDRefreshIcon;

export const CDFilterIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </CDIcon>
  ),
);
CDFilterIcon.displayName = "CDFilterIcon";
export const FilterIcon = CDFilterIcon;

export const CDSlidersIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </CDIcon>
  ),
);
CDSlidersIcon.displayName = "CDSlidersIcon";
export const SlidersIcon = CDSlidersIcon;

export const CDMaximizeIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </CDIcon>
  ),
);
CDMaximizeIcon.displayName = "CDMaximizeIcon";
export const MaximizeIcon = CDMaximizeIcon;

export const CDEditIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </CDIcon>
  ),
);
CDEditIcon.displayName = "CDEditIcon";
export const EditIcon = CDEditIcon;
