"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliderProps } from "@common/sliderProps";
import { useLanguage } from "@common/LanguageContext";
import ProductCard from "@components/products/ProductCard";

const CatalogSlider = ({
  items = [],
  title,
  subtitle,
  href,
  navId = "catalog",
}) => {
  const { t, dir } = useLanguage();
  const shop = t.shop || {};

  if (!items.length) {
    return null;
  }

  const prevClass = `il-catalog-prev-${navId}`;
  const nextClass = `il-catalog-next-${navId}`;

  return (
    <section className="il-bestsellers il-catalog-slider" aria-labelledby={`il-catalog-${navId}`}>
      <div className="il-bestsellers__head">
        <div>
          {subtitle ? <div className="il-catalog-slider__subtitle">{subtitle}</div> : null}
          <h3 id={`il-catalog-${navId}`} className="il-bestsellers__title">
            {title}
          </h3>
        </div>
        <div className="il-bestsellers__nav">
          {href ? (
            <Link href={href} className="il-catalog-slider__all">
              {shop.viewAll}
            </Link>
          ) : null}
          <button type="button" className={`il-bestsellers__arrow ${prevClass}`} aria-label={t.bestsellers?.prev}>
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button type="button" className={`il-bestsellers__arrow ${nextClass}`} aria-label={t.bestsellers?.next}>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <Swiper
        key={`${navId}-${dir}`}
        dir={dir}
        {...SliderProps.bestsellersSlider}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        className="il-bestsellers__slider"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id || item.handle}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CatalogSlider;
