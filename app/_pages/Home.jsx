import Image from "next/image";
import { CollectionCard, ProductCard } from "../_components/Cards";
import { H3 } from "../_components/Headers";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import { LinkPrimary, ProductSlider } from "../_components/UI";
import { getMenCollections, getWomenCollections } from "../_lib/data";

const collectionData = [
  {
    title: "Women Collection",
    href: "/collections/women",
    image_src: "/women.jpg",
  },

  {
    title: "Men Collection",
    href: "/collections/men",
    image_src: "/men.jpg",
  },

  {
    title: "Children Collection",
    href: "/collections/children",
    image_src: "/women.jpg",
  },

  {
    title: "Family Collection",
    href: "/family",
    image_src: "/men.jpg",
  },
];

export default async function Home() {
  const menCollections = await getMenCollections();
  const womenCollections = await getWomenCollections();

  return (
    <>
      <section className="w-dvw h-[80dvh] ">
        <div className="relative w-full h-full flex justify-center items-center">
          <Image
            src={"/bg.png"}
            alt="background 1"
            fill
            className="object-cover"
          />
          <div className="z-1 text-pink-950 font-secondary text-center w-[80%] md:w-full">
            <h1 className="text-xl md:text-2xl text-shadow-xl">
              New Arrival: Hand-dyed with authentic Adire patterns
            </h1>
            <h3 className=" text-shadow-xl">
              Hand-dyed with authentic Adire patterns using traditional Yoruba
              techniques.
            </h3>

            <Link
              href={"/"}
              className=" text-xl font-primary uppercase font-bold"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* <div></div> */}
      </section>

      <section className="w-dvw ">
        <div className="w-full flex gap-2 flex-wrap">
          {collectionData.map((data, i) => (
            <CollectionCard data={data} key={data?.title || i} />
          ))}
        </div>
      </section>

      <section className="w-dvw ">
        <div className="font-primary uppercase text-sm  md:mb-8 flex items-center justify-between px-5 py-3 md:px-10 md:py-8">
          <H3>See Our COllection</H3>
          <Link
            href={"/collections/women"}
            className="uppercase text-[8px] md:text-sm italic text-pink-950 flex items-center"
          >
            explore women
            <IoIosArrowRoundForward className="size-5" />
          </Link>
        </div>
        <ProductSlider products={womenCollections || []} />
      </section>

      <section className="w-dvw">
        <div className="font-primary uppercase text-sm md:mb-8 flex items-center justify-between px-5 py-4 md:px-10 md:py-8">
          <H3>See Men COllection</H3>
          <Link
            href={"/collections/men"}
            className="uppercase text-[8px] md:text-sm italic text-pink-950 flex items-center"
          >
            explore men
            <IoIosArrowRoundForward className="size-5" />
          </Link>
        </div>
        <ProductSlider products={menCollections} />
      </section>

      <section className="w-dvw h-[80dvh]">
        <div className="w-full h-full relative flex ">
          <Image
            fill
            src={"/bg3.jpg"}
            alt="bacground 2"
            className="object-cover"
          />

          <div className="w-full md:w-[50%] h-full z-1 p-10 mb-auto flex flex-col justify-center items-center text-center md:text-left md:items-start md:justify-end gap-2">
            <span className="text-sm uppercase">Our Story</span>
            {/* <H3>Our Story</H3> */}
            <span className="uppercase font-secondary">Adire Exlcusive</span>
            <p className="w-full md:w-90 font-secondary text-xl">
              Embracing African Heritage,Crafted with love and pride in the
              heart of Africa.
            </p>
            {/* <Link href={"/our-story"}>Learn more</Link> */}
            <LinkPrimary href={"/our-story"}>Learn More</LinkPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
