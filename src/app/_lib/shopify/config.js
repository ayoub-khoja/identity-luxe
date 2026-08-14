function readEnv(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

const API_VERSION = "2025-10";

function normalizeDomain(value) {
  if (!value) return "";

  return value
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

export function getShopifyConfig() {
  const domain = normalizeDomain(readEnv("SHOPIFY_STORE_DOMAIN"));
  const publicToken = readEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  const privateToken = readEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN");

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
