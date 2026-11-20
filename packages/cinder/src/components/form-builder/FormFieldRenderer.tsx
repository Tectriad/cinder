import { type ReactElement, type ChangeEvent } from "react";
import { cn } from "../../utils/cn";
import { CDInput } from "../input";
import { CDTextArea } from "../textarea";
import { CDSelect } from "../select";
import { CDRadioGroup } from "../radio";
import { CDCheckbox, CDCheckboxGroup } from "../checkbox";
import { CDSwitch } from "../switch";
import { CDSlider } from "../slider";
import { CDDatePicker, CDTimePicker } from "../date-picker";
import { CDFilePicker, type CDFileItem } from "../file-picker";
import { CDLabel } from "../typography";
import { CDAlertCircleIcon, CDUploadIcon } from "../icon";
import { CDButton } from "../button";
import type {
  CDFormFieldConfig,
  CDFormContextValue,
} from "./types";

interface FormFieldRendererProps {
  field: CDFormFieldConfig;
  formContext: CDFormContextValue;
  layout?: "vertical" | "horizontal" | "straight";
  hideLabel?: boolean;
  disabled?: boolean;
}

export function FormFieldRenderer({
  field,
  formContext,
  layout = "vertical",
  hideLabel = false,
  disabled = false,
}: FormFieldRendererProps): ReactElement | null {
  const { values, errors, touched, setFieldValue, setFieldTouched } = formContext;

  // Check conditional visibility
  if (field.visible && !field.visible(values)) {
    return null;
  }

  const isFieldDisabled =
    disabled ||
    (typeof field.disabled === "function"
      ? field.disabled(values)
      : Boolean(field.disabled));

  const val = values[field.name];
  const err = touched[field.name] ? errors[field.name] : undefined;
  const isRequired = field.required || field.validation?.required;

  const handleBlur = (): void => {
    setFieldTouched(field.name, true);
  };

  const renderInputControl = (): ReactElement => {
    switch (field.type) {
      case "textarea":
        return (
          <CDTextArea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={typeof val === "string" ? val : ""}
            rows={field.rows || 3}
            disabled={isFieldDisabled}
            showCount={field.showCount}
            status={err ? "error" : undefined}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setFieldValue(field.name, e.target.value);
            }}
            onBlur={handleBlur}
          />
        );

      case "select":
      case "multiselect":
        return (
          <CDSelect
            multiple={field.type === "multiselect"}
            options={field.options || []}
            value={val as string | string[] | undefined}
            placeholder={field.placeholder || "Select option..."}
            disabled={isFieldDisabled}
            error={Boolean(err)}
            onChange={(selectedVal: unknown) => {
              setFieldValue(field.name, selectedVal);
              setFieldTouched(field.name, true);
            }}
          />
        );

      case "radio":
        return (
          <CDRadioGroup
            name={field.name}
            options={field.options || []}
            value={val as string | number | undefined}
            disabled={isFieldDisabled}
            onChange={(radioVal: string | number) => {
              setFieldValue(field.name, radioVal);
              setFieldTouched(field.name, true);
            }}
          />
        );

      case "checkbox":
        return (
          <CDCheckbox
            id={field.name}
            checked={Boolean(val)}
            disabled={isFieldDisabled}
            onChange={(checked: boolean) => {
              setFieldValue(field.name, checked);
              setFieldTouched(field.name, true);
            }}
          >
            {field.placeholder || field.label}
          </CDCheckbox>
        );

      case "checkbox-group":
        return (
          <CDCheckboxGroup
            options={field.options || []}
            value={(val as (string | number)[]) || []}
            disabled={isFieldDisabled}
            onChange={(groupVals: (string | number)[]) => {
              setFieldValue(field.name, groupVals);
              setFieldTouched(field.name, true);
            }}
          />
        );

      case "switch":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CDSwitch
              id={field.name}
              checked={Boolean(val)}
              disabled={isFieldDisabled}
              onChange={(checked: boolean) => {
                setFieldValue(field.name, checked);
                setFieldTouched(field.name, true);
              }}
            />
            {field.placeholder && (
              <span className="cinder-form-field-switch-label">
                {field.placeholder}
              </span>
            )}
          </div>
        );

      case "slider":
        return (
          <div style={{ padding: "4px 0" }}>
            <CDSlider
              value={typeof val === "number" ? val : field.min || 0}
              min={field.min ?? 0}
              max={field.max ?? 100}
              step={field.step ?? 1}
              disabled={isFieldDisabled}
              onChange={(sliderVal: number | [number, number]) => {
                setFieldValue(field.name, sliderVal);
                setFieldTouched(field.name, true);
              }}
            />
          </div>
        );

      case "date-picker":
        return (
          <CDDatePicker
            value={typeof val === "string" ? val : undefined}
            placeholder={field.placeholder || "Select date"}
            disabled={isFieldDisabled}
            onChange={(_d: Date | null, dateStr: string) => {
              setFieldValue(field.name, dateStr);
              setFieldTouched(field.name, true);
            }}
          />
        );

      case "time-picker":
        return (
          <CDTimePicker
            value={typeof val === "string" ? val : undefined}
            placeholder={field.placeholder || "Select time"}
            disabled={isFieldDisabled}
            onChange={(_t: Date | null, timeStr: string) => {
              setFieldValue(field.name, timeStr);
              setFieldTouched(field.name, true);
            }}
          />
        );

      case "file-picker":
        return (
          <CDFilePicker
            multiple={field.multipleFiles}
            accept={field.accept}
            maxSize={field.maxFileSize}
            disabled={isFieldDisabled}
            fileList={(val as CDFileItem[]) || []}
            onChange={(files: CDFileItem[]) => {
              setFieldValue(field.name, files);
              setFieldTouched(field.name, true);
            }}
          >
            <CDButton
              size="sm"
              variant="secondary"
              prefixIcon={<CDUploadIcon size={14} />}
              disabled={isFieldDisabled}
            >
              {field.placeholder || "Choose File"}
            </CDButton>
          </CDFilePicker>
        );

      case "custom":
        if (field.renderCustom) {
          return <>{field.renderCustom(field, formContext)}</>;
        }
        return <div className="cinder-form-field-missing-custom">Custom field renderer not provided</div>;

      case "number":
      case "decimal":
        return (
          <CDInput
            id={field.name}
            name={field.name}
            type="number"
            min={field.min}
            max={field.max}
            step={field.step || (field.type === "decimal" ? 0.01 : 1)}
            placeholder={field.placeholder}
            value={val !== undefined && val !== null ? String(val) : ""}
            disabled={isFieldDisabled}
            error={Boolean(err)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const numVal = e.target.value === "" ? "" : Number(e.target.value);
              setFieldValue(field.name, numVal);
            }}
            onBlur={handleBlur}
          />
        );

      case "text":
      default:
        return (
          <CDInput
            id={field.name}
            name={field.name}
            type={field.subType || "text"}
            placeholder={field.placeholder}
            value={val !== undefined && val !== null ? String(val) : ""}
            disabled={isFieldDisabled}
            error={Boolean(err)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFieldValue(field.name, e.target.value);
            }}
            onBlur={handleBlur}
          />
        );
    }
  };

  const isStandaloneCheckbox = field.type === "checkbox";

  return (
    <div
      className={cn(
        "cinder-form-field-wrapper",
        `cinder-form-layout-${layout}`,
        err && "cinder-form-field-has-error",
        field.className
      )}
      style={field.style}
    >
      {!isStandaloneCheckbox && !hideLabel && (
        <div className="cinder-form-label-row">
          <CDLabel
            htmlFor={field.name}
            required={Boolean(isRequired)}
            tooltip={field.tooltip}
          >
            {field.label}
          </CDLabel>
        </div>
      )}

      <div className="cinder-form-control-row">
        {renderInputControl()}

        {err && (
          <div className="cinder-form-field-error-message" role="alert">
            <CDAlertCircleIcon size={13} />
            <span>{err}</span>
          </div>
        )}

        {field.helpText && !err && (
          <div className="cinder-form-field-help-text">{field.helpText}</div>
        )}
      </div>
    </div>
  );
}
