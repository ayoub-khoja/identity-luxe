import { shopifyFetch, logShopifyWarning } from "./client";
import { BESTSELLING_PRODUCTS_QUERY, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from "./queries";
import { mapProduct, mapProductCards } from "./mappers";
import { isShopifyConfigured } from "./config";

const DEFAULT_LIMIT = 12;
const PAGE_SIZE = 50;
const MAX_PAGES = 8;

export async function getBestSellingProducts(first = DEFAULT_LIMIT) {
  if (!isShopifyConfigured()) {
    console.warn("[shopify] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
    return [];
  }

  try {
    const data = await shopifyFetch({
      query: BESTSELLING_PRODUCTS_QUERY,
      variables: { first },
      tags: ["shopify", "products", "bestsellers"],
    });

    return mapProductCards(data?.products?.nodes);
  } catch (error) {
    logShopifyWarning(error, "Unable to load best-selling products");
    return [];
  }
}

export async function getAllProducts() {
  if (!isShopifyConfigured()) {
    return [];
  }

  try {
    const products = [];
    let after = null;

    for (let page = 0; page < MAX_PAGES; page += 1) {
      const data = await shopifyFetch({
        query: PRODUCTS_QUERY,
        variables: { first: PAGE_SIZE, after },
        tags: ["shopify", "products"],
      });

      const connection = data?.products;
      products.push(...(connection?.nodes || []));

      if (!connection?.pageInfo?.hasNextPage) {
        break;
      }

      after = connection.pageInfo.endCursor;
    }

    return mapProductCards(products);
  } catch (error) {
    logShopifyWarning(error, "Unable to load products");
    return [];
  }
}

export async function getProductByHandle(handle) {
  if (!handle || !isShopifyConfigured()) {
    return null;
  }

  try {
    const data = await shopifyFetch({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      tags: ["shopify", "products", `product:${handle}`],
    });

    return mapProduct(data?.product);
  } catch (error) {
    logShopifyWarning(error, `Unable to load product "${handle}"`);
    return null;
  }
}

export async function getRelatedProducts(product, limit = 8) {
  const handle = product?.collections?.[0]?.handle;

  if (!handle) {
    const products = await getBestSellingProducts(limit + 1);
    return products.filter((item) => item.handle !== product?.handle).slice(0, limit);
  }

  const { getCollectionPreview } = await import("./collections");
  const collection = await getCollectionPreview(handle, limit + 4);
  const related = (collection?.products || []).filter((item) => item.handle !== product.handle);

  if (related.length >= 4) {
    return related.slice(0, limit);
  }

  const bestsellers = await getBestSellingProducts(limit + 1);
  const extra = bestsellers.filter(
    (item) => item.handle !== product.handle && !related.some((rel) => rel.handle === item.handle)
  );

  return [...related, ...extra].slice(0, limit);
}
