import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8080",
      },
    },
  },

  rewrites: [
    {
      source: "/api/va/(.*)",
      destination: "https://fullstack-scocial-media-app.onrender.com/$1",
    },
    {
      source: "/(.*)",
      destination: "/",
    },
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [react()],
});
