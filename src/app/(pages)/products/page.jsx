import React from "react";

import AppData from "@data/app.json";
import ScrollHint from "@layouts/scroll-hint/Index";
import Divider from "@layouts/divider/Index";

import PageBanner from "@components/PageBanner";
import SubscribeSection from "@components/sections/Subscribe";
import CatalogBrowser from "@components/products/CatalogBrowser";
import CollectionEmpty from "@components/products/CollectionEmpty";

import { getAllProducts, getCollections } from "@library/shopify";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
		default: "Products",
	},
  description: AppData.settings.siteDescription,
}

const Products = async () => {
  const [products, collections] = await Promise.all([
    getAllProducts(),
    getCollections(),
  ]);

  return (
    <>
      <div id="tst-dynamic-banner" className="tst-dynamic-banner">
          <PageBanner pageTitle={"All products"} description={"The Identity Luxe catalog, live from the boutique."} breadTitle={"Shop"} />
      </div>
      <div id="tst-dynamic-content" className="tst-dynamic-content">
          <div className="tst-content-frame">
              <div className="tst-content-box">
                  <div className="container tst-p-60-60">
                      <ScrollHint />
                      {products.length > 0 ? (
                        <CatalogBrowser products={products} collections={collections} />
                      ) : (
                        <CollectionEmpty />
                      )}
                      <Divider onlyBottom={0} />
                      <SubscribeSection />
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};
export default Products;
