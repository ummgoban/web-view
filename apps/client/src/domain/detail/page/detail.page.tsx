import { useParams } from "react-router";

import { DefaultLayout } from "@/component";
import { useMarket } from "@/api/markets";

export const DetailPage = () => {
  const { id } = useParams();

  const { data } = useMarket(Number(id));

  if (!data || !id) {
    return <DefaultLayout appBarOptions={{ title: "DetailPage" }}>DetailPage {id}</DefaultLayout>;
  }

  return <DefaultLayout appBarOptions={{ title: data.name }}>{data.name}</DefaultLayout>;
};
