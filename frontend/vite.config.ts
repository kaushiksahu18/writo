import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
  },
  define: {
    'process.env': {}
  }
  // build: {
  //   // This will ignore ESLint errors during build
  //   rollupOptions: {
  //     onwarn(warning, warn) {
  //       if (warning.code === 'ESLINT_ERROR') return;
  //       warn(warning);
  //     }
  //   }
  // }
});
