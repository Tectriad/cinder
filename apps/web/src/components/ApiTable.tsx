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
    <div className="antd-api-section">
      <h3 className="antd-api-title">{title}</h3>
      <div className="antd-api-table-wrapper">
        <table className="antd-api-table">
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
                <td className="antd-api-prop">{item.property}</td>
                <td className="antd-api-desc">{item.description}</td>
                <td className="antd-api-type">
                  <code>{item.type}</code>
                </td>
                <td className="antd-api-default">
                  <code>{item.default || "-"}</code>
                </td>
                <td className="antd-api-version">{item.version || "0.1.0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
