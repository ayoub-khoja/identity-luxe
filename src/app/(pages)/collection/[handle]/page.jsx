import { notFound } from "next/navigation";

import AppData from "@data/app.json";
import ScrollHint from "@layouts/scroll-hint/Index";
import Divider from "@layouts/divider/Index";

import PageBanner from "@components/PageBanner";
import SubscribeSection from "@components/sections/Subscribe";
import ProductsGrid from "@components/products/ProductsGrid";
import CollectionEmpty from "@components/products/CollectionEmpty";

import { getCollectionByHandle, getCollections } from "@library/shopify";

export const revalidate = 300;

export async function generateStaticParams() {
  const collections = await getCollections();

  return collections.map((collection) => ({
    handle: collection.handle,
  }));
}

export async function generateMetadata({ params }) {
  const collection = await getCollectionByHandle(params.handle);

  return {
    title: {
      default: collection?.title || "Collection",
    },
    description: collection?.description || AppData.settings.siteDescription,
  };
}

const CollectionPage = async ({ params }) => {
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  const products = collection.products || [];

  return (
    <>
      <div id="tst-dynamic-banner" className="tst-dynamic-banner">
        <PageBanner
          pageTitle={collection.title}
          description={collection.description}
          breadTitle={"Collection"}
        />
      </div>
      <div id="tst-dynamic-content" className="tst-dynamic-content">
        <div className="tst-content-frame">
          <div className="tst-content-box">
            <div className="container tst-p-60-60">
              <ScrollHint />

              {products.length > 0 ? (
                <ProductsGrid items={products} />
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

export default CollectionPage;
