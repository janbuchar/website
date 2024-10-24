// @ts-check
import { defineConfig } from "astro/config";

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
});
