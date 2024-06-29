/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "src/features"),
      "@models": path.resolve(__dirname, "src/models"),
      "@apis": path.resolve(__dirname, "src/apis"),
    },
  },
  server: {
    hmr: true,
  },
  test: {
    watch: false,
  },
});
