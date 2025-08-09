import { useParams } from "react-router";

import { DefaultLayout } from "@/component";
import { useMarket } from "@/api/markets";
import { LoadingCircle } from "@packages/ui";

export const DetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useMarket(Number(id));

  if (isLoading) {
    return <LoadingCircle animation />;
  }

  // TODO:
  // not found market page
  if (!data) {
    return <div>Not Found Market Page</div>;
  }

  return (
    <DefaultLayout
      appBarOptions={{
        title: data.name,
        RightContent: (
          <a href="#" onClick={() => alert("TODO: 장바구니로 이동")}>
            <img src="/icons/bag-bold.svg" alt="bag-bold" width={24} height={24} loading="lazy" />
          </a>
        ),
      }}
    >
      {data.name}
    </DefaultLayout>
  );
};
