import {
  useState,
  useMemo,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
} from "react";
import { cn } from "../../utils/cn";
import { CDCheckbox } from "../checkbox";
import { CDSpinner } from "../spinner";
import { CDButton } from "../button";
import type {
  CDTableProps,
  CDTableColumn,
  CDTableSortOrder,
} from "./types";

interface SortState {
  columnKey: string | null;
  order: CDTableSortOrder;
}

/**
 * Caret sorting indicator icons
 */
function SortIcon({ order }: { order: CDTableSortOrder }): ReactElement {
  return (
    <span className="cinder-table-sorter">
      <svg
        className={cn(
          "cinder-table-sorter-up",
          order === "ascend" && "active"
        )}
        width="9"
        height="5"
        viewBox="0 0 9 5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.5 0L9 5H0L4.5 0Z" />
      </svg>
      <svg
        className={cn(
          "cinder-table-sorter-down",
          order === "descend" && "active"
        )}
        width="9"
        height="5"
        viewBox="0 0 9 5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.5 5L0 0H9L4.5 5Z" />
      </svg>
    </span>
  );
}

/**
 * CDTable / Table / CDDataGrid / DataGrid
 *
 * Enterprise data grid with sorting, pagination, row selection, and loading state.
 */
export function CDTable<T extends Record<string, any> = Record<string, any>>({
  columns,
  dataSource = [],
  rowKey = "id",
  rowSelection,
  pagination = {},
  loading = false,
  bordered = true,
  striped = false,
  hoverable = true,
  size = "md",
  emptyText = "No data records found",
  onRow,
  className,
  style,
}: CDTableProps<T>): ReactElement {
  // Sort state
  const [sortState, setSortState] = useState<SortState>({
    columnKey: null,
    order: null,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(
    pagination ? pagination.current || 1 : 1
  );
  const pageSize: number = pagination ? pagination.pageSize || 10 : 10;

  // Resolve row key helper
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === "function") return rowKey(record);
    if (record[rowKey] !== undefined) return record[rowKey];
    return index;
  };

  // Handle column sort toggle
  const handleSortClick = (col: CDTableColumn<T>): void => {
    if (!col.sorter) return;
    const key = col.key || col.dataIndex || "";

    let nextOrder: CDTableSortOrder = "ascend";
    if (sortState.columnKey === key) {
      if (sortState.order === "ascend") nextOrder = "descend";
      else if (sortState.order === "descend") nextOrder = null;
    }

    setSortState({
      columnKey: nextOrder ? key : null,
      order: nextOrder,
    });
  };

  // Process sorting
  const sortedData = useMemo<T[]>(() => {
    if (!sortState.columnKey || !sortState.order) return dataSource;

    const targetColumn = columns.find(
      (c) => (c.key || c.dataIndex) === sortState.columnKey
    );
    if (!targetColumn || !targetColumn.sorter) return dataSource;

    const dataCopy = [...dataSource];
    if (typeof targetColumn.sorter === "function") {
      const sorterFn = targetColumn.sorter;
      dataCopy.sort((a, b) => {
        const res = sorterFn(a, b);
        return sortState.order === "ascend" ? res : -res;
      });
    } else {
      const dataIndex = targetColumn.dataIndex || sortState.columnKey;
      dataCopy.sort((a, b) => {
        const valA = a[dataIndex];
        const valB = b[dataIndex];
        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        const res = valA > valB ? 1 : -1;
        return sortState.order === "ascend" ? res : -res;
      });
    }

    return dataCopy;
  }, [dataSource, columns, sortState]);

  // Process pagination slice
  const paginatedData = useMemo<T[]>(() => {
    if (pagination === false) return sortedData;
    const startIdx: number = (currentPage - 1) * pageSize;
    return sortedData.slice(startIdx, startIdx + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  // Row selection helpers
  const allCurrentKeys: (string | number)[] = paginatedData.map(getRowKey);
  const selectedKeys: (string | number)[] = rowSelection?.selectedRowKeys || [];
  const isAllSelected: boolean =
    allCurrentKeys.length > 0 &&
    allCurrentKeys.every((k) => selectedKeys.includes(k));
  const isPartiallySelected: boolean =
    !isAllSelected && allCurrentKeys.some((k) => selectedKeys.includes(k));

  const handleSelectAll = (checked: boolean): void => {
    if (!rowSelection) return;
    if (checked) {
      const combined = Array.from(new Set([...selectedKeys, ...allCurrentKeys]));
      const selectedRows = dataSource.filter((item, idx) =>
        combined.includes(getRowKey(item, idx))
      );
      rowSelection.onChange(combined, selectedRows);
    } else {
      const nextKeys = selectedKeys.filter((k) => !allCurrentKeys.includes(k));
      const selectedRows = dataSource.filter((item, idx) =>
        nextKeys.includes(getRowKey(item, idx))
      );
      rowSelection.onChange(nextKeys, selectedRows);
    }
  };

  const handleRowSelect = (key: string | number, checked: boolean): void => {
    if (!rowSelection) return;
    let nextKeys: (string | number)[];
    if (checked) {
      nextKeys = [...selectedKeys, key];
    } else {
      nextKeys = selectedKeys.filter((k) => k !== key);
    }
    const selectedRows = dataSource.filter((item, idx) =>
      nextKeys.includes(getRowKey(item, idx))
    );
    rowSelection.onChange(nextKeys, selectedRows);
  };

  // Pagination page count
  const totalItems: number = pagination && pagination.total !== undefined ? pagination.total : sortedData.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / pageSize));

  const handlePageChange = (p: number): void => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    if (pagination && pagination.onChange) {
      pagination.onChange(p, pageSize);
    }
  };

  return (
    <div
      style={style}
      className={cn(
        "cinder-table-wrapper",
        `cinder-table-${size}`,
        bordered && "cinder-table-bordered",
        className
      )}
    >
      <div className="cinder-table-container">
        {loading && (
          <div className="cinder-table-loading-mask">
            <CDSpinner size="md" />
          </div>
        )}

        <table className={cn("cinder-table", striped && "cinder-table-striped")}>
          <thead className="cinder-table-thead">
            <tr>
              {rowSelection && (
                <th className="cinder-table-th cinder-table-selection-col">
                  <CDCheckbox
                    checked={isAllSelected}
                    indeterminate={isPartiallySelected}
                    onChange={(checked: boolean): void => handleSelectAll(checked)}
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {columns.map((col: CDTableColumn<T>, colIdx: number) => {
                const colKey = col.key || col.dataIndex || `col-${colIdx}`;
                const isSorted = sortState.columnKey === colKey;
                const alignClass = col.align ? `cinder-table-align-${col.align}` : "";

                return (
                  <th
                    key={colKey}
                    style={{ width: col.width, ...col.headerStyle }}
                    onClick={(): void => handleSortClick(col)}
                    className={cn(
                      "cinder-table-th",
                      alignClass,
                      col.sorter && "cinder-table-th-sortable"
                    )}
                  >
                    <div className="cinder-table-th-content">
                      <span className="cinder-table-th-title">{col.title}</span>
                      {col.sorter && (
                        <SortIcon order={isSorted ? sortState.order : null} />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="cinder-table-tbody">
            {paginatedData.length === 0 ? (
              <tr className="cinder-table-empty-row">
                <td
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className="cinder-table-empty-cell"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((record: T, rowIdx: number) => {
                const key = getRowKey(record, rowIdx);
                const isSelected: boolean = selectedKeys.includes(key);
                const rowProps = onRow?.(record, rowIdx);

                return (
                  <tr
                    key={key}
                    onClick={rowProps?.onClick}
                    style={rowProps?.style}
                    className={cn(
                      "cinder-table-row",
                      isSelected && "cinder-table-row-selected",
                      hoverable && "cinder-table-row-hoverable",
                      rowProps?.className
                    )}
                  >
                    {rowSelection && (
                      <td
                        className="cinder-table-td cinder-table-selection-col"
                        onClick={(e: MouseEvent<HTMLTableCellElement>): void =>
                          e.stopPropagation()
                        }
                      >
                        <CDCheckbox
                          checked={isSelected}
                          disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                          onChange={(checked: boolean): void =>
                            handleRowSelect(key, checked)
                          }
                          aria-label={`Select row ${rowIdx + 1}`}
                        />
                      </td>
                    )}

                    {columns.map((col: CDTableColumn<T>, colIdx: number) => {
                      const colKey = col.key || col.dataIndex || `cell-${colIdx}`;
                      const rawValue = col.dataIndex ? record[col.dataIndex] : undefined;
                      const cellContent: ReactNode = col.render
                        ? col.render(rawValue, record, rowIdx)
                        : (rawValue as ReactNode);
                      const alignClass = col.align ? `cinder-table-align-${col.align}` : "";

                      return (
                        <td
                          key={colKey}
                          className={cn(
                            "cinder-table-td",
                            alignClass,
                            col.ellipsis && "cinder-table-ellipsis"
                          )}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination !== false && totalPages > 1 && (
        <div className="cinder-table-pagination">
          <span className="cinder-table-pagination-total">
            Page {currentPage} of {totalPages} ({totalItems} items)
          </span>
          <div className="cinder-table-pagination-actions">
            <CDButton
              size="sm"
              variant="secondary"
              disabled={currentPage <= 1}
              onClick={(): void => handlePageChange(currentPage - 1)}
            >
              Previous
            </CDButton>
            <CDButton
              size="sm"
              variant="secondary"
              disabled={currentPage >= totalPages}
              onClick={(): void => handlePageChange(currentPage + 1)}
            >
              Next
            </CDButton>
          </div>
        </div>
      )}
    </div>
  );
}

CDTable.displayName = "CDTable";

// Backward-compatible aliases
export const Table = CDTable;
export const CDDataGrid = CDTable;
export const DataGrid = CDTable;
