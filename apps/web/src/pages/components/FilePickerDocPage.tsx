import { useState, type ReactElement } from "react";
import {
  CDFilePicker,
  FilePicker,
  CDFilePickerDragger,
  CDButton,
  Button,
  CDUploadIcon,
  type CDFileItem,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable, type ApiPropItem } from "../../components/ApiTable";

export function FilePickerDocPage(): ReactElement {
  const [controlledList, setControlledList] = useState<CDFileItem[]>([
    {
      uid: "sample-1",
      name: "cluster-topology-v2.png",
      size: 428900,
      fileType: "image",
      status: "success",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      thumbUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    },
    {
      uid: "sample-2",
      name: "infrastructure-spec.pdf",
      size: 2450000,
      fileType: "pdf",
      status: "success",
    },
    {
      uid: "sample-3",
      name: "service-mesh-config.yaml",
      size: 14200,
      fileType: "code",
      status: "success",
    },
  ]);

  const [pictureCardList, setPictureCardList] = useState<CDFileItem[]>([
    {
      uid: "pic-1",
      name: "slate-dark-theme.png",
      size: 512000,
      fileType: "image",
      status: "success",
      url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      thumbUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&q=80",
    },
    {
      uid: "pic-2",
      name: "kubernetes-ingress.png",
      size: 780000,
      fileType: "image",
      status: "success",
      url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
      thumbUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=200&q=80",
    },
  ]);

  const filePickerProps: ApiPropItem[] = [
    { property: "fileList / value", description: "Controlled array of uploaded file items", type: "CDFileItem[]", default: "-" },
    { property: "defaultFileList", description: "Default initial file items for uncontrolled mode", type: "CDFileItem[]", default: "[]" },
    { property: "onChange", description: "Callback triggered when file list items change", type: "(fileList: CDFileItem[]) => void", default: "-" },
    { property: "onPreview", description: "Callback triggered when user clicks preview icon", type: "(file: CDFileItem) => void", default: "-" },
    { property: "onRemove", description: "Callback before file removal; returning false halts removal", type: "(file: CDFileItem) => boolean | void", default: "-" },
    { property: "multiple", description: "Allow multiple file selection in single dialog", type: "boolean", default: "false" },
    { property: "accept", description: "Accepted file types MIME filter (e.g. 'image/*', '.pdf')", type: "string", default: "-" },
    { property: "maxCount", description: "Maximum number of files allowed in upload list", type: "number", default: "-" },
    { property: "maxSize", description: "Maximum allowed file size in bytes (e.g. 5MB)", type: "number", default: "-" },
    { property: "listType", description: "Visual presentation mode ('list' | 'picture-card' | 'dropzone')", type: "string", default: "'list'" },
    { property: "previewModal", description: "Enable built-in interactive image lightbox with zoom and rotate", type: "boolean", default: "true" },
    { property: "disabled", description: "Disable all interactions and upload triggers", type: "boolean", default: "false" },
    { property: "showUploadList", description: "Show or configure action icons (preview, remove, download)", type: "boolean | CDShowUploadListConfig", default: "true" },
    { property: "beforeUpload", description: "Hook before processing; return false to cancel", type: "(file: File) => boolean | Promise<boolean>", default: "-" },
  ];

  const draggerProps: ApiPropItem[] = [
    { property: "title", description: "Primary heading text in dropzone area", type: "ReactNode", default: "'Click or drag files to this area...'" },
    { property: "description", description: "Secondary supporting description text", type: "ReactNode", default: "'Support for single or bulk uploading...'" },
    { property: "icon", description: "Custom vector icon element for dropzone", type: "ReactNode", default: "<FileUploadCloudIcon />" },
    { property: "disabled", description: "Disable drag-and-drop and click triggers", type: "boolean", default: "false" },
  ];

  const fileItemProps: ApiPropItem[] = [
    { property: "uid", description: "Unique file identifier string", type: "string", default: "Auto-generated" },
    { property: "name", description: "File name including extension", type: "string", default: "-" },
    { property: "size", description: "File size in bytes", type: "number", default: "-" },
    { property: "type", description: "MIME type (e.g. 'image/png')", type: "string", default: "-" },
    { property: "fileType", description: "Categorized type ('image' | 'pdf' | 'document' | 'code' | ...)", type: "string", default: "Auto-detected" },
    { property: "url", description: "Full resolution image URL or download target", type: "string", default: "-" },
    { property: "thumbUrl", description: "Thumbnail preview URL (object URL or remote image)", type: "string", default: "-" },
    { property: "status", description: "Upload lifecycle state ('idle' | 'uploading' | 'success' | 'error')", type: "string", default: "'idle'" },
    { property: "percent", description: "Upload progress percentage (0 to 100)", type: "number", default: "0" },
    { property: "error", description: "Error explanation string when status is error", type: "string", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDFilePicker / FilePicker</h1>
        <p className="antd-doc-lead">
          Comprehensive file upload and selection primitive with automated thumbnails, interactive image lightbox preview, drag-and-drop dropzones, and picture card grids.
        </p>

        <div className="antd-doc-import">
          <code>
            import &#123; CDFilePicker, FilePicker, CDFilePickerDragger &#125; from &apos;@cinder-ui/core&apos;;
          </code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>When users need to upload images, documents, certificates, or code archives with live visual feedback.</li>
          <li>For drag-and-drop file ingestion zones with hover elevation, drag-over highlights, and format validations.</li>
          <li>When users need to preview images in an interactive lightbox modal with zoom and rotation before submitting.</li>
          <li>For multi-card image galleries (`listType=&quot;picture-card&quot;`) in CMS, asset libraries, or user profiles.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic File Picker with Button Trigger */}
          <DemoCard
            fullWidth
            title="Basic File Picker with Button Trigger"
            description="Click the button to select files from your local system. Automatically displays file progress, format icons, and preview."
            code={`import { CDFilePicker, CDButton, CDUploadIcon } from '@cinder-ui/core';

export default () => (
  <CDFilePicker multiple>
    <CDButton variant="secondary" prefixIcon={<CDUploadIcon size={16} />}>
      Select Files
    </CDButton>
  </CDFilePicker>
);`}
          >
            <div style={{ width: "100%", maxWidth: "480px" }}>
              <CDFilePicker multiple>
                <CDButton variant="secondary" prefixIcon={<CDUploadIcon size={16} />}>
                  Select Files
                </CDButton>
              </CDFilePicker>
            </div>
          </DemoCard>

          {/* Demo 2: Drag & Drop Area (Dragger) */}
          <DemoCard
            fullWidth
            title="Drag & Drop Area (CDFilePickerDragger)"
            description="Large interactive dropzone supporting drag-over states, multi-file dropping, format categorizing, and built-in preview modal."
            code={`import { CDFilePickerDragger } from '@cinder-ui/core';

export default () => (
  <CDFilePickerDragger
    multiple
    title="Drag and drop deployment bundles here"
    description="Supports PNG, JPG, PDF, ZIP, and YAML configurations up to 25MB"
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDFilePickerDragger
                multiple
                title="Drag and drop deployment bundles here"
                description="Supports PNG, JPG, PDF, ZIP, and YAML configurations up to 25MB"
              />
            </div>
          </DemoCard>

          {/* Demo 3: Picture Card Grid with Image Lightbox Preview */}
          <DemoCard
            fullWidth
            title="Picture Card Grid & Image Lightbox"
            description="Square image cards with hover action masks (Preview & Delete) and a '+ Upload' card button. Click the eye icon to launch the full-screen zoomable lightbox."
            code={`import { useState } from 'react';
import { FilePicker, type CDFileItem } from '@cinder-ui/core';

export default () => {
  const [fileList, setFileList] = useState<CDFileItem[]>([
    {
      uid: '1',
      name: 'slate-dark-theme.png',
      size: 512000,
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      thumbUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200',
    },
  ]);

  return (
    <FilePicker
      listType="picture-card"
      fileList={fileList}
      onChange={(items) => setFileList(items)}
      accept="image/*"
      maxCount={4}
    />
  );
};`}
          >
            <div style={{ width: "100%" }}>
              <FilePicker
                listType="picture-card"
                fileList={pictureCardList}
                onChange={(items: CDFileItem[]): void => setPictureCardList(items)}
                accept="image/*"
                maxCount={4}
              />
            </div>
          </DemoCard>

          {/* Demo 4: Pre-populated File List & Action Controls */}
          <DemoCard
            fullWidth
            title="Controlled File List with Preview & Download"
            description="Pre-populated list showcasing image, PDF, and code categorizations with download links and one-click preview."
            code={`import { useState } from 'react';
import { CDFilePicker, Button, CDUploadIcon, type CDFileItem } from '@cinder-ui/core';

export default () => {
  const [files, setFiles] = useState<CDFileItem[]>([...]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="sm" onClick={() => setFiles([])}>Clear All</Button>
      </div>

      <CDFilePicker
        fileList={files}
        onChange={(items) => setFiles(items)}
      >
        <Button variant="primary" prefixIcon={<CDUploadIcon size={14} />}>
          Add More Files
        </Button>
      </CDFilePicker>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "560px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(): void => setControlledList([])}
                >
                  Clear All Files
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(): void =>
                    setControlledList((prev: CDFileItem[]) => [
                      ...prev,
                      {
                        uid: `mock-${Date.now()}`,
                        name: `backup-snapshot-${prev.length + 1}.zip`,
                        size: 3450000,
                        fileType: "archive",
                        status: "success",
                      },
                    ])
                  }
                >
                  Add Backup Archive
                </Button>
              </div>

              <CDFilePicker
                fileList={controlledList}
                onChange={(items: CDFileItem[]): void => setControlledList(items)}
              >
                <Button variant="primary" prefixIcon={<CDUploadIcon size={14} />}>
                  Add More Files
                </Button>
              </CDFilePicker>
            </div>
          </DemoCard>

          {/* Demo 5: File Restrictions & Size Validations */}
          <DemoCard
            fullWidth
            title="Size Limits & Format Restrictions"
            description="Strictly accept image files (accept='image/*') with a 2MB maximum file limit (maxSize={2 * 1024 * 1024}). Rejects oversized files with red error indicator."
            code={`import { CDFilePicker, CDButton } from '@cinder-ui/core';

export default () => (
  <CDFilePicker
    accept="image/*"
    maxSize={2 * 1024 * 1024} // 2MB limit
    maxCount={2}
  >
    <CDButton variant="secondary">
      Upload Image (Max 2MB)
    </CDButton>
  </CDFilePicker>
);`}
          >
            <div style={{ width: "100%", maxWidth: "480px" }}>
              <CDFilePicker
                accept="image/*"
                maxSize={2 * 1024 * 1024}
                maxCount={2}
              >
                <CDButton variant="secondary">
                  Upload Image (Max 2MB)
                </CDButton>
              </CDFilePicker>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Specification */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Specification</h2>
        <ApiTable title="CDFilePicker / FilePicker Props" data={filePickerProps} />
        <ApiTable title="CDFilePickerDragger Props" data={draggerProps} />
        <ApiTable title="CDFileItem Properties" data={fileItemProps} />
      </section>
    </div>
  );
}

export default FilePickerDocPage;
