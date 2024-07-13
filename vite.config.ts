/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "src/features"),
      "@models": path.resolve(__dirname, "src/models"),
      "@apis": path.resolve(__dirname, "src/apis"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  base: "./",
  server: {
    hmr: true,
  },
  test: {
    watch: false,
  },
});
