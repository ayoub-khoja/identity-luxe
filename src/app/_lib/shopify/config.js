const API_VERSION = "2025-10";

/** Read env at runtime — avoids Next.js build-time inlining of missing Sensitive vars. */
function readEnv(name) {
  return process.env[name] ?? "";
}

function normalizeDomain(value) {
  if (!value) return "";

  return String(value)
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

export function getShopifyConfig() {
  const domain = normalizeDomain(readEnv("SHOPIFY_STORE_DOMAIN"));
  const publicToken = readEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN").trim();
  const privateToken = readEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN").trim();

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
