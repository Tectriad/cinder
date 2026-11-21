import { useEffect, useRef, type ReactElement } from "react";
import type { CDEditorMentionsPopupProps, CDEditorMentionUser } from "./types";

export function CDEditorMentions({
  query,
  position,
  users,
  selectedIndex,
  onSelect,
  onClose,
}: CDEditorMentionsPopupProps): ReactElement | null {
  const popupRef = useRef<HTMLDivElement>(null);

  // Filter users based on query
  const filteredUsers: CDEditorMentionUser[] = users.filter((u: CDEditorMentionUser) => {
    const q: string = query.toLowerCase().trim();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.handle.toLowerCase().includes(q) ||
      (u.role && u.role.toLowerCase().includes(q))
    );
  });

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (filteredUsers.length === 0) {
    return (
      <div
        ref={popupRef}
        className="cinder-editor-mentions-popup"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
        role="listbox"
        aria-label="Mentions suggestions"
      >
        <div className="cinder-editor-mentions-empty">No matching collaborators</div>
      </div>
    );
  }

  return (
    <div
      ref={popupRef}
      className="cinder-editor-mentions-popup"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      role="listbox"
      aria-label="Mentions suggestions"
    >
      <div className="cinder-editor-mentions-header">
        <span>Mention Collaborator</span>
        <kbd className="cinder-editor-kbd">Esc to cancel</kbd>
      </div>

      <div className="cinder-editor-mentions-list">
        {filteredUsers.map((user: CDEditorMentionUser, idx: number) => {
          const isSelected: boolean = idx === selectedIndex;
          const initials: string = user.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={user.id}
              className={`cinder-editor-mention-item ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(user)}
              role="option"
              aria-selected={isSelected}
            >
              <div className="cinder-editor-mention-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <div className="cinder-editor-mention-details">
                <div className="cinder-editor-mention-name-row">
                  <span className="cinder-editor-mention-name">{user.name}</span>
                  {user.role && (
                    <span className="cinder-editor-mention-role">{user.role}</span>
                  )}
                </div>
                <span className="cinder-editor-mention-handle">@{user.handle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
