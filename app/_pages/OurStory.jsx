import Image from "next/image";
import { CategoryCard } from "../_components/Cards";
import { H3 } from "../_components/Headers";

const collectionData = [
  {
    title: "Women Collection",
    href: "/women",
    image_src: "/women.jpg",
  },

  {
    title: "Men Collection",
    href: "/men",
    image_src: "/men.jpg",
  },

  {
    title: "Children Collection",
    href: "/children",
    image_src: "/women.jpg",
  },

  {
    title: "Family Collection",
    href: "/men",
    image_src: "/men.jpg",
  },
];

export default function OurStory() {
  return (
    <>
      <section className="w-dwv h-[80dvh]">
        <div className="w-full h-full relative">
          <Image
            fill
            src={"/group.jpg"}
            alt="group wearing adire exclusive clothes"
            className="object-cover"
          />
        </div>
      </section>

      <div className="flex h-[80dvh]">
        <div className="w-[50%] h-full relative ">
          <Image
            fill
            src={"/women.jpg"}
            alt="group wearing adire exclusive clothes"
            className="object-cover"
          />
        </div>

        <div className="w-[50%] h-full flex flex-col items-center justify-center text-center">
          <h2>Wear Culture</h2>
          <p className="w-[70%]">
            Celebrate the richness of African traditions, artistry, and identity
            in every piece you wear.
          </p>
        </div>
      </div>

      <section className="w-dvw">
        <div className="flex h-[80dvh]">
          <div className="w-[50%] h-full relative order-last">
            <Image
              fill
              src={"/women.jpg"}
              alt="women adire clothes"
              className="object-cover"
            />
          </div>

          <div className="w-[50%] h-full flex flex-col items-center justify-center text-center">
            <h2>Wear Heritage</h2>
            <p className="w-[70%]">
              Carry the legacy of generations — handcrafted stories woven into
              fabric and dye.
            </p>
          </div>
        </div>

        <div className="flex h-[80dvh]">
          <div className="w-[50%] h-full relative">
            <Image
              fill
              src={"/women.jpg"}
              alt="group wearing adire exclusive clothes"
              className="object-cover"
            />
          </div>

          <div className="w-[50%] h-full flex flex-col items-center justify-center text-center">
            <h2>Wear Africa</h2>
            <p className="w-[70%]">
              Stand boldly in your roots. Represent the spirit, pride, and
              beauty of the continent.
            </p>
          </div>
        </div>
      </section>

      <section className="w-dvw py-8">
        <div className="text-center mb-8">
          <H3>Our Categories</H3>
        </div>

        <div className="w-dvw flex gap-2 justify-around flex-wrap ">
          {collectionData.map((data) => (
            <CategoryCard data={data} key={data.title} />
          ))}
        </div>
      </section>
    </>
  );
}
