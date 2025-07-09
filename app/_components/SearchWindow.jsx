"use client";

import { CiSearch } from "react-icons/ci";
import { SearchCard } from "./Cards";
import { useEffect, useState } from "react";
import { getSearch } from "../_lib/data";

export default function SearchWindow() {
  return <Window />;
}

function Window() {
  const [searchEntry, setSearchEntry] = useState("");
  const [data, setData] = useState([]);

  async function getSearchData() {
    if (searchEntry !== "" && searchEntry.length >= 3) {
      const searchList = await getSearch({ searchEntry });
      console.log(searchList);
      setData(searchList);
    } else {
      setData([]);
    }
  }

  useEffect(
    function () {
      getSearchData();
    },
    [searchEntry]
  );

  function onSubmit(e) {
    e.preventDefault();
    getSearchData();
  }

  return (
    <div className="w-full h-full py-5 flex flex-col">
      <form className="flex items-center" onSubmit={onSubmit}>
        <input
          type="text"
          required
          value={searchEntry}
          onChange={(e) => setSearchEntry(e.target.value)}
          placeholder="Search for products, categories..."
          className="border-b-2 border-pink-100 focus:outline-none focus:border-pink-950 transition-all placeholder:uppercase placeholder:text-xs text-sm uppercase p-5 flex-1"
        />
        <button type="submit">
          <CiSearch className="size-5 text-pink-950 cursor-pointer" />
        </button>
      </form>

      <div
        className=" flex-1 flex flex-col py-2 gap-4 overflow-y-scroll scrollbar-hidden"
        // data-lenis-prevent
      >
        {data?.map((item, i) => (
          <SearchCard product={item} key={item?.id || i} />
        ))}
      </div>
    </div>
  );
}
