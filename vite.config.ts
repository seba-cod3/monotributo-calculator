import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      store: path.resolve(__dirname, "./src/store"),
      features: path.resolve(__dirname, "./src/features"),
      lib: path.resolve(__dirname, "./src/lib"),
      components: path.resolve(__dirname, "./src/components"),
      types: path.resolve(__dirname, "./src/types"),
    },
  },
});
