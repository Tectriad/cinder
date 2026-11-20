import {
  useState,
  useEffect,
  type ReactElement,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { CDCloseIcon, CDDownloadIcon } from "../icon";
import {
  FileZoomInIcon,
  FileZoomOutIcon,
  FileRotateIcon,
  FilePdfIcon,
  FileDocIcon,
  FileCodeIcon,
  FileArchiveIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileGenericIcon,
  formatFileSize,
} from "./FileIcons";
import type { CDFilePickerPreviewModalProps, CDFilePickerFileType } from "./types";

export function CDFilePickerPreviewModal({
  file,
  open,
  onClose,
  onDownload,
}: CDFilePickerPreviewModalProps): ReactElement | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset transform state whenever a new file is opened
  useEffect(() => {
    if (open) {
      setZoom(1);
      setRotation(0);
    }
  }, [open, file]);

  // Handle ESC key dismiss
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!mounted || !open || !file) {
    return null;
  }

  const isImage: boolean =
    file.fileType === "image" ||
    Boolean(file.thumbUrl) ||
    (Boolean(file.url) &&
      Boolean(file.type?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name)));

  const previewSource: string | undefined = file.url || file.thumbUrl;

  const handleZoomIn = (): void => {
    setZoom((prev: number) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (): void => {
    setZoom((prev: number) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = (): void => {
    setRotation((prev: number) => (prev + 90) % 360);
  };

  const handleDownloadClick = (): void => {
    if (onDownload) {
      onDownload(file);
      return;
    }
    if (file.url) {
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderCategoryIcon = (category?: CDFilePickerFileType): ReactElement => {
    switch (category) {
      case "pdf":
        return <FilePdfIcon size={48} />;
      case "document":
        return <FileDocIcon size={48} />;
      case "code":
        return <FileCodeIcon size={48} />;
      case "archive":
        return <FileArchiveIcon size={48} />;
      case "video":
        return <FileVideoIcon size={48} />;
      case "audio":
        return <FileAudioIcon size={48} />;
      default:
        return <FileGenericIcon size={48} />;
    }
  };

  return createPortal(
    <div
      className="cinder-file-preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${file.name}`}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="cinder-file-preview-container">
        {/* Header Toolbar */}
        <div className="cinder-file-preview-header">
          <div className="cinder-file-preview-meta">
            <span className="cinder-file-preview-title" title={file.name}>
              {file.name}
            </span>
            <span className="cinder-file-preview-size">
              {formatFileSize(file.size)}
            </span>
          </div>

          <div className="cinder-file-preview-actions">
            {isImage && (
              <>
                <button
                  type="button"
                  className="cinder-file-preview-btn"
                  title="Zoom Out"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                >
                  <FileZoomOutIcon size={16} />
                </button>
                <span className="cinder-file-preview-zoom-label">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  className="cinder-file-preview-btn"
                  title="Zoom In"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                >
                  <FileZoomInIcon size={16} />
                </button>
                <button
                  type="button"
                  className="cinder-file-preview-btn"
                  title="Rotate Clockwise"
                  onClick={handleRotate}
                >
                  <FileRotateIcon size={16} />
                </button>
              </>
            )}

            <button
              type="button"
              className="cinder-file-preview-btn"
              title="Download File"
              onClick={handleDownloadClick}
            >
              <CDDownloadIcon size={16} />
            </button>

            <button
              type="button"
              className="cinder-file-preview-btn cinder-file-preview-close"
              title="Close Preview (Esc)"
              onClick={onClose}
            >
              <CDCloseIcon size={16} />
            </button>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="cinder-file-preview-body">
          {isImage && previewSource ? (
            <div className="cinder-file-preview-image-wrapper">
              <img
                src={previewSource}
                alt={file.name}
                className="cinder-file-preview-img"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                }}
              />
            </div>
          ) : (
            <div className="cinder-file-preview-fallback">
              <div className="cinder-file-preview-fallback-icon">
                {renderCategoryIcon(file.fileType)}
              </div>
              <h3 className="cinder-file-preview-fallback-title">{file.name}</h3>
              <p className="cinder-file-preview-fallback-desc">
                {formatFileSize(file.size)} • {file.type || "Document"}
              </p>
              <p className="cinder-file-preview-fallback-hint">
                In-browser visual preview is optimized for images. You can download this file to inspect it in your system viewer.
              </p>
              <button
                type="button"
                className="cinder-file-preview-download-btn"
                onClick={handleDownloadClick}
              >
                <CDDownloadIcon size={16} />
                <span>Download {file.name}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
