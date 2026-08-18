import React from "react";

import AppData from "@data/app.json";
import ScrollHint from "@layouts/scroll-hint/Index";
import Divider from "@layouts/divider/Index";

import PageBanner from "@components/PageBanner";
import SubscribeSection from "@components/sections/Subscribe";
import ShopCatalog from "@components/products/ShopCatalog";

import { getShopCatalog } from "@library/shopify";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
		default: "Shop",
	},
  description: AppData.settings.siteDescription,
}

const Shop = async () => {
  const collections = await getShopCatalog();

  return (
    <>
      <div id="tst-dynamic-banner" className="tst-dynamic-banner">
          <PageBanner pageTitle={"Collections"} description={"Kids & babies, adults hoodies, adults sets and tote bags."} breadTitle={"Shop"} />
      </div>
      <div id="tst-dynamic-content" className="tst-dynamic-content">
          <div className="tst-content-frame">
              <div className="tst-content-box">
                  <div className="container tst-p-60-60">
                      <ScrollHint />
                      <ShopCatalog collections={collections} />
                      <Divider onlyBottom={0} />
                      <SubscribeSection />
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};
export default Shop;
