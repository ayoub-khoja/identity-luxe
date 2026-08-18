export const PACK_DISCOUNT = 50;
export const PACK_CURRENCY = "QAR";
export const PACK_WHATSAPP = "97430209993";

export const PACK_GROUPS = {
  kids: {
    handles: ["kids-collection", "national-day-emirates"],
  },
  adults: {
    handles: ["adults-qatar", "adults-unisex-hoodies", "uae-all-national-day"],
  },
  tote: {
    handles: ["tote-bag-qatar", "tote-bag-uae"],
  },
};

export const PACKS = [
  {
    id: "family",
    featured: true,
    discount: PACK_DISCOUNT,
    slots: [
      { id: "k1", group: "kids" },
      { id: "k2", group: "kids" },
      { id: "a1", group: "adults" },
      { id: "a2", group: "adults" },
    ],
  },
  {
    id: "kids",
    discount: PACK_DISCOUNT,
    slots: [
      { id: "k1", group: "kids" },
      { id: "k2", group: "kids" },
    ],
  },
  {
    id: "adults",
    discount: PACK_DISCOUNT,
    slots: [
      { id: "a1", group: "adults" },
      { id: "a2", group: "adults" },
    ],
  },
  {
    id: "complete",
    discount: PACK_DISCOUNT,
    slots: [
      { id: "k1", group: "kids" },
      { id: "k2", group: "kids" },
      { id: "a1", group: "adults" },
      { id: "a2", group: "adults" },
      { id: "t1", group: "tote" },
    ],
  },
];

export function getPackById(id) {
  return PACKS.find((pack) => pack.id === id) || PACKS[0];
}

export function parsePrice(value) {
  const amount = Number.parseFloat(value);
  return Number.isNaN(amount) ? 0 : amount;
}

export function formatPackPrice(amount) {
  const value = Number(amount) || 0;
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, "");
}

export function summarizePack(products = [], discount = PACK_DISCOUNT) {
  const original = products.reduce((sum, item) => sum + parsePrice(item?.price), 0);
  const filled = products.filter(Boolean).length;
  const complete = filled > 0 && filled === products.length;
  const savings = complete ? discount : 0;

  return {
    original,
    savings,
    total: Math.max(0, original - savings),
    complete,
    filled,
    needed: products.length,
  };
}

export function productInGroup(product, group) {
  if (!product || !PACK_GROUPS[group]) return false;

  const handles = (product.collections || []).map((item) => item.handle);
  if (handles.some((handle) => PACK_GROUPS[group].handles.includes(handle))) {
    return true;
  }

  const text = `${product.handle || ""} ${product.title || ""} ${product.name || ""}`.toLowerCase();

  if (group === "tote") return text.includes("tote");
  if (group === "adults") return text.includes("hoodie") || text.includes("adult");
  if (group === "kids") {
    return text.includes("kids") || text.includes("baby") || (text.includes("set") && !text.includes("adult"));
  }

  return false;
}

export function groupPackProducts(products = []) {
  const unique = [];
  const seen = new Set();

  products.forEach((product) => {
    if (!product?.handle || seen.has(product.handle)) return;
    seen.add(product.handle);
    unique.push(product);
  });

  return {
    kids: unique.filter((item) => productInGroup(item, "kids")),
    adults: unique.filter((item) => productInGroup(item, "adults")),
    tote: unique.filter((item) => productInGroup(item, "tote")),
  };
}

export function exampleFamilyItems(catalog) {
  const kids = (catalog.kids || []).slice(0, 2);
  const adults = (catalog.adults || []).slice(0, 2);
  return [...kids, ...adults];
}

export function packWhatsAppUrl({ packLabel, products, summary, locale }) {
  const isAr = locale === "ar";
  const lines = [
    isAr ? `طلب ${packLabel} — Identity Luxe` : `${packLabel} order — Identity Luxe`,
    "",
    ...products.filter(Boolean).map((item, index) => `${index + 1}. ${item.name || item.title} — ${item.price} ${PACK_CURRENCY}`),
    "",
    isAr
      ? `السعر: ${formatPackPrice(summary.original)} ${PACK_CURRENCY}`
      : `Price: ${formatPackPrice(summary.original)} ${PACK_CURRENCY}`,
    isAr
      ? `سعر الباك: ${formatPackPrice(summary.total)} ${PACK_CURRENCY}`
      : `Pack price: ${formatPackPrice(summary.total)} ${PACK_CURRENCY}`,
    isAr
      ? `التوفير: ${formatPackPrice(summary.savings)} ${PACK_CURRENCY}`
      : `You save: ${formatPackPrice(summary.savings)} ${PACK_CURRENCY}`,
  ];

  return `https://wa.me/${PACK_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
}
