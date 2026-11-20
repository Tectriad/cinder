import type { ReactElement, SVGProps } from "react";
import type { CDFilePickerFileType } from "./types";

interface IconBaseProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function FileUploadCloudIcon({
  size = 40,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

export function FileImageIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

export function FilePdfIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 12a1 1 0 0 0-1-1H8v6h1a1 1 0 0 0 1-1v-4Z" />
      <path d="M14 17h2" />
      <path d="M14 11h3" />
      <path d="M14 14h2" />
    </svg>
  );
}

export function FileDocIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

export function FileCodeIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function FileArchiveIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

export function FileVideoIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}

export function FileAudioIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function FileGenericIcon({
  size = 20,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function FileEyeIcon({
  size = 16,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function FileZoomInIcon({
  size = 18,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}

export function FileZoomOutIcon({
  size = 18,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}

export function FileRotateIcon({
  size = 18,
  ...props
}: IconBaseProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  );
}

export function getFileCategory(
  fileName: string,
  mimeType?: string
): CDFilePickerFileType {
  const extension: string = fileName.split(".").pop()?.toLowerCase() || "";
  const type: string = mimeType || "";

  if (
    type.startsWith("image/") ||
    ["jpg", "jpeg", "png", "webp", "gif", "svg", "bmp", "ico", "avif"].includes(
      extension
    )
  ) {
    return "image";
  }

  if (
    type === "application/pdf" ||
    extension === "pdf"
  ) {
    return "pdf";
  }

  if (
    [
      "doc",
      "docx",
      "odt",
      "rtf",
      "txt",
      "md",
      "csv",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
    ].includes(extension)
  ) {
    return "document";
  }

  if (
    [
      "zip",
      "tar",
      "gz",
      "7z",
      "rar",
      "bz2",
      "xz",
    ].includes(extension)
  ) {
    return "archive";
  }

  if (
    type.startsWith("video/") ||
    ["mp4", "webm", "mkv", "mov", "avi", "wmv"].includes(extension)
  ) {
    return "video";
  }

  if (
    type.startsWith("audio/") ||
    ["mp3", "wav", "ogg", "flac", "m4a", "aac"].includes(extension)
  ) {
    return "audio";
  }

  if (
    [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "html",
      "css",
      "scss",
      "py",
      "go",
      "rs",
      "java",
      "c",
      "cpp",
      "sql",
      "yaml",
      "yml",
      "xml",
    ].includes(extension)
  ) {
    return "code";
  }

  return "generic";
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes: string[] = ["B", "KB", "MB", "GB", "TB"];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  const formatted: string = (bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1);
  return `${formatted} ${sizes[i]}`;
}
