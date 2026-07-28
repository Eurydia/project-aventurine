import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/project-aventurine/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["react-latex-next"],
  },
  resolve: { tsconfigPaths: true },
});
