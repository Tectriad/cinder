import { useState, useRef, useEffect, type ReactElement } from "react";
import type { CDEditorAnnotationPopupProps } from "./types";

export function CDEditorAnnotations({
  position,
  selectedText,
  onSubmit,
  onClose,
}: CDEditorAnnotationPopupProps): ReactElement {
  const [commentText, setCommentText] = useState<string>("");
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus textarea on open
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleSubmit = (): void => {
    if (!commentText.trim()) return;
    onSubmit(commentText.trim());
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleSubmit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <div
      ref={popupRef}
      className="cinder-editor-annotation-popup"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      role="dialog"
      aria-label="Add Comment Annotation"
    >
      <div className="cinder-editor-annotation-header">
        <div className="cinder-editor-annotation-title">New Comment Annotation</div>
        <kbd className="cinder-editor-kbd">Esc</kbd>
      </div>

      {selectedText && (
        <div className="cinder-editor-annotation-quote">
          <span className="cinder-editor-annotation-quote-bar" />
          <span className="cinder-editor-annotation-quote-text">
            {selectedText.length > 80 ? `${selectedText.slice(0, 80)}...` : selectedText}
          </span>
        </div>
      )}

      <div className="cinder-editor-annotation-body">
        <textarea
          ref={inputRef}
          className="cinder-editor-annotation-input"
          placeholder="Leave a comment or feedback... (Ctrl+Enter to save)"
          rows={3}
          value={commentText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="cinder-editor-annotation-actions">
        <button
          type="button"
          className="cinder-editor-btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="cinder-editor-btn-primary"
          disabled={!commentText.trim()}
          onClick={handleSubmit}
        >
          Save Comment
        </button>
      </div>
    </div>
  );
}
