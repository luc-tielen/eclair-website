import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://eclair-lang.org",
  integrations: [react(), tailwind()],
  vite: {
    optimizeDeps: { exclude: ["tree-sitter-highlight"] },
  },
});
