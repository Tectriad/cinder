import {
  useState,
  useMemo,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDTimeRangePickerProps,
  CDTimeSlot,
  CDTimeRangePreset,
} from "./types";
import {
  findConflictingSlotIds,
  calculateSlotDurationMinutes,
  formatDurationLabel,
} from "./timeUtils";
import { CDTimeIntervalRow } from "./CDTimeIntervalRow";

const DEFAULT_PRESETS: CDTimeRangePreset[] = [
  { label: "Standard 9 - 5", slots: [{ start: "09:00", end: "17:00" }] },
  {
    label: "Split Shift",
    slots: [
      { start: "08:00", end: "12:00" },
      { start: "14:00", end: "18:00" },
    ],
  },
  {
    label: "Core Peak Hours",
    slots: [{ start: "10:00", end: "16:00" }],
  },
];

export function CDTimeRangePicker({
  value,
  defaultValue = [
    { id: "slot-1", start: "09:00", end: "13:00" },
    { id: "slot-2", start: "14:00", end: "18:00" },
  ],
  onChange,
  format = "24h",
  maxIntervals = 5,
  step = 15,
  presets = DEFAULT_PRESETS,
  readOnly = false,
  title = "Active Intervals",
  extra,
  className,
  style,
}: CDTimeRangePickerProps): ReactElement {
  const [internalSlots, setInternalSlots] = useState<CDTimeSlot[]>(
    value !== undefined ? value : defaultValue
  );
  const slots: CDTimeSlot[] = value !== undefined ? value : internalSlots;

  const conflictingIds: Set<string> = useMemo<Set<string>>(
    () => findConflictingSlotIds(slots),
    [slots]
  );

  const totalDurationMinutes: number = useMemo<number>(() => {
    return slots.reduce(
      (sum, s) => sum + calculateSlotDurationMinutes(s.start, s.end),
      0
    );
  }, [slots]);

  const updateSlots = (newSlots: CDTimeSlot[]): void => {
    if (onChange) onChange(newSlots);
    else setInternalSlots(newSlots);
  };

  const handleUpdateSlot = (id: string, start: string, end: string): void => {
    const updated = slots.map((s) => (s.id === id ? { ...s, start, end } : s));
    updateSlots(updated);
  };

  const handleRemoveSlot = (id: string): void => {
    const updated = slots.filter((s) => s.id !== id);
    updateSlots(updated);
  };

  const handleAddSlot = (): void => {
    if (slots.length >= maxIntervals) return;
    const lastSlot = slots[slots.length - 1];
    let nextStart = "09:00";
    let nextEnd = "17:00";
    if (lastSlot) {
      nextStart = lastSlot.end;
      const [h, m] = lastSlot.end.split(":").map(Number);
      const nextH = Math.min(23, h + 2).toString().padStart(2, "0");
      nextEnd = `${nextH}:${m.toString().padStart(2, "0")}`;
    }

    const newSlot: CDTimeSlot = {
      id: `slot-${Date.now()}`,
      start: nextStart,
      end: nextEnd,
    };
    updateSlots([...slots, newSlot]);
  };

  const handleApplyPreset = (preset: CDTimeRangePreset): void => {
    const generated: CDTimeSlot[] = preset.slots.map((s, idx) => ({
      id: `preset-slot-${Date.now()}-${idx}`,
      start: s.start,
      end: s.end,
    }));
    updateSlots(generated);
  };

  return (
    <div
      className={cn("cinder-time-range-card", className)}
      style={style}
    >
      <div className="cinder-time-range-header">
        <div className="cinder-time-header-title-group">
          <span className="cinder-time-header-title">{title}</span>
          <span className="cinder-time-header-count">
            {slots.length} of {maxIntervals} slots
          </span>
        </div>

        <div className="cinder-time-header-actions">
          <span className="cinder-time-total-pill">
            Total: {formatDurationLabel(totalDurationMinutes)}
          </span>
          {extra}
        </div>
      </div>

      {presets && presets.length > 0 && !readOnly && (
        <div className="cinder-time-presets-bar">
          <span className="cinder-time-presets-label">Presets:</span>
          {presets.map((preset: CDTimeRangePreset) => (
            <button
              key={preset.label}
              type="button"
              className="cinder-time-preset-chip"
              onClick={() => handleApplyPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      <div className="cinder-time-slots-list">
        {slots.map((slot: CDTimeSlot, index: number) => (
          <CDTimeIntervalRow
            key={slot.id}
            slot={slot}
            index={index}
            format={format}
            hasConflict={conflictingIds.has(slot.id)}
            canRemove={slots.length > 1}
            readOnly={readOnly}
            step={step}
            onUpdate={handleUpdateSlot}
            onRemove={handleRemoveSlot}
          />
        ))}
      </div>

      {!readOnly && slots.length < maxIntervals && (
        <div className="cinder-time-add-row">
          <button
            type="button"
            className="cinder-time-add-btn"
            onClick={handleAddSlot}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Interval
          </button>
        </div>
      )}
    </div>
  );
}

export const TimeRangePicker = CDTimeRangePicker;
