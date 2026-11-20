import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * Standard sizes supported across Cinder component system.
 */
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Semantic intent variants.
 */
export type ComponentIntent = "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info";

/**
 * Visual variant styles.
 */
export type ComponentVariant = "solid" | "subtle" | "outline" | "ghost" | "link";

/**
 * Polymorphic component helper types for rendering any HTML tag or custom component.
 */
export type AsProp<C extends ElementType> = {
  as?: C;
};

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>["ref"];

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = Props &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof (AsProp<C> & Props)>;

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentPropWithRef<C, Props>;

/**
 * Base props common to all Cinder components.
 */
export interface CinderBaseProps {
  className?: string;
  children?: ReactNode;
}
