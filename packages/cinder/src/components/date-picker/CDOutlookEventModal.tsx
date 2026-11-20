import {
  useState,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { CDModal } from "../modal";
import { CDButton } from "../button";
import { CDInput } from "../input";
import { CDTag } from "../tag";
import { formatEventTimeRange } from "./utils";
import type { CDOutlookEventModalProps, CDCalendarEvent } from "./types";

/**
 * Clock vector icon
 */
function ClockIcon(): ReactElement {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/**
 * MapPin vector icon
 */
function MapPinIcon(): ReactElement {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function CDOutlookEventModal({
  open,
  onClose,
  event,
  slot,
  renderEventModal,
  renderSlotModal,
  onEventCreate,
  onEventDelete,
}: CDOutlookEventModalProps): ReactElement | null {
  // Local state for slot quick create form
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("Meeting");

  if (!open) return null;

  // Custom component render hook for Event
  if (event && renderEventModal) {
    return (
      <CDModal
        open={open}
        onClose={onClose}
        title={event.title}
        width={560}
        footer={null}
      >
        {renderEventModal(event, onClose)}
      </CDModal>
    );
  }

  // Custom component render hook for Slot
  if (slot && renderSlotModal) {
    return (
      <CDModal
        open={open}
        onClose={onClose}
        title="Schedule Event"
        width={560}
        footer={null}
      >
        {renderSlotModal(slot, onClose)}
      </CDModal>
    );
  }

  // Default Event Detail Modal
  if (event) {
    return (
      <CDModal
        open={open}
        onClose={onClose}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "16px", fontWeight: 700 }}>{event.title}</span>
            {event.category && (
              <CDTag size="sm" variant={event.variant === "danger" ? "error" : "primary"}>
                {event.category}
              </CDTag>
            )}
          </div>
        }
        width={520}
        footer={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div>
              {onEventDelete && (
                <CDButton
                  size="sm"
                  variant="danger"
                  onClick={(): void => {
                    onEventDelete(event);
                    onClose();
                  }}
                >
                  Delete Event
                </CDButton>
              )}
            </div>
            <CDButton size="sm" variant="secondary" onClick={onClose}>
              Close
            </CDButton>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "4px 0" }}>
          {/* Time Span */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--cinder-muted)", fontSize: "13px" }}>
            <ClockIcon />
            <span>
              {event.startDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })} •{" "}
              {formatEventTimeRange(event.startDate, event.endDate, event.allDay)}
            </span>
          </div>

          {/* Location */}
          {event.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--cinder-muted)", fontSize: "13px" }}>
              <MapPinIcon />
              <span>{event.location}</span>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div style={{
              padding: "12px 14px",
              borderRadius: "8px",
              backgroundColor: "var(--cinder-surface-hover)",
              border: "1px solid var(--cinder-border)",
              fontSize: "13px",
              color: "var(--cinder-text)",
              lineHeight: "1.6",
            }}>
              {event.description}
            </div>
          )}
        </div>
      </CDModal>
    );
  }

  // Default Quick Create Slot Modal
  if (slot) {
    const handleCreate = (): void => {
      if (!newTitle.trim()) return;

      const startDate: Date = new Date(slot.date);
      startDate.setHours(slot.hour, 0, 0, 0);

      const endDate: Date = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

      const newEvent: CDCalendarEvent = {
        id: `evt-${Date.now()}`,
        title: newTitle.trim(),
        startDate,
        endDate,
        category: newCategory,
        variant: "primary",
      };

      onEventCreate?.(newEvent);
      setNewTitle("");
      onClose();
    };

    return (
      <CDModal
        open={open}
        onClose={onClose}
        title="Create New Event"
        width={480}
        onOk={handleCreate}
        okText="Create Event"
        cancelText="Cancel"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "6px 0" }}>
          <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
            Selected Slot: <strong>{slot.date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</strong> at <strong>{slot.hour}:00</strong>
          </div>

          <CDInput
            label="Event Title"
            placeholder="e.g. Sprint Planning / System Review"
            value={newTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setNewTitle(e.target.value)}
            autoFocus
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--cinder-muted)" }}>Category:</span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Meeting", "DevOps", "Incident", "Release"].map((cat: string) => (
                <button
                  key={cat}
                  type="button"
                  onClick={(): void => setNewCategory(cat)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: newCategory === cat ? "var(--cinder-primary)" : "var(--cinder-border)",
                    backgroundColor: newCategory === cat ? "var(--cinder-primary)" : "transparent",
                    color: newCategory === cat ? "#ffffff" : "var(--cinder-text)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CDModal>
    );
  }

  return null;
}
