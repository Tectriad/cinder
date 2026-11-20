import {
  useState,
  useRef,
  forwardRef,
  type ReactElement,
  type ChangeEvent,
  type MouseEvent,
  type DragEvent,
} from "react";
import { cn } from "../../utils/cn";
import { CDFilePickerList } from "./CDFilePickerList";
import { CDFilePickerPreviewModal } from "./CDFilePickerPreviewModal";
import { getFileCategory, formatFileSize } from "./FileIcons";
import type {
  CDFilePickerProps,
  CDFileItem,
  CDShowUploadListConfig,
  CDFilePickerDraggerProps,
} from "./types";

export interface CDFilePickerComponent
  extends React.ForwardRefExoticComponent<
    CDFilePickerProps & React.RefAttributes<HTMLDivElement>
  > {
  Dragger?: React.ForwardRefExoticComponent<
    CDFilePickerDraggerProps & React.RefAttributes<HTMLDivElement>
  >;
  List: typeof CDFilePickerList;
  Preview: typeof CDFilePickerPreviewModal;
}

export const CDFilePicker = forwardRef<HTMLDivElement, CDFilePickerProps>(
  (
    {
      value,
      fileList,
      defaultValue = [],
      defaultFileList = [],
      onChange,
      onPreview,
      onRemove,
      onDrop,
      beforeUpload,
      customRequest,
      multiple = false,
      accept,
      maxCount,
      maxSize,
      disabled = false,
      listType = "list",
      showUploadList = true,
      directory = false,
      previewModal = true,
      children,
      className,
      style,
    }: CDFilePickerProps,
    ref
  ): ReactElement => {
    const isControlled: boolean = value !== undefined || fileList !== undefined;
    const initialFiles: CDFileItem[] =
      value || fileList || defaultValue || defaultFileList || [];

    const [internalFileList, setInternalFileList] =
      useState<CDFileItem[]>(initialFiles);
    const [previewFile, setPreviewFile] = useState<CDFileItem | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const currentFileList: CDFileItem[] = isControlled
      ? (value || fileList || [])
      : internalFileList;

    const updateFileList = (newList: CDFileItem[]): void => {
      if (!isControlled) {
        setInternalFileList(newList);
      }
      if (onChange) {
        onChange(newList);
      }
    };

    const triggerBrowse = (): void => {
      if (!disabled && inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.click();
      }
    };

    const processFiles = async (files: File[]): Promise<void> => {
      const newItems: CDFileItem[] = [];

      for (let i = 0; i < files.length; i++) {
        const rawFile: File = files[i];

        // Validate beforeUpload if provided
        if (beforeUpload) {
          const pass: boolean | File = await beforeUpload(rawFile, files);
          if (pass === false) continue;
        }

        const uid: string = `cinder-file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const category = getFileCategory(rawFile.name, rawFile.type);

        let thumbUrl: string | undefined = undefined;
        let objectUrl: string | undefined = undefined;
        if (category === "image") {
          try {
            thumbUrl = URL.createObjectURL(rawFile);
            objectUrl = thumbUrl;
          } catch {
            // In case createObjectURL fails in non-browser envs
          }
        }

        const fileItem: CDFileItem = {
          uid,
          name: rawFile.name,
          size: rawFile.size,
          type: rawFile.type,
          fileType: category,
          rawFile,
          thumbUrl,
          url: objectUrl,
          status: "uploading",
          percent: 0,
        };

        // Validate maxSize
        if (maxSize && rawFile.size > maxSize) {
          fileItem.status = "error";
          fileItem.error = `File size exceeds ${formatFileSize(maxSize)}`;
        }

        newItems.push(fileItem);
      }

      let mergedList: CDFileItem[] = multiple
        ? [...currentFileList, ...newItems]
        : newItems;

      if (maxCount && mergedList.length > maxCount) {
        mergedList = mergedList.slice(-maxCount);
      }

      updateFileList(mergedList);

      // Simulate or execute upload for items marked uploading
      newItems.forEach((item: CDFileItem) => {
        if (item.status !== "uploading") return;

        if (customRequest) {
          customRequest({
            file: item.rawFile as File,
            fileItem: item,
            onProgress: (percent: number) => {
              setInternalFileList((prev: CDFileItem[]) =>
                prev.map((f: CDFileItem) =>
                  f.uid === item.uid ? { ...f, percent } : f
                )
              );
            },
            onSuccess: () => {
              setInternalFileList((prev: CDFileItem[]) =>
                prev.map((f: CDFileItem) =>
                  f.uid === item.uid
                    ? { ...f, status: "success", percent: 100 }
                    : f
                )
              );
            },
            onError: (err: Error) => {
              setInternalFileList((prev: CDFileItem[]) =>
                prev.map((f: CDFileItem) =>
                  f.uid === item.uid
                    ? { ...f, status: "error", error: err.message }
                    : f
                )
              );
            },
          });
        } else {
          // Native simulated progress simulation for immediate UI delight
          let progress = 10;
          const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 25) + 15;
            if (progress >= 100) {
              clearInterval(interval);
              setInternalFileList((prev: CDFileItem[]) =>
                prev.map((f: CDFileItem) =>
                  f.uid === item.uid
                    ? { ...f, status: "success", percent: 100 }
                    : f
                )
              );
            } else {
              setInternalFileList((prev: CDFileItem[]) =>
                prev.map((f: CDFileItem) =>
                  f.uid === item.uid ? { ...f, percent: progress } : f
                )
              );
            }
          }, 120);
        }
      });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const files: FileList | null = e.target.files;
      if (files && files.length > 0) {
        processFiles(Array.from(files));
      }
    };

    const handleFilePreview = (file: CDFileItem): void => {
      if (onPreview) {
        onPreview(file);
      }
      if (previewModal) {
        setPreviewFile(file);
        setIsPreviewOpen(true);
      }
    };

    const handleFileRemove = async (file: CDFileItem): Promise<void> => {
      if (onRemove) {
        const canRemove = await onRemove(file);
        if (canRemove === false) return;
      }
      if (file.url && file.url.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(file.url);
        } catch {
          // cleanup
        }
      }
      const updated: CDFileItem[] = currentFileList.filter(
        (f: CDFileItem) => f.uid !== file.uid
      );
      updateFileList(updated);
    };

    const handleTriggerClick = (e: MouseEvent<HTMLDivElement>): void => {
      // Prevent double trigger if target is button inside
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      triggerBrowse();
    };

    const handleDropArea = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      if (onDrop) {
        onDrop(e);
      }
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    };

    const showConfig: CDShowUploadListConfig =
      typeof showUploadList === "object"
        ? showUploadList
        : {
            showPreviewIcon: true,
            showRemoveIcon: true,
            showDownloadIcon: true,
          };

    return (
      <div
        ref={ref}
        className={cn("cinder-file-picker", className)}
        style={style}
      >
        {/* Hidden native input */}
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          style={{ display: "none" }}
          onChange={handleInputChange}
          {...(directory ? { webkitdirectory: "", directory: "" } : {})}
        />

        {/* Trigger Area (if children provided and not picture-card) */}
        {listType !== "picture-card" && children && (
          <div
            className="cinder-file-trigger"
            onClick={handleTriggerClick}
            onDrop={handleDropArea}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        )}

        {/* Uploaded File List or Picture Card Grid */}
        {Boolean(showUploadList) && (
          <CDFilePickerList
            items={currentFileList}
            listType={listType}
            showConfig={showConfig}
            disabled={disabled}
            maxCount={maxCount}
            onPreview={handleFilePreview}
            onRemove={handleFileRemove}
            onTriggerUpload={triggerBrowse}
          />
        )}

        {/* Preview Lightbox Modal */}
        {previewModal && (
          <CDFilePickerPreviewModal
            file={previewFile}
            open={isPreviewOpen}
            onClose={() => {
              setIsPreviewOpen(false);
              setPreviewFile(null);
            }}
          />
        )}
      </div>
    );
  }
) as CDFilePickerComponent;

CDFilePicker.displayName = "CDFilePicker";
CDFilePicker.List = CDFilePickerList;
CDFilePicker.Preview = CDFilePickerPreviewModal;

export const FilePicker = CDFilePicker;
export const CDUpload = CDFilePicker;
export const Upload = CDFilePicker;
