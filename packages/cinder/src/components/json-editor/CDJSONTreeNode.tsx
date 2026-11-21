import { type ReactElement } from "react";
import type { CDJSONTreeNodeProps, CDJSONValueType } from "./types";
import { getJSONValueType } from "./jsonUtils";

export function CDJSONTreeNode({
  keyName,
  value,
  depth,
  maxDepth: _maxDepth,
  expandedKeys,
  onToggleKey,
  path,
  isLastItem = false,
  searchQuery = "",
  readOnly: _readOnly = false,
  onValueChange: _onValueChange,
}: CDJSONTreeNodeProps): ReactElement {
  const valueType: CDJSONValueType = getJSONValueType(value);
  const isExpandable: boolean = valueType === "object" || valueType === "array";
  const isExpanded: boolean = expandedKeys.has(path);

  const entries: [string, unknown][] = isExpandable && value !== null && typeof value === "object"
    ? Object.entries(value as Record<string, unknown>)
    : [];

  const count: number = entries.length;

  const matchesSearch: boolean = Boolean(
    searchQuery &&
      (keyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(value).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className={`cinder-json-node ${matchesSearch ? "cinder-json-highlight" : ""}`}
      style={{ paddingLeft: depth > 0 ? "18px" : "0px" }}
    >
      <div className="cinder-json-row">
        {isExpandable ? (
          <button
            type="button"
            className={`cinder-json-caret ${isExpanded ? "cinder-json-caret-expanded" : ""}`}
            onClick={() => onToggleKey(path)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ) : (
          <span className="cinder-json-caret-spacer" />
        )}

        {keyName !== undefined && (
          <span className="cinder-json-key">
            "{keyName}":
          </span>
        )}

        {isExpandable ? (
          <span className="cinder-json-summary" onClick={() => onToggleKey(path)}>
            <span className="cinder-json-bracket">{valueType === "array" ? "[" : "{"}</span>
            {!isExpanded && (
              <>
                <span className="cinder-json-collapsed-text">
                  {count} {count === 1 ? "item" : "items"}
                </span>
                <span className="cinder-json-bracket">{valueType === "array" ? "]" : "}"}</span>
              </>
            )}
            <span className={`cinder-json-type-badge cinder-json-type-${valueType}`}>
              {valueType}
            </span>
          </span>
        ) : (
          <span className="cinder-json-value-wrapper">
            <span className={`cinder-json-value cinder-json-val-${valueType}`}>
              {valueType === "string" ? `"${String(value)}"` : String(value)}
            </span>
            <span className={`cinder-json-type-badge cinder-json-type-${valueType}`}>
              {valueType}
            </span>
          </span>
        )}

        {!isLastItem && !isExpandable && <span className="cinder-json-comma">,</span>}
      </div>

      {isExpandable && isExpanded && (
        <div className="cinder-json-children">
          {entries.map(([childKey, childVal]: [string, unknown], index: number) => {
            const childPath: string = path ? `${path}.${childKey}` : childKey;
            const isLast: boolean = index === entries.length - 1;
            return (
              <CDJSONTreeNode
                key={childKey}
                keyName={childKey}
                value={childVal}
                depth={depth + 1}
                maxDepth={_maxDepth}
                expandedKeys={expandedKeys}
                onToggleKey={onToggleKey}
                path={childPath}
                isLastItem={isLast}
                searchQuery={searchQuery}
                readOnly={_readOnly}
                onValueChange={_onValueChange}
              />
            );
          })}
          <div className="cinder-json-closing-row">
            <span className="cinder-json-caret-spacer" />
            <span className="cinder-json-bracket">
              {valueType === "array" ? "]" : "}"}
            </span>
            {!isLastItem && <span className="cinder-json-comma">,</span>}
          </div>
        </div>
      )}
    </div>
  );
}
