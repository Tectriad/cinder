import type { ReactNode } from "react";

export interface ComponentCategory {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly iconName: string;
  readonly badgeText: string;
  readonly components: readonly ComponentMeta[];
}

export interface ComponentMeta {
  readonly name: string;
  readonly href: string;
  readonly description: string;
  readonly status: "stable" | "new" | "updated";
}

export interface IconStyleMeta {
  readonly id: "outline" | "filled" | "duotone" | "rounded";
  readonly label: string;
  readonly description: string;
}

export interface TokenItem {
  readonly name: string;
  readonly darkValue: string;
  readonly lightValue: string;
  readonly role: string;
}

export interface MetricCardItem {
  readonly title: string;
  readonly value: string;
  readonly description: string;
  readonly icon: ReactNode;
}
