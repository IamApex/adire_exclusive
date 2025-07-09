"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import { Counter, LinkPrimary } from "./UI";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import { formatPrice } from "../_hooks/utils";

export function ProductCard({ product }) {
  const [wishList, setWishList] = useLocalStorage("wishList", []);
  const [cart, setCart] = useLocalStorage("cart", []);

  const currency =
    typeof window !== "undefined" ? localStorage.getItem("currency") : "";

  const { id, productName, productPrice, productRating } = product || {
    id: 8461927,
    productName: "Hand-dyed with authentic Adire patterns",
    productRating: "4.5",
    productPrice: {
      USD: {
        price: 265,
        lastPrice: 350,
      },
      NGN: {
        price: 120000,
        lastPrice: 150000,
      },
    },
  };
  const currencySymbol = { USD: "$", NGN: "₦" };

  const inWish = wishList.includes(id);
  const inCart = cart.includes(id);

  function handleWishList(e) {
    e.preventDefault();

    if (wishList.includes(id)) {
      setWishList((prev) => prev.filter((wishItem) => wishItem !== id));
    } else {
      setWishList((prev) => [...prev, id]);
    }
  }

  function handleCart(e) {
    e.preventDefault();

    if (cart.includes(id)) {
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
    } else {
      setCart((prev) => [...prev, id]);
    }
  }

  return (
    <Link
      href={`/products/${productName.replaceAll(" ", "-")}`}
      className="w-[50dvw] h-70 md:w-[20dvw] md:h-100 flex flex-col relative shrink-0"
    >
      <button
        className="absolute top-4 right-5 z-1 cursor-pointer text-pink-950"
        onClick={handleWishList}
      >
        {!inWish && <CiHeart className={`size-6 `} />}
        {inWish && <FaHeart className={`size-6 `} />}
      </button>

      <div className="relative flex-1">
        <Image
          src={"/bg1.jpg"}
          fill
          alt={productName}
          className="object-cover"
        />
      </div>

      <div className="w-full md:h-20 font-primary tracking-wider p-2 md:py-4 px-2">
        <div className="flex justify-between">
          <p className="w-[90%] md:w-[70%] text-xs tracking-wide">
            {productName}
          </p>
          <p className="text-[8px] md:text-xs font-semibold">{productRating}</p>
        </div>

        <div className="flex justify-between text-sm mt-4 font-primary">
          <div className="flex flex-col md:flex-row md:gap-2">
            <span className="font-semibold md:text-xs text-[8px]">
              {productPrice?.[currency]?.price &&
                formatPrice(productPrice[currency].price, currency)}
            </span>

            <span className="text-stone-400 md:text-xs text-[8px] line-through">
              {productPrice?.[currency]?.lastPrice &&
                formatPrice(productPrice[currency].lastPrice, currency)}
            </span>
          </div>

          <button className="cursor-pointer text-pink-950" onClick={handleCart}>
            {!inCart && <CiShoppingCart className="size-5" />}
            {inCart && <FaShoppingCart className="size-5" />}
          </button>
        </div>
      </div>
    </Link>
  );
}

export function CollectionCard({ data }) {
  const [hovered, setHovered] = useState(false);
  const { title, image_src, href } = data;

  return (
    <div
      className="w-[48dvw] h-60  md:w-60 md:h-100 lg:w-80 lg:h-140 flex flex-col "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={href} className=" flex-1 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={image_src}
            fill
            alt={title}
            className={`object-cover ${
              hovered ? "scale-110 transition-transform" : ""
            }`}
          />
        </div>
      </Link>
      <div className="py-5 px-1 uppercase text-xs flex flex-col gap-4">
        <p className={`${hovered ? "border-b-1 max-w-max" : ""}`}>{title}</p>
        <LinkPrimary href={href}>Shop Now</LinkPrimary>
      </div>
    </div>
  );
}

export function CategoryCard({ data }) {
  const { title, image_src, href } = data;

  return (
    <Link href={href} className="w-[48%] h-[80dvh] relative ">
      <div className="w-full h-full relative">
        <Image src={image_src} fill className="object-cover" alt={title} />
      </div>
      <p className="font-secondary text-xl absolute bottom-5 left-5">{title}</p>
    </Link>
  );
}

export function WishCard({ product }) {
  const [wishList, setWishList] = useLocalStorage("wishList", []);

  const currency =
    typeof window !== "undefined" ? localStorage.getItem("currency") : "";

  const { id, productName, productPrice, productImage } = product || {
    id: 8461927,
    productName: "Hand-dyed with authentic Adire patterns",
    productRating: "4.5",
    productPrice: {
      USD: {
        price: 265,
        lastPrice: 350,
      },
      NGN: {
        price: 120000,
        lastPrice: 150000,
      },
    },
    productImage: "/men.jpg",
  };
  const currencySymbol = { USD: "$", NGN: "₦" };

  function handleRemove() {
    if (wishList.includes(id))
      setWishList((prev) => prev.filter((wish) => wish.id === id));
  }

  return (
    <div className="w-full h-30 flex">
      <div className="w-40 h-full relative ">
        <Image
          fill
          src={productImage}
          alt={productName}
          className="object-cover object-top"
        />
      </div>

      <div className="w-full flex justify-between">
        <div className="flex justify-center gap-2 text-xs flex-col">
          <span className=" w-[80%]">{productName}</span>

          <span className="uppercase text-[8px]">size: L</span>
          <span className="uppercase text-[8px] ">Color: L</span>
        </div>
        <div className="flex items-center">
          <Counter />
        </div>

        <div className="flex items-center">
          <span className="text-xs">
            {formatPrice(productPrice[currency].price, currency)}
          </span>
        </div>

        <div className="flex items-center">
          <button className="text-xs" onClick={() => handleRemove()}>
            <IoIosClose className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SearchCard({ product }) {
  const currency = localStorage.getItem("currency");

  const { id, productName, productPrice, productImage } = product || {
    id: 8461927,
    productName: "Hand-dyed with authentic Adire patterns",
    productRating: "4.5",

    productPrice: {
      USD: {
        price: 265,
        lastPrice: 350,
      },
      NGN: {
        price: 120000,
        lastPrice: 150000,
      },
    },

    productImage: "/men.jpg",
  };
  const currencySymbol = { USD: "$", NGN: "₦" };

  return (
    <div className="w-full min-h-30 flex border border-pink-200 p-2">
      <div className="w-40 h-full relative ">
        <Image
          fill
          src={"/men.jpg"}
          alt={productName}
          className="object-cover object-top"
        />
      </div>

      <div className="w-full flex justify-between">
        <div className="flex justify-center gap-2 text-xs flex-col">
          <span className=" w-[80%]">{productName}</span>

          <span className="uppercase text-[8px]">size: L</span>
          <span className="uppercase text-[8px] ">Color: L</span>
        </div>

        <div className="flex items-center">
          <span className="text-xs">
            {formatPrice(productPrice[currency].price, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
