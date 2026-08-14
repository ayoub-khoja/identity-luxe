function formatAmount(amount) {
  const value = Number.parseFloat(amount);

  if (Number.isNaN(value)) {
    return "";
  }

  return value.toFixed(2);
}

function formatCardPrice(amount) {
  const value = Number.parseFloat(amount);

  if (Number.isNaN(value)) {
    return "";
  }

  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, "");
}

function currencySymbol(code) {
  const symbols = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    QAR: "QR",
    SAR: "SR",
    AED: "AED",
  };

  return symbols[code] || code || "";
}

export function mapCollection(node) {
  if (!node) return null;

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description || "",
    image: node.image?.url || "",
    imageAlt: node.image?.altText || node.title,
  };
}

export function mapProduct(node) {
  if (!node) return null;

  const price = node.priceRange?.minVariantPrice;
  const compareAt = node.compareAtPriceRange?.minVariantPrice;
  const compareAmount = formatAmount(compareAt?.amount);
  const currentAmount = formatAmount(price?.amount);
  const hasCompare =
    Boolean(compareAmount) && Number(compareAmount) > Number(currentAmount);

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    image: node.featuredImage?.url || "/img/fashion/product-1.jpg",
    short: node.description || "",
    price: currentAmount,
    old_price: hasCompare ? compareAmount : "",
    currency: currencySymbol(price?.currencyCode),
  };
}

export function mapProductCard(node) {
  if (!node) return null;

  const price = node.priceRange?.minVariantPrice;

  return {
    id: node.id,
    handle: node.handle,
    slug: "/product",
    image: node.featuredImage?.url || "/img/fashion/product-1.jpg",
    name: node.title,
    brand: node.vendor || "Identity Luxe",
    price: formatCardPrice(price?.amount),
    currency: price?.currencyCode || "QAR",
  };
}

export function mapCollections(nodes = []) {
  return nodes.map(mapCollection).filter(Boolean);
}

export function mapProducts(nodes = []) {
  return nodes.map(mapProduct).filter(Boolean);
}

export function mapProductCards(nodes = []) {
  return nodes.map(mapProductCard).filter(Boolean);
}
