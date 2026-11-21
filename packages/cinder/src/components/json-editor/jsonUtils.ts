import type { CDJSONParseError, CDJSONValueType } from "./types";

export function getJSONValueType(val: unknown): CDJSONValueType {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  const t: string = typeof val;
  if (t === "string" || t === "number" || t === "boolean") return t;
  if (t === "object") return "object";
  return "string";
}

export function formatJSONString(input: string, indent: number = 2): string {
  try {
    const parsed: unknown = JSON.parse(input);
    return JSON.stringify(parsed, null, indent);
  } catch {
    return input;
  }
}

export function minifyJSONString(input: string): string {
  try {
    const parsed: unknown = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch {
    return input;
  }
}

export function validateJSON(input: string): CDJSONParseError | null {
  try {
    JSON.parse(input);
    return null;
  } catch (err: unknown) {
    const error = err as Error;
    const msg: string = error.message || "Invalid JSON syntax";
    // Extract line and column if available from message (e.g. "at position 42" or "line 3 column 5")
    let line: number | undefined;
    let column: number | undefined;

    const posMatch = msg.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos: number = parseInt(posMatch[1], 10);
      const lines: string[] = input.substring(0, pos).split("\n");
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }

    return { message: msg, line, column };
  }
}

export function safeStringify(val: unknown, indent: number = 2): string {
  if (typeof val === "string") {
    // If it's already a valid json string, pretty-print it
    try {
      const parsed: unknown = JSON.parse(val);
      return JSON.stringify(parsed, null, indent);
    } catch {
      return val;
    }
  }
  try {
    return JSON.stringify(val, null, indent);
  } catch {
    return "{}";
  }
}

export function safeParse(val: unknown): unknown {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
}
