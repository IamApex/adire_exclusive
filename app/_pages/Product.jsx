"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "../_hooks/utils";
import { useRef, useState } from "react";
import { IoIosArrowRoundBack, IoIosStar } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CollectionWrapper, LinkPrimary } from "../_components/UI";
import { H3 } from "../_components/Headers";
import { ProductCard } from "../_components/Cards";
import { useLocalStorage } from "../_hooks/useLocalStorage";

export default function Product() {
  const currency =
    typeof window !== "undefined" ? localStorage.getItem("currency") : "";

  const { productName, productPrice, productImages, productRating, dateAdded } =
    {
      id: 8461927,
      dateAdded: "2025-06-21T10:00:00Z",

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

      productImage: "/women.jpg",
      productImages: ["/women.jpg", "/men.jpg", "/men.jpg", "/men.jpg"],
    };

  return (
    <>
      <section className="w-dvw md:h-[80dvh] flex flex-col md:flex-row">
        <div className="w-full h-100 md:w-[50%] md:h-full relative">
          {/* <ProductImage images={productImages} name={productName} /> */}
          <ProductImageSlider images={productImages} name={productName} />
        </div>

        <div className=" h-full relative px-5 py-10 flex flex-col gap-4">
          <H1>{productName}</H1>

          <div className="flex gap-4">
            <New date={dateAdded} />

            <span className="flex gap-1 items-center text-sm ">
              <IoIosStar className="size-3" /> {productRating}
            </span>
          </div>

          <div className="flex gap-4">
            <Price>{formatPrice(productPrice[currency].price, currency)}</Price>

            {productPrice[currency].lastPrice && (
              <LastPrice>
                {formatPrice(productPrice[currency].lastPrice, currency)}
              </LastPrice>
            )}
          </div>

          <Size />

          <div className="flex w-full ">
            <PrimaryBtn />
            <WishBtn />
          </div>
        </div>
      </section>

      <section className="w-dvw ">
        <div className="font-primary uppercase text-sm mb-8 flex justify-between px-5 py-4 md:px-10 md:py-8">
          <H3>Related Products</H3>
          <Link
            href={"/collections"}
            className="uppercase text-xs italic text-pink-950 flex items-center"
          >
            more
            <IoIosArrowRoundForward className="size-5" />
          </Link>
        </div>

        <CollectionWrapper>
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCard key={`${i} 'related products'`} />
          ))}
        </CollectionWrapper>
      </section>
    </>
  );
}

function ProductImageSlider({ images, name }) {
  const [imageIndex, setImageIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  function next() {
    setImageIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function handleStart(x) {
    startX.current = x;
    isDragging.current = true;
  }

  function handleMove(x) {
    if (!isDragging.current) return;
    const diff = x - startX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
      isDragging.current = false;
    }
  }

  function handleEnd() {
    isDragging.current = false;
  }

  return (
    <div
      className="w-full h-full relative overflow-hidden touch-pan-y select-none"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <button
        className="absolute left-5 top-1/2 translate-y-1/2 z-10 rounded-full bg-pink-100"
        onClick={prev}
      >
        <IoIosArrowRoundBack className="size-5" />
      </button>

      <div
        className="w-full h-full flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${imageIndex * 100}% )` }}
      >
        {images.map((image, i) => (
          <div className="w-full h-full relative shrink-0 " key={i}>
            <Image
              fill
              src={image}
              className="object-cover"
              alt={`${name} image-${imageIndex + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        className="absolute right-5 top-1/2 translate-y-1/2 z-10 rounded-full bg-pink-100"
        onClick={next}
      >
        <IoIosArrowRoundForward className="size-5" />
      </button>

      <div className="absolute bottom-5 right-1/2 translate-x-1/2 flex gap-2 ">
        {images.map((_, i) => (
          <button
            className={`rounded-full  size-2 ${
              i === imageIndex ? "bg-black" : "bg-pink-100"
            }`}
            onClick={() => {
              setImageIndex(i);
            }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

function ProductImage({ images, name }) {
  const [indexImage, setIndexImage] = useState("");

  return (
    <div className="w-full h-full flex">
      <div className="flex-1 relative">
        <Image
          fill
          src={indexImage || images.at(0)}
          className="object-cover"
          alt={name}
        />
      </div>

      <div className=" flex-col flex gap-4 justify-end pb-8">
        {images.map((image, i) => (
          <div className="w-10 h-10 relative border border-pink-200" key={i}>
            <Image
              fill
              src={image}
              className="object-cover object-top"
              onClick={() => setIndexImage(image)}
              alt={`${name} image ${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function New({ date }) {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const dateToCheck = date instanceof Date ? date : new Date(date);

  const isNew = dateToCheck < now && dateToCheck > oneMonthAgo;

  if (isNew)
    return (
      <span className="text-xs tracking-wide py-0.5 px-1.5 bg-black text-white ">
        New
      </span>
    );

  return null;
}

function Price({ children }) {
  return <span className="text-sm tracking-wide">{children}</span>;
}

function LastPrice({ children }) {
  return (
    <span className="text-sm tracking-wide line-through text-stone-400">
      {children}
    </span>
  );
}

function Size() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sizes = ["S", "M", "L", "XL", "XXL"];

  function handleSize(option) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", option);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="">
      <div className="w-full justify-between flex">
        <p className="uppercase text-xs ">Size {searchParams.get("size")}</p>
        <Link href={"/pages/size-guide"} className="uppercase text-xs ">
          Size Guide
        </Link>
      </div>
      <div className="flex ">
        {sizes.map((data) => (
          <SizeBtn data={data} key={data} onClick={handleSize} />
        ))}
      </div>
    </div>
  );
}

function SizeBtn({ data, onClick }) {
  const searchParams = useSearchParams();
  const selected = searchParams.get("size") === data;

  return (
    <button
      className={`py-2 px-8 cursor-pointer ${
        selected ? " border rounded-xs" : ""
      }`}
      key={data}
      onClick={() => onClick(data)}
    >
      {data}
    </button>
  );
}

function H1({ children }) {
  return <h1 className="font-secondary tracking-wide text-2xl ">{children}</h1>;
}

function PrimaryBtn() {
  return (
    <button className="py-3 px-4 border  text-white bg-black text-sm uppercase cursor-pointer flex-1">
      Order via Whatsapp
    </button>
  );
}

function WishBtn({ id }) {
  const [wishList, setWishList] = useLocalStorage("wishList");

  const inWish = wishList.includes(id);

  function handleWishList(e) {
    e.preventDefault();

    if (wishList.includes(id)) {
      setWishList((prev) => prev.filter((wishItem) => wishItem !== id));
    } else {
      setWishList((prev) => [...prev, id]);
    }
  }

  return (
    <button
      className="py-3 px-4 border cursor-pointer"
      onClick={handleWishList}
    >
      {inWish ? <FaHeart className="size-5" /> : <CiHeart className="size-5" />}
    </button>
  );
}
