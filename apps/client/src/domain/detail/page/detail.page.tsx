import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { ProductType, TagType } from "@packages/shared";
import { MarketDetail, postToApp } from "@packages/shared";
import { LoadingCircle } from "@packages/ui";

import { useMarket } from "@/api/markets";
import { DefaultLayout } from "@/component";
import { useSafeAreaStore } from "@/store/safearea.store";

import BagBold from "@/lib/assets/icons/bag-bold.svg?react";

import { BottomButton } from "../component/bottom-button";
import { BusinessHours, Rating } from "../component/market-info";
import { ProductItem, ProductTag } from "../component/product-list";

import { useScrollDetect } from "../hook";
import type { BucketProductType } from "@/lib/types/bucket.type";

export const DetailPage = () => {
  /// MARK: detail page state
  const [cartItemCount, setCartItemCount] = useState<{
    totalPrice: number;
    totalCount: number;
    products: BucketProductType[];
  }>({
    totalPrice: 0,
    totalCount: 0,
    products: [],
  });

  /// MARK: safearea
  const {
    insets: { top, bottom, left },
  } = useSafeAreaStore();

  /// MARK: router
  const { id } = useParams();
  const navigate = useNavigate();

  /// MARK: market detail data
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

  /// MARK: scroll detect
  const containerRef = useRef<HTMLDivElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const ids = marketTags.map((tag) => tag.tagName);

  const { activeId, register, scrollTo } = useScrollDetect(ids, {
    container: containerRef.current,
    tabContainer: tabContainerRef.current,
    offset: top + 48 + 60,
    tabOffset: left + 16,
  });

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
          <a
            href="/cart"
            onClick={(e) => {
              e.preventDefault();
              postToApp({
                type: "NATIVE_NAVIGATION",
                payload: {
                  screen: "CartRoot",
                  params: { screen: "Cart" },
                  callbackState: { screen: "Detail", params: { screen: "MarketReview", params: { marketId: marketData.id } }, webUri: window.location.href },
                },
              });
            }}
          >
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
          <Rating marketId={marketData.id} averageRating={marketData.averageRating} reviewNum={marketData.reviewNum} hasLike={marketData.hasLike} />
        </div>
        {/* 태그 선택 */}
        <div className="p-4 flex space-x-2 mb-4 sticky bg-white w-full overflow-x-auto scrollbar-hide" style={{ top: `${top + 48}px` }} ref={tabContainerRef}>
          {marketTags.map((tag) => (
            <button
              key={tag.tagName}
              ref={register(`tag-${tag.tagName}`)}
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
                    updateCartCount={(type) =>
                      setCartItemCount((prev) => {
                        const newProductIndex = prev.products.findIndex((p) => p.id === product.id);
                        if (type === "up") {
                          return {
                            totalPrice: prev.totalPrice + product.discountPrice,
                            totalCount: prev.totalCount + 1,
                            products:
                              newProductIndex !== -1
                                ? prev.products.map((p) => (p.id === product.id ? { ...p, count: p.count + 1 } : p))
                                : [
                                    ...prev.products,
                                    {
                                      id: product.id,
                                      count: 1,
                                      name: product.name,
                                      image: product.image,
                                      originPrice: product.originPrice,
                                      discountPrice: product.discountPrice,
                                      discountRate: product.discountRate,
                                    },
                                  ],
                          };
                        } else if (type === "down") {
                          return {
                            totalPrice: prev.totalPrice - product.discountPrice,
                            totalCount: prev.totalCount - 1,
                            products:
                              newProductIndex === -1
                                ? prev.products.filter((p) => p.id !== product.id)
                                : prev.products.map((p) => (p.id === product.id ? { ...p, count: p.count - 1 } : p)),
                          };
                        }
                        return prev;
                      })
                    }
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* 하단 메시지 */}
        <BottomButton
          marketId={marketData.id}
          insetsBottom={bottom}
          cartItemCount={cartItemCount}
          disabled={!marketData.isOpen() || cartItemCount.totalCount === 0}
          isOpen={marketData.isOpen()}
          onClick={() => {
            postToApp({
              type: "NATIVE_NAVIGATION",
              payload: {
                screen: "CartRoot",
                params: { screen: "Cart" },
                callbackState: { screen: "Detail", params: { screen: "MarketReview", params: { marketId: marketData.id } }, webUri: window.location.href },
              },
            });
          }}
        />
      </div>
    </DefaultLayout>
  );
};
