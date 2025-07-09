import { getWomenCollections } from "@/app/_lib/data";
import GenderCollection from "@/app/_pages/GenderCollection";

export default async function Page() {
  const products = await getWomenCollections();
  return <GenderCollection productsDataRaw={products} />;
}
