"use client";

import Image from "next/image";
import HeaderBanner from "./Headerbanner";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CiHeart,
  CiShoppingCart,
  CiSearch,
  CiMenuBurger,
} from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import Modal from "./Modal";
import SearchWindow from "./SearchWindow";
import CartWindow from "./CartWindow";
import WishWindow from "./WishWindow";
import { useState } from "react";
import MobileNav from "./MobileNav";

const navData = [
  { href: "/", label: "Home", className: "hidden md:list-item" },
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

const navDataMobile = [
  { href: "/collections", label: "Collections" },
  { href: "/collections/women", label: "Women" },
  { href: "/collections/men", label: "Men" },
];

const navUserDataMobile = [
  {
    href: "search",
    label: <CiSearch className="size-5" />,
  },
];

const navUserDataMobileRight = [
  { href: "wish", label: <CiHeart className="size-5" /> },
  { href: "cart", label: <CiShoppingCart className="size-5" /> },
];

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <nav className={`w-dvw  z-10 bg-pink-50`}>
        <HeaderBanner />

        <div className="flex flex-col gap-2 px-5 py-2 md:hidden ">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex gap-4">
              <button onClick={() => setOpenNav((prev) => !prev)}>
                {openNav ? (
                  <IoClose className="size-5" />
                ) : (
                  <CiMenuBurger className="size-5" />
                )}
              </button>

              <Modal>
                <NavIconTab data={navUserDataMobile} />
                <Modal.Window name={"search"}>
                  <SearchWindow />
                </Modal.Window>
              </Modal>
            </div>

            <Link href={"/"}>
              <div className="size-15 md:size-20  relative">
                <Image
                  src={"/logo.svg"}
                  fill
                  className="object-contain"
                  alt="adire_exclusive logo"
                />
              </div>
            </Link>

            <Modal>
              <div>
                <NavIconTab data={navUserDataMobileRight} />

                <Modal.Window name={"wish"}>
                  <WishWindow />
                </Modal.Window>
                <Modal.Window name={"cart"}>
                  <CartWindow />
                </Modal.Window>
              </div>
            </Modal>
          </div>

          {!openNav && (
            <div className="text-xs uppercase">
              <NavTab data={navData} />
            </div>
          )}
        </div>

        <div className="w-full p-5 md:px-10 md:flex justify-between items-center uppercase text-xs hidden">
          <div className="">
            <NavTab data={navData} />
          </div>

          <Link href={"/"}>
            <div className="size-15 md:size-20  relative">
              <Image
                src={"/logo.svg"}
                fill
                className="object-contain"
                alt="adire_exclusive logo"
              />
            </div>
          </Link>

          <Modal>
            <div className="w-30 lg:w-50 ">
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
      {openNav && <MobileNav />}
    </>
  );
}

function NavIconTab({ data }) {
  return (
    <ul className=" flex gap-4 justify-end lg:justify-start ">
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
      <li className={`  ${active ? "font-semibold" : ""}  ${data.className}`}>
        <Link href={data.href} {...data.props}>
          {data.label}
        </Link>
      </li>
    );

  return (
    <li className={`${active ? "font-semibold" : ""} ${data.className}`}>
      <Link href={data.href}> {data.label}</Link>
    </li>
  );
}
