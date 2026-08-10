"use client";

import Link from "next/link";
import { useLanguage } from "@common/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();
  const about = t.about;
  const href = about.buttonLink || "/shop";
  const isExternal = href.startsWith("http");

  const btnContent = (
    <>
      <span>{about.button}</span>
      <span className="il-national__btn-icon" aria-hidden="true">
        <i className="fas fa-arrow-up"></i>
      </span>
    </>
  );

  return (
    <section className="il-national" id="about">
      <div className="il-national__inner">
        <h3
          className="il-national__title"
          dangerouslySetInnerHTML={{ __html: about.title }}
        />
        <div className="il-national__text">
          <p className="tst-text" dangerouslySetInnerHTML={{ __html: about.description }} />
          {about.description2 && (
            <p className="tst-text" dangerouslySetInnerHTML={{ __html: about.description2 }} />
          )}
        </div>
        {isExternal ? (
          <a
            href={href}
            className="il-national__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {btnContent}
          </a>
        ) : (
          <Link href={href} className="il-national__btn">
            {btnContent}
          </Link>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
