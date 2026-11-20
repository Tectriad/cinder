import type { ReactElement } from "react";
import {
  CDBox,
  CDContainer,
  CDGrid,
  CDGridItem,
  CDHStack,
  CDVStack,
  CDDivider,
  CDSpacer,
  CDButton,
  CDBadge,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable, type ApiPropItem } from "../../components/ApiTable";

export function LayoutDocPage(): ReactElement {
  const boxProps: ApiPropItem[] = [
    { property: "as", description: "Polymorphic element tag ('div' | 'section' | 'article' | 'main' | ...)", type: "ElementType", default: "'div'" },
    { property: "p, px, py", description: "Padding values using spacing scale (0, 1, 2, 4, 6, 8, ... or 'sm', 'md')", type: "CDSpacingValue", default: "-" },
    { property: "m, mx, my", description: "Margin values using spacing scale", type: "CDSpacingValue", default: "-" },
    { property: "bg", description: "Semantic background surface ('canvas' | 'surface' | 'card' | 'glass')", type: "string", default: "-" },
    { property: "border", description: "Renders border using Cinder Slate token or custom CSS border", type: "boolean | string", default: "false" },
    { property: "rounded", description: "Border radius ('none' | 'sm' | 'md' | 'lg' | 'xl' | 'full')", type: "string", default: "-" },
    { property: "shadow", description: "Box shadow elevation ('none' | 'sm' | 'md' | 'lg')", type: "string", default: "-" },
    { property: "display", description: "CSS display property ('block' | 'flex' | 'grid' | 'inline-flex')", type: "string", default: "-" },
  ];

  const containerProps: ApiPropItem[] = [
    { property: "size", description: "Max-width preset ('sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid')", type: "string", default: "'xl'" },
    { property: "maxWidth", description: "Custom numeric or string max-width override", type: "number | string", default: "-" },
    { property: "gutter", description: "Horizontal padding gutter ('none' | 'sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "centered", description: "Automatically centers container with margin: 0 auto", type: "boolean", default: "true" },
  ];

  const gridProps: ApiPropItem[] = [
    { property: "columns", description: "Total column count in grid (e.g. 12, 6, 4) or template string", type: "number | string", default: "12" },
    { property: "minItemWidth", description: "Creates auto-fit minmax columns (e.g. 240 for 240px min width)", type: "number | string", default: "-" },
    { property: "gap", description: "Spacing gap between grid cells", type: "CDSpacingValue", default: "'md'" },
    { property: "rowGap, columnGap", description: "Specific row or column gap overrides", type: "CDSpacingValue", default: "-" },
  ];

  const gridItemProps: ApiPropItem[] = [
    { property: "colSpan", description: "Number of columns to span (1 to 12) or 'full'", type: "number | 'full'", default: "-" },
    { property: "rowSpan", description: "Number of rows to span", type: "number", default: "-" },
    { property: "colStart, rowStart", description: "Grid line start index", type: "number", default: "-" },
  ];

  const stackProps: ApiPropItem[] = [
    { property: "direction", description: "Flexbox direction ('row' | 'column' | 'row-reverse' | 'column-reverse')", type: "string", default: "'column'" },
    { property: "align", description: "Alignment along cross axis ('start' | 'center' | 'end' | 'stretch' | 'baseline')", type: "string", default: "-" },
    { property: "justify", description: "Distribution along main axis ('start' | 'center' | 'end' | 'between' | 'around')", type: "string", default: "-" },
    { property: "spacing / gap", description: "Gap between child items", type: "CDSpacingValue", default: "'md'" },
    { property: "divider", description: "React element injected automatically between all adjacent children", type: "ReactNode", default: "-" },
    { property: "wrap", description: "Flex wrap mode ('nowrap' | 'wrap' | 'wrap-reverse')", type: "string", default: "'nowrap'" },
  ];

  const dividerProps: ApiPropItem[] = [
    { property: "orientation", description: "Divider axis ('horizontal' | 'vertical')", type: "string", default: "'horizontal'" },
    { property: "textPlacement", description: "Text alignment inside horizontal divider ('left' | 'center' | 'right')", type: "string", default: "'center'" },
    { property: "variant", description: "Border style ('solid' | 'dashed')", type: "string", default: "'solid'" },
    { property: "plain", description: "Render lighter text weight without bold emphasis", type: "boolean", default: "false" },
  ];

  const spacerProps: ApiPropItem[] = [
    { property: "flex", description: "Flexbox flex growth property (defaults to '1 1 auto')", type: "number | string | boolean", default: "1" },
    { property: "size", description: "Fixed width and height spacing block", type: "CDSpacingValue", default: "-" },
    { property: "x, y", description: "Explicit horizontal or vertical spacing dimension", type: "CDSpacingValue", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">Layout Primitives</h1>
        <p className="antd-doc-lead">
          Spatial foundation suite featuring Box, Container, Grid, Stack (HStack &amp; VStack), Divider, and Spacer for constructing structured, responsive viewports.
        </p>

        <div className="antd-doc-import">
          <code>
            import &#123; CDBox, CDContainer, CDGrid, CDGridItem, CDStack, CDHStack, CDVStack, CDDivider, CDSpacer &#125; from &apos;@cinder-ui/core&apos;;
          </code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li><strong>CDBox</strong>: For generic layout wrappers with responsive padding, surface fills, borders, and rounded corners.</li>
          <li><strong>CDContainer</strong>: To center page content and establish maximum width bounds across standard breakpoints.</li>
          <li><strong>CDGrid</strong>: For two-dimensional multi-column layouts, dashboards, and responsive auto-fill card arrays.</li>
          <li><strong>CDStack / CDHStack / CDVStack</strong>: For linear row or column element flows with consistent gap spacing and optional divider injection.</li>
          <li><strong>CDDivider</strong>: To visually separate content sections, form groups, and toolbar button groupings.</li>
          <li><strong>CDSpacer</strong>: To flexibly push elements apart inside flex containers without calculating ad-hoc margins.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Stack & Flexbox Alignment */}
          <DemoCard
            fullWidth
            title="Stack, HStack & VStack"
            description="Linear flexbox layout with automatic gap spacing, direction switching, and automatic divider injection."
            code={`import { CDHStack, CDVStack, CDButton, CDDivider, CDBadge } from '@cinder-ui/core';

export default () => (
  <CDVStack spacing={4} align="stretch">
    <CDHStack justify="between" align="center">
      <CDHStack spacing={2} align="center">
        <span style={{ fontWeight: 600 }}>Cluster Node us-east-1</span>
        <CDBadge variant="success">Online</CDBadge>
      </CDHStack>
      <CDHStack spacing={2}>
        <CDButton size="sm" variant="secondary">Reboot</CDButton>
        <CDButton size="sm" variant="primary">Deploy</CDButton>
      </CDHStack>
    </CDHStack>

    <CDDivider />

    <CDHStack spacing={3} divider={<CDDivider orientation="vertical" />}>
      <span>CPU: 32%</span>
      <span>Memory: 4.2 GB / 16 GB</span>
      <span>Storage: 45%</span>
      <span>Uptime: 99.98%</span>
    </CDHStack>
  </CDVStack>
);`}
          >
            <div style={{ width: "100%" }}>
              <CDVStack spacing={4} align="stretch">
                <CDHStack justify="between" align="center">
                  <CDHStack spacing={2} align="center">
                    <span style={{ fontWeight: 600, color: "var(--cinder-text)" }}>Cluster Node us-east-1</span>
                    <CDBadge variant="success">Online</CDBadge>
                  </CDHStack>
                  <CDHStack spacing={2}>
                    <CDButton size="sm" variant="secondary">Reboot</CDButton>
                    <CDButton size="sm" variant="primary">Deploy</CDButton>
                  </CDHStack>
                </CDHStack>

                <CDDivider />

                <CDHStack spacing={3} divider={<CDDivider orientation="vertical" />}>
                  <span style={{ color: "var(--cinder-muted)", fontSize: "13px" }}>CPU: 32%</span>
                  <span style={{ color: "var(--cinder-muted)", fontSize: "13px" }}>Memory: 4.2 GB / 16 GB</span>
                  <span style={{ color: "var(--cinder-muted)", fontSize: "13px" }}>Storage: 45%</span>
                  <span style={{ color: "var(--cinder-muted)", fontSize: "13px" }}>Uptime: 99.98%</span>
                </CDHStack>
              </CDVStack>
            </div>
          </DemoCard>

          {/* Demo 2: Responsive Grid System */}
          <DemoCard
            fullWidth
            title="Grid & Column Spanning"
            description="12-column grid system with custom column spans (colSpan) and gap spacing."
            code={`import { CDGrid, CDGridItem, CDBox } from '@cinder-ui/core';

export default () => (
  <CDGrid columns={12} gap={3}>
    <CDGridItem colSpan={8}>
      <CDBox bg="card" p={4} rounded="md">colSpan = 8 (Primary Content)</CDBox>
    </CDGridItem>
    <CDGridItem colSpan={4}>
      <CDBox bg="card" p={4} rounded="md">colSpan = 4 (Sidebar)</CDBox>
    </CDGridItem>
    <CDGridItem colSpan={4}>
      <CDBox bg="card" p={4} rounded="md">colSpan = 4</CDBox>
    </CDGridItem>
    <CDGridItem colSpan={4}>
      <CDBox bg="card" p={4} rounded="md">colSpan = 4</CDBox>
    </CDGridItem>
    <CDGridItem colSpan={4}>
      <CDBox bg="card" p={4} rounded="md">colSpan = 4</CDBox>
    </CDGridItem>
  </CDGrid>
);`}
          >
            <div style={{ width: "100%" }}>
              <CDGrid columns={12} gap={3}>
                <CDGridItem colSpan={8}>
                  <CDBox bg="card" p={4} rounded="md" style={{ color: "var(--cinder-text)", textAlign: "center" }}>
                    colSpan = 8 (Primary Content)
                  </CDBox>
                </CDGridItem>
                <CDGridItem colSpan={4}>
                  <CDBox bg="card" p={4} rounded="md" style={{ color: "var(--cinder-text)", textAlign: "center" }}>
                    colSpan = 4 (Sidebar)
                  </CDBox>
                </CDGridItem>
                <CDGridItem colSpan={4}>
                  <CDBox bg="card" p={4} rounded="md" style={{ color: "var(--cinder-text)", textAlign: "center" }}>
                    colSpan = 4
                  </CDBox>
                </CDGridItem>
                <CDGridItem colSpan={4}>
                  <CDBox bg="card" p={4} rounded="md" style={{ color: "var(--cinder-text)", textAlign: "center" }}>
                    colSpan = 4
                  </CDBox>
                </CDGridItem>
                <CDGridItem colSpan={4}>
                  <CDBox bg="card" p={4} rounded="md" style={{ color: "var(--cinder-text)", textAlign: "center" }}>
                    colSpan = 4
                  </CDBox>
                </CDGridItem>
              </CDGrid>
            </div>
          </DemoCard>

          {/* Demo 3: Box Surfaces & Spatial Tokens */}
          <DemoCard
            fullWidth
            title="Box Surfaces & Spatial Tokens"
            description="Polymorphic Box component supporting canvas, surface, card, and frosted glass fills with padding and borders."
            code={`import { CDBox, CDHStack } from '@cinder-ui/core';

export default () => (
  <CDHStack spacing={3} wrap="wrap">
    <CDBox bg="surface" border rounded="md" p={4}>Surface Box</CDBox>
    <CDBox bg="card" rounded="md" p={4}>Card Box</CDBox>
    <CDBox bg="glass" rounded="md" p={4}>Frosted Glass Box</CDBox>
  </CDHStack>
);`}
          >
            <div style={{ width: "100%" }}>
              <CDHStack spacing={3} wrap="wrap">
                <CDBox bg="surface" border rounded="md" p={4} style={{ color: "var(--cinder-text)" }}>
                  Surface Box
                </CDBox>
                <CDBox bg="card" rounded="md" p={4} style={{ color: "var(--cinder-text)" }}>
                  Card Box
                </CDBox>
                <CDBox bg="glass" rounded="md" p={4} style={{ color: "var(--cinder-text)" }}>
                  Frosted Glass Box
                </CDBox>
              </CDHStack>
            </div>
          </DemoCard>

          {/* Demo 4: Dividers with Titles & Orientation */}
          <DemoCard
            fullWidth
            title="Dividers with Titles & Styles"
            description="Horizontal dividers with embedded text titles, left/center/right placements, and dashed line styling."
            code={`import { CDDivider, CDVStack } from '@cinder-ui/core';

export default () => (
  <CDVStack spacing={2} style={{ width: '100%' }}>
    <p style={{ margin: 0 }}>Section 1: General configuration</p>
    <CDDivider>Section Divider</CDDivider>
    <p style={{ margin: 0 }}>Section 2: Database parameters</p>
    <CDDivider textPlacement="left">Left Aligned Title</CDDivider>
    <p style={{ margin: 0 }}>Section 3: Security & firewall rules</p>
    <CDDivider variant="dashed" textPlacement="right">Dashed Border</CDDivider>
  </CDVStack>
);`}
          >
            <div style={{ width: "100%" }}>
              <CDVStack spacing={2} style={{ width: "100%" }}>
                <p style={{ margin: 0, color: "var(--cinder-text)" }}>Section 1: General configuration</p>
                <CDDivider>Section Divider</CDDivider>
                <p style={{ margin: 0, color: "var(--cinder-text)" }}>Section 2: Database parameters</p>
                <CDDivider textPlacement="left">Left Aligned Title</CDDivider>
                <p style={{ margin: 0, color: "var(--cinder-text)" }}>Section 3: Security &amp; firewall rules</p>
                <CDDivider variant="dashed" textPlacement="right">Dashed Border</CDDivider>
              </CDVStack>
            </div>
          </DemoCard>

          {/* Demo 5: Spacer & Flex Distribution */}
          <DemoCard
            fullWidth
            title="Spacer & Flex Distribution"
            description="Using CDSpacer with flex={1} to automatically push items to opposite container bounds."
            code={`import { CDBox, CDHStack, CDSpacer, CDButton, CDBadge } from '@cinder-ui/core';

export default () => (
  <CDBox bg="surface" border rounded="md" p={3} style={{ width: '100%' }}>
    <CDHStack align="center">
      <span style={{ fontWeight: 600 }}>Cinder Enterprise Engine</span>
      <CDBadge variant="primary">v0.1.0</CDBadge>
      <CDSpacer />
      <CDButton size="sm" variant="secondary">Docs</CDButton>
      <CDButton size="sm" variant="primary">Download</CDButton>
    </CDHStack>
  </CDBox>
);`}
          >
            <div style={{ width: "100%" }}>
              <CDBox bg="surface" border rounded="md" p={3} style={{ width: "100%" }}>
                <CDHStack align="center">
                  <span style={{ fontWeight: 600, color: "var(--cinder-text)" }}>Cinder Enterprise Engine</span>
                  <CDBadge variant="primary">v0.1.0</CDBadge>
                  <CDSpacer />
                  <CDButton size="sm" variant="secondary">Docs</CDButton>
                  <CDButton size="sm" variant="primary">Download</CDButton>
                </CDHStack>
              </CDBox>
            </div>
          </DemoCard>

          {/* Demo 6: Centered Container */}
          <DemoCard
            fullWidth
            title="Container Width Bounds & Gutters"
            description="CDContainer centers page content with standard maximum width presets and responsive horizontal gutters."
            code={`import { CDContainer, CDBox } from '@cinder-ui/core';

export default () => (
  <CDContainer size="md" gutter="md">
    <CDBox bg="card" p={4} rounded="md" style={{ textAlign: 'center' }}>
      Max Width: 768px (md Container)
    </CDBox>
  </CDContainer>
);`}
          >
            <div style={{ width: "100%" }}>
              <CDContainer size="md" gutter="md">
                <CDBox bg="card" p={4} rounded="md" style={{ textAlign: "center", color: "var(--cinder-text)" }}>
                  Max Width: 768px (md Container)
                </CDBox>
              </CDContainer>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Specification */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Specification</h2>
        <ApiTable title="CDBox / Box Props" data={boxProps} />
        <ApiTable title="CDContainer / Container Props" data={containerProps} />
        <ApiTable title="CDGrid / Grid Props" data={gridProps} />
        <ApiTable title="CDGridItem / GridItem Props" data={gridItemProps} />
        <ApiTable title="CDStack / Stack Props" data={stackProps} />
        <ApiTable title="CDDivider / Divider Props" data={dividerProps} />
        <ApiTable title="CDSpacer / Spacer Props" data={spacerProps} />
      </section>
    </div>
  );
}

export default LayoutDocPage;
