import type {
  CSSProperties,
  DragEvent,
  ReactNode,
} from "react";

export type CDFilePickerStatus = "idle" | "uploading" | "success" | "error";

export type CDFilePickerFileType =
  | "image"
  | "pdf"
  | "document"
  | "archive"
  | "video"
  | "audio"
  | "code"
  | "generic";

export type CDFilePickerListType = "list" | "picture-card" | "dropzone";

export interface CDFileItem {
  uid: string;
  name: string;
  size: number;
  type?: string;
  fileType?: CDFilePickerFileType;
  url?: string;
  thumbUrl?: string;
  status?: CDFilePickerStatus;
  percent?: number;
  error?: string;
  rawFile?: File;
}

export interface CDCustomRequestOptions {
  file: File;
  fileItem: CDFileItem;
  onProgress: (percent: number) => void;
  onSuccess: (response?: unknown) => void;
  onError: (error: Error) => void;
}

export interface CDShowUploadListConfig {
  showPreviewIcon?: boolean;
  showRemoveIcon?: boolean;
  showDownloadIcon?: boolean;
}

export interface CDFilePickerProps {
  value?: CDFileItem[];
  fileList?: CDFileItem[];
  defaultValue?: CDFileItem[];
  defaultFileList?: CDFileItem[];
  onChange?: (fileList: CDFileItem[]) => void;
  onPreview?: (file: CDFileItem) => void;
  onRemove?: (file: CDFileItem) => boolean | void | Promise<boolean | void>;
  onDrop?: (event: DragEvent<HTMLElement>) => void;
  beforeUpload?: (
    file: File,
    fileList: File[]
  ) => boolean | Promise<boolean | File>;
  customRequest?: (options: CDCustomRequestOptions) => void;
  multiple?: boolean;
  accept?: string;
  maxCount?: number;
  maxSize?: number; // In bytes (e.g. 5 * 1024 * 1024 for 5MB)
  disabled?: boolean;
  listType?: CDFilePickerListType;
  showUploadList?: boolean | CDShowUploadListConfig;
  directory?: boolean;
  previewModal?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type FilePickerProps = CDFilePickerProps;
export type CDUploadProps = CDFilePickerProps;
export type UploadProps = CDFilePickerProps;

export interface CDFilePickerDraggerProps extends CDFilePickerProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

export type FilePickerDraggerProps = CDFilePickerDraggerProps;
export type CDUploadDraggerProps = CDFilePickerDraggerProps;
export type UploadDraggerProps = CDFilePickerDraggerProps;

export interface CDFilePickerListProps {
  items: CDFileItem[];
  listType?: CDFilePickerListType;
  showConfig?: CDShowUploadListConfig;
  disabled?: boolean;
  onPreview?: (file: CDFileItem) => void;
  onRemove?: (file: CDFileItem) => void;
  onDownload?: (file: CDFileItem) => void;
  onTriggerUpload?: () => void;
  maxCount?: number;
  className?: string;
  style?: CSSProperties;
}

export interface CDFilePickerPreviewModalProps {
  file: CDFileItem | null;
  open: boolean;
  onClose: () => void;
  onDownload?: (file: CDFileItem) => void;
}
