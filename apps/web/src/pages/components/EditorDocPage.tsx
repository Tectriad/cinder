import { useState, type ReactElement } from "react";
import {
  CDEditor,
  type CDEditorMentionUser,
  type CDEditorComment,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

const SAMPLE_MENTIONS: CDEditorMentionUser[] = [
  { id: "usr_1", name: "Alex Morgan", handle: "alex", role: "Design Lead" },
  { id: "usr_2", name: "Sarah Chen", handle: "sarah", role: "Frontend Architect" },
  { id: "usr_3", name: "Marcus Brody", handle: "marcus", role: "Product Manager" },
  { id: "usr_4", name: "Elena Rostova", handle: "elena", role: "Design Systems" },
  { id: "usr_5", name: "Devon Vance", handle: "devon", role: "Fullstack Eng" },
];

const INITIAL_RICH_CONTENT = `
<h2>Cinder Rich Text Editor</h2>
<p>Welcome to <strong>Cinder UI's</strong> advanced rich text editor. It features comprehensive formatting, ordered and Roman numeral lists, color palettes, and <em>collaborative @ annotations</em>.</p>
<ol style="list-style-type: decimal;">
  <li>First primary milestone item</li>
  <li>Second deployment check</li>
  <li>Production signoff</li>
</ol>
<p>You can also create formal Roman numeral hierarchies:</p>
<ol style="list-style-type: lower-roman;">
  <li>Design token audit and consistency</li>
  <li>Zero-emoji automated pipeline validation</li>
  <li>Headless accessibility review</li>
</ol>
<p>Try tagging team members like <span class="cinder-editor-mention" contenteditable="false" data-mention-id="usr_1">@Alex Morgan</span> or <span class="cinder-editor-mention" contenteditable="false" data-mention-id="usr_2">@Sarah Chen</span> by typing <code>@</code> anywhere!</p>
`;

export function EditorDocPage(): ReactElement {
  const [editorHtml, setEditorHtml] = useState<string>(INITIAL_RICH_CONTENT);
  const [recentMention, setRecentMention] = useState<string>("None yet");
  const [commentsList, setCommentsList] = useState<CDEditorComment[]>([
    {
      id: "cmt_1",
      author: "Sarah Chen",
      text: "Ensure the Roman list uses lowercase numerals for sub-clauses.",
      timestamp: "10m ago",
      rangeText: "Roman numeral hierarchies",
    },
  ]);

  const editorProps = [
    { property: "value", description: "Controlled HTML content string", type: "string", default: "-" },
    { property: "defaultValue", description: "Initial default HTML content for uncontrolled usage", type: "string", default: "''" },
    { property: "onChange", description: "Callback triggered when editor content changes with new HTML", type: "(html: string) => void", default: "-" },
    { property: "placeholder", description: "Placeholder text rendered when the editor surface is empty", type: "string", default: "'Write something brilliant...'" },
    { property: "minHeight", description: "Minimum height of the editing area in px or CSS string", type: "number | string", default: "220" },
    { property: "maxHeight", description: "Maximum height threshold before vertical scrolling activates", type: "number | string", default: "-" },
    { property: "mentions", description: "Array of collaborator objects available for @ autocomplete suggestions", type: "CDEditorMentionUser[]", default: "Default collaborators" },
    { property: "onMentionSelect", description: "Callback fired when a collaborator @ mention is inserted", type: "(user: CDEditorMentionUser) => void", default: "-" },
    { property: "comments", description: "Array of active comment annotations", type: "CDEditorComment[]", default: "[]" },
    { property: "onCommentAdd", description: "Callback fired when user creates a new comment on highlighted text", type: "(comment: CDEditorComment) => void", default: "-" },
    { property: "onCommentResolve", description: "Callback fired when user resolves/deletes a comment annotation", type: "(commentId: string) => void", default: "-" },
    { property: "showToolbar", description: "Whether to display the top formatting toolbar", type: "boolean", default: "true" },
    { property: "showStatusBar", description: "Whether to render bottom status bar with word/char counter", type: "boolean", default: "true" },
    { property: "showWordCount", description: "Display live word and character counters", type: "boolean", default: "true" },
    { property: "disabled", description: "Disables interaction and dims the editor", type: "boolean", default: "false" },
    { property: "readOnly", description: "Hides toolbar and prevents content editing", type: "boolean", default: "false" },
    { property: "variant", description: "Visual frame variant ('default' | 'bordered' | 'filled' | 'ghost')", type: "string", default: "'default'" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDEditor / Editor</h1>
        <p className="cinder-doc-lead">
          Enterprise rich text editor engine equipped with bold, italic, underline, ordered lists (decimal and Roman numerals), bullet points, code blocks, color palettes, and interactive @ mentions with comment annotations.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDEditor, Editor &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>For rich document authoring, technical documentation, design system specs, and release notes.</li>
          <li>When collaborative document workflows require tagging team members with <code>@</code> mentions.</li>
          <li>When editors require structured list types such as decimal (1, 2, 3) and formal Roman numerals (i, ii, iii).</li>
          <li>For leaving contextual comment annotations on highlighted text passages.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Full-Featured Collaborative Editor */}
          <DemoCard
            fullWidth
            title="Interactive Rich Text Editor with Mentions & Comments"
            description="Type @ to trigger the collaborator autocomplete popup. Highlight text and click the comment icon to leave a contextual annotation. Use the toolbar for bold, italic, underline, Roman lists, and colors."
            code={`import { useState } from 'react';
import { CDEditor, type CDEditorMentionUser, type CDEditorComment } from '@cinder-ui/core';

export default () => {
  const [html, setHtml] = useState('<p>Hello world!</p>');
  const mentions = [
    { id: 'usr_1', name: 'Alex Morgan', handle: 'alex', role: 'Design Lead' },
    { id: 'usr_2', name: 'Sarah Chen', handle: 'sarah', role: 'Frontend Architect' },
  ];

  return (
    <CDEditor
      value={html}
      onChange={setHtml}
      mentions={mentions}
      onMentionSelect={(user) => console.log('Mentioned:', user.name)}
      onCommentAdd={(cmt) => console.log('Added comment:', cmt)}
      onCommentResolve={(id) => console.log('Resolved comment:', id)}
      minHeight={240}
    />
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}>
              <CDEditor
                value={editorHtml}
                onChange={setEditorHtml}
                mentions={SAMPLE_MENTIONS}
                comments={commentsList}
                onMentionSelect={(user: CDEditorMentionUser) => setRecentMention(`@${user.name} (${user.role})`)}
                onCommentAdd={(cmt: CDEditorComment) => setCommentsList((prev: CDEditorComment[]) => [...prev, cmt])}
                onCommentResolve={(id: string) => setCommentsList((prev: CDEditorComment[]) => prev.filter((c: CDEditorComment) => c.id !== id))}
                minHeight={240}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  backgroundColor: "var(--cinder-surface)",
                  border: "1px solid var(--cinder-border)",
                  fontSize: "12px",
                }}
              >
                <span>
                  Last Mentioned: <strong style={{ color: "var(--cinder-primary)" }}>{recentMention}</strong>
                </span>
                <span>
                  Active Annotations: <strong>{commentsList.length}</strong>
                </span>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Roman & Ordered Lists */}
          <DemoCard
            fullWidth
            title="Decimal & Roman Numeral Ordered Lists"
            description="Supports both standard 1, 2, 3 numbered lists and legal/academic lower-case Roman numeral lists (i, ii, iii) with automated indentation and styling."
            code={`import { CDEditor } from '@cinder-ui/core';

export default () => (
  <CDEditor
    defaultValue="<h3>Milestones</h3><ol style='list-style-type: decimal;'><li>Alpha</li><li>Beta</li></ol><h3>Sub-clauses</h3><ol style='list-style-type: lower-roman;'><li>Specification</li><li>Execution</li></ol>"
    minHeight={160}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDEditor
                defaultValue="<h3>Project Phases</h3><ol style='list-style-type: decimal;'><li>Discovery &amp; Architectural RFC</li><li>Design token definition in Cinder Slate</li><li>Zero-compromise component implementation</li></ol><h3>Detailed Clauses</h3><ol style='list-style-type: lower-roman;'><li>Strict TypeScript typing without implicit any</li><li>Strict 500-line modular file limits</li><li>Comprehensive keyboard accessibility standards</li></ol>"
                minHeight={170}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable data={editorProps} />
      </section>
    </div>
  );
}
