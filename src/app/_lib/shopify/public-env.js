/**
 * Public Storefront credentials (safe to ship in the server bundle).
 * Shopify's Storefront access token is designed for storefront use.
 * Prefer Vercel env vars when present; these are production fallbacks.
 */
export const SHOPIFY_PUBLIC_FALLBACK = {
  domain: "c8yerj-2i.myshopify.com",
  storefrontAccessToken: "9cf9946153fe5851b6f0a63ebba0cdb7",
};
