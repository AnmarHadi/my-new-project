// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: "public",
  resolve: {
    // إجبار كل الاستيرادات على نفس نسخة React داخل frontend
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
    // منع التضاعف عبر أي لينك/مسار علوي
    dedupe: ["react", "react-dom"],
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
      "/uploads": "http://localhost:5000",
      "/health": "http://localhost:5000",
      "/scan": { target: "http://127.0.0.1:5123", changeOrigin: true, secure: false }
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      onwarn(w, def) {
        if (w.code === "MODULE_LEVEL_DIRECTIVE" && String(w.message).includes('"use client"')) return;
        def(w);
      }
    },
    chunkSizeWarningLimit: 2000
  }
});
