import Gender from "@/app/_pages/Gender";
import { getMenCollections } from "@/app/_lib/data";

export default async function Page() {
  const data = await getMenCollections();
  
  return <Gender data={data} gender={"men"} />;
}
