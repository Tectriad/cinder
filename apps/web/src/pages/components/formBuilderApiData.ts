import type { ApiPropItem } from "../../components/ApiTable";

export const FORM_PROPS: ApiPropItem[] = [
  {
    property: "fields",
    description: "Array of field configuration objects defining schema, input types, and validations",
    type: "CDFormFieldConfig[]",
    default: "[]",
  },
  {
    property: "variant",
    description: "Form presentation style: 'standard' (classic form) or 'cards' / 'survey' (Google Forms / Microsoft Forms card style)",
    type: "'standard' | 'cards' | 'survey'",
    default: "'standard'",
  },
  {
    property: "layout",
    description: "Field flow layout: 'vertical' (stacked), 'horizontal' (label left), or 'straight' (single vertical column like Google Forms)",
    type: "'vertical' | 'horizontal' | 'straight'",
    default: "'vertical'",
  },
  {
    property: "header",
    description: "Header banner card configuration (title, description, accentColor, requiredNotice, badge)",
    type: "CDFormHeaderConfig",
    default: "-",
  },
  {
    property: "showQuestionNumbers",
    description: "Whether to render question numbers (1., 2.) in 'cards' or 'survey' mode",
    type: "boolean",
    default: "true",
  },
  {
    property: "maxWidth",
    description: "Maximum container width in pixels or CSS units (e.g. 720 or '740px')",
    type: "number | string",
    default: "720 (in cards mode)",
  },
  {
    property: "centered",
    description: "Center the straight form horizontally within its parent container",
    type: "boolean",
    default: "false (true in cards mode)",
  },
  {
    property: "initialValues",
    description: "Initial field values key-value map",
    type: "Record<string, unknown>",
    default: "{}",
  },
  {
    property: "onSubmit",
    description: "Async submission handler callback with validated form values",
    type: "(values, context) => void | Promise<void>",
    default: "-",
  },
  {
    property: "onChange",
    description: "Callback triggered whenever any field value changes",
    type: "(values, changedField) => void",
    default: "-",
  },
  {
    property: "validationMode",
    description: "When validation triggers ('onBlur' | 'onChange' | 'onSubmit')",
    type: "string",
    default: "'onBlur'",
  },
  {
    property: "columns",
    description: "Grid column division count (defaults to 12-column grid in standard mode)",
    type: "number",
    default: "12",
  },
  {
    property: "gap",
    description: "Spatial gap between form rows and columns",
    type: "number | string",
    default: "4",
  },
  {
    property: "actions",
    description: "Configuration for bottom action button bar (Submit, Reset, Cancel, custom buttons)",
    type: "CDFormActionsConfig",
    default: "{ enabled: true }",
  },
  {
    property: "disabled",
    description: "Disable all fields and actions in form",
    type: "boolean",
    default: "false",
  },
  {
    property: "readOnly",
    description: "Make form fields read-only",
    type: "boolean",
    default: "false",
  },
];

export const FIELD_CONFIG_PROPS: ApiPropItem[] = [
  {
    property: "name",
    description: "Unique field key identifier in form values dictionary",
    type: "string",
    default: "-",
  },
  {
    property: "label",
    description: "Field label text with mandatory asterisk and optional tooltip support",
    type: "string",
    default: "-",
  },
  {
    property: "subtitle",
    description: "Secondary question description prompt displayed below question title (in cards mode)",
    type: "string",
    default: "-",
  },
  {
    property: "questionNumber",
    description: "Explicit question index label or symbol (e.g. '1.', 'Q1')",
    type: "number | string",
    default: "Auto-indexed (1, 2, ...)",
  },
  {
    property: "type",
    description: "Input control type ('text' | 'number' | 'decimal' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'checkbox-group' | 'switch' | 'slider' | 'date-picker' | 'time-picker' | 'file-picker' | 'custom')",
    type: "string",
    default: "'text'",
  },
  {
    property: "colSpan",
    description: "Column width in 12-column grid in standard mode (e.g. 6 = 50% width, 12 = full width)",
    type: "number",
    default: "12",
  },
  {
    property: "defaultValue",
    description: "Default initial value if not specified in initialValues",
    type: "unknown",
    default: "-",
  },
  {
    property: "validation",
    description: "Validation rule config with regex patterns, presets, and limits",
    type: "CDFormFieldValidation",
    default: "-",
  },
  {
    property: "visible",
    description: "Conditional visibility function (values) => boolean",
    type: "function",
    default: "-",
  },
  {
    property: "disabled",
    description: "Field disabled state or function based on current values",
    type: "boolean | function",
    default: "false",
  },
  {
    property: "options",
    description: "Option list for select, multiselect, radio, and checkbox-group",
    type: "CDFormSelectOption[]",
    default: "[]",
  },
];

export const ACTIONS_PROPS: ApiPropItem[] = [
  {
    property: "enabled",
    description: "Enable bottom action button toolbar",
    type: "boolean",
    default: "true",
  },
  {
    property: "align",
    description: "Button alignment ('left' | 'center' | 'right' | 'between')",
    type: "string",
    default: "'left'",
  },
  {
    property: "showSubmit",
    description: "Show primary submit button",
    type: "boolean",
    default: "true",
  },
  {
    property: "submitText",
    description: "Text label for submit button",
    type: "string",
    default: "'Submit'",
  },
  {
    property: "showReset",
    description: "Show form reset button",
    type: "boolean",
    default: "false",
  },
  {
    property: "showCancel",
    description: "Show cancel button",
    type: "boolean",
    default: "false",
  },
  {
    property: "extraButtons",
    description: "Array of additional custom buttons (e.g. 'Save Draft')",
    type: "CDFormActionButton[]",
    default: "[]",
  },
];

export const HEADER_CONFIG_PROPS: ApiPropItem[] = [
  {
    property: "title",
    description: "Main form title rendered prominently at the top of the header card",
    type: "string",
    default: "-",
  },
  {
    property: "description",
    description: "Explanatory subtitle or instructions for the form",
    type: "string",
    default: "-",
  },
  {
    property: "badge",
    description: "Optional category tag or badge shown alongside the title",
    type: "string",
    default: "-",
  },
  {
    property: "requiredNotice",
    description: "Mandatory disclaimer note (e.g. '* Indicates required question')",
    type: "string",
    default: "'* Indicates required question'",
  },
  {
    property: "accentColor",
    description: "Custom brand color for the top header accent bar (defaults to primary theme color)",
    type: "string",
    default: "var(--cinder-primary)",
  },
];
