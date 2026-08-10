"use client";

import Data from "@data/sections/features.json";
import { useLanguage } from "@common/LanguageContext";

const FeaturesOneSection = () => {
  const { t } = useLanguage();
  const features = t.features;

  return (
    <section className="il-features" id="features">
      <div className="row">
        <div className="col-lg-12">
          <div className="il-features__intro text-center">
            <div
              className="tst-suptitle tst-suptitle-center tst-mb-15"
              dangerouslySetInnerHTML={{ __html: features.subtitle }}
            />
            <h3
              className="tst-mb-20"
              dangerouslySetInnerHTML={{ __html: features.title }}
            />
            <p
              className="tst-text"
              dangerouslySetInnerHTML={{ __html: features.description }}
            />
          </div>
        </div>

        {Data.items.map((item, key) => (
          <div className="col-lg-4" key={`features-item-${key}`}>
            <article className="il-feature-card">
              <div className="il-feature-card__icon">
                <img src={item.icon} alt="" aria-hidden="true" />
              </div>
              <h5 className="il-feature-card__title">
                {features.items[key]?.title || item.title}
              </h5>
              <div
                className="il-feature-card__text tst-text"
                dangerouslySetInnerHTML={{
                  __html: features.items[key]?.text || item.text,
                }}
              />
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesOneSection;
