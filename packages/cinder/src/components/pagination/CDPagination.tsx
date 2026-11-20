import {
  forwardRef,
  useState,
  type ReactElement,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import {
  CDChevronLeftIcon,
  CDChevronRightIcon,
  CDArrowLeftIcon,
  CDArrowRightIcon,
} from "../icon";
import { cn } from "../../utils/cn";
import type { CDPaginationProps } from "./types";

export const CDPagination = forwardRef<HTMLElement, CDPaginationProps>(
  (
    {
      current: controlledCurrent,
      defaultCurrent = 1,
      total = 0,
      pageSize: controlledPageSize,
      defaultPageSize = 10,
      pageSizeOptions = [10, 20, 50, 100],
      onChange,
      onPageSizeChange,
      showSizeChanger = false,
      showQuickJumper = false,
      showTotal = false,
      showFirstLast = false,
      disabled = false,
      size = "md",
      className,
      ...restProps
    }: CDPaginationProps,
    ref
  ): ReactElement => {
    const [internalPage, setInternalPage] = useState<number>(defaultCurrent);
    const [internalPageSize, setInternalPageSize] = useState<number>(defaultPageSize);
    const [jumpPage, setJumpPage] = useState<string>("");

    const page: number = controlledCurrent !== undefined ? controlledCurrent : internalPage;
    const pageSize: number =
      controlledPageSize !== undefined ? controlledPageSize : internalPageSize;

    const totalPages: number = Math.max(1, Math.ceil(total / pageSize));

    const handlePageChange = (newPage: number): void => {
      if (disabled || newPage < 1 || newPage > totalPages || newPage === page) {
        return;
      }
      if (controlledCurrent === undefined) {
        setInternalPage(newPage);
      }
      if (onChange) {
        onChange(newPage, pageSize);
      }
    };

    const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
      const newSize: number = Number(e.target.value);
      if (controlledPageSize === undefined) {
        setInternalPageSize(newSize);
      }
      const newTotalPages: number = Math.max(1, Math.ceil(total / newSize));
      const adjustedPage: number = Math.min(page, newTotalPages);

      if (controlledCurrent === undefined) {
        setInternalPage(adjustedPage);
      }
      if (onPageSizeChange) {
        onPageSizeChange(newSize);
      }
      if (onChange) {
        onChange(adjustedPage, newSize);
      }
    };

    const handleJumpKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        const target: number = parseInt(jumpPage, 10);
        if (!isNaN(target) && target >= 1 && target <= totalPages) {
          handlePageChange(target);
          setJumpPage("");
        }
      }
    };

    // Calculate visible page numbers
    const getPageItems = (): (number | "ellipsis-left" | "ellipsis-right")[] => {
      if (totalPages <= 7) {
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }

      if (page <= 4) {
        return [1, 2, 3, 4, 5, "ellipsis-right", totalPages];
      }

      if (page >= totalPages - 3) {
        return [
          1,
          "ellipsis-left",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages];
    };

    const startItem: number = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const endItem: number = Math.min(total, page * pageSize);

    const iconSize: number = size === "sm" ? 12 : size === "lg" ? 16 : 14;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn(
          "cinder-pagination",
          `cinder-pagination-${size}`,
          disabled && "cinder-pagination-disabled",
          className
        )}
        {...restProps}
      >
        {/* Total Summary */}
        {showTotal && (
          <span className="cinder-pagination-total">
            {typeof showTotal === "function"
              ? showTotal(total, [startItem, endItem])
              : `Showing ${startItem}-${endItem} of ${total} items`}
          </span>
        )}

        <ul className="cinder-pagination-list">
          {/* First Button */}
          {showFirstLast && (
            <li>
              <button
                type="button"
                className="cinder-pagination-item cinder-pagination-prev"
                disabled={disabled || page <= 1}
                aria-label="First page"
                onClick={() => handlePageChange(1)}
              >
                <CDArrowLeftIcon size={iconSize} />
              </button>
            </li>
          )}

          {/* Previous Button */}
          <li>
            <button
              type="button"
              className="cinder-pagination-item cinder-pagination-prev"
              disabled={disabled || page <= 1}
              aria-label="Previous page"
              onClick={() => handlePageChange(page - 1)}
            >
              <CDChevronLeftIcon size={iconSize} />
            </button>
          </li>

          {/* Page Numbers & Ellipses */}
          {getPageItems().map((item, idx: number) => {
            if (item === "ellipsis-left" || item === "ellipsis-right") {
              return (
                <li key={`ellipsis-${idx}`} className="cinder-pagination-ellipsis" aria-hidden="true">
                  ...
                </li>
              );
            }

            const isCurrent: boolean = item === page;

            return (
              <li key={item}>
                <button
                  type="button"
                  className={cn(
                    "cinder-pagination-item",
                    "cinder-pagination-number",
                    isCurrent && "cinder-pagination-item-active"
                  )}
                  disabled={disabled}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-label={`Page ${item}`}
                  onClick={() => handlePageChange(item)}
                >
                  {item}
                </button>
              </li>
            );
          })}

          {/* Next Button */}
          <li>
            <button
              type="button"
              className="cinder-pagination-item cinder-pagination-next"
              disabled={disabled || page >= totalPages}
              aria-label="Next page"
              onClick={() => handlePageChange(page + 1)}
            >
              <CDChevronRightIcon size={iconSize} />
            </button>
          </li>

          {/* Last Button */}
          {showFirstLast && (
            <li>
              <button
                type="button"
                className="cinder-pagination-item cinder-pagination-next"
                disabled={disabled || page >= totalPages}
                aria-label="Last page"
                onClick={() => handlePageChange(totalPages)}
              >
                <CDArrowRightIcon size={iconSize} />
              </button>
            </li>
          )}
        </ul>

        {/* Page Size Changer */}
        {showSizeChanger && (
          <div className="cinder-pagination-size-changer">
            <select
              value={pageSize}
              disabled={disabled}
              onChange={handleSizeChange}
              className="cinder-pagination-select"
              aria-label="Select items per page"
            >
              {pageSizeOptions.map((opt: number) => (
                <option key={opt} value={opt}>
                  {opt} / page
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quick Jumper */}
        {showQuickJumper && (
          <div className="cinder-pagination-quick-jumper">
            <span>Go to</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={jumpPage}
              disabled={disabled}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setJumpPage(e.target.value)}
              onKeyDown={handleJumpKeyDown}
              className="cinder-pagination-jumper-input"
              aria-label="Go to page"
            />
            <span>page</span>
          </div>
        )}
      </nav>
    );
  }
);

CDPagination.displayName = "CDPagination";

export const Pagination = CDPagination;
