import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  type ReactElement,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDEditorProps,
  CDEditorListType,
  CDEditorMentionUser,
  CDEditorComment,
} from "./types";
import { CDEditorToolbar } from "./CDEditorToolbar";
import { CDEditorMentions } from "./CDEditorMentions";
import { CDEditorAnnotations } from "./CDEditorAnnotations";
import { CDEditorStatusBar } from "./CDEditorStatusBar";
import { CDEditorCommentCard } from "./CDEditorCommentCard";
import {
  computeTextStats,
  applyListFormat,
  insertCodeSnippet,
  insertMentionPillNode,
  wrapAnnotationMark,
} from "./editorUtils";

const DEFAULT_COLLABORATORS: CDEditorMentionUser[] = [
  { id: "usr_1", name: "Alex Morgan", handle: "alex", role: "Design Lead" },
  { id: "usr_2", name: "Sarah Chen", handle: "sarah", role: "Frontend Architect" },
  { id: "usr_3", name: "Marcus Brody", handle: "marcus", role: "Product Manager" },
  { id: "usr_4", name: "Elena Rostova", handle: "elena", role: "Design Systems" },
  { id: "usr_5", name: "Devon Vance", handle: "devon", role: "Fullstack Eng" },
];

export const CDEditor = forwardRef<HTMLDivElement, CDEditorProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      placeholder = "Write something brilliant... Use @ to mention collaborators",
      minHeight = 220,
      maxHeight,
      size = "md",
      variant = "default",
      disabled = false,
      readOnly = false,
      showToolbar = true,
      showStatusBar = true,
      showWordCount = true,
      maxLength,
      mentions = DEFAULT_COLLABORATORS,
      onMentionSelect,
      comments = [],
      onCommentAdd,
      onCommentResolve,
      className,
      style,
      toolbarExtra,
    }: CDEditorProps,
    ref
  ): ReactElement => {
    const editorRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => editorRef.current as HTMLDivElement);

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [wordCount, setWordCount] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);

    // Mentions state
    const [mentionOpen, setMentionOpen] = useState<boolean>(false);
    const [mentionQuery, setMentionQuery] = useState<string>("");
    const [mentionPos, setMentionPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [mentionIndex, setMentionIndex] = useState<number>(0);
    const savedRangeRef = useRef<Range | null>(null);

    // Annotations state
    const [annotationOpen, setAnnotationOpen] = useState<boolean>(false);
    const [annotationPos, setAnnotationPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [selectedTextForAnnotation, setSelectedTextForAnnotation] = useState<string>("");
    const [activeComment, setActiveComment] = useState<CDEditorComment | null>(null);

    // Track text statistics
    const updateStats = useCallback(() => {
      if (!editorRef.current) return;
      const text: string = editorRef.current.innerText || "";
      const stats = computeTextStats(text);
      setWordCount(stats.words);
      setCharCount(stats.chars);
    }, []);

    // Initial content setup
    useEffect(() => {
      if (!editorRef.current) return;
      const initial: string = value !== undefined ? value : defaultValue;
      if (editorRef.current.innerHTML !== initial) {
        editorRef.current.innerHTML = initial;
        updateStats();
      }
    }, []);

    // Sync external value updates
    useEffect(() => {
      if (!editorRef.current || value === undefined) return;
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        updateStats();
      }
    }, [value, updateStats]);

    // Handle Content Changes
    const handleInput = (): void => {
      if (!editorRef.current) return;
      const html: string = editorRef.current.innerHTML;
      updateStats();
      if (onChange) {
        onChange(html);
      }
      checkMentionTrigger();
    };

    // Command Formatting helper
    const handleFormat = (command: string, val?: string): void => {
      if (disabled || readOnly) return;
      editorRef.current?.focus();
      document.execCommand(command, false, val);
      handleInput();
    };

    // List Handling (Numbered 1,2,3 - Roman Numerals - Bullets)
    const handleApplyList = (listType: CDEditorListType): void => {
      if (disabled || readOnly) return;
      editorRef.current?.focus();
      applyListFormat(listType);
      handleInput();
    };

    // Code formatting helper
    const handleInsertCode = (block: boolean): void => {
      if (disabled || readOnly) return;
      insertCodeSnippet(block);
      handleInput();
    };

    // Color application helper
    const handleApplyColor = (color: string, isBackground: boolean = false): void => {
      if (disabled || readOnly) return;
      editorRef.current?.focus();
      if (isBackground) {
        document.execCommand("hiliteColor", false, color);
      } else {
        document.execCommand("foreColor", false, color);
      }
      handleInput();
    };

    // Mentions detection from typing '@'
    const checkMentionTrigger = (): void => {
      const selection: Selection | null = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setMentionOpen(false);
        return;
      }

      const range: Range = selection.getRangeAt(0);
      const textBefore: string = range.startContainer.textContent?.slice(0, range.startOffset) || "";
      const atMatch: RegExpMatchArray | null = textBefore.match(/@([a-zA-Z0-9_]*)$/);

      if (atMatch && editorRef.current) {
        const rect: DOMRect = range.getBoundingClientRect();
        const editorRect: DOMRect = editorRef.current.getBoundingClientRect();
        setMentionPos({
          top: rect.bottom - editorRect.top + 8,
          left: Math.max(12, rect.left - editorRect.left),
        });
        setMentionQuery(atMatch[1] || "");
        setMentionIndex(0);
        setMentionOpen(true);
        savedRangeRef.current = range.cloneRange();
      } else {
        setMentionOpen(false);
      }
    };

    // Insert @ Mention pill into editor
    const handleSelectMention = (user: CDEditorMentionUser): void => {
      editorRef.current?.focus();
      insertMentionPillNode(savedRangeRef.current, user);
      setMentionOpen(false);
      handleInput();
      if (onMentionSelect) {
        onMentionSelect(user);
      }
    };

    // Open Comment Annotation popup on selected text
    const handleOpenAnnotation = (): void => {
      const selection: Selection | null = window.getSelection();
      if (!selection || selection.isCollapsed || !editorRef.current) return;

      const range: Range = selection.getRangeAt(0);
      const text: string = range.toString().trim();
      if (!text) return;

      const rect: DOMRect = range.getBoundingClientRect();
      const editorRect: DOMRect = editorRef.current.getBoundingClientRect();

      setSelectedTextForAnnotation(text);
      setAnnotationPos({
        top: rect.bottom - editorRect.top + 8,
        left: Math.max(12, rect.left - editorRect.left),
      });
      savedRangeRef.current = range.cloneRange();
      setAnnotationOpen(true);
    };

    // Save and wrap annotation comment
    const handleSubmitAnnotation = (commentText: string): void => {
      const commentId: string = `cmt_${Date.now()}`;
      const newComment: CDEditorComment = {
        id: commentId,
        author: "You",
        text: commentText,
        timestamp: "Just now",
        rangeText: selectedTextForAnnotation,
      };

      wrapAnnotationMark(savedRangeRef.current, commentId, commentText, selectedTextForAnnotation);
      setAnnotationOpen(false);
      handleInput();
      if (onCommentAdd) {
        onCommentAdd(newComment);
      }
    };

    // Click on surface to inspect existing annotations
    const handleSurfaceClick = (event: MouseEvent<HTMLDivElement>): void => {
      const target: HTMLElement = event.target as HTMLElement;
      const annotationMark: HTMLElement | null = target.closest(".cinder-editor-annotation");

      if (annotationMark) {
        const cId: string | null = annotationMark.getAttribute("data-comment-id");
        const cText: string = annotationMark.getAttribute("data-comment-text") || "";
        const matched: CDEditorComment | undefined = comments.find((c: CDEditorComment) => c.id === cId);

        if (matched) {
          setActiveComment(matched);
        } else {
          setActiveComment({
            id: cId || `cmt_${Date.now()}`,
            author: "Collaborator",
            text: cText || "Annotation comment",
            timestamp: "Saved",
            rangeText: annotationMark.textContent || "",
          });
        }
      } else {
        setActiveComment(null);
      }
    };

    // Resolve and remove active comment
    const handleResolveActiveComment = (): void => {
      if (!activeComment || !editorRef.current) return;
      const cId: string = activeComment.id;
      const mark: HTMLElement | null = editorRef.current.querySelector(
        `mark[data-comment-id="${cId}"]`
      );

      if (mark) {
        const parent: Node | null = mark.parentNode;
        if (parent) {
          while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
          }
          parent.removeChild(mark);
        }
      }

      if (onCommentResolve) {
        onCommentResolve(cId);
      }

      setActiveComment(null);
      handleInput();
    };

    // Filtered mentions for keyboard navigation & popup selection
    const filteredMentions = useMemo<CDEditorMentionUser[]>(() => {
      const q: string = mentionQuery.toLowerCase().trim();
      if (!q) return mentions;
      return mentions.filter((u: CDEditorMentionUser) =>
        u.name.toLowerCase().includes(q) ||
        u.handle.toLowerCase().includes(q) ||
        (u.role && u.role.toLowerCase().includes(q))
      );
    }, [mentions, mentionQuery]);

    // Keyboard navigation (shortcuts & mentions popup)
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
      if (mentionOpen) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setMentionIndex((prev: number) =>
            filteredMentions.length > 0 ? (prev + 1) % filteredMentions.length : 0
          );
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setMentionIndex((prev: number) =>
            filteredMentions.length > 0
              ? (prev - 1 + filteredMentions.length) % filteredMentions.length
              : 0
          );
          return;
        }
        if (event.key === "Enter" || event.key === "Tab") {
          event.preventDefault();
          const targetUser: CDEditorMentionUser | undefined = filteredMentions[mentionIndex];
          if (targetUser) {
            handleSelectMention(targetUser);
          }
          return;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          setMentionOpen(false);
          return;
        }
      }

      // Format keyboard shortcuts (Ctrl/Cmd + B, I, U)
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "b" || event.key === "B") {
          event.preventDefault();
          handleFormat("bold");
        } else if (event.key === "i" || event.key === "I") {
          event.preventDefault();
          handleFormat("italic");
        } else if (event.key === "u" || event.key === "U") {
          event.preventDefault();
          handleFormat("underline");
        }
      }
    };

    const minHeightStyle: string = typeof minHeight === "number" ? `${minHeight}px` : minHeight;
    const maxHeightStyle: string | undefined =
      maxHeight !== undefined
        ? typeof maxHeight === "number"
          ? `${maxHeight}px`
          : maxHeight
        : undefined;

    return (
      <div
        className={cn(
          "cinder-editor-container",
          `cinder-editor-size-${size}`,
          `cinder-editor-variant-${variant}`,
          isFocused && "cinder-editor-focused",
          disabled && "cinder-editor-disabled",
          readOnly && "cinder-editor-readonly",
          className
        )}
        style={style}
      >
        {/* Top Toolbar */}
        {showToolbar && (
          <CDEditorToolbar
            disabled={disabled || readOnly}
            onFormat={handleFormat}
            onApplyList={handleApplyList}
            onInsertCode={handleInsertCode}
            onApplyColor={handleApplyColor}
            onOpenMentions={() => {
              editorRef.current?.focus();
              document.execCommand("insertText", false, "@");
              checkMentionTrigger();
            }}
            onOpenAnnotation={handleOpenAnnotation}
            onClearFormat={() => handleFormat("removeFormat")}
            onUndo={() => handleFormat("undo")}
            onRedo={() => handleFormat("redo")}
            toolbarExtra={toolbarExtra}
          />
        )}

        {/* ContentEditable Surface */}
        <div className="cinder-editor-content-wrapper">
          <div
            ref={editorRef}
            className="cinder-editor-surface"
            contentEditable={!disabled && !readOnly}
            data-placeholder={placeholder}
            style={{
              minHeight: minHeightStyle,
              maxHeight: maxHeightStyle,
            }}
            onInput={handleInput}
            onClick={handleSurfaceClick}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            role="textbox"
            aria-multiline="true"
            aria-label="Rich text editor"
          />

          {/* Floating Mentions Popup */}
          {mentionOpen && (
            <CDEditorMentions
              query={mentionQuery}
              position={mentionPos}
              users={mentions}
              selectedIndex={mentionIndex}
              onSelect={handleSelectMention}
              onClose={() => setMentionOpen(false)}
            />
          )}

          {/* Floating Annotation Comment Dialog */}
          {annotationOpen && (
            <CDEditorAnnotations
              position={annotationPos}
              selectedText={selectedTextForAnnotation}
              onSubmit={handleSubmitAnnotation}
              onClose={() => setAnnotationOpen(false)}
            />
          )}

          {/* Active Comment Viewer Popup */}
          {activeComment && (
            <CDEditorCommentCard
              comment={activeComment}
              onResolve={handleResolveActiveComment}
              onClose={() => setActiveComment(null)}
            />
          )}
        </div>

        {/* Bottom Status Bar */}
        {showStatusBar && (
          <CDEditorStatusBar
            wordCount={wordCount}
            charCount={charCount}
            maxLength={maxLength}
            showWordCount={showWordCount}
          />
        )}
      </div>
    );
  }
);

CDEditor.displayName = "CDEditor";

export const Editor = CDEditor;
