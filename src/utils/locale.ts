// Shamelessly stolen from TMT2 (but I kinda wrote it so it's fine)

import { ref } from "vue";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const t = (key: string) => {
  const l = getCurrentLocale() as { [key: string]: string };
  const value = l[key];
  if (!value) {
    console.debug(`No entry for "${key}" in locale "${currentLocale.value}"`);
  }
  return value ?? key;
};

type Locale = "en" | "fr";

const locales: Locale[] = ["en", "fr"];

const fromBrowserLanguage = (): Locale => {
  const nl = navigator.language?.substring(0, 2) as Locale;
  if (locales.includes(nl)) {
    return nl;
  }
  return "en";
};

const currentLocale = ref((localStorage.getItem("locale") as Locale) ?? fromBrowserLanguage());
export { currentLocale };

// export const cycleLocale = () => {
//   const cl = currentLocale.value;
//   const next: Locale = locales[(locales.indexOf(cl) + 1) % locales.length];
//   constCurrentLocale(next);
//   localStorage.setItem("locale", next);
// };

const getCurrentLocale = () => {
  const cl = currentLocale.value;
  switch (cl) {
    case "en":
      return en;
    case "fr":
      return fr;
    default:
      console.warn(`Locale ${cl} is not available, use "en" instead`);
      return en;
  }
};

const loadData = async () => {
  const data = await import(`../assets/data/${currentLocale.value}.json`);
  return data.default;
};

export const localizedData = await loadData();
