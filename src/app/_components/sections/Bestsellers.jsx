"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliderProps } from "@common/sliderProps";
import Data from "@data/sections/bestsellers.json";
import { useLanguage } from "@common/LanguageContext";

const BestsellersSection = () => {
  const { t } = useLanguage();
  const copy = t.bestsellers;

  return (
    <section className="il-bestsellers" id="bestsellers" aria-labelledby="il-bestsellers-title">
      <div className="il-bestsellers__head">
        <h3 id="il-bestsellers-title" className="il-bestsellers__title">
          {copy.title}
        </h3>
        <div className="il-bestsellers__nav" aria-label={copy.navLabel}>
          <button
            type="button"
            className="il-bestsellers__arrow il-bestsellers-prev"
            aria-label={copy.prev}
          >
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            className="il-bestsellers__arrow il-bestsellers-next"
            aria-label={copy.next}
          >
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <Swiper
        {...SliderProps.bestsellersSlider}
        loop={Data.items.length > 4}
        className="il-bestsellers__slider"
      >
        {Data.items.map((item) => (
          <SwiperSlide key={item.id}>
            <article className="il-product-card">
              <Link href={item.slug} className="il-product-card__media">
                <img src={item.image} alt={item.name} loading="lazy" />
              </Link>
              <div className="il-product-card__info">
                <Link href={item.slug} className="il-product-card__name">
                  {item.name}
                </Link>
                <div className="il-product-card__brand">{item.brand}</div>
                <div className="il-product-card__price">
                  <span className="il-product-card__currency">{item.currency}</span>
                  <span>{item.price}</span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BestsellersSection;
