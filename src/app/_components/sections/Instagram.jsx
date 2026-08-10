"use client";

import { useLanguage } from "@common/LanguageContext";

const INSTAGRAM_URL = "https://www.instagram.com/identity_luxe/";

const IMAGES = {
  ar: "/img/instagram-arabe.png",
  en: "/img/instagram-angl.png",
};

const InstagramSection = () => {
  const { locale, t } = useLanguage();
  const image = IMAGES[locale] || IMAGES.ar;

  return (
    <section className="il-instagram" aria-label="Instagram">
      <a
        href={INSTAGRAM_URL}
        className="il-instagram__link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.instagramAria}
      >
        <img
          src={image}
          alt={t.instagramAlt}
          className="il-instagram__img"
        />
      </a>
    </section>
  );
};

export default InstagramSection;
