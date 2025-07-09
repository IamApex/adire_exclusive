import Link from "next/link";
import { GiAfrica } from "react-icons/gi";

export default function NotFound() {
  return (
    <section className="w-dvw h-[80dvh] flex items-center justify-center gap-4 bg-pink-100">
      <div className="flex items-center flex-col justify-center">
        <div className="">
          <GiAfrica className="size-70 text-pink-200" />
        </div>

        <h1 className="uppercase text-sm text-pink-950 font-bold">Site is under construction</h1>
        <Link href={"/"} className="py-2 px-4 bg-pink-950  text-pink-100 rounded-sm">
          Return Home
        </Link>
      </div>
    </section>
  );
}
