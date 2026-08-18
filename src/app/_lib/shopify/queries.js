const IMAGE_FIELDS = `
  url(transform: { maxWidth: 1200 })
  altText
  width
  height
`;

const PRODUCT_CARD_FIELDS = `
  id
  title
  handle
  vendor
  availableForSale
  featuredImage {
    ${IMAGE_FIELDS}
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  collections(first: 12) {
    nodes {
      id
      title
      handle
    }
  }
`;

export const SHOP_QUERY = /* GraphQL */ `
  query Shop {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;

export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($first: Int!, $after: String) {
    collections(first: $first, after: $after, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        handle
        description
        image {
          ${IMAGE_FIELDS}
        }
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        ${IMAGE_FIELDS}
      }
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ${PRODUCT_CARD_FIELDS}
        }
      }
    }
  }
`;

export const COLLECTION_PREVIEW_QUERY = /* GraphQL */ `
  query CollectionPreview($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        ${IMAGE_FIELDS}
      }
      products(first: $first) {
        nodes {
          ${PRODUCT_CARD_FIELDS}
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${PRODUCT_CARD_FIELDS}
      }
    }
  }
`;

export const BESTSELLING_PRODUCTS_QUERY = /* GraphQL */ `
  query BestSellingProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        ${PRODUCT_CARD_FIELDS}
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      availableForSale
      options {
        id
        name
        values
      }
      featuredImage {
        ${IMAGE_FIELDS}
      }
      images(first: 16) {
        nodes {
          ${IMAGE_FIELDS}
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            ${IMAGE_FIELDS}
          }
        }
      }
      collections(first: 8) {
        nodes {
          id
          title
          handle
        }
      }
    }
  }
`;
