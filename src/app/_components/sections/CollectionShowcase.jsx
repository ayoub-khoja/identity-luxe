"use client";

import { useLanguage } from "@common/LanguageContext";
import CollectionGrid from "@components/products/CollectionGrid";

const CollectionShowcase = ({ collections = [] }) => {
  const { t } = useLanguage();
  const shop = t.shop || {};

  if (!collections.length) {
    return null;
  }

  return (
    <section className="il-shop-catalog__intro" id="collections">
      <div className="text-center">
        <div className="tst-suptitle tst-suptitle-center tst-mb-15">{shop.breadcrumb}</div>
        <h3 className="tst-mb-15">{shop.collectionsTitle}</h3>
        <p className="tst-text tst-mb-40">{shop.collectionsText}</p>
      </div>
      <CollectionGrid items={collections} />
    </section>
  );
};

export default CollectionShowcase;
