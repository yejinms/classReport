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
  // ,
  // server: {
  //   allowedHosts: ['clclh8-5173.csb.app']
  // }
  // preview 보기 코드
});