import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      react(),
      svgr({
        exportAsDefault: true,
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
  };
});
