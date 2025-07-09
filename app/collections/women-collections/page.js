import { getWomenCollections } from "@/app/_lib/data";
import GenderCollection from "@/app/_pages/GenderCollection";
import { Suspense } from "react";

export default async function Page() {
  const products = await getWomenCollections();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenderCollection productsDataRaw={products} />
    </Suspense>
  );
}
