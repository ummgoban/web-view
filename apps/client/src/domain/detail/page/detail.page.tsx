import { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router";

import type { ProductType, TagType } from "@packages/shared";
import { MarketDetail, postToApp } from "@packages/shared";
import { cn, LoadingCircle } from "@packages/ui";

import { useMarket } from "@/api/markets";
import { DefaultLayout } from "@/component";
import { useSafeAreaStore } from "@/store/safearea.store";

import BagBold from "@/lib/assets/icons/bag-bold.svg?react";
import ChevronRight from "@/lib/assets/icons/chevron-right.svg?react";
import Heart from "@/lib/assets/icons/heart.svg?react";
import Star from "@/lib/assets/icons/star.svg?react";

import { ProductItem, ProductTag } from "../component";
import { BusinessHours } from "../component/market-info/business-hours";
import { useScrollDetect } from "../hook";

export const DetailPage = () => {
  const {
    insets: { top, bottom, left },
  } = useSafeAreaStore();

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useMarket(Number(id));

  const marketTags = useMemo(() => {
    const tags: TagType[] = [];
    data?.products.map((product) => {
      product.tags.forEach((tag) => {
        if (!tags.some((t) => t.tagName === tag.tagName)) {
          tags.push(tag);
        }
      });
    });
    return tags;
  }, [data]);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const ids = marketTags.map((tag) => tag.tagName);

  const { activeId, register, scrollTo } = useScrollDetect(ids, {
    container: containerRef.current,
    tabContainer: tabContainerRef.current,
    offset: top + 48 + 60,
    tabOffset: left + 16,
  });

  /**
   * - tagId 오름차순으로 product를 정렬
   * - product는 태그가 여러개일 경우 중복될 수 있음
   */
  const sortedByTagProducts: { tag: TagType; products: ProductType[] }[] = useMemo(() => {
    const products: { [key: string]: { tag: TagType; products: ProductType[] } } = {};

    data?.products.forEach((product) => {
      product.tags.forEach((tag) => {
        if (!products[tag.tagName]) {
          products[tag.tagName] = { tag, products: [] };
        }
        products[tag.tagName].products.push(product);
      });
    });
    return Object.values(products);
  }, [data?.products]);

  if (isLoading) {
    // TODO: 스켈레톤 페이지
    return <LoadingCircle animation />;
  }

  if (!data) {
    navigate(`/404?native=${btoa("true")}&native-screen=${btoa("Home")}`);
    return;
  }

  const marketData: MarketDetail = new MarketDetail(data);

  return (
    <DefaultLayout
      appBarOptions={{
        title: marketData.name,
        back: () => postToApp({ type: "NATIVE_NAVIGATION", payload: { screen: "Home" } }),
        RightContent: (
          <a href="#" onClick={() => postToApp({ type: "NATIVE_NAVIGATION", payload: { screen: "CartRoot", params: { screen: "Cart" } } })}>
            <BagBold />
          </a>
        ),
      }}
    >
      <div className="flex flex-col w-full h-full bg-gray-50">
        {/* 상단 정보 섹션 */}
        <div className="px-4 pt-4 bg-white">
          <h1 className="text-xl font-bold text-center mb-4">{marketData.name}</h1>

          {/* 영업 시간 */}
          <BusinessHours marketOpenHour={marketData.marketOpenHour} todayOpenHour={marketData.todayOpenHour} />

          {/* 주소 */}
          <div className="mb-3">
            <p className="text-sm">{marketData.address}</p>
          </div>

          {/* 평점 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-yellow-400">
                <Star />
              </div>
              <span className="text-sm font-bold ml-1">{marketData.averageRating.toFixed(1)}</span>
              <span className="text-sm text-gray-500 ml-1">{`리뷰 ${marketData.reviewNum}개`}</span>
              <ChevronRight className="ml-1 text-gray-500" />
            </div>

            {/* 좋아요 버튼 */}
            <button className={marketData.hasLike ? "text-red-500" : "text-gray-500"}>
              <Heart />
            </button>
          </div>
        </div>
        {/* 태그 선택 */}
        <div className="p-4 flex space-x-2 mb-4 sticky bg-white shadow-sm w-full overflow-x-auto scrollbar-hide" style={{ top: `${top + 48}px` }} ref={tabContainerRef}>
          {marketTags.map((tag) => (
            <button
              key={tag.tagName}
              ref={register(tag.tagName)}
              className={`px-2 py-1 rounded-full border ${activeId === tag.tagName ? "bg-green-500 text-white" : "border-green-500 text-green-500"}`}
              onClick={() => scrollTo(tag.tagName)}
            >
              <div className="font-subtitle2 max-h-6 w-full max-w-18 overflow-hidden text-ellipsis whitespace-nowrap">{tag.tagName}</div>
            </button>
          ))}
        </div>

        {/* 상품 목록 */}
        <div className="flex-1 p-4">
          {sortedByTagProducts.map((tagProduct) => {
            const { tag, products } = tagProduct;
            return (
              <div key={tag.id}>
                <ProductTag tag={tag} ref={register(tag.tagName)} />
                {products.map((product) => (
                  <ProductItem
                    key={product.id}
                    name={product.name}
                    originalPrice={product.originPrice}
                    salePrice={product.discountPrice}
                    stock={product.stock}
                    imageUrl={product.image}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* 하단 메시지 */}
        <button
          style={{ paddingBottom: `${bottom + 16}px` }}
          className={cn("fixed bottom-0 left-0 right-0 p-4 text-center", !marketData.isOpen() ? "bg-gray-200" : "bg-primary-50")}
          disabled={!marketData.isOpen()}
        >
          <span className={cn(marketData.isOpen() ? "text-primary-600" : "text-gray-600")}>{marketData.isOpen() ? `예약하기 (${0})` : "영업이 종료되었어요."}</span>
        </button>
      </div>
    </DefaultLayout>
  );
};
