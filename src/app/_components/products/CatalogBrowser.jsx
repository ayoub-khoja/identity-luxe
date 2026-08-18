"use client";

import { useMemo, useState } from "react";

import { useLanguage } from "@common/LanguageContext";
import { getCollectionDisplayTitle } from "@library/shopify/catalog";
import ProductCatalogGrid from "@components/products/ProductCatalogGrid";
import CollectionEmpty from "@components/products/CollectionEmpty";

function sortProducts(products, sort) {
  const items = [...products];

  switch (sort) {
    case "price-asc":
      return items.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return items.sort((a, b) => Number(b.price) - Number(a.price));
    case "title-asc":
      return items.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    case "title-desc":
      return items.sort((a, b) => String(b.name).localeCompare(String(a.name)));
    default:
      return items;
  }
}

const CatalogBrowser = ({ products = [], collections = [] }) => {
  const { locale, t } = useLanguage();
  const shop = t.shop || {};
  const [collectionHandle, setCollectionHandle] = useState("all");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const byCollection =
      collectionHandle === "all"
        ? products
        : products.filter((product) =>
            (product.collections || []).some((collection) => collection.handle === collectionHandle)
          );

    return sortProducts(byCollection, sort);
  }, [products, collectionHandle, sort]);

  return (
    <div className="il-catalog">
      <div className="il-catalog__toolbar">
        <label className="il-catalog__field">
          <span>{shop.filter}</span>
          <select value={collectionHandle} onChange={(event) => setCollectionHandle(event.target.value)}>
            <option value="all">{shop.allCollections}</option>
            {collections.map((collection) => (
              <option key={collection.handle} value={collection.handle}>
                {getCollectionDisplayTitle(collection, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="il-catalog__field">
          <span>{shop.sort}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">{shop.sortFeatured}</option>
            <option value="title-asc">{shop.sortAZ}</option>
            <option value="title-desc">{shop.sortZA}</option>
            <option value="price-asc">{shop.sortPriceLow}</option>
            <option value="price-desc">{shop.sortPriceHigh}</option>
          </select>
        </label>
        <p className="il-catalog__count">
          {filtered.length} {filtered.length === 1 ? shop.product : shop.products}
        </p>
      </div>

      {filtered.length > 0 ? <ProductCatalogGrid items={filtered} /> : <CollectionEmpty />}
    </div>
  );
};

export default CatalogBrowser;
