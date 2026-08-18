"use client";

import ProductCard from "@components/products/ProductCard";

const COLUMN_CLASS = {
  2: "col-lg-6 col-md-6 col-sm-6",
  3: "col-lg-4 col-md-6 col-sm-6",
  4: "col-lg-3 col-md-6 col-sm-6",
};

const ProductCatalogGrid = ({ items = [], columns = 4 }) => {
  const columnClass = COLUMN_CLASS[columns] || COLUMN_CLASS[4];

  return (
    <div className="row il-product-grid">
      {items.map((item) => (
        <div className={columnClass} key={item.id || item.handle}>
          <div className="il-product-grid__item">
            <ProductCard item={item} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCatalogGrid;
