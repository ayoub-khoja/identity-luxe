"use client";

import { useEffect, useRef, useState } from "react";
import AppData from "@data/app.json";
import { useLanguage } from "@common/LanguageContext";

const SubscribeSection = () => {
  const { t } = useLanguage();
  const subscribe = t.subscribe;
  const fieldRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const purge = () => {
      const control = field.querySelector(".il-subscribe__control");
      const roots = [field, control].filter(Boolean);

      roots.forEach((root) => {
        Array.from(root.children).forEach((node) => {
          const keep =
            node.tagName === "LABEL" ||
            (node.tagName === "DIV" && node.classList.contains("il-subscribe__control")) ||
            (node.tagName === "INPUT" && node.classList.contains("il-subscribe__input")) ||
            (node.tagName === "INPUT" && node.type === "hidden");

          if (!keep) node.remove();
        });
      });
    };

    purge();
    const observer = new MutationObserver(purge);
    observer.observe(field, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="il-subscribe" aria-labelledby="il-subscribe-title">
      <div className="il-subscribe__media" aria-hidden="true">
        <img src="/img/fashion/product-5.jpg" alt="" />
        <div className="il-subscribe__shade"></div>
      </div>

      <div className="il-subscribe__content">
        <div className="il-subscribe__eyebrow">{subscribe.subtitle}</div>
        <h2 id="il-subscribe-title" className="il-subscribe__title">
          {subscribe.title}
        </h2>
        <p className="il-subscribe__desc">{subscribe.description}</p>

        <form
          className="il-subscribe__form"
          action={AppData.settings.mailchimp.url}
          method="post"
          target="_blank"
          noValidate
        >
          <div className="il-subscribe__field" ref={fieldRef}>
            <label className="il-subscribe__label" htmlFor="il-newsletter-contact">
              {t.emailPlaceholder}
            </label>
            <div className="il-subscribe__control">
              <input
                id="il-newsletter-contact"
                className="il-subscribe__input"
                type="text"
                inputMode="email"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
              />
            </div>
            <input type="hidden" name="EMAIL" value={value} readOnly />
          </div>
          <button className="il-subscribe__btn" type="submit">
            <span>{t.subscribeButton}</span>
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
