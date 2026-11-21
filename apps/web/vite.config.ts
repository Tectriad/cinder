import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const rawBase = (typeof process !== "undefined" && process.env.VITE_BASE_PATH) || "/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@tec-triad/cinder-ui/styles.css": fileURLToPath(new URL("../../packages/cinder/src/styles/cinder.css", import.meta.url)),
      "@tec-triad/cinder-ui": fileURLToPath(new URL("../../packages/cinder/src/index.ts", import.meta.url)),
      "@cinder-ui/core/styles.css": fileURLToPath(new URL("../../packages/cinder/src/styles/cinder.css", import.meta.url)),
      "@cinder-ui/core": fileURLToPath(new URL("../../packages/cinder/src/index.ts", import.meta.url)),
      "@cinderui/core/styles.css": fileURLToPath(new URL("../../packages/cinder/src/styles/cinder.css", import.meta.url)),
      "@cinderui/core": fileURLToPath(new URL("../../packages/cinder/src/index.ts", import.meta.url)),
      "@tec-triad/iconforge-core": fileURLToPath(new URL("../../packages/iconforge-core/src/index.ts", import.meta.url)),
      "@tec-triad/iconforge-react": fileURLToPath(new URL("../../packages/iconforge-react/src/index.ts", import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
});
