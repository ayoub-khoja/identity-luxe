import { shopifyFetch, logShopifyWarning } from "./client";
import { COLLECTIONS_QUERY, COLLECTION_BY_HANDLE_QUERY } from "./queries";
import { mapCollection, mapCollections, mapProducts } from "./mappers";
import { isShopifyConfigured } from "./config";

const MAX_COLLECTIONS = 50;
const MAX_PRODUCTS = 24;

export async function getCollections() {
  if (!isShopifyConfigured()) {
    return [];
  }

  try {
    const data = await shopifyFetch({
      query: COLLECTIONS_QUERY,
      variables: { first: MAX_COLLECTIONS },
      tags: ["shopify", "collections"],
    });

    return mapCollections(data?.collections?.nodes);
  } catch (error) {
    logShopifyWarning(error, "Unable to load collections");
    return [];
  }
}

export async function getCollectionByHandle(handle) {
  if (!handle || !isShopifyConfigured()) {
    return null;
  }

  try {
    const data = await shopifyFetch({
      query: COLLECTION_BY_HANDLE_QUERY,
      variables: { handle, first: MAX_PRODUCTS },
      tags: ["shopify", "collections", `collection:${handle}`],
    });

    const collection = mapCollection(data?.collection);

    if (!collection) {
      return null;
    }

    return {
      ...collection,
      products: mapProducts(data.collection.products?.nodes),
    };
  } catch (error) {
    logShopifyWarning(error, `Unable to load collection "${handle}"`);
    return null;
  }
}
