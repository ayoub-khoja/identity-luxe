"use client";

import Link from "next/link";

import { useLanguage } from "@common/LanguageContext";

const ProductCard = ({ item }) => {
  const { t } = useLanguage();
  const shop = t.shop || {};
  const href = item.slug || `/product/${item.handle}`;
  const imageAlt = item.imageAlt || item.name || item.title;

  return (
    <article className="il-product-card">
      <Link href={href} className="il-product-card__media">
        <img src={item.image} alt={imageAlt} loading="lazy" />
        {!item.available && (
          <span className="il-product-card__badge">{shop.soldOut}</span>
        )}
      </Link>
      <div className="il-product-card__info">
        <Link href={href} className="il-product-card__name">
          {item.name || item.title}
        </Link>
        <div className="il-product-card__brand">{item.brand}</div>
        <div className="il-product-card__price">
          <span className="il-product-card__currency">{item.currency}</span>
          <span>{item.price}</span>
          {item.old_price ? (
            <span className="il-product-card__compare">
              {item.currency} {item.old_price}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
