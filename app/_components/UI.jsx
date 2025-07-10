"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./Cards";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export function LinkPrimary({ children, href }) {
  return (
    <Link href={href} className="uppercase text-xs flex flex-col max-w-max">
      <span className="border-b-1">{children}</span>
    </Link>
  );
}

export function CollectionWrapper({ children }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-4 p-1">
      {children}
    </div>
  );
}

export function Counter() {
  const [count, setCount] = useState(1);

  const decrement = () => setCount((prev) => (prev <= 1 ? prev : prev - 1));
  const increment = () => setCount((prev) => prev + 1);

  return (
    <span className="flex items-center gap-2 text-xs">
      <CounterBtn onClick={decrement} disabled={count === 1}>
        -
      </CounterBtn>
      <span>{count}</span>
      <CounterBtn onClick={increment}>+</CounterBtn>
    </span>
  );
}

function CounterBtn({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-sm border border-pink-200 px-2  ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}

export function ProductSlider({ products }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const [visibleCard, setVisibleCard] = useState(4);
  const [cardWidth, setCardWidth] = useState(150);

  useEffect(function () {
    function handleResize() {
      const width = window.innerWidth;
      console.log(width);
      if (width < 768) {
        setVisibleCard(2);
        setCardWidth(80);
      } else {
        setVisibleCard(4);
        setCardWidth(150);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products?.length - visibleCard);

  function next() {
    if (index === products.length) return;
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  }

  function prev() {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
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
      className="w-dvw overflow-hidden relative scrollbar-hidden touch-pan-y select-none"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-pink-100/70 text-pink-950 cursor-pointer"
        onClick={prev}
      >
        <IoIosArrowRoundBack className="size-5 md:size-8" />
      </button>

      <div
        className=" flex gap-1 transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${index * cardWidth}px)` }}
      >
        {/* {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))} */}

           {Array(12)
          .fill(products)
          .flat()
          .map((data, i) => (
            <ProductCard product={data} key={`${data?.id}-${i}`} />
          ))}
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-pink-100/70 text-pink-950 cursor-pointer"
        onClick={next}
      >
        <IoIosArrowRoundForward className="size-5 md:size-8" />
      </button>
    </div>
  );
}
