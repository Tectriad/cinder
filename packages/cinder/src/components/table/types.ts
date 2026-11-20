import type { ReactNode, CSSProperties, MouseEvent } from "react";

export type CDTableSortOrder = "ascend" | "descend" | null;
export type CDTableAlign = "left" | "center" | "right";
export type CDTableSize = "sm" | "md" | "lg";

export interface CDTableColumn<T = any> {
  /** Header title text or element */
  title: ReactNode;
  /** Property key on the record object to display */
  dataIndex?: string;
  /** Unique key for the column */
  key?: string;
  /** Column width in px or percentage string */
  width?: number | string;
  /** Content alignment */
  align?: CDTableAlign;
  /** Enable column sorting or custom comparator function */
  sorter?: boolean | ((a: T, b: T) => number);
  /** Default sort order */
  defaultSortOrder?: CDTableSortOrder;
  /** Truncate cell text with an ellipsis */
  ellipsis?: boolean;
  /** Custom cell render function */
  render?: (value: any, record: T, index: number) => ReactNode;
  /** Column header style */
  headerStyle?: CSSProperties;
}

export interface CDTableRowSelection<T = any> {
  /** Currently selected row keys */
  selectedRowKeys: (string | number)[];
  /** Change callback */
  onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  /** Disable checkbox for specific records */
  getCheckboxProps?: (record: T) => { disabled?: boolean };
}

export interface CDTablePagination {
  /** Current page index (1-based) */
  current?: number;
  /** Items per page */
  pageSize?: number;
  /** Total count of items across all pages */
  total?: number;
  /** Page change callback */
  onChange?: (page: number, pageSize: number) => void;
  /** Hide pagination if total <= pageSize */
  hideOnSinglePage?: boolean;
}

export interface CDTableProps<T = any> {
  /** Array of column configurations */
  columns: CDTableColumn<T>[];
  /** Array of data records */
  dataSource: T[];
  /** Primary key field name or key extractor */
  rowKey?: string | ((record: T) => string | number);
  /** Row selection config (checkbox selection) */
  rowSelection?: CDTableRowSelection<T>;
  /** Pagination config, or false to disable */
  pagination?: CDTablePagination | false;
  /** Loading overlay spinner */
  loading?: boolean;
  /** Border outline and grid lines */
  bordered?: boolean;
  /** Alternating row zebra striping */
  striped?: boolean;
  /** Highlight row on hover */
  hoverable?: boolean;
  /** Table density size */
  size?: CDTableSize;
  /** Empty state message */
  emptyText?: ReactNode;
  /** Row event handler */
  onRow?: (record: T, index: number) => {
    onClick?: (e: MouseEvent<HTMLTableRowElement>) => void;
    className?: string;
    style?: CSSProperties;
  };
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}
