import type { CSSProperties, ReactNode } from "react";

export type CDEditorSize = "sm" | "md" | "lg";
export type CDEditorVariant = "default" | "bordered" | "filled" | "ghost";
export type CDEditorListType = "bullet" | "number" | "roman";

export interface CDEditorMentionUser {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  role?: string;
}

export interface CDEditorComment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
  rangeText?: string;
  resolved?: boolean;
}

export interface CDEditorColorPreset {
  name: string;
  value: string;
  bgValue?: string;
}

export interface CDEditorProps {
  /** HTML content value (controlled mode) */
  value?: string;
  /** Initial HTML content value (uncontrolled mode) */
  defaultValue?: string;
  /** Callback invoked on every content change with HTML string */
  onChange?: (html: string) => void;
  /** Placeholder text when content is empty */
  placeholder?: string;
  /** Minimum height of the editor area in pixels or CSS string */
  minHeight?: number | string;
  /** Maximum height of the editor area in pixels or CSS string */
  maxHeight?: number | string;
  /** Visual size variant */
  size?: CDEditorSize;
  /** Style container variant */
  variant?: CDEditorVariant;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether to render the toolbar */
  showToolbar?: boolean;
  /** Whether to render the bottom status bar */
  showStatusBar?: boolean;
  /** Whether to display word and character count */
  showWordCount?: boolean;
  /** Maximum character limit */
  maxLength?: number;
  /** Available user suggestions for @ mentions */
  mentions?: CDEditorMentionUser[];
  /** Callback fired when a user mention is inserted */
  onMentionSelect?: (user: CDEditorMentionUser) => void;
  /** Array of active comments and annotations */
  comments?: CDEditorComment[];
  /** Callback fired when a new comment annotation is added */
  onCommentAdd?: (comment: CDEditorComment) => void;
  /** Callback fired when a comment is resolved or deleted */
  onCommentResolve?: (commentId: string) => void;
  /** Optional custom CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Additional custom actions rendered in toolbar */
  toolbarExtra?: ReactNode;
}

export interface CDEditorToolbarProps {
  disabled?: boolean;
  onFormat: (command: string, value?: string) => void;
  onApplyList: (listType: CDEditorListType) => void;
  onInsertCode: (block: boolean) => void;
  onApplyColor: (color: string, isBackground?: boolean) => void;
  onOpenMentions: () => void;
  onOpenAnnotation: () => void;
  onClearFormat: () => void;
  onUndo: () => void;
  onRedo: () => void;
  toolbarExtra?: ReactNode;
}

export interface CDEditorMentionsPopupProps {
  query: string;
  position: { top: number; left: number };
  users: CDEditorMentionUser[];
  selectedIndex: number;
  onSelect: (user: CDEditorMentionUser) => void;
  onClose: () => void;
}

export interface CDEditorAnnotationPopupProps {
  position: { top: number; left: number };
  selectedText: string;
  onSubmit: (commentText: string) => void;
  onClose: () => void;
}
