"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import { getWishLists } from "../_lib/data";
import { WishCard } from "./Cards";

export default function WishWindow() {
  const [wishLists] = useLocalStorage("wishList", []);
  const [data, setData] = useState([]);

  useEffect(
    function () {
      async function getData() {
        const wishList = await getWishLists(wishLists);
        setData(wishList);
      }
      getData();
    },
    [wishLists]
  );

  // if (!wishLists || wishLists.length === 0)
  if (!data || data.length === 0)
    return (
      <div className="w-full h-full p-5 flex justify-center items-center">
        <h4 className="italic  tracking-wide text-stone-500">
          You haven’t added any favorites yet.
        </h4>
      </div>
    );

  return (
    <div className="w-full h-full py-5 flex flex-col gap-2 overflow-y-scroll">
      {data?.map((item, i) => (
        <WishCard product={item} key={item?.id || i} />
      ))}
    </div>
  );
}
