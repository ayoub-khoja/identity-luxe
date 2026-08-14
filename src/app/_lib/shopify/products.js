import { shopifyFetch, logShopifyWarning } from "./client";
import { BESTSELLING_PRODUCTS_QUERY } from "./queries";
import { mapProductCards } from "./mappers";
import { isShopifyConfigured } from "./config";

const DEFAULT_LIMIT = 12;

export async function getBestSellingProducts(first = DEFAULT_LIMIT) {
  if (!isShopifyConfigured()) {
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
