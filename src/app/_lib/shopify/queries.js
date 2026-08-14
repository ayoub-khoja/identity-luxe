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
  query Collections($first: Int!) {
    collections(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
        }
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first) {
        nodes {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
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
        }
      }
    }
  }
`;

export const BESTSELLING_PRODUCTS_QUERY = /* GraphQL */ `
  query BestSellingProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        vendor
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
