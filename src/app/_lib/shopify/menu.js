const COLLECTION_MENU_LINK = "/shop";

export function buildHeaderMenu(staticMenu = [], collections = []) {
  return staticMenu.map((item) => {
    if (item.link !== COLLECTION_MENU_LINK) {
      return item;
    }

    const collectionItems = collections.map((collection) => ({
      label: collection.title,
      link: `/collection/${collection.handle}`,
    }));

    return {
      ...item,
      children: [
        {
          label: "Tous les produits",
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
    pathname.startsWith("/collection")
  );
}
