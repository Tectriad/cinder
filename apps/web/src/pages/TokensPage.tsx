import { TokensTable } from "../components/TokensTable";

export function TokensPage() {
  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">
          Cinder Slate Design Tokens
        </h1>
        <p className="cinder-doc-lead">
          Official design token contracts for the Cinder Slate system: obsidian surfaces, precision royal blue actions, crisp slate borders, and dynamic dark and light mode duality.
        </p>
      </div>

      <TokensTable />
    </div>
  );
}
