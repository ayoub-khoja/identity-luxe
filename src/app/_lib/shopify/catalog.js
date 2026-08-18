export const FEATURED_COLLECTION_HANDLES = [
  "kids-collection",
  "adults-qatar",
  "adults-unisex-hoodies",
  "tote-bag-qatar",
];

export const COLLECTION_ORDER = [
  "kids-collection",
  "adults-qatar",
  "adults-unisex-hoodies",
  "tote-bag-qatar",
  "qatar-national-day-collection",
  "national-day-emirates",
  "uae-all-national-day",
  "tote-bag-uae",
  "all-products-uae",
];

export const COLLECTION_LABELS = {
  "kids-collection": { en: "Kids & Babies Sets", ar: "أطقم الأطفال والرضع" },
  "adults-qatar": { en: "Adults Hoodies", ar: "هوديز الكبار" },
  "adults-unisex-hoodies": { en: "Adults Sets", ar: "أطقم الكبار" },
  "tote-bag-qatar": { en: "Tote Bag Qatar", ar: "حقائب قطر" },
  "qatar-national-day-collection": { en: "All products Qatar", ar: "كل منتجات قطر" },
  "national-day-emirates": { en: "Kids UAE", ar: "أطفال الإمارات" },
  "uae-all-national-day": { en: "Adults UAE", ar: "كبار الإمارات" },
  "tote-bag-uae": { en: "Tote Bag UAE", ar: "حقائب الإمارات" },
  "all-products-uae": { en: "All products UAE", ar: "كل منتجات الإمارات" },
};

export function sortCollections(collections = []) {
  const rank = new Map(COLLECTION_ORDER.map((handle, index) => [handle, index]));

  return [...collections].sort((a, b) => {
    const aRank = rank.has(a.handle) ? rank.get(a.handle) : COLLECTION_ORDER.length + 1;
    const bRank = rank.has(b.handle) ? rank.get(b.handle) : COLLECTION_ORDER.length + 1;

    if (aRank !== bRank) {
      return aRank - bRank;
    }

    return String(a.title || "").localeCompare(String(b.title || ""));
  });
}

export function getCollectionDisplayTitle(collection, locale = "en") {
  if (!collection) return "";

  const labels = COLLECTION_LABELS[collection.handle];
  return labels?.[locale] || labels?.en || collection.title || "";
}

export function productPath(handle) {
  return handle ? `/product/${handle}` : "/products";
}

export function collectionPath(handle) {
  return handle ? `/collection/${handle}` : "/shop";
}
