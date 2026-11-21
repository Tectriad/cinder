import { useState, type ReactElement } from "react";
import { CDCodeEditor, Badge } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function CodeEditorDocPage(): ReactElement {
  const [code, setCode] = useState<string>(
    `import { createClient } from "@cinder/telemetry";\n\nexport async function streamMetrics(endpoint: string) {\n  const client = createClient({ endpoint, timeoutMs: 5000 });\n  const stream = await client.connect();\n  stream.on("data", (chunk: number[]) => {\n    console.log("Packet received:", chunk.length);\n  });\n}`
  );

  const apiProps = [
    { property: "value", description: "Source code text content", type: "string", default: "-" },
    { property: "language", description: "Language for syntax highlighting ('typescript' | 'javascript' | 'json' | 'html' | 'css' | 'python' | 'sql')", type: "string", default: "'typescript'" },
    { property: "showLineNumbers", description: "Whether to render line numbers gutter", type: "boolean", default: "true" },
    { property: "tabSize", description: "Number of spaces for tab indentation", type: "number", default: "2" },
    { property: "readOnly", description: "Whether editor is read-only", type: "boolean", default: "false" },
    { property: "height", description: "Canvas viewport height", type: "number | string", default: "320" },
    { property: "onChange", description: "Callback fired when code text changes", type: "function", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">Code Editor</h1>
        <p className="cinder-doc-lead">
          Lightweight, GPU-accelerated code editing component featuring synchronized line numbers gutter, multi-language regex tokenization, tab indentation handling, and Cinder Slate dark/light theme styling.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDCodeEditor &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>Developer Scripting</strong>: Embedding SQL query builders, automation runners, and API webhook handlers.</li>
          <li><strong>Code Snippets with Editing</strong>: Interactive documentation playgrounds and code review interfaces.</li>
          <li><strong>Zero-Dependency Weight</strong>: High-speed code display without large external Monaco or CodeMirror bundles.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            fullWidth
            title="TypeScript Source Editor"
            description="Active line indicator, tab key indentation, language switcher, and copy to clipboard."
            code={`import { CDCodeEditor } from '@cinder-ui/core';

export default () => (
  <CDCodeEditor
    title="Worker Function"
    language="typescript"
    height={280}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDCodeEditor
                title="Worker Pipeline"
                value={code}
                onChange={(newCode) => setCode(newCode)}
                language="typescript"
                height={280}
                extra={
                  <Badge variant="primary">
                    JetBrains Mono
                  </Badge>
                }
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable data={apiProps} />
      </section>
    </div>
  );
}
