import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/ClassReport/',
  plugins: [react()],
  eslint: {
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  }
});