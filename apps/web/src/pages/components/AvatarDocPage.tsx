import type { ReactElement } from "react";
import { CDAvatar, Avatar, AvatarGroup, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function AvatarDocPage(): ReactElement {
  const avatarProps = [
    { property: "src", description: "Image source URL", type: "string", default: "-" },
    { property: "alt", description: "Alt text for accessibility", type: "string", default: "'Avatar'" },
    { property: "size", description: "Size preset ('xs' | 'sm' | 'md' | 'lg' | 'xl') or numeric pixels", type: "string | number", default: "'md'" },
    { property: "shape", description: "Visual shape ('circle' | 'square')", type: "'circle' | 'square'", default: "'circle'" },
    { property: "icon", description: "Fallback icon element", type: "ReactNode", default: "-" },
    { property: "status", description: "Presence dot ('online' | 'offline' | 'busy' | 'away')", type: "string", default: "-" },
    { property: "statusPosition", description: "Position of status badge ('bottom-right' | 'top-right')", type: "string", default: "'bottom-right'" },
    { property: "children", description: "Monogram initials string when image is omitted", type: "ReactNode", default: "-" },
  ];

  const groupProps = [
    { property: "maxCount", description: "Maximum number of avatars before showing '+N' overflow pill", type: "number", default: "-" },
    { property: "size", description: "Size cascaded to child avatars", type: "string | number", default: "'md'" },
    { property: "shape", description: "Shape cascaded to child avatars", type: "'circle' | 'square'", default: "'circle'" },
    { property: "children", description: "Child avatar elements to group together", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDAvatar / Avatar</h1>
        <p className="antd-doc-lead">
          Visual representation of a user identity, profile entity, or cluster node with images, fallback icons, and monogram initials.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDAvatar, Avatar, AvatarGroup &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>To show user profile images in navbars, cards, and list items.</li>
          <li>For initial monograms when an image fails or is unavailable.</li>
          <li>For overlapping avatar stacks in collaborative workspaces.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic Avatars */}
          <DemoCard
            title="Basic Visual Content"
            description="Avatars displaying monogram initials, vector icons, or remote profile images."
            code={`import { CDAvatar, Avatar, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <CDAvatar>JD</CDAvatar>
    <Avatar icon={<CDIcons.User size="sm" />} />
    <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
    <Avatar shape="square">OP</Avatar>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <CDAvatar>JD</CDAvatar>
              <Avatar icon={<CDIcons.User size="sm" />} />
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
              <Avatar shape="square">OP</Avatar>
            </div>
          </DemoCard>

          {/* Demo 2: Size Presets */}
          <DemoCard
            title="Size Presets"
            description="Configurable sizing from compact 20px (xs) to prominent 56px (xl)."
            code={`import { Avatar } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Avatar size="xs">XS</Avatar>
    <Avatar size="sm">SM</Avatar>
    <Avatar size="md">MD</Avatar>
    <Avatar size="lg">LG</Avatar>
    <Avatar size="xl">XL</Avatar>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Avatar size="xs">XS</Avatar>
              <Avatar size="sm">SM</Avatar>
              <Avatar size="md">MD</Avatar>
              <Avatar size="lg">LG</Avatar>
              <Avatar size="xl">XL</Avatar>
            </div>
          </DemoCard>

          {/* Demo 3: Online Status Presence */}
          <DemoCard
            title="Status Badges"
            description="Presence indicators showing online, busy, away, or offline states."
            code={`import { Avatar } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Avatar status="online">ON</Avatar>
    <Avatar status="busy">BU</Avatar>
    <Avatar status="away">AW</Avatar>
    <Avatar status="offline">OF</Avatar>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Avatar status="online">ON</Avatar>
              <Avatar status="busy">BU</Avatar>
              <Avatar status="away">AW</Avatar>
              <Avatar status="offline">OF</Avatar>
            </div>
          </DemoCard>

          {/* Demo 4: Overlapping Avatar Group */}
          <DemoCard
            title="Avatar Group with Overflow"
            description="Stacks multiple avatars with boundary border rings and a +N overflow counter."
            code={`import { Avatar, AvatarGroup } from '@cinder-ui/core';

export default () => (
  <AvatarGroup maxCount={3} size="md">
    <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
    <Avatar>AL</Avatar>
    <Avatar>TC</Avatar>
    <Avatar>RK</Avatar>
    <Avatar>MN</Avatar>
  </AvatarGroup>
);`}
          >
            <AvatarGroup maxCount={3} size="md">
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
              <Avatar>AL</Avatar>
              <Avatar>TC</Avatar>
              <Avatar>RK</Avatar>
              <Avatar>MN</Avatar>
            </AvatarGroup>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="CDAvatarProps API" data={avatarProps} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable title="CDAvatarGroupProps API" data={groupProps} />
        </div>
      </section>
    </div>
  );
}
