import { type ReactElement, type ChangeEvent } from "react";
import type { CDTimeIntervalRowProps } from "./types";
import {
  calculateSlotDurationMinutes,
  formatDurationLabel,
  timeToMinutes,
} from "./timeUtils";

export function CDTimeIntervalRow({
  slot,
  index,
  format: _format,
  hasConflict,
  canRemove,
  readOnly,
  step,
  onUpdate,
  onRemove,
}: CDTimeIntervalRowProps): ReactElement {
  const durationMin: number = calculateSlotDurationMinutes(slot.start, slot.end);
  const durationText: string = formatDurationLabel(durationMin);
  const isBackwards: boolean = timeToMinutes(slot.end) <= timeToMinutes(slot.start);

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onUpdate(slot.id, e.target.value, slot.end);
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onUpdate(slot.id, slot.start, e.target.value);
  };

  return (
    <div
      className={`cinder-time-slot-row ${hasConflict || isBackwards ? "has-error" : ""}`}
    >
      <span className="cinder-time-slot-index">Slot {index + 1}</span>

      <div className="cinder-time-inputs-group">
        <div className="cinder-time-input-field">
          <input
            type="time"
            step={step * 60}
            value={slot.start}
            onChange={handleStartChange}
            disabled={readOnly}
            className="cinder-time-picker-control"
          />
        </div>

        <span className="cinder-time-separator">to</span>

        <div className="cinder-time-input-field">
          <input
            type="time"
            step={step * 60}
            value={slot.end}
            onChange={handleEndChange}
            disabled={readOnly}
            className="cinder-time-picker-control"
          />
        </div>
      </div>

      <div className="cinder-time-duration-badge">
        {durationText}
      </div>

      {hasConflict && (
        <span className="cinder-time-conflict-tag" title="Overlaps with another interval">
          Overlap Conflict
        </span>
      )}

      {isBackwards && !hasConflict && (
        <span className="cinder-time-conflict-tag" title="End time must be after start time">
          Invalid Order
        </span>
      )}

      {canRemove && !readOnly && (
        <button
          type="button"
          className="cinder-time-remove-btn"
          onClick={() => onRemove(slot.id)}
          aria-label="Remove interval"
          title="Remove interval"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
