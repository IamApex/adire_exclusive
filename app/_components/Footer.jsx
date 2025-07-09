"use client";

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";

const guidesData = [
  { href: "/our-story", label: "Our Story" },
  { href: "/sizes", label: "FAQs" },
  { href: "/pages/size-guide", label: "Size chart" },
  { href: "/contact", label: "Contact us" },
];

const legalData = [
  { href: "/pages/legal?section=sales", label: "Terms of sales" },
  { href: "/sizes", label: "Privacy policy" },
  { href: "/sizes", label: "Delivery" },
];

const socailData = [
  {
    href: "https://www.instagram.com/adire_exclusive/",
    label: <FaInstagram />,
  },
  {
    href: "https://api.whatsapp.com/message/EEZL3LD6LWJ4C1?autoload=1&app_absent=0",
    label: <FaWhatsapp />,
  },
  { href: "https://www.tiktok.com/@adire_exclusive", label: <FaTiktok /> },
];

// export default function Footer() {
//   return (
//     <footer className="w-dvw h-[50dvh]  bg-pink-200 px-10 py-5 relative font-primary flex flex-col">
//       <div className="relative size-20 text-xs ">
//         <Image
//           src={"/logo.svg"}
//           alt="adire exclusive logo logo"
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="flex gap-4 ">
//         <div>
//           <p className="text-xs w-60 ">
//             Adire Exclusive, Not Just Clothing. It’s Culture, It’s Heritage,
//             It’s African.
//           </p>
//         </div>
//         <FooterTab type={"Guides"} data={guidesData} />
//         <FooterTab type={"Legal"} data={legalData} />
//         <FooterSocailTab type={"Social"} data={socailData} />
//       </div>

//       <div className="absolute bottom-5 text-xs">
//         <p>&copy; Adire Exclusive. All right reserved.</p>
//       </div>
//     </footer>
//   );
// }

export default function Footer() {
  return (
    <footer className="w-dvw md:h-[50dvh] bg-pink-200 px-10 py-5 relative font-primary flex flex-wrap md:flex-nowrap gap-4">
      <Newletter />

      <FooterTab type={"Legal"} data={legalData} />
      <FooterTab type={"Guides"} data={guidesData} />

      <div className="absolute bottom-0 md:bottom-5 text-xs">
        <p>&copy; Adire Exclusive. All right reserved.</p>
      </div>
    </footer>
  );
}

function FooterHeader({ children }) {
  return <p className="text-xs font-semibold mb-2 uppercase">{children}</p>;
}

function Newletter() {
  const [inputEntry, setInputEntry] = useState("");

  function handleEntry(e) {
    setInputEntry(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    // if(!inputEntry){}

    alert(`Thanks for Subcribing ${inputEntry}`);

    setInputEntry("");
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <FooterHeader>Newletter</FooterHeader>

      <p className="text-xs ">
        Join our list for first access to new collections, private events, and
        the stories behind our heritage.
      </p>
      <form className="flex flex-nowrap gap-1 w-full" onSubmit={handleSubmit}>
        <input
          required
          type="email"
          value={inputEntry}
          onChange={handleEntry}
          placeholder="Email Address"
          className="border border-pink-100 placeholder:uppercase placeholder:text-[8px] px-2 flex-1"
        />
        <button type="submit" className="p-2 bg-stone-950">
          <IoIosArrowRoundForward className="text-pink-200" />
        </button>
      </form>
      <FooterSocailTab type={"Social"} data={socailData} />
    </div>
  );
}

function FooterTab({ data, type }) {
  return (
    <div className=" w-full h-full text-xs ">
      <FooterHeader>{type}</FooterHeader>
      <ul className="flex flex-col gap-4">
        {data.map((data, i) => (
          <FooterItem data={data} key={i} />
        ))}
      </ul>
    </div>
  );
}

function FooterItem({ data }) {
  return (
    <li>
      <Link href={data.href}> {data.label}</Link>
    </li>
  );
}

function FooterSocailTab({ data, type }) {
  return (
    <div className="w-full h-full text-xs">
      {/* <FooterHeader>{type}</FooterHeader> */}

      <ul className="flex  gap-4">
        {data.map((data, i) => (
          <FooterSocailItem data={data} key={i} />
        ))}
      </ul>
    </div>
  );
}

function FooterSocailItem({ data }) {
  return (
    <li className=" rounded-full p-2">
      <a href={data.href} target="_blank">
        {data.label}
      </a>
    </li>
  );
}
