import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://eclair-lang.org",
  integrations: [react(), tailwind(), mdx()],
  markdown: {
    syntaxHighlight: false, // should be handled by CodeBlock component
  },
  vite: {
    optimizeDeps: {
      exclude: ["tree-sitter-highlight"],
    },
  },
});
