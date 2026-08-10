"use client";

import { useState } from "react";
import { useLanguage } from "@common/LanguageContext";

const FaqSection = () => {
  const { t } = useLanguage();
  const faq = t.faq;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="il-faq" id="faq">
      <div className="text-center">
        <h3 className="il-faq__title tst-mb-40">{faq.title}</h3>
      </div>

      <div className="il-faq__list">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={`faq-item-${index}`}
              className={`il-faq__item ${isOpen ? "is-open" : ""}`}
            >
              <button
                type="button"
                className="il-faq__question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.q}</span>
                <i className={`fas ${isOpen ? "fa-minus" : "fa-plus"}`} aria-hidden="true"></i>
              </button>
              <div className="il-faq__answer" hidden={!isOpen}>
                <p className="tst-text">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
