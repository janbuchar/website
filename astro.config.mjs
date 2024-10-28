// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "cs"],
    fallback: { cs: "en" },
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [mdx()],
});
