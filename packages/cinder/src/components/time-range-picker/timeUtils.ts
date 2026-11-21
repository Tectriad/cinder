import type { CDTimeSlot } from "./types";

export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function minutesToTime(totalMin: number): string {
  const norm = ((totalMin % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60).toString().padStart(2, "0");
  const m = (norm % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function formatTimeDisplay(timeStr: string, is12h: boolean): string {
  if (!is12h || !timeStr) return timeStr;
  const [hStr, mStr] = timeStr.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, "0")}:${m} ${ampm}`;
}

export function calculateSlotDurationMinutes(start: string, end: string): number {
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);
  if (e >= s) return e - s;
  return 1440 - s + e; // overnight
}

export function formatDurationLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

/**
 * Checks which slots overlap/conflict with other slots
 */
export function findConflictingSlotIds(slots: CDTimeSlot[]): Set<string> {
  const conflicts = new Set<string>();

  for (let i = 0; i < slots.length; i++) {
    const a = slots[i];
    const aStart = timeToMinutes(a.start);
    const aEnd = timeToMinutes(a.end);

    for (let j = i + 1; j < slots.length; j++) {
      const b = slots[j];
      const bStart = timeToMinutes(b.start);
      const bEnd = timeToMinutes(b.end);

      // Simple overlap test on 24h line
      if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
        conflicts.add(a.id);
        conflicts.add(b.id);
      }
    }
  }

  return conflicts;
}
