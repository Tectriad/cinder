import {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  type ReactElement,
  type FormEvent,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import { CDGrid, CDGridItem } from "../layout";
import { FormFieldRenderer } from "./FormFieldRenderer";
import { CDFormActions } from "./CDFormActions";
import { CDFormHeader } from "./CDFormHeader";
import { validateFieldValue } from "./validators";
import type {
  CDFormBuilderProps,
  CDFormFieldConfig,
  CDFormContextValue,
} from "./types";

export interface CDFormBuilderRef {
  getValues: () => Record<string, unknown>;
  getErrors: () => Record<string, string>;
  setFieldValue: (name: string, value: unknown) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  validateForm: () => Promise<boolean>;
}

export const CDFormBuilder = forwardRef<CDFormBuilderRef, CDFormBuilderProps>(
  (
    {
      fields,
      initialValues = {},
      onSubmit,
      onChange,
      validationMode = "onBlur",
      variant = "standard",
      layout = "vertical",
      header,
      showQuestionNumbers = true,
      maxWidth,
      centered = false,
      columns = 12,
      gap = 4,
      actions = { enabled: true },
      disabled = false,
      readOnly = false,
      className,
      style,
      children,
    }: CDFormBuilderProps,
    ref
  ): ReactElement => {
    // 1. Initialize default values
    const [values, setValues] = useState<Record<string, unknown>>(() => {
      const initial: Record<string, unknown> = { ...initialValues };
      fields.forEach((field: CDFormFieldConfig) => {
        if (initial[field.name] === undefined && field.defaultValue !== undefined) {
          initial[field.name] = field.defaultValue;
        }
      });
      return initial;
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [activeField, setActiveField] = useState<string | null>(null);

    // 2. Validate a single field
    const validateField = useCallback(
      async (name: string, overrideVal?: unknown): Promise<string | undefined> => {
        const field = fields.find((f: CDFormFieldConfig) => f.name === name);
        if (!field) return undefined;

        // Skip if conditionally hidden
        if (field.visible && !field.visible(values)) {
          return undefined;
        }

        const currentVal = overrideVal !== undefined ? overrideVal : values[name];
        const errorMsg = await validateFieldValue(currentVal, field, values);

        setErrors((prev: Record<string, string>) => {
          if (!errorMsg) {
            const next = { ...prev };
            delete next[name];
            return next;
          }
          return { ...prev, [name]: errorMsg };
        });

        return errorMsg;
      },
      [fields, values]
    );

    // 3. Validate the entire form
    const validateForm = useCallback(async (): Promise<boolean> => {
      const newErrors: Record<string, string> = {};
      const newTouched: Record<string, boolean> = {};

      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.visible && !field.visible(values)) continue;

        newTouched[field.name] = true;
        const err = await validateFieldValue(values[field.name], field, values);
        if (err) {
          newErrors[field.name] = err;
        }
      }

      setTouched((prev: Record<string, boolean>) => ({ ...prev, ...newTouched }));
      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    }, [fields, values]);

    // 4. Update field value handler
    const setFieldValue = useCallback(
      (name: string, val: unknown): void => {
        if (readOnly) return;

        setValues((prev: Record<string, unknown>) => {
          const next = { ...prev, [name]: val };
          if (onChange) {
            onChange(next, { name, value: val });
          }
          return next;
        });

        if (validationMode === "onChange") {
          validateField(name, val);
        }
      },
      [readOnly, onChange, validationMode, validateField]
    );

    // 5. Update field touched handler
    const setFieldTouched = useCallback(
      (name: string, isTouched: boolean = true): void => {
        setTouched((prev: Record<string, boolean>) => ({ ...prev, [name]: isTouched }));
        if (validationMode === "onBlur" && isTouched) {
          validateField(name);
        }
      },
      [validationMode, validateField]
    );

    // 6. Set manual field error
    const setFieldError = useCallback((name: string, errorMsg: string): void => {
      setErrors((prev: Record<string, string>) => ({ ...prev, [name]: errorMsg }));
    }, []);

    // 7. Reset form handler
    const resetForm = useCallback((): void => {
      const resetVals: Record<string, unknown> = { ...initialValues };
      fields.forEach((field: CDFormFieldConfig) => {
        if (resetVals[field.name] === undefined && field.defaultValue !== undefined) {
          resetVals[field.name] = field.defaultValue;
        }
      });
      setValues(resetVals);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
    }, [fields, initialValues]);

    // 8. Submit form handler
    const submitForm = useCallback(async (): Promise<void> => {
      if (disabled || readOnly || isSubmitting) return;

      setIsSubmitting(true);
      try {
        const isValid = await validateForm();
        if (isValid && onSubmit) {
          await onSubmit(values, formContext);
        }
      } finally {
        setIsSubmitting(false);
      }
    }, [disabled, readOnly, isSubmitting, validateForm, onSubmit, values]);

    // Context value bundle
    const formContext: CDFormContextValue = {
      values,
      errors,
      touched,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      submitForm,
      resetForm,
      validateField,
      validateForm,
    };

    // Expose ref API
    useImperativeHandle(
      ref,
      () => ({
        getValues: () => values,
        getErrors: () => errors,
        setFieldValue,
        resetForm,
        submitForm,
        validateForm,
      }),
      [values, errors, setFieldValue, resetForm, submitForm, validateForm]
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      submitForm();
    };

    const isCardMode = variant === "cards" || variant === "survey";
    const isStraight = layout === "straight" || isCardMode;

    const containerStyle: CSSProperties = {
      ...style,
      ...(maxWidth !== undefined
        ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }
        : isCardMode
        ? { maxWidth: "720px" }
        : {}),
      ...(centered || isCardMode
        ? { margin: "0 auto", width: "100%" }
        : {}),
    };

    return (
      <form
        onSubmit={handleSubmit}
        noValidate
        className={cn(
          "cinder-form-builder",
          `cinder-form-variant-${variant}`,
          isStraight && "cinder-form-layout-straight",
          (centered || isCardMode) && "cinder-form-builder-centered",
          className
        )}
        style={containerStyle}
      >
        {header && <CDFormHeader header={header} />}

        {isCardMode ? (
          <div className="cinder-form-cards-stack">
            {fields.map((field: CDFormFieldConfig, idx: number) => {
              if (field.visible && !field.visible(values)) return null;
              const isCardActive = activeField === field.name;
              const isRequired = Boolean(field.required || field.validation?.required);
              return (
                <div
                  key={field.name}
                  className={cn(
                    "cinder-form-question-card",
                    isCardActive && "cinder-form-question-card-active",
                    field.className
                  )}
                  style={field.style}
                  onFocusCapture={() => setActiveField(field.name)}
                >
                  <div className="cinder-form-question-header">
                    {showQuestionNumbers && (
                      <span className="cinder-form-question-number">
                        {field.questionNumber !== undefined ? field.questionNumber : `${idx + 1}.`}
                      </span>
                    )}
                    <span className="cinder-form-question-title">
                      {field.label}
                      {isRequired && (
                        <span className="cinder-form-required-asterisk"> *</span>
                      )}
                    </span>
                  </div>
                  {field.subtitle && (
                    <div className="cinder-form-question-subtitle">{field.subtitle}</div>
                  )}
                  <FormFieldRenderer
                    field={field}
                    formContext={formContext}
                    layout="vertical"
                    hideLabel={true}
                    disabled={disabled || readOnly}
                  />
                </div>
              );
            })}
          </div>
        ) : layout === "straight" ? (
          <div className="cinder-form-straight-stack">
            {fields.map((field: CDFormFieldConfig) => {
              if (field.visible && !field.visible(values)) return null;
              return (
                <FormFieldRenderer
                  key={field.name}
                  field={field}
                  formContext={formContext}
                  layout="vertical"
                  disabled={disabled || readOnly}
                />
              );
            })}
          </div>
        ) : (
          <CDGrid columns={columns} gap={gap}>
            {fields.map((field: CDFormFieldConfig) => {
              const span = field.colSpan || 12;
              return (
                <CDGridItem key={field.name} colSpan={span}>
                  <FormFieldRenderer
                    field={field}
                    formContext={formContext}
                    layout={layout}
                    disabled={disabled || readOnly}
                  />
                </CDGridItem>
              );
            })}
          </CDGrid>
        )}

        {children}

        <CDFormActions
          actions={actions}
          formContext={formContext}
          disabled={disabled || readOnly}
        />
      </form>
    );
  }
);

CDFormBuilder.displayName = "CDFormBuilder";

export const FormBuilder = CDFormBuilder;
