import { productPath } from "./catalog";

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
    QAR: "QAR",
    SAR: "SAR",
    AED: "AED",
  };

  return symbols[code] || code || "";
}

function mapImage(node, fallbackAlt = "") {
  if (!node?.url) return null;

  return {
    url: node.url,
    alt: node.altText || fallbackAlt,
    width: node.width || 0,
    height: node.height || 0,
  };
}

function mapMoney(node) {
  if (!node) return { amount: "", currency: "", symbol: "" };

  return {
    amount: formatCardPrice(node.amount),
    raw: formatAmount(node.amount),
    currency: node.currencyCode || "QAR",
    symbol: currencySymbol(node.currencyCode),
  };
}

export function mapCollection(node) {
  if (!node) return null;

  const image = mapImage(node.image, node.title);

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description || "",
    image: image?.url || "",
    imageAlt: image?.alt || node.title,
    productCount: node.productsCount?.count ?? node.products?.nodes?.length ?? 0,
  };
}

export function mapProductCard(node) {
  if (!node) return null;

  const price = mapMoney(node.priceRange?.minVariantPrice);
  const compareAt = mapMoney(node.compareAtPriceRange?.minVariantPrice);
  const hasCompare = Boolean(compareAt.raw) && Number(compareAt.raw) > Number(price.raw);
  const image = mapImage(node.featuredImage, node.title);

  return {
    id: node.id,
    handle: node.handle,
    slug: productPath(node.handle),
    image: image?.url || "/img/fashion/product-1.jpg",
    imageAlt: image?.alt || node.title,
    name: node.title,
    title: node.title,
    brand: node.vendor || "Identity Luxe",
    price: price.amount,
    old_price: hasCompare ? compareAt.amount : "",
    currency: price.currency,
    available: Boolean(node.availableForSale),
    collections: (node.collections?.nodes || []).map((item) => ({
      id: item.id,
      title: item.title,
      handle: item.handle,
    })),
  };
}

export function mapProduct(node) {
  const card = mapProductCard(node);
  if (!card) return null;

  const images = (node.images?.nodes || [])
    .map((image) => mapImage(image, node.title))
    .filter(Boolean);

  if (card.image && !images.some((image) => image.url === card.image)) {
    images.unshift({ url: card.image, alt: card.imageAlt });
  }

  return {
    ...card,
    short: node.description || "",
    descriptionHtml: node.descriptionHtml || "",
    options: (node.options || [])
      .filter((option) => option.name !== "Title")
      .map((option) => ({
        id: option.id,
        name: option.name,
        values: option.values || [],
      })),
    variants: (node.variants?.nodes || []).map((variant) => {
      const price = mapMoney(variant.price);
      const compareAt = mapMoney(variant.compareAtPrice);
      const image = mapImage(variant.image, node.title);

      return {
        id: variant.id,
        title: variant.title,
        available: Boolean(variant.availableForSale),
        selectedOptions: variant.selectedOptions || [],
        price: price.amount,
        old_price: compareAt.raw && Number(compareAt.raw) > Number(price.raw) ? compareAt.amount : "",
        currency: price.currency,
        image: image?.url || "",
      };
    }),
    images,
  };
}

export function mapCollections(nodes = []) {
  return nodes.map(mapCollection).filter(Boolean);
}

export function mapProducts(nodes = []) {
  return nodes.map(mapProductCard).filter(Boolean);
}

export function mapProductCards(nodes = []) {
  return nodes.map(mapProductCard).filter(Boolean);
}
