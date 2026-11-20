import { type ReactElement, type MouseEvent } from "react";
import { cn } from "../../utils/cn";
import {
  CDTrashIcon,
  CDDownloadIcon,
  CDPlusIcon,
  CDAlertCircleIcon,
  CDCheckCircleIcon,
} from "../icon";
import {
  FileEyeIcon,
  FileImageIcon,
  FilePdfIcon,
  FileDocIcon,
  FileCodeIcon,
  FileArchiveIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileGenericIcon,
  formatFileSize,
} from "./FileIcons";
import type {
  CDFileItem,
  CDFilePickerListProps,
  CDFilePickerFileType,
} from "./types";

export function CDFilePickerList({
  items,
  listType = "list",
  showConfig = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    showDownloadIcon: true,
  },
  disabled = false,
  onPreview,
  onRemove,
  onDownload,
  onTriggerUpload,
  maxCount,
  className,
  style,
}: CDFilePickerListProps): ReactElement | null {
  if (items.length === 0 && listType !== "picture-card") {
    return null;
  }

  const renderFileIcon = (
    fileType?: CDFilePickerFileType,
    size = 18
  ): ReactElement => {
    switch (fileType) {
      case "image":
        return <FileImageIcon size={size} />;
      case "pdf":
        return <FilePdfIcon size={size} />;
      case "document":
        return <FileDocIcon size={size} />;
      case "code":
        return <FileCodeIcon size={size} />;
      case "archive":
        return <FileArchiveIcon size={size} />;
      case "video":
        return <FileVideoIcon size={size} />;
      case "audio":
        return <FileAudioIcon size={size} />;
      default:
        return <FileGenericIcon size={size} />;
    }
  };

  const handlePreview = (
    e: MouseEvent<HTMLButtonElement>,
    file: CDFileItem
  ): void => {
    e.stopPropagation();
    if (onPreview) {
      onPreview(file);
    }
  };

  const handleRemove = (
    e: MouseEvent<HTMLButtonElement>,
    file: CDFileItem
  ): void => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove(file);
    }
  };

  const handleDownload = (
    e: MouseEvent<HTMLButtonElement>,
    file: CDFileItem
  ): void => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(file);
    } else if (file.url) {
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Picture Card Grid Renderer
  if (listType === "picture-card") {
    const canUploadMore: boolean =
      !disabled && (!maxCount || items.length < maxCount);

    return (
      <div
        className={cn("cinder-file-list", "cinder-file-list-picture-card", className)}
        style={style}
      >
        {items.map((file: CDFileItem) => {
          const isImage: boolean =
            file.fileType === "image" ||
            Boolean(file.thumbUrl) ||
            Boolean(file.url);
          const isUploading: boolean = file.status === "uploading";
          const isError: boolean = file.status === "error";

          return (
            <div
              key={file.uid}
              className={cn(
                "cinder-file-card-item",
                isUploading && "cinder-file-card-uploading",
                isError && "cinder-file-card-error"
              )}
            >
              {/* Thumbnail or Fallback Icon */}
              {isImage && (file.thumbUrl || file.url) ? (
                <img
                  src={file.thumbUrl || file.url}
                  alt={file.name}
                  className="cinder-file-card-thumb"
                />
              ) : (
                <div className="cinder-file-card-fallback-icon">
                  {renderFileIcon(file.fileType, 32)}
                  <span className="cinder-file-card-fallback-name" title={file.name}>
                    {file.name}
                  </span>
                </div>
              )}

              {/* Uploading progress overlay */}
              {isUploading && (
                <div className="cinder-file-card-progress-overlay">
                  <span className="cinder-file-card-progress-percent">
                    {file.percent || 0}%
                  </span>
                  <div className="cinder-file-card-progress-bar">
                    <div
                      className="cinder-file-card-progress-fill"
                      style={{ width: `${file.percent || 0}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error badge */}
              {isError && (
                <div
                  className="cinder-file-card-error-badge"
                  title={file.error || "Upload failed"}
                >
                  <CDAlertCircleIcon size={16} />
                </div>
              )}

              {/* Hover Actions Mask */}
              {!isUploading && (
                <div className="cinder-file-card-mask">
                  {showConfig.showPreviewIcon && (
                    <button
                      type="button"
                      className="cinder-file-card-action-btn"
                      title="Preview"
                      onClick={(e) => handlePreview(e, file)}
                    >
                      <FileEyeIcon size={16} />
                    </button>
                  )}
                  {showConfig.showDownloadIcon && (file.url || file.rawFile) && (
                    <button
                      type="button"
                      className="cinder-file-card-action-btn"
                      title="Download"
                      onClick={(e) => handleDownload(e, file)}
                    >
                      <CDDownloadIcon size={16} />
                    </button>
                  )}
                  {showConfig.showRemoveIcon && !disabled && (
                    <button
                      type="button"
                      className="cinder-file-card-action-btn cinder-file-card-action-delete"
                      title="Remove"
                      onClick={(e) => handleRemove(e, file)}
                    >
                      <CDTrashIcon size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Append Upload Card Button */}
        {canUploadMore && onTriggerUpload && (
          <button
            type="button"
            className="cinder-file-card-upload-btn"
            onClick={onTriggerUpload}
          >
            <CDPlusIcon size={20} />
            <span className="cinder-file-card-upload-text">Upload</span>
          </button>
        )}
      </div>
    );
  }

  // Standard Compact List Renderer
  return (
    <div
      className={cn("cinder-file-list", "cinder-file-list-compact", className)}
      style={style}
    >
      {items.map((file: CDFileItem) => {
        const isUploading: boolean = file.status === "uploading";
        const isError: boolean = file.status === "error";
        const isSuccess: boolean = file.status === "success";

        return (
          <div
            key={file.uid}
            className={cn(
              "cinder-file-list-item",
              isUploading && "cinder-file-item-uploading",
              isError && "cinder-file-item-error"
            )}
          >
            {/* Left Icon or Small Thumbnail */}
            <div className="cinder-file-item-icon">
              {file.thumbUrl ? (
                <img
                  src={file.thumbUrl}
                  alt={file.name}
                  className="cinder-file-item-thumb"
                />
              ) : (
                renderFileIcon(file.fileType, 18)
              )}
            </div>

            {/* File Info & Progress */}
            <div className="cinder-file-item-content">
              <div className="cinder-file-item-header">
                <span className="cinder-file-item-name" title={file.name}>
                  {file.name}
                </span>
                <span className="cinder-file-item-size">
                  {formatFileSize(file.size)}
                </span>
              </div>

              {isUploading && (
                <div className="cinder-file-item-progress">
                  <div className="cinder-file-item-progress-track">
                    <div
                      className="cinder-file-item-progress-fill"
                      style={{ width: `${file.percent || 0}%` }}
                    />
                  </div>
                  <span className="cinder-file-item-progress-text">
                    {file.percent || 0}%
                  </span>
                </div>
              )}

              {isError && (
                <div className="cinder-file-item-error-msg">
                  <CDAlertCircleIcon size={12} />
                  <span>{file.error || "Upload failed"}</span>
                </div>
              )}
            </div>

            {/* Actions Toolbar */}
            <div className="cinder-file-item-actions">
              {isSuccess && (
                <span className="cinder-file-item-status-icon cinder-file-success">
                  <CDCheckCircleIcon size={14} />
                </span>
              )}

              {showConfig.showPreviewIcon && (
                <button
                  type="button"
                  className="cinder-file-action-btn"
                  title="Preview"
                  onClick={(e) => handlePreview(e, file)}
                >
                  <FileEyeIcon size={14} />
                </button>
              )}

              {showConfig.showDownloadIcon && (file.url || file.rawFile) && (
                <button
                  type="button"
                  className="cinder-file-action-btn"
                  title="Download"
                  onClick={(e) => handleDownload(e, file)}
                >
                  <CDDownloadIcon size={14} />
                </button>
              )}

              {showConfig.showRemoveIcon && !disabled && (
                <button
                  type="button"
                  className="cinder-file-action-btn cinder-file-remove-btn"
                  title="Remove"
                  onClick={(e) => handleRemove(e, file)}
                >
                  <CDTrashIcon size={14} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
