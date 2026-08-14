import { NextResponse } from "next/server";

import { getShopifyConfig } from "@library/shopify/config";
import { getCollections, getBestSellingProducts } from "@library/shopify";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function hasEnv(name) {
  return Boolean((process.env[name] ?? "").trim());
}

export async function GET() {
  const envStatus = {
    SHOPIFY_STORE_DOMAIN: hasEnv("SHOPIFY_STORE_DOMAIN"),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: hasEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
    SHOPIFY_STOREFRONT_PRIVATE_TOKEN: hasEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN"),
  };

  const config = getShopifyConfig();

  if (!config) {
    return NextResponse.json({
      ok: false,
      configured: false,
      env: envStatus,
      vercelEnv: process.env.VERCEL_ENV ?? null,
      message: "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    });
  }

  const [collections, bestsellers] = await Promise.all([
    getCollections(),
    getBestSellingProducts(4),
  ]);

  return NextResponse.json({
    ok: collections.length > 0 || bestsellers.length > 0,
    configured: true,
    env: envStatus,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    domain: config.domain,
    collections: collections.length,
    bestsellers: bestsellers.length,
    collectionTitles: collections.map((item) => item.title),
  });
}
