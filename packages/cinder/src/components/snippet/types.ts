import type { HTMLAttributes } from "react";

export interface CDSnippetProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  prefix?: string;
  showCopy?: boolean;
}

export type SnippetProps = CDSnippetProps;
