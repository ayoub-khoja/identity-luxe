"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STORAGE_KEY,
  translations,
} from "@common/i18n";

const LanguageContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  dir: LOCALES[DEFAULT_LOCALE].dir,
  t: translations[DEFAULT_LOCALE],
});

function readStoredLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (!saved) return DEFAULT_LOCALE;
    const parsed = JSON.parse(saved);
    return LOCALES[parsed] ? parsed : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const meta = LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(locale));
  }, [locale, ready]);

  const setLocale = (next) => {
    if (LOCALES[next]) setLocaleState(next);
  };

  const value = {
    locale,
    setLocale,
    dir: (LOCALES[locale] || LOCALES[DEFAULT_LOCALE]).dir,
    t: translations[locale] || translations[DEFAULT_LOCALE],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
