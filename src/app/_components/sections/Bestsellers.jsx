"use client";

import ProductCard from "@components/products/ProductCard";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliderProps } from "@common/sliderProps";
import FallbackData from "@data/sections/bestsellers.json";
import { useLanguage } from "@common/LanguageContext";

const BestsellersSection = ({ items = [] }) => {
  const { t, dir } = useLanguage();
  const copy = t.bestsellers;
  const products = items.length ? items : FallbackData.items;

  if (!products.length) {
    return null;
  }

  return (
    <section className="il-bestsellers" id="bestsellers" aria-labelledby="il-bestsellers-title">
      <div className="il-bestsellers__head">
        <h3 id="il-bestsellers-title" className="il-bestsellers__title">
          {copy.title}
        </h3>
        <div className="il-bestsellers__nav" aria-label={copy.navLabel}>
          <Link href="/products" className="il-catalog-slider__all">
            {t.shop?.viewAll}
          </Link>
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
        key={`bestsellers-${dir}`}
        dir={dir}
        {...SliderProps.bestsellersSlider}
        className="il-bestsellers__slider"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BestsellersSection;
