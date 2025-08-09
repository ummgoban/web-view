import { useParams } from "react-router";
import { useState } from "react";

import { DefaultLayout } from "@/component";
import { useMarket } from "@/api/markets";
import { LoadingCircle } from "@packages/ui";

import ChevronRight from "@/lib/assets/icons/chevron-right.svg?react";
import BagBold from "@/lib/assets/icons/bag-bold.svg?react";
import Star from "@/lib/assets/icons/star.svg?react";
import Heart from "@/lib/assets/icons/heart.svg?react";

export const DetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<string>("Tag5");

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
            <BagBold />
          </a>
        ),
      }}
    >
      <div className="flex flex-col w-full h-full bg-gray-50">
        {/* 상단 정보 섹션 */}
        <div className="px-4 pt-4 bg-white">
          <h1 className="text-xl font-bold text-center mb-4">으악</h1>

          {/* 영업 시간 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-sm">영업 시간: </span>
              <span className="text-sm font-bold ml-1">00:00 ~ 00:00</span>
            </div>
            <div className="text-gray-500">
              <ChevronRight />
            </div>
          </div>

          {/* 주소 */}
          <div className="mb-3">
            <p className="text-sm">서울 동대문구 서울시립대로 5 11</p>
          </div>

          {/* 평점 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-yellow-400">
                <Star />
              </div>
              <span className="text-sm font-bold ml-1">5.0</span>
              <span className="text-sm text-gray-500 ml-1">리뷰 7개</span>
              <ChevronRight className="ml-1 text-gray-500" />
            </div>

            {/* 좋아요 버튼 */}
            <button className="text-red-500">
              <Heart />
            </button>
          </div>
        </div>
        {/* 태그 선택 */}
        <div className="p-4 flex space-x-2 mb-4 sticky top-[48px] z-10 bg-white">
          <button
            className={`px-4 py-1 rounded-full border ${activeTab === "Tag5" ? "bg-green-500 text-white" : "border-green-500 text-green-500"}`}
            onClick={() => setActiveTab("Tag5")}
          >
            Tag5
          </button>
          <button
            className={`px-4 py-1 rounded-full border ${activeTab === "tag3" ? "bg-green-500 text-white" : "border-green-500 text-green-500"}`}
            onClick={() => setActiveTab("tag3")}
          >
            tag3
          </button>
          <button
            className={`px-4 py-1 rounded-full border ${activeTab === "매뉴" ? "bg-green-500 text-white" : "border-green-500 text-green-500"}`}
            onClick={() => setActiveTab("매뉴")}
          >
            매뉴
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="flex-1 p-4">
          {data.products.map((product) => (
            <div key={product.id}>
              <ProductItem name={product.name} originalPrice={product.originPrice} salePrice={product.discountPrice} stock={product.stock} imageUrl={product.image} />
            </div>
          ))}
        </div>

        {/* 하단 메시지 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-200 text-center">
          <p className="text-gray-600">영업이 종료되었어요.</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

type ProductItemProps = {
  name: string;
  originalPrice: number;
  salePrice: number;
  stock: number;
  imageUrl: string;
};

const ProductItem = ({ name, originalPrice, salePrice, stock, imageUrl }: ProductItemProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg mb-3">
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center mt-1">
          <p className="text-gray-500 line-through text-sm">정가: {originalPrice.toLocaleString()}원</p>
        </div>
        <p className="font-bold mt-1">할인가: {salePrice.toLocaleString()}원</p>
        <p className="text-green-600 mt-1">재고 : {stock}</p>
      </div>

      <div className="flex flex-col items-center">
        <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-md" />

        <div className="flex flex-row items-center justify-center mt-2 space-x-2">
          <button className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
            <span>-</span>
          </button>
          <span className="text-center">{stock > 0 ? "0 개" : "품절"}</span>
          <button className="w-8 h-8 bg-green-500 text-white rounded-md flex items-center justify-center">
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
