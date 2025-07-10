import Image from "next/image";
import { H1, H2, H3 } from "../_components/Headers";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ProductCard } from "../_components/Cards";

import { CiInstagram } from "react-icons/ci";
import { CollectionWrapper, LinkPrimary } from "../_components/UI";

export default function Gender({ data, gender }) {
  return (
    <>
      <HeroBanner gender={gender} />
      <CollectionBanner gender={gender} data={data} />
    </>
  );
}

function CollectionBanner({ gender, data }) {
  const products = data;
  return (
    <section className="w-dvw ">
      <div className="w-full flex justify-between px-10 py-5">
        <H3> See Our Collections</H3>

        <Link
          href={`/collections/${gender}-collections`}
          className="uppercase text-xs italic text-pink-950 flex items-center"
        >
          explore {gender}
          <IoIosArrowRoundForward className="size-5" />
        </Link>
      </div>

      <CollectionWrapper>
        {/* {products.slice(0, 5).map((data) => (
          <ProductCard product={data} key={data.id} />
        ))} */}

        {Array(12)
          .fill(products)
          .flat()
          .map((data, i) => (
            <ProductCard product={data} key={`${data?.id}-${i}`} />
          ))}
      </CollectionWrapper>
      <SeenOn />
    </section>
  );
}

function SeenOn() {
  return (
    <section className="w-dvw">
      <div className="w-full flex justify-between px-10 py-5">
        <H3>As Seen On</H3>
      </div>
      <SeenOnCard />
    </section>
  );
}

function SeenOnCard() {
  return (
    <div className="w-[50dvw] h-90 md:w-[20dvw] md:h-[60dvh]">
      <div className="w-full h-[80%] relative">
        <Image
          fill
          src={"/men.jpg"}
          alt="men adire from instagram"
          className="object-cover object-top"
        />
      </div>

      <div className="w-full h-full flex flex-col gap-1 p-2">
        <span>
          <a
            href={"/"}
            target="_blank"
            className="flex gap-2 text-[10px] tracking-wide font-secondary uppercase items-center text-pink-950"
          >
            <CiInstagram className="size-4" /> UserName
          </a>
        </span>

        <span className="text-sm font-primary">
          Product Title || Description
        </span>
        {/* <span className="uppercase text-sm">Shop Now</span> */}
        <LinkPrimary href={"/"}>Shop Now</LinkPrimary>
      </div>
    </div>
  );
}

function HeroBanner({ gender }) {
  return (
    <section className="w-dvw h-[80dvh]">
      <div className="w-full h-full relative flex justify-center items-center ">
        <Image
          fill
          src={`/${gender}.jpg`}
          className="object-cover"
          alt="man in adire 2 hand piece"
        />
        <div className="z-1 p-5 text-center flex flex-col gap-2">
          <H1>New Arrival: Men's Traditional Yoruba Cap </H1>
          <H2>Adds the perfect finishing touch to any traditional outfit.</H2>
          <Link href={"/"} className="uppercase font-primary font-bold">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
