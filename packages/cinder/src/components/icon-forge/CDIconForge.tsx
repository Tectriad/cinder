import { forwardRef, type ReactElement } from "react";
import { IconForge as BaseIconForge } from "@iconforge/react";
import type { CDIconForgeProps } from "./types";

export const CDIconForge = forwardRef<SVGSVGElement, CDIconForgeProps>(
  (props: CDIconForgeProps, ref): ReactElement => {
    return <BaseIconForge ref={ref} {...props} />;
  },
);

CDIconForge.displayName = "CDIconForge";

export const IconForge = CDIconForge;
