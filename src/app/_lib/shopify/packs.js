import { getAllProducts } from "./products";
import { groupPackProducts } from "../packs";

export async function getPackCatalog() {
  const products = await getAllProducts();
  return groupPackProducts(products);
}
