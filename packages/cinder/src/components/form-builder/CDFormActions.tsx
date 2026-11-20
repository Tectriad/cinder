import type { ReactElement } from "react";
import { cn } from "../../utils/cn";
import { CDButton } from "../button";
import type {
  CDFormActionsConfig,
  CDFormContextValue,
} from "./types";

interface CDFormActionsProps {
  actions?: CDFormActionsConfig;
  formContext: CDFormContextValue;
  disabled?: boolean;
}

export function CDFormActions({
  actions = {},
  formContext,
  disabled = false,
}: CDFormActionsProps): ReactElement | null {
  const {
    enabled = true,
    align = "left",
    submitText = "Submit",
    resetText = "Reset",
    cancelText = "Cancel",
    showSubmit = true,
    showReset = false,
    showCancel = false,
    onCancel,
    onReset,
    extraButtons = [],
  } = actions;

  if (!enabled) {
    return null;
  }

  const { isSubmitting, resetForm } = formContext;

  const handleReset = (): void => {
    resetForm();
    if (onReset) {
      onReset();
    }
  };

  return (
    <div
      className={cn(
        "cinder-form-actions",
        `cinder-form-actions-${align}`
      )}
    >
      {showSubmit && (
        <CDButton
          htmlType="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={disabled || isSubmitting}
        >
          {submitText}
        </CDButton>
      )}

      {showReset && (
        <CDButton
          type="button"
          variant="secondary"
          disabled={disabled || isSubmitting}
          onClick={handleReset}
        >
          {resetText}
        </CDButton>
      )}

      {showCancel && (
        <CDButton
          type="button"
          variant="ghost"
          disabled={disabled || isSubmitting}
          onClick={onCancel}
        >
          {cancelText}
        </CDButton>
      )}

      {extraButtons.map((btn) => (
        <CDButton
          key={btn.key}
          type={btn.htmlType || "button"}
          variant={btn.variant || "secondary"}
          isLoading={Boolean(btn.loading)}
          disabled={disabled || btn.disabled || isSubmitting}
          prefixIcon={btn.icon}
          onClick={() => {
            if (btn.onClick) {
              btn.onClick(formContext);
            }
          }}
        >
          {btn.label}
        </CDButton>
      ))}
    </div>
  );
}
