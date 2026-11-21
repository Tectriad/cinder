import type { ReactElement } from "react";
import type { CDEditorComment } from "./types";

export interface CDEditorCommentCardProps {
  comment: CDEditorComment;
  onResolve: () => void;
  onClose: () => void;
}

export function CDEditorCommentCard({
  comment,
  onResolve,
  onClose,
}: CDEditorCommentCardProps): ReactElement {
  return (
    <div className="cinder-editor-comment-card" role="dialog" aria-label="Comment Annotation Details">
      <div className="cinder-editor-comment-card-header">
        <span className="cinder-editor-comment-author">{comment.author}</span>
        <span className="cinder-editor-comment-time">{comment.timestamp}</span>
      </div>

      {comment.rangeText && (
        <div className="cinder-editor-comment-quote">&ldquo;{comment.rangeText}&rdquo;</div>
      )}

      <div className="cinder-editor-comment-text">{comment.text}</div>

      <div className="cinder-editor-comment-actions">
        <button
          type="button"
          className="cinder-editor-comment-resolve-btn"
          onClick={onResolve}
        >
          Resolve Annotation
        </button>
        <button
          type="button"
          className="cinder-editor-comment-close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
