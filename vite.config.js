import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/classReport/',
  plugins: [react()],
  eslint: {
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  }
});