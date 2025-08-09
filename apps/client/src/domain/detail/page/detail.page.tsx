import { useParams } from "react-router";

import { DefaultLayout } from "@/component";

export const DetailPage = () => {
  const { id } = useParams();
  return <DefaultLayout appBarOptions={{ title: "DetailPage" }}>DetailPage {id}</DefaultLayout>;
};
