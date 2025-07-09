import Gender from "@/app/_pages/Gender";
import { getWomenCollections } from "@/app/_lib/data";

export default async function Page() {
  const data = await getWomenCollections();
  return <Gender data={data} gender={"women"} />;
}
