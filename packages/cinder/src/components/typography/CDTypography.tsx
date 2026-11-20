import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { CDHeading } from "./CDHeading";
import { CDText } from "./CDText";
import { CDParagraph } from "./CDParagraph";
import { CDLabel } from "./CDLabel";
import { CDCode } from "./CDCode";
import { CDKbd } from "./CDKbd";
import type { CDTypographyProps } from "./types";

interface CDTypographyComponent
  extends React.ForwardRefExoticComponent<
    CDTypographyProps & React.RefAttributes<HTMLDivElement>
  > {
  Heading: typeof CDHeading;
  Title: typeof CDHeading;
  Text: typeof CDText;
  Paragraph: typeof CDParagraph;
  Label: typeof CDLabel;
  Code: typeof CDCode;
  Kbd: typeof CDKbd;
}

const CDTypographyRoot = forwardRef<HTMLDivElement, CDTypographyProps>(
  (
    {
      children,
      className,
      ...restProps
    }: CDTypographyProps,
    ref
  ): ReactElement => {
    return (
      <div
        ref={ref}
        className={cn("cinder-typography-root", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CDTypographyRoot.displayName = "CDTypography";

export const CDTypography = CDTypographyRoot as CDTypographyComponent;
CDTypography.Heading = CDHeading;
CDTypography.Title = CDHeading;
CDTypography.Text = CDText;
CDTypography.Paragraph = CDParagraph;
CDTypography.Label = CDLabel;
CDTypography.Code = CDCode;
CDTypography.Kbd = CDKbd;

export const Typography = CDTypography;
