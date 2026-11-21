import type { CDEditorListType, CDEditorMentionUser } from "./types";

export function computeTextStats(text: string): { words: number; chars: number } {
  const trimmed: string = text.trim();
  const words: number = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  return {
    words,
    chars: text.length,
  };
}

export function applyListFormat(listType: CDEditorListType): void {
  if (listType === "bullet") {
    document.execCommand("insertUnorderedList");
  } else if (listType === "number") {
    document.execCommand("insertOrderedList");
    const selection: Selection | null = window.getSelection();
    if (selection && selection.anchorNode) {
      const parentOl: HTMLOListElement | null = (
        selection.anchorNode.parentElement?.closest("ol") || null
      );
      if (parentOl) {
        parentOl.style.listStyleType = "decimal";
      }
    }
  } else if (listType === "roman") {
    document.execCommand("insertOrderedList");
    const selection: Selection | null = window.getSelection();
    if (selection && selection.anchorNode) {
      const parentOl: HTMLOListElement | null = (
        selection.anchorNode.parentElement?.closest("ol") || null
      );
      if (parentOl) {
        parentOl.style.listStyleType = "lower-roman";
      }
    }
  }
}

export function insertCodeSnippet(block: boolean): void {
  const selection: Selection | null = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range: Range = selection.getRangeAt(0);
  const selectedContent: string = range.toString() || "code";

  if (block) {
    const pre: HTMLElement = document.createElement("pre");
    const code: HTMLElement = document.createElement("code");
    pre.className = "cinder-editor-code-block";
    code.textContent = selectedContent;
    pre.appendChild(code);
    range.deleteContents();
    range.insertNode(pre);
  } else {
    const code: HTMLElement = document.createElement("code");
    code.className = "cinder-editor-inline-code";
    code.textContent = selectedContent;
    range.deleteContents();
    range.insertNode(code);
  }
}

export function insertMentionPillNode(savedRange: Range | null, user: CDEditorMentionUser): void {
  const selection: Selection | null = window.getSelection();
  if (!savedRange || !selection) return;

  selection.removeAllRanges();
  selection.addRange(savedRange);

  const range: Range = savedRange;
  const textNode: Node = range.startContainer;
  const text: string = textNode.textContent || "";
  const atIdx: number = text.lastIndexOf("@", range.startOffset);

  if (atIdx !== -1) {
    range.setStart(textNode, atIdx);
    range.setEnd(textNode, range.startOffset);
    range.deleteContents();

    const pill: HTMLSpanElement = document.createElement("span");
    pill.className = "cinder-editor-mention";
    pill.contentEditable = "false";
    pill.setAttribute("data-mention-id", user.id);
    pill.setAttribute("data-mention-handle", user.handle);
    pill.textContent = `@${user.name}`;

    const space: Text = document.createTextNode("\u00A0");

    range.insertNode(space);
    range.insertNode(pill);

    range.setStartAfter(space);
    range.setEndAfter(space);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

export function wrapAnnotationMark(
  savedRange: Range | null,
  commentId: string,
  commentText: string,
  selectedText: string
): void {
  if (!savedRange) return;
  const selection: Selection | null = window.getSelection();
  if (!selection) return;

  selection.removeAllRanges();
  selection.addRange(savedRange);
  const mark: HTMLElement = document.createElement("mark");
  mark.className = "cinder-editor-annotation";
  mark.setAttribute("data-comment-id", commentId);
  mark.setAttribute("data-comment-text", commentText);
  mark.textContent = selectedText;

  savedRange.deleteContents();
  savedRange.insertNode(mark);
}
