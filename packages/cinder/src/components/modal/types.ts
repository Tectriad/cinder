import type { ReactNode, CSSProperties } from "react";

export interface CDModalProps {
  /**
   * Whether the modal is visible
   */
  open?: boolean;

  /**
   * Callback fired when modal requests to close
   */
  onClose?: () => void;

  /**
   * Primary title displayed in the modal header
   */
  title?: ReactNode;

  /**
   * Subtitle or descriptive metadata below title
   */
  description?: ReactNode;

  /**
   * Custom footer elements, or false to hide footer entirely
   */
  footer?: ReactNode | boolean;

  /**
   * Whether to display the top-right close icon button
   * @default true
   */
  closable?: boolean;

  /**
   * Whether clicking the darkened background mask triggers close
   * @default true
   */
  maskClosable?: boolean;

  /**
   * Vertically center modal in viewport instead of top-anchored offset
   * @default true
   */
  centered?: boolean;

  /**
   * Modal dialog width
   * @default 520
   */
  width?: number | string;

  /**
   * Destroy modal children from DOM when closed
   * @default true
   */
  destroyOnClose?: boolean;

  /**
   * Text for the confirm action button
   * @default "Confirm"
   */
  okText?: ReactNode;

  /**
   * Text for the cancel action button
   * @default "Cancel"
   */
  cancelText?: ReactNode;

  /**
   * Callback fired when primary OK button is clicked
   */
  onOk?: () => void;

  /**
   * Callback fired when cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * Loading state for the OK button
   * @default false
   */
  confirmLoading?: boolean;

  /**
   * Modal content body
   */
  children?: ReactNode;

  /**
   * Custom CSS class applied to dialog container
   */
  className?: string;

  /**
   * Custom inline styles applied to dialog container
   */
  style?: CSSProperties;
}

export type ModalProps = CDModalProps;
export type CDDialogProps = CDModalProps;
export type DialogProps = CDModalProps;
