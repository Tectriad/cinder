import { TokensTable } from "../components/TokensTable";

export function TokensPage() {
  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">
          Cinder Slate Design Tokens
        </h1>
        <p className="antd-doc-lead">
          Official design token contracts for the Cinder Slate system: obsidian surfaces, precision royal blue actions, crisp slate borders, and dynamic dark and light mode duality.
        </p>
      </div>

      <TokensTable />
    </div>
  );
}
