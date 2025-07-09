import { getWomenCollections } from "../_lib/data";
import GenderCollection from "../_pages/GenderCollection";

export default async function Page() {
  const products = await getWomenCollections();
  return <GenderCollection productsDataRaw={products} />;
}

