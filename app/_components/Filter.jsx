"use client";
import { CiFilter } from "react-icons/ci";
import Modal from "./Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useLocalStorage } from "../_hooks/useLocalStorage";

export default function Filter() {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("sortBy") ?? "";
    }
    return "";
  });

  const [size, setSize] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("size") ?? "";
    }
    return "";
  });

  const router = useRouter();

  return (
    <Modal>
      <div className="p-2 px-10 bg-pink-200">
        <div className="justify-self-end">
          <Modal.Open opens={"filter"}>
            <button className="flex gap-2 items-center justify-center text-pink-950 py-1.5 px-3 cursor-pointer">
              Filter <CiFilter />
            </button>
          </Modal.Open>
        </div>

        <Modal.Window name={"filter"}>
          <FilterWindow
            size={size}
            setSize={setSize}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Modal.Window>
      </div>
    </Modal>
  );
}

function FilterWindow({ sortBy, setSortBy, size, setSize, close }) {
  return (
    <div className="w-full h-full flex flex-col py-2">
      <div className="flex-1 space-y-4 ">
        <SortBy setSortBy={setSortBy} sortBy={sortBy} />
        <Sizes size={size} setSize={setSize} />
        <Currency />
      </div>
      <ViewFIlter
        sortBy={sortBy}
        size={size}
        close={close}
        setSize={setSize}
        setSortBy={setSortBy}
      />
    </div>
  );
}

function FilterHeader({ children }) {
  return <span className="uppercase text-sm">{children}</span>;
}

const sortData = [
  { label: "New Arrivals", order: "new" },
  { label: "Recommended", order: "recommended" },
  { label: "$ High to Low", order: "priceDecending" },
  { label: "$ Low to High", order: "priceAscending" },
];

function SortBy({ sortBy, setSortBy }) {
  return (
    <div className="w-full flex flex-col ">
      <div>
        <FilterHeader>Sort By</FilterHeader>
      </div>

      <div>
        <ul className="space-y-1">
          {sortData.map((data) => (
            <li key={data.order}>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="radio"
                  name={data.order}
                  value={data.order}
                  onChange={() => setSortBy(data.order)}
                  checked={sortBy === data.order}
                />
                {data.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const sizes = ["S", "M", "L", "XL", "XXL"];

function Sizes({ size, setSize }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        <FilterHeader>Sizes</FilterHeader>
      </div>

      <div>
        <ul className="flex gap-4">
          {sizes.map((data) => (
            <li
              className={`size-8 flex items-center justify-center border border-pink-200 text-center text-xs rounded-full cursor-pointer ${
                size === data ? "bg-pink-950 text-pink-200" : ""
              }`}
              key={data}
              onClick={() => setSize(data)}
            >
              {data}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Currency() {
  const currency = localStorage.getItem("currency");

  const currencyData = [
    { label: "$", value: "USD" },
    { label: "₦", value: "NGN" },
  ];

  function handleCurrencyChange(value) {
    localStorage.setItem("currency", value);
  }

  useEffect(
    function () {
      handleCurrencyChange(currency);
    },
    [currency]
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        <FilterHeader>Currency</FilterHeader>
      </div>

      <div>
        <ul className="flex gap-4">
          {currencyData.map((data) => (
            <li
              className={`size-8 flex items-center justify-center border border-pink-200 text-center text-xs rounded-full cursor-pointer 
              ${currency === data.value ? "bg-pink-950 text-pink-200" : ""}`}
              key={data.value}
              onClick={() => handleCurrencyChange(data.value)}
            >
              {data.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ViewFIlter({ size, sortBy, setSortBy, setSize, close }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onFilter() {
    const params = new URLSearchParams(searchParams.toString());

    if (sortBy !== "") {
      params.set("sortBy", sortBy);
    }

    if (size !== "") {
      params.set("size", size);
    }

    if (sortBy !== "" || size !== "") {
      router.push(`?${params.toString()}`);
    }
  }

  function handleReset() {
    setSize("");
    setSortBy("");

     router.push('/collections')
   
   
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <span
        className="border border-pink-950 text-pink-950 py-2 px-4 rounded-full text-center cursor-pointer"
        onClick={handleReset}
      >
        Reset
      </span>

      <span
        className="bg-pink-950 text-pink-200 py-2 px-4 rounded-full text-center cursor-pointer"
        onClick={() => {
          onFilter();
          close();
        }}
      >
        View Items
      </span>
    </div>
  );
}
