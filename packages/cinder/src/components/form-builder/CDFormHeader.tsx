import type { ReactElement } from "react";
import { cn } from "../../utils/cn";
import { CDBadge } from "../badge";
import type { CDFormHeaderConfig } from "./types";

export interface CDFormHeaderProps {
  header: CDFormHeaderConfig;
  className?: string;
}

export function CDFormHeader({ header, className }: CDFormHeaderProps): ReactElement {
  const {
    title,
    description,
    badge,
    requiredNotice = "* Indicates required question",
    accentColor,
  } = header;

  return (
    <div className={cn("cinder-form-header-card", className)}>
      <div
        className="cinder-form-header-bar"
        style={accentColor ? { backgroundColor: accentColor } : undefined}
      />
      <div className="cinder-form-header-content">
        <div className="cinder-form-header-title-row">
          {title && <h2 className="cinder-form-header-title">{title}</h2>}
          {badge && (
            <CDBadge variant="primary" size="sm">
              {badge}
            </CDBadge>
          )}
        </div>
        {description && (
          <p className="cinder-form-header-desc">{description}</p>
        )}
        {requiredNotice && (
          <div className="cinder-form-header-required-notice" role="note">
            {requiredNotice}
          </div>
        )}
      </div>
    </div>
  );
}
