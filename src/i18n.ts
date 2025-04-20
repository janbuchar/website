import { getAbsoluteLocaleUrl as _getAbsoluteLocaleUrl } from "astro:i18n";

export const languages = {
  cs: "Česky",
  en: "English",
};

const ui = {
  en: {
    publishedOn: "Published on",
    blogPageTitle: "Jan Buchar's blog",
    continueReading: "Continue reading...",
  },
  cs: {
    publishedOn: "Zveřejněno",
    blogPageTitle: "Jan Buchar - blog",
    continueReading: "Číst dál...",
  },
};

export function useTranslations(language: string | undefined) {
  return function t(key: keyof (typeof ui)["en"]): string {
    return ui[(language ?? "en") as keyof typeof ui][key];
  };
}

export function stripLanguageFromPath(pathname: string) {
  return pathname.replace(/^\/cs/, "");
}

export function getAbsoluteLocaleUrl(language: string, path: string) {
  if (path.startsWith("/drafts")) {
    return path;
  }

  return _getAbsoluteLocaleUrl(language, path);
}
