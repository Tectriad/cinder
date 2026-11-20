export interface ApiPropItem {
  property: string;
  description: string;
  type: string;
  default?: string;
  version?: string;
}

export interface ApiTableProps {
  title?: string;
  data: ApiPropItem[];
}

export function ApiTable({ title = "API Specification", data }: ApiTableProps) {
  return (
    <div className="cinder-api-section">
      <h3 className="cinder-api-title">{title}</h3>
      <div className="cinder-api-table-wrapper">
        <table className="cinder-api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="cinder-api-prop">{item.property}</td>
                <td className="cinder-api-desc">{item.description}</td>
                <td className="cinder-api-type">
                  <code>{item.type}</code>
                </td>
                <td className="cinder-api-default">
                  <code>{item.default || "-"}</code>
                </td>
                <td className="cinder-api-version">{item.version || "0.1.0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
