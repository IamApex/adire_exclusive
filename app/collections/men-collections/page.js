import { getMenCollections } from "@/app/_lib/data";
import GenderCollection from "@/app/_pages/GenderCollection";

export default async function Page() {
  const products = await getMenCollections();

  return <GenderCollection productsDataRaw={products} />;
}
