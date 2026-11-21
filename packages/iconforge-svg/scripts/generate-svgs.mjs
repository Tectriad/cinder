import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_ICONS, generateSvgString } from "../../iconforge-core/dist/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseSvgDir = path.resolve(__dirname, "../svg");

const styles = ["outline", "filled", "duotone", "multicolor", "gradient", "rounded"];

// Clean existing SVG directories to remove obsolete icons
if (fs.existsSync(baseSvgDir)) {
  fs.rmSync(baseSvgDir, { recursive: true, force: true });
}

for (const style of styles) {
  const dir = path.join(baseSvgDir, style);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

let count = 0;

for (const icon of ALL_ICONS) {
  for (const style of styles) {
    const svgContent = generateSvgString(icon, style, {
      size: 24,
      strokeWidth: 2,
    });
    const filePath = path.join(baseSvgDir, style, `${icon.name}.svg`);
    fs.writeFileSync(filePath, svgContent, "utf8");
    count++;
  }
}

console.log(`Successfully generated ${count} SVG icons across 6 styles into ${baseSvgDir}`);
