"use client";

import { useLanguage } from "@common/LanguageContext";
import { getCollectionDisplayTitle } from "@library/shopify/catalog";
import CollectionGrid from "@components/products/CollectionGrid";
import CatalogSlider from "@components/sliders/CatalogSlider";
import CollectionEmpty from "@components/products/CollectionEmpty";

const ShopCatalog = ({ collections = [] }) => {
  const { locale, t } = useLanguage();
  const shop = t.shop || {};

  if (!collections.length) {
    return <CollectionEmpty />;
  }

  return (
    <div className="il-shop-catalog">
      <div className="text-center il-shop-catalog__intro">
        <div className="tst-suptitle tst-suptitle-center tst-mb-15">{shop.breadcrumb}</div>
        <h3 className="tst-mb-15">{shop.collectionsTitle}</h3>
        <p className="tst-text tst-mb-40">{shop.collectionsText}</p>
      </div>

      <CollectionGrid items={collections} />

      <div className="il-shop-catalog__sections">
        {collections.map((collection) => (
          <CatalogSlider
            key={collection.handle}
            items={collection.products}
            title={getCollectionDisplayTitle(collection, locale)}
            href={`/collection/${collection.handle}`}
            navId={collection.handle}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCatalog;
