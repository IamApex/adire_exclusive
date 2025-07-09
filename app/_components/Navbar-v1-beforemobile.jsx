"use client";

import Image from "next/image";
import HeaderBanner from "./Headerbanner";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci";
import Modal from "./Modal";
import SearchWindow from "./SearchWindow";
import CartWindow from "./CartWindow";
import WishWindow from "./WishWindow";

const navData = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/collections/women", label: "Women" },
  { href: "/collections/men", label: "Men" },
];

const navUserData = [
  { href: "wish", label: <CiHeart className="size-5" /> },
  { href: "cart", label: <CiShoppingCart className="size-5" /> },
  {
    href: "search",
    props: { scroll: false },
    label: <CiSearch className="size-5" />,
  },
];

export default function Navbar() {
  return (
    <nav className={`w-dvw  z-10 bg-pink-50`}>
      <HeaderBanner />
      <div className="w-full p-5 px-10 flex justify-between items-center uppercase text-xs">
        <div className="">
          <NavTab data={navData} />
        </div>

        <Link href={"/"}>
          <div className="size-20  relative">
            <Image
              src={"/logo.svg"}
              fill
              className="object-contain"
              alt="adire_exclusive logo"
            />
          </div>
        </Link>

        <Modal>
          <div className="w-50">
            <NavIconTab data={navUserData} />
            <Modal.Window name={"wish"}>
              <WishWindow />
            </Modal.Window>
            <Modal.Window name={"cart"}>
              <CartWindow />
            </Modal.Window>
            <Modal.Window name={"search"}>
              <SearchWindow />
            </Modal.Window>
          </div>
        </Modal>


      </div>
    </nav>
  );
}


function NavIconTab({ data }) {
  return (
    <ul className=" flex gap-4 ">
      {data.map((icon, i) => (
        <NavIconItem data={icon} key={i} />
      ))}
    </ul>
  );
}

function NavIconItem({ data }) {
  return (
    <li className="cursor-pointer">
      <Modal.Open opens={data.href}>{data.label}</Modal.Open>
    </li>
  );
}

function NavTab({ data }) {
  return (
    <ul className="w-50 flex gap-4">
      {data.map((data) => (
        <NavItem data={data} key={data.href} />
      ))}
    </ul>
  );
}

function NavItem({ data }) {
  const pathname = usePathname();
  const active = pathname === data.href;

  if (data.props)
    return (
      <li className={`${active ? "font-semibold" : ""}`}>
        <Link href={data.href} {...data.props}>
          {data.label}
        </Link>
      </li>
    );

  return (
    <li className={`${active ? "font-semibold" : ""}`}>
      <Link href={data.href}> {data.label}</Link>
    </li>
  );
}
