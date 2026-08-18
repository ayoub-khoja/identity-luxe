"use client";

import CollectionCard from "@components/products/CollectionCard";

const CollectionGrid = ({ items = [] }) => {
  return (
    <div className="row il-collection-grid">
      {items.map((collection) => (
        <div className="col-lg-3 col-md-6 col-sm-6" key={collection.id || collection.handle}>
          <div className="il-collection-grid__item">
            <CollectionCard collection={collection} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionGrid;
