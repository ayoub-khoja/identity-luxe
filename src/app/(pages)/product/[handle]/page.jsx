import { notFound } from "next/navigation";

import AppData from "@data/app.json";
import ScrollHint from "@layouts/scroll-hint/Index";
import Divider from "@layouts/divider/Index";

import PageBanner from "@components/PageBanner";
import SubscribeSection from "@components/sections/Subscribe";
import ProductGallery from "@components/products/ProductGallery";
import ProductBuyBox from "@components/products/ProductBuyBox";
import RelatedProducts from "@components/products/RelatedProducts";

import { getProductByHandle, getRelatedProducts, getAllProducts } from "@library/shopify";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({ params }) {
  const product = await getProductByHandle(params.handle);

  return {
    title: {
      default: product?.title || "Product",
    },
    description: product?.short || AppData.settings.siteDescription,
  };
}

const ProductPage = async ({ params }) => {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product, 8);
  const images = product.images?.length
    ? product.images
    : [{ url: product.image, alt: product.imageAlt || product.title }];

  return (
    <>
      <div id="tst-dynamic-banner" className="tst-dynamic-banner">
        <PageBanner
          pageTitle={product.title}
          description={product.brand}
          breadTitle={"Product"}
        />
      </div>
      <div id="tst-dynamic-content" className="tst-dynamic-content">
        <div className="tst-content-frame">
          <div className="tst-content-box">
            <div className="container tst-p-60-60">
              <ScrollHint />

              <section className="il-product-page">
                <div className="row align-items-start">
                  <div className="col-lg-6">
                    <ProductGallery images={images} title={product.title} />
                  </div>
                  <div className="col-lg-6">
                    <div className="il-product-page__details">
                      <p className="il-product-page__brand">{product.brand}</p>
                      <h2 className="il-product-page__title">{product.title}</h2>
                      <ProductBuyBox product={product} />
                      {product.descriptionHtml ? (
                        <div
                          className="il-product-page__copy tst-text"
                          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                        />
                      ) : product.short ? (
                        <p className="il-product-page__copy tst-text">{product.short}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>

              {related.length > 0 ? (
                <>
                  <Divider />
                  <RelatedProducts items={related} />
                </>
              ) : null}

              <Divider onlyBottom={0} />
              <SubscribeSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
