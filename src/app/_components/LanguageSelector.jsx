"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES } from "@common/i18n";
import { useLanguage } from "@common/LanguageContext";

const FlagIcon = ({ code }) => {
  if (code === "qa") {
    return (
      <svg className="il-lang__flag" viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" fill="#8a1538" />
        <path
          fill="#fff"
          d="M0 0h18l-4 2.5L18 5l-4 2.5L18 10l-4 2.5L18 15l-4 2.5L18 20l-4 2.5L18 25l-4 2.5L18 30l-4 2.5L18 35l-4 2.5L18 40H0z"
        />
      </svg>
    );
  }

  return (
    <svg className="il-lang__flag" viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
};

const LanguageSelector = () => {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const current = LOCALES[locale];

  return (
    <div className={`il-lang ${open ? "il-lang--open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="il-lang__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="il-lang__flag-wrap">
          <FlagIcon code={current.flag} />
        </span>
        <span className="il-lang__meta">
          <span className="il-lang__name">{current.label}</span>
          <span className="il-lang__code">{current.short}</span>
        </span>
        <svg className="il-lang__chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="il-lang__dropdown" role="listbox" aria-label={t.language}>
        <div className="il-lang__dropdown-title">{t.language}</div>
        {Object.values(LOCALES).map((item) => {
          const active = locale === item.code;
          return (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={active}
              className={`il-lang__option ${active ? "is-active" : ""}`}
              onClick={() => {
                setLocale(item.code);
                setOpen(false);
              }}
            >
              <span className="il-lang__flag-wrap">
                <FlagIcon code={item.flag} />
              </span>
              <span className="il-lang__option-text">
                <span className="il-lang__name">{item.label}</span>
                <span className="il-lang__code">{item.short}</span>
              </span>
              {active && (
                <svg className="il-lang__check" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelector;
