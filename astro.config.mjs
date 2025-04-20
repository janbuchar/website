// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "cs"],
    fallback: { cs: "en" },
    routing: "manual",
  },

  build: {
    format: "preserve",
  },

  markdown: {
    shikiConfig: {
      theme: "nord",
    },
  },

  integrations: [mdx(), icon()],

  adapter: node({
    mode: "standalone",
  }),
});
