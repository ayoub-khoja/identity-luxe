"use client";

import { useLanguage } from "@common/LanguageContext";
import CatalogSlider from "@components/sliders/CatalogSlider";

const RelatedProducts = ({ items = [] }) => {
  const { t } = useLanguage();

  return (
    <CatalogSlider
      items={items}
      title={t.shop?.related}
      href="/products"
      navId="related"
    />
  );
};

export default RelatedProducts;
