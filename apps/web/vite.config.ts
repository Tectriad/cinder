import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@cinder-ui/core/styles.css": path.resolve(__dirname, "../../packages/cinder/src/styles/cinder.css"),
      "@cinder-ui/core": path.resolve(__dirname, "../../packages/cinder/src/index.ts"),
    },
  },
  server: {
    port: 3000,
  },
});
