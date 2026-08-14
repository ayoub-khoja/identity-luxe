import { getCollections } from "@library/shopify";
import HeaderLayoutDefault from "./LayoutDefault";

const Header = async ({ layout }) => {
  const collections = await getCollections();

  switch (layout) {
    case 1:
      return;

    case 2:
      return;

    default:
      return (
        <HeaderLayoutDefault collections={collections} />
      );
  }
};
export default Header;
