import { sortCollections, getCollectionDisplayTitle } from "./catalog";

const COLLECTION_MENU_LINK = "/shop";

export function buildHeaderMenu(staticMenu = [], collections = [], locale = "en") {
  const ordered = sortCollections(collections);

  return staticMenu.map((item) => {
    if (item.link !== COLLECTION_MENU_LINK) {
      return item;
    }

    const collectionItems = ordered.map((collection) => ({
      label: getCollectionDisplayTitle(collection, locale),
      link: `/collection/${collection.handle}`,
    }));

    return {
      ...item,
      children: [
        {
          label: locale === "ar" ? "كل المنتجات" : "All products",
          link: "/products",
        },
        ...collectionItems,
      ],
    };
  });
}

export function isCollectionPath(pathname = "") {
  return (
    pathname === "/shop" ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/collection") ||
    pathname.startsWith("/product")
  );
}
