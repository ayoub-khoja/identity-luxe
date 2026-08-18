"use client";

import Link from "next/link";

import { useLanguage } from "@common/LanguageContext";
import { collectionPath, getCollectionDisplayTitle } from "@library/shopify/catalog";

const CollectionCard = ({ collection }) => {
  const { locale, t } = useLanguage();
  const shop = t.shop || {};
  const title = getCollectionDisplayTitle(collection, locale);
  const href = collectionPath(collection.handle);
  const count = Number(collection.productCount) || 0;

  return (
    <article className="il-collection-card">
      <Link href={href} className="il-collection-card__media">
        {collection.image ? (
          <img src={collection.image} alt={collection.imageAlt || title} loading="lazy" />
        ) : (
          <span className="il-collection-card__placeholder">{title}</span>
        )}
      </Link>
      <div className="il-collection-card__body">
        <h3 className="il-collection-card__title">
          <Link href={href}>{title}</Link>
        </h3>
        {count > 0 ? (
          <p className="il-collection-card__meta">
            {count} {count === 1 ? shop.product : shop.products}
          </p>
        ) : null}
        <Link href={href} className="il-collection-card__link">
          {shop.viewCollection}
        </Link>
      </div>
    </article>
  );
};

export default CollectionCard;
