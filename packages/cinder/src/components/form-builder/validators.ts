import type {
  CDFormFieldConfig,
  CDFormValidationPreset,
} from "./types";

export const VALIDATION_PRESETS: Record<
  CDFormValidationPreset,
  { regex: RegExp; defaultMessage: string }
> = {
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    defaultMessage: "Please enter a valid email address",
  },
  url: {
    regex: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    defaultMessage: "Please enter a valid URL (e.g. https://example.com)",
  },
  number: {
    regex: /^-?\d+$/,
    defaultMessage: "Please enter a valid whole number",
  },
  decimal: {
    regex: /^-?\d+(\.\d+)?$/,
    defaultMessage: "Please enter a valid numeric decimal",
  },
  phone: {
    regex: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/,
    defaultMessage: "Please enter a valid phone number",
  },
  alphanumeric: {
    regex: /^[a-zA-Z0-9_]+$/,
    defaultMessage: "Only alphanumeric characters and underscores are allowed",
  },
  "strong-password": {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    defaultMessage:
      "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
  },
};

export async function validateFieldValue(
  value: unknown,
  field: CDFormFieldConfig,
  formValues: Record<string, unknown>
): Promise<string | undefined> {
  const validation = field.validation;
  const isRequired = field.required || validation?.required;

  // 1. Required Check
  const isEmpty =
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);

  if (isRequired && isEmpty) {
    if (typeof isRequired === "string") {
      return isRequired;
    }
    return `${field.label || field.name} is required`;
  }

  // If value is empty and not required, pass validation
  if (isEmpty) {
    return undefined;
  }

  if (!validation) {
    return undefined;
  }

  // 2. Preset Validation Check
  if (validation.preset && VALIDATION_PRESETS[validation.preset]) {
    const { regex, defaultMessage } = VALIDATION_PRESETS[validation.preset];
    if (typeof value === "string" && !regex.test(value)) {
      return validation.patternMessage || defaultMessage;
    }
    if (typeof value === "number" && !regex.test(String(value))) {
      return validation.patternMessage || defaultMessage;
    }
  }

  // 3. Custom Regex Pattern Check
  if (validation.pattern) {
    const regex =
      typeof validation.pattern === "string"
        ? new RegExp(validation.pattern)
        : validation.pattern;
    const strVal = String(value);
    if (!regex.test(strVal)) {
      return (
        validation.patternMessage ||
        `${field.label || field.name} format is invalid`
      );
    }
  }

  // 4. Min / Max (Numeric)
  if (typeof value === "number") {
    if (validation.min !== undefined && value < validation.min) {
      return (
        validation.minMessage ||
        `${field.label || field.name} must be at least ${validation.min}`
      );
    }
    if (validation.max !== undefined && value > validation.max) {
      return (
        validation.maxMessage ||
        `${field.label || field.name} must not exceed ${validation.max}`
      );
    }
  }

  // 5. MinLength / MaxLength (String or Array)
  if (typeof value === "string" || Array.isArray(value)) {
    if (
      validation.minLength !== undefined &&
      value.length < validation.minLength
    ) {
      return (
        validation.minLengthMessage ||
        `${field.label || field.name} must have at least ${validation.minLength} characters`
      );
    }
    if (
      validation.maxLength !== undefined &&
      value.length > validation.maxLength
    ) {
      return (
        validation.maxLengthMessage ||
        `${field.label || field.name} must not exceed ${validation.maxLength} characters`
      );
    }
  }

  // 6. Custom Validator Function Check
  if (validation.custom) {
    const result = await validation.custom(value, formValues);
    if (typeof result === "string" && result.length > 0) {
      return result;
    }
    if (result === false) {
      return `${field.label || field.name} is invalid`;
    }
  }

  return undefined;
}
