import type { IconDefinition, IconVariant, RenderSvgOptions } from "./types";
import { generateSvgString } from "./svgGenerator";

export function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function generateReactImport(iconName: string): string {
  const componentName = toPascalCase(iconName);
  return `import { ${componentName} } from "@tec-triad/iconforge-react";`;
}

export function generateJsxSnippet(
  iconName: string,
  variant: IconVariant = "outline",
  size = 24,
  color?: string,
): string {
  const componentName = toPascalCase(iconName);
  const variantProp = variant !== "outline" ? ` variant="${variant}"` : "";
  const sizeProp = size !== 24 ? ` size={${size}}` : "";
  const colorProp = color && color !== "currentColor" ? ` color="${color}"` : "";
  return `<${componentName}${variantProp}${sizeProp}${colorProp} />`;
}

export function downloadSvgFile(
  icon: IconDefinition,
  variant: IconVariant = "outline",
  options: RenderSvgOptions = {},
): void {
  const svg = generateSvgString(icon, variant, options);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${icon.name}-${variant}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Lightweight browser ZIP bundle generator
export function createZipArchive(
  files: Array<{ name: string; content: string }>,
): Blob {
  // Simple uncompressed ZIP format implementation
  const fileRecords: Uint8Array[] = [];
  const centralDirRecords: Uint8Array[] = [];
  let offset = 0;

  const textEncoder = new TextEncoder();

  for (const file of files) {
    const nameBytes = textEncoder.encode(file.name);
    const contentBytes = textEncoder.encode(file.content);

    // CRC32 calculation
    let crc = 0 ^ -1;
    for (let i = 0; i < contentBytes.length; i++) {
      crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ contentBytes[i]) & 0xff];
    }
    crc = (crc ^ -1) >>> 0;

    // Local file header (30 bytes + name + content)
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true); // signature
    lv.setUint16(4, 20, true); // version needed
    lv.setUint16(6, 0, true); // general purpose bit
    lv.setUint16(8, 0, true); // compression (0 = store)
    lv.setUint16(10, 0, true); // mod time
    lv.setUint16(12, 0, true); // mod date
    lv.setUint32(14, crc, true); // crc32
    lv.setUint32(18, contentBytes.length, true); // compressed size
    lv.setUint32(22, contentBytes.length, true); // uncompressed size
    lv.setUint16(26, nameBytes.length, true); // file name length
    lv.setUint16(28, 0, true); // extra field length
    localHeader.set(nameBytes, 30);

    fileRecords.push(localHeader, contentBytes);

    // Central directory header (46 bytes + name)
    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(centralHeader.buffer);
    cv.setUint32(0, 0x02014b50, true); // signature
    cv.setUint16(4, 20, true); // version made by
    cv.setUint16(6, 20, true); // version needed
    cv.setUint16(8, 0, true); // bit flag
    cv.setUint16(10, 0, true); // compression
    cv.setUint16(12, 0, true); // mod time
    cv.setUint16(14, 0, true); // mod date
    cv.setUint32(16, crc, true); // crc32
    cv.setUint32(20, contentBytes.length, true); // compressed size
    cv.setUint32(24, contentBytes.length, true); // uncompressed size
    cv.setUint16(28, nameBytes.length, true); // name length
    cv.setUint16(30, 0, true); // extra length
    cv.setUint16(32, 0, true); // comment length
    cv.setUint16(34, 0, true); // disk start
    cv.setUint16(36, 0, true); // internal attrs
    cv.setUint32(38, 0, true); // external attrs
    cv.setUint32(42, offset, true); // local header offset
    centralHeader.set(nameBytes, 46);

    centralDirRecords.push(centralHeader);

    offset += localHeader.length + contentBytes.length;
  }

  const centralDirOffset = offset;
  let centralDirSize = 0;
  for (const c of centralDirRecords) {
    centralDirSize += c.length;
  }

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true); // signature
  ev.setUint16(4, 0, true); // disk number
  ev.setUint16(6, 0, true); // central dir disk
  ev.setUint16(8, files.length, true); // records on disk
  ev.setUint16(10, files.length, true); // total records
  ev.setUint32(12, centralDirSize, true); // central dir size
  ev.setUint32(16, centralDirOffset, true); // central dir offset
  ev.setUint16(20, 0, true); // comment length

  const allParts: Uint8Array[] = [...fileRecords, ...centralDirRecords, eocd];
  return new Blob(allParts as BlobPart[], { type: "application/zip" });
}

// Precomputed CRC32 table
const CRC_TABLE: Uint32Array = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
})();
