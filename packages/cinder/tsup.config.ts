import { defineConfig } from "tsup";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/tokens/index.ts",
    "src/theme/index.ts",
    "src/components/index.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".js" : ".cjs",
    };
  },
  async onSuccess() {
    const stylesDir = path.resolve(__dirname, "src/styles");
    const destCss = path.resolve(__dirname, "dist/styles.css");
    const moduleFiles = [
      "tokens.css",
      "buttons.css",
      "input.css",
      "display.css",
      "select.css",
      "dropdown.css",
      "float-button.css",
      "checkbox.css",
      "alert.css",
      "toast.css",
      "spinner.css",
      "skeleton.css",
      "progress.css",
      "modal.css",
      "drawer.css",
      "tooltip.css",
      "popover.css",
      "dropdown-menu.css",
      "tag.css",
      "avatar.css",
      "accordion.css",
      "list.css",
      "table.css",
      "date-picker.css",
      "calendar.css",
      "calendar-views.css",
      "link.css",
      "navbar.css",
      "sidebar.css",
      "tabs.css",
      "breadcrumb.css",
      "pagination.css",
      "stepper.css",
      "radio.css",
      "switch.css",
      "slider.css",
      "textarea.css",
      "typography.css",
      "file-picker.css",
      "file-preview.css",
      "layout.css",
      "form-builder.css",
    ];
    let bundledCss = "/**\n * Cinder UI - Official Cinder Slate Design System Stylesheet\n */\n";
    for (const file of moduleFiles) {
      const filePath = path.join(stylesDir, file);
      if (fs.existsSync(filePath)) {
        bundledCss += `\n/* --- Module: ${file} --- */\n` + fs.readFileSync(filePath, "utf-8");
      }
    }
    fs.writeFileSync(destCss, bundledCss, "utf-8");
    console.log("Bundled modular styles into dist/styles.css");
  },
});
