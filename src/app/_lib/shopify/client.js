import { getShopifyConfig } from "./config";

export class ShopifyError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.name = "ShopifyError";
    this.status = status;
    this.errors = errors;
  }
}

function buildHeaders(config) {
  return {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": config.publicToken,
  };
}

export async function shopifyFetch({ query, variables = {} } = {}) {
  const config = getShopifyConfig();

  if (!config) {
    throw new ShopifyError("Shopify is not configured. Check SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
  }

  if (!query) {
    throw new ShopifyError("A GraphQL query is required.");
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: buildHeaders(config),
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const apiMessage = json?.errors?.[0]?.message || response.statusText;
    throw new ShopifyError(apiMessage || "Shopify Storefront request failed.", {
      status: response.status,
      errors: json?.errors,
    });
  }

  if (json?.errors?.length) {
    throw new ShopifyError(json.errors[0].message || "Shopify GraphQL error.", {
      status: response.status,
      errors: json.errors,
    });
  }

  return json?.data ?? null;
}

export function logShopifyWarning(error, context) {
  const status = error instanceof ShopifyError ? error.status : undefined;
  const suffix = status ? ` [${status}]` : "";
  console.warn(`[shopify] ${context}${suffix}: ${error.message}`);
}
