"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "../_components/Cards";
import Filter from "../_components/Filter";
import { CollectionWrapper } from "../_components/UI";
import { getCollections, getCollectionsData } from "../_lib/data";
import { Suspense, useEffect, useState } from "react";

function Collections() {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const currency =
    typeof window !== "undefined" ? localStorage.getItem("currency") : null;

  useEffect(
    function () {
      async function getCollectionsData() {
        const productsData = await getCollections();

        const sortValue = searchParams.get("sortBy");
        if (sortValue) {
          const sortedProducts = productsData.slice().sort((a, b) => {
            switch (sortValue) {
              case "priceAscending":
                return (
                  a.productPrice[currency].price -
                  b.productPrice[currency].price
                );

              case "priceDecending":
                return (
                  b.productPrice[currency].price -
                  a.productPrice[currency].price
                );

              case "recommended":
                return b.productRating - a.productRating;

              case "new":
                return new Date(a.dateAdded) - new Date(b.dateAdded);

              default:
                return 0;
            }
          });

          setData(sortedProducts);
        } else {
          setData(productsData);
        }
      }

      getCollectionsData();
    },
    [searchParams]
  );

  return (
    <section className="w-dvw min-h-dvh">
      <Filter />

      <CollectionWrapper>
        {/* {data.map((data, i) => ( */}
        {Array(12)
          .fill(data)
          .flat()
          .map((data, i) => (
            // <ProductCard product={data} key={data?.id || i} />
            <ProductCard product={data} key={`${data?.id}-${i}`} />
          ))}
      </CollectionWrapper>
    </section>
  );
}

export default function CollectionPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Collections />
    </Suspense>
  );
}
