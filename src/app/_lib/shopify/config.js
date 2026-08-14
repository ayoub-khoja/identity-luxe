const API_VERSION = "2025-10";

function normalizeDomain(value) {
  if (!value) return "";

  return String(value)
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

export function getShopifyConfig() {
  const domain = normalizeDomain(process.env.SHOPIFY_STORE_DOMAIN);
  const publicToken = (process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "").trim();
  const privateToken = (process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || "").trim();

  if (!domain || !publicToken) {
    return null;
  }

  return {
    domain,
    publicToken,
    privateToken,
    endpoint: `https://${domain}/api/${API_VERSION}/graphql.json`,
    apiVersion: API_VERSION,
  };
}

export function isShopifyConfigured() {
  return Boolean(getShopifyConfig());
}
