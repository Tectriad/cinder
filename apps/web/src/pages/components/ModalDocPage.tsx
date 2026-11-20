import { useState, type ReactElement } from "react";
import { CDModal, Modal, Dialog, CDButton } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function ModalDocPage(): ReactElement {
  const [basicOpen, setBasicOpen] = useState<boolean>(false);
  const [loadingOpen, setLoadingOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const handleLoadingOk = (): void => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setLoadingOpen(false);
    }, 1500);
  };

  const modalProps = [
    { property: "open", description: "Whether the modal dialog is visible", type: "boolean", default: "false" },
    { property: "onClose", description: "Callback fired when modal requests to close", type: "() => void", default: "-" },
    { property: "title", description: "Primary title in modal header", type: "ReactNode", default: "-" },
    { property: "description", description: "Descriptive subtitle copy below title", type: "ReactNode", default: "-" },
    { property: "centered", description: "Vertically center dialog in viewport", type: "boolean", default: "true" },
    { property: "width", description: "Dialog width (number in px or string)", type: "number | string", default: "520" },
    { property: "closable", description: "Whether to display the top-right close icon", type: "boolean", default: "true" },
    { property: "maskClosable", description: "Whether clicking background mask closes modal", type: "boolean", default: "true" },
    { property: "confirmLoading", description: "Loading spinner state on primary OK button", type: "boolean", default: "false" },
    { property: "okText", description: "Text for confirm action button", type: "ReactNode", default: "'Confirm'" },
    { property: "cancelText", description: "Text for cancel action button", type: "ReactNode", default: "'Cancel'" },
    { property: "footer", description: "Custom footer buttons, or false to hide", type: "ReactNode | boolean", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDModal / Modal / Dialog</h1>
        <p className="antd-doc-lead">
          Modal dialog overlay rendered into a body portal with background blur, focus isolation, and smooth spring animations.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDModal, Modal, Dialog &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>When requiring immediate user interaction without leaving the current screen context.</li>
          <li>For confirmations, configuration dialogs, authentication prompts, or data inspection.</li>
          <li>Never clipped by parent card bounds because it renders into `document.body` via a portal.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic Modal */}
          <DemoCard
            title="Basic Modal Dialog"
            description="Simple dialog with title, description, and standard Confirm / Cancel footer."
            code={`import { useState } from 'react';
import { CDModal, CDButton } from '@cinder-ui/core';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CDButton variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </CDButton>

      <CDModal
        open={open}
        onClose={() => setOpen(false)}
        title="Project Configuration"
        description="Configure your environment variables and deployment pipeline settings."
        onOk={() => setOpen(false)}
      >
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--cinder-muted)' }}>
          Environment tokens will be encrypted using AES-256 before being distributed to edge compute clusters.
        </p>
      </CDModal>
    </>
  );
};`}
          >
            <CDButton variant="primary" onClick={(): void => setBasicOpen(true)}>
              Open Basic Modal
            </CDButton>

            <CDModal
              open={basicOpen}
              onClose={(): void => setBasicOpen(false)}
              title="Project Configuration"
              description="Configure your environment variables and deployment pipeline settings."
              onOk={(): void => setBasicOpen(false)}
            >
              <p style={{ margin: 0, fontSize: "14px", color: "var(--cinder-muted)" }}>
                Environment tokens will be encrypted using AES-256 before being distributed to
                edge compute clusters. Changes take effect on next git push.
              </p>
            </CDModal>
          </DemoCard>

          {/* Demo 2: Asynchronous Confirm Loading */}
          <DemoCard
            title="Asynchronous Action"
            description="Primary action button displays an accessible spinner while processing."
            code={`import { useState } from 'react';
import { Modal, CDButton } from '@cinder-ui/core';

export default () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <>
      <CDButton variant="secondary" onClick={() => setOpen(true)}>
        Deploy with Progress
      </CDButton>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Deploy to Global Edge"
        confirmLoading={loading}
        okText="Deploy Now"
        onOk={handleOk}
      >
        <p style={{ margin: 0, color: 'var(--cinder-muted)' }}>
          Clicking Deploy Now will initiate continuous rollout across 18 edge datacenters.
        </p>
      </Modal>
    </>
  );
};`}
          >
            <CDButton variant="secondary" onClick={(): void => setLoadingOpen(true)}>
              Deploy with Progress
            </CDButton>

            <Modal
              open={loadingOpen}
              onClose={(): void => setLoadingOpen(false)}
              title="Deploy to Global Edge"
              confirmLoading={confirmLoading}
              okText="Deploy Now"
              onOk={handleLoadingOk}
            >
              <p style={{ margin: 0, color: "var(--cinder-muted)" }}>
                Clicking Deploy Now will initiate continuous rollout across 18 edge datacenters.
              </p>
            </Modal>
          </DemoCard>

          {/* Demo 3: Destructive Confirmation */}
          <DemoCard
            title="Destructive Confirmation Dialog"
            description="Dialog asking for critical user confirmation before permanent resource deletion."
            code={`import { useState } from 'react';
import { Dialog, CDButton } from '@cinder-ui/core';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CDButton variant="danger" onClick={() => setOpen(true)}>
        Delete Database
      </CDButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Production Database?"
        description="This action cannot be undone. All tables, backups, and point-in-time snapshots will be purged."
        okText="Delete Permanently"
        onOk={() => setOpen(false)}
      >
        <p style={{ margin: 0, color: 'var(--cinder-danger)' }}>
          Please ensure all active connections are drained before proceeding.
        </p>
      </Dialog>
    </>
  );
};`}
          >
            <CDButton variant="danger" onClick={(): void => setDeleteOpen(true)}>
              Delete Database
            </CDButton>

            <Dialog
              open={deleteOpen}
              onClose={(): void => setDeleteOpen(false)}
              title="Delete Production Database?"
              description="This action cannot be undone. All tables, backups, and point-in-time snapshots will be purged."
              okText="Delete Permanently"
              onOk={(): void => setDeleteOpen(false)}
            >
              <p style={{ margin: 0, color: "var(--cinder-danger)" }}>
                Please ensure all active connections are drained before proceeding.
              </p>
            </Dialog>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={modalProps} />
      </section>
    </div>
  );
}
