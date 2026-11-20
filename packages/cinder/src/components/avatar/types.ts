import type { ReactNode, CSSProperties, SyntheticEvent } from "react";

export type CDAvatarShape = "circle" | "square";
export type CDAvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type CDAvatarStatus = "online" | "offline" | "busy" | "away";
export type CDAvatarStatusPosition = "bottom-right" | "top-right";

export interface CDAvatarProps {
  /** Avatar shape */
  shape?: CDAvatarShape;
  /** Size preset or pixel number */
  size?: CDAvatarSize;
  /** Image source URL */
  src?: string;
  /** Image srcSet */
  srcSet?: string;
  /** Alt text for image */
  alt?: string;
  /** Icon element fallback */
  icon?: ReactNode;
  /** Status indicator */
  status?: CDAvatarStatus;
  /** Position of the status indicator */
  statusPosition?: CDAvatarStatusPosition;
  /** Error callback when image fails to load */
  onError?: (e: SyntheticEvent<HTMLImageElement>) => boolean | void;
  /** Custom background color */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** Initials or child content */
  children?: ReactNode;
}

export interface CDAvatarGroupProps {
  /** Max avatars to display before +N overflow counter */
  maxCount?: number;
  /** Shape passed to avatars */
  shape?: CDAvatarShape;
  /** Size passed to avatars */
  size?: CDAvatarSize;
  /** Additional class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Child avatar elements */
  children: ReactNode;
}
