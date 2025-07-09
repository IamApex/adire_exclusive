"use client";

import Link from "next/link";
import { useEffect } from "react";

const navData = [
  { href: "/collections", label: "Collections" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
];

export default function MobileNav() {
  useEffect(function () {
    const el = document?.body;
    el.classList.add("overflow-hidden");
    el.setAttribute("data-lenis-prevent", "true");

    return () => {
      el.classList.remove("overflow-hidden");
      el.removeAttribute("data-lenis-prevent");
    };
  }, []);

  return (
    <div className="w-dvw h-[80dvh] bg-pink-50 flex flex-col p-5">
      <div className="flex-1 ">
        <ul className="flex flex-col gap-6 text-md text-pink-950 uppercase ">
          {navData.map((nav) => (
            <li className="border-b-1 border-pink-200 py-2 " key={nav.href}>
              <Link href={nav.href}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t-1 border-pink-300">
        <Currency />
      </div>
    </div>
  );
}

function Currency() {
  const currency = localStorage.getItem("currency");

  return <span className="text-xs">{currency} </span>;
}
