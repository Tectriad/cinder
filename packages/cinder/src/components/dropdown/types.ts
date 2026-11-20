import type { ReactNode } from "react";
import type { CDDropdownMenuItem } from "../dropdown-menu/types";

export type CDDropdownPlacement =
  | "bottomLeft"
  | "bottomRight"
  | "bottomCenter"
  | "topLeft"
  | "topRight"
  | "topCenter";

export type DropdownPlacement = CDDropdownPlacement;

export type CDDropdownTrigger = "click" | "hover" | "contextMenu";
export type DropdownTrigger = CDDropdownTrigger;

export interface CDDropdownMenuConfig {
  items: CDDropdownMenuItem[];
}

export interface CDDropdownProps {
  children: ReactNode;
  menu?: CDDropdownMenuConfig;
  overlay?: ReactNode;
  trigger?: CDDropdownTrigger | CDDropdownTrigger[];
  placement?: CDDropdownPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  closeOnSelect?: boolean;
  className?: string;
  overlayClassName?: string;
}

export type DropdownProps = CDDropdownProps;
