import { forwardRef, type ReactElement } from "react";
import { CDIcon } from "../CDIcon";
import type { CDIconProps } from "../types";

export const CDCodeIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </CDIcon>
  ),
);
CDCodeIcon.displayName = "CDCodeIcon";
export const CodeIcon = CDCodeIcon;

export const CDTerminalIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </CDIcon>
  ),
);
CDTerminalIcon.displayName = "CDTerminalIcon";
export const TerminalIcon = CDTerminalIcon;

export const CDFolderIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </CDIcon>
  ),
);
CDFolderIcon.displayName = "CDFolderIcon";
export const FolderIcon = CDFolderIcon;

export const CDFileIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </CDIcon>
  ),
);
CDFileIcon.displayName = "CDFileIcon";
export const FileIcon = CDFileIcon;

export const CDDatabaseIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </CDIcon>
  ),
);
CDDatabaseIcon.displayName = "CDDatabaseIcon";
export const DatabaseIcon = CDDatabaseIcon;

export const CDCpuIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </CDIcon>
  ),
);
CDCpuIcon.displayName = "CDCpuIcon";
export const CpuIcon = CDCpuIcon;

export const CDShieldIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </CDIcon>
  ),
);
CDShieldIcon.displayName = "CDShieldIcon";
export const ShieldIcon = CDShieldIcon;

export const CDLockIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </CDIcon>
  ),
);
CDLockIcon.displayName = "CDLockIcon";
export const LockIcon = CDLockIcon;

export const CDUnlockIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </CDIcon>
  ),
);
CDUnlockIcon.displayName = "CDUnlockIcon";
export const UnlockIcon = CDUnlockIcon;

export const CDMailIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </CDIcon>
  ),
);
CDMailIcon.displayName = "CDMailIcon";
export const MailIcon = CDMailIcon;

export const CDUserIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </CDIcon>
  ),
);
CDUserIcon.displayName = "CDUserIcon";
export const UserIcon = CDUserIcon;

export const CDHeartIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </CDIcon>
  ),
);
CDHeartIcon.displayName = "CDHeartIcon";
export const HeartIcon = CDHeartIcon;

export const CDStarIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </CDIcon>
  ),
);
CDStarIcon.displayName = "CDStarIcon";
export const StarIcon = CDStarIcon;

export const CDGlobeIcon = forwardRef<SVGSVGElement, CDIconProps>(
  (props, ref): ReactElement => (
    <CDIcon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </CDIcon>
  ),
);
CDGlobeIcon.displayName = "CDGlobeIcon";
export const GlobeIcon = CDGlobeIcon;
