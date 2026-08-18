import { shopifyFetch, logShopifyWarning } from "./client";
import {
  COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  COLLECTION_PREVIEW_QUERY,
} from "./queries";
import { mapCollection, mapCollections, mapProductCards } from "./mappers";
import { isShopifyConfigured } from "./config";
import { FEATURED_COLLECTION_HANDLES, sortCollections } from "./catalog";

const PAGE_SIZE = 50;
const MAX_PAGES = 8;
const PREVIEW_SIZE = 8;

async function paginate(query, rootKey, variables = {}, tags = ["shopify"]) {
  const nodes = [];
  let after = null;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const data = await shopifyFetch({
      query,
      variables: { ...variables, first: PAGE_SIZE, after },
      tags,
    });

    const connection = data?.[rootKey];
    const pageNodes = connection?.nodes || [];
    nodes.push(...pageNodes);

    if (!connection?.pageInfo?.hasNextPage) {
      break;
    }

    after = connection.pageInfo.endCursor;
  }

  return nodes;
}

export async function getCollections() {
  if (!isShopifyConfigured()) {
    console.warn("[shopify] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
    return [];
  }

  try {
    const nodes = await paginate(COLLECTIONS_QUERY, "collections", {}, ["shopify", "collections"]);
    return sortCollections(mapCollections(nodes));
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
    const products = [];
    let after = null;
    let collectionNode = null;

    for (let page = 0; page < MAX_PAGES; page += 1) {
      const data = await shopifyFetch({
        query: COLLECTION_BY_HANDLE_QUERY,
        variables: { handle, first: PAGE_SIZE, after },
        tags: ["shopify", "collections", `collection:${handle}`],
      });

      collectionNode = data?.collection;

      if (!collectionNode) {
        return null;
      }

      const connection = collectionNode.products;
      products.push(...(connection?.nodes || []));

      if (!connection?.pageInfo?.hasNextPage) {
        break;
      }

      after = connection.pageInfo.endCursor;
    }

    const collection = mapCollection(collectionNode);

    return {
      ...collection,
      products: mapProductCards(products),
      productCount: products.length,
    };
  } catch (error) {
    logShopifyWarning(error, `Unable to load collection "${handle}"`);
    return null;
  }
}

export async function getCollectionPreview(handle, first = PREVIEW_SIZE) {
  if (!handle || !isShopifyConfigured()) {
    return null;
  }

  try {
    const data = await shopifyFetch({
      query: COLLECTION_PREVIEW_QUERY,
      variables: { handle, first },
      tags: ["shopify", "collections", `collection:${handle}`],
    });

    const collection = mapCollection(data?.collection);

    if (!collection) {
      return null;
    }

    return {
      ...collection,
      products: mapProductCards(data.collection.products?.nodes),
      productCount: 0,
    };
  } catch (error) {
    logShopifyWarning(error, `Unable to load collection preview "${handle}"`);
    return null;
  }
}

export async function getFeaturedCollections(handles = FEATURED_COLLECTION_HANDLES) {
  const collections = await Promise.all(handles.map((handle) => getCollectionPreview(handle)));
  return collections.filter(Boolean);
}

export async function getShopCatalog() {
  const collections = await getCollections();
  const previews = await Promise.all(
    collections.map((collection) => getCollectionPreview(collection.handle, PREVIEW_SIZE))
  );

  return previews.filter(Boolean);
}
