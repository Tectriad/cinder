import type { HTMLAttributes, ReactNode, CSSProperties } from "react";

export type CDPaginationSize = "sm" | "md" | "lg";

export interface CDPaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean | ((total: number, range: [number, number]) => ReactNode);
  showFirstLast?: boolean;
  disabled?: boolean;
  size?: CDPaginationSize;
  className?: string;
  style?: CSSProperties;
}

export type PaginationProps = CDPaginationProps;
