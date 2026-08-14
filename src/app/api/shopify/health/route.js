import { NextResponse } from "next/server";

import { getShopifyConfig } from "@library/shopify/config";
import { getCollections, getBestSellingProducts } from "@library/shopify";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const config = getShopifyConfig();

  if (!config) {
    return NextResponse.json({
      ok: false,
      configured: false,
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
    domain: config.domain,
    collections: collections.length,
    bestsellers: bestsellers.length,
    collectionTitles: collections.map((item) => item.title),
  });
}
