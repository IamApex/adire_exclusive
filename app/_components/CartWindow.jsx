import { useEffect, useState } from "react";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import { WishCard } from "./Cards";
import { getCartLists } from "../_lib/data";

export default function CartWindow() {
  const [cart] = useLocalStorage("cart", []);
  const [data, setData] = useState([]);

  useEffect(
    function () {
      async function getData() {
        const cartList = await getCartLists(cart);
        setData(cartList);
      }
      getData();
    },
    [cart]
  );

  // if (!cart || cart.length === 0)
  if (!data || data.length === 0)
    return (
      <div className="w-full h-full p-5 flex justify-center items-center">
        <h4 className="italic  tracking-wide text-stone-500">
          Oops! Your cart’s feeling lonely.
        </h4>
      </div>
    );

  return (
    <div className="w-full h-full py-5 flex flex-col gap-2">
      {data?.map((item, i) => (
        <WishCard product={item} key={item?.id || i} />
      ))}
    </div>
  );
}
