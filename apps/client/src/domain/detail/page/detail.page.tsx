import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { ProductType, TagType } from "@packages/shared";
import { MarketDetail, postToApp } from "@packages/shared";

import { useMarket } from "@/api/markets";
import { DefaultLayout } from "@/component";
import type { BucketProductType } from "@/lib/types/bucket.type";
import { useNativeMessageStore, useProfileStore, useSafeAreaStore } from "@/store";

import BagBold from "@/lib/assets/icons/bag-bold.svg?react";

import { BottomButton } from "../component/bottom-button";
import { BusinessHours, Rating } from "../component/market-info";
import { ProductItem, ProductTag } from "../component/product-list";
import { SuggestionInstallAppModal } from "../../../component/feedback/suggestion-install-app-modal/suggestion-install-app-modal";
import { useScrollDetect } from "../hook";
import { Alert, LoadingCircle } from "@packages/ui";

export const DetailPage = () => {
  /// MARK: 웹 브라우저 환경에서 앱 설치 권장 모달
  const [openSuggestionInstallAppModal, setOpenSuggestionInstallAppModal] = useState(false);
  const fallbackPostToApp = useCallback(() => {
    setOpenSuggestionInstallAppModal(true);
  }, []);

  /// MARK: 로그인 요청 모달
  const [openLoginAlert, setOpenLoginAlert] = useState(false);

  // TODO: 웹뷰에서도 액세스 토큰 대신 프로필을 확인. 혹은 api 호출 후 refresh 시도
  const { accessToken } = useProfileStore();

  /// MARK: detail page state
  const [cartItem, setCartItem] = useState<{ [key: string]: BucketProductType }>({});

  /// MARK: safearea
  const {
    insets: { top, bottom, left },
  } = useSafeAreaStore();

  const {
    init: { platform },
  } = useNativeMessageStore();

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
  const sortedByTagProducts = useMemo(() => {
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

  const isOpen = marketData.isOpen();

  return (
    <DefaultLayout
      appBarOptions={{
        title: marketData.name,
        back: () => postToApp({ type: "NATIVE_NAVIGATION", payload: { screen: "Home" } }),
        hiddenBack: platform === "web",
        RightContent: (
          <a
            href="/cart"
            aria-label="장바구니"
            // onClick={(e) => {
            //   e.preventDefault();
            //   postToApp({
            //     type: "NATIVE_NAVIGATION",
            //     payload: {
            //       screen: "CartRoot",
            //       params: { screen: "Cart" },
            //       callbackState: { screen: "Detail", params: { screen: "MarketReview", params: { marketId: marketData.id } }, webUri: window.location.href },
            //     },
            //   });
            // }}
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
          <BusinessHours
            marketOpenHour={marketData.marketOpenHour}
            todayOpenHour={marketData.todayOpenHour}
            tomorrowOpenHour={marketData.tomorrowOpenHour}
            isOpen={isOpen}
          />

          {/* 주소 */}
          <div className="mb-3">
            <p className="text-sm">{marketData.address}</p>
          </div>

          {/* 평점 */}
          <Rating
            marketId={marketData.id}
            averageRating={marketData.averageRating}
            reviewNum={marketData.reviewNum}
            hasLike={marketData.hasLike}
            onClickReview={() => {
              postToApp(
                {
                  type: "NATIVE_NAVIGATION",
                  payload: {
                    screen: "Detail",
                    params: {
                      screen: "MarketReview",
                      params: { marketId: marketData.id },
                    },
                    callbackState: {
                      screen: "Detail",
                      params: { screen: "MarketDetail", params: { marketId: marketData.id } },
                      webUri: window.location.href,
                    },
                  },
                },
                {
                  fallback: fallbackPostToApp,
                },
              );
            }}
          />
        </div>
        {/* 태그 선택 */}
        <div
          className="p-4 flex space-x-2 mb-4 sticky bg-white w-full overflow-x-auto scrollbar-hide z-10"
          style={{ top: `${top + 48}px` }}
          ref={tabContainerRef}
        >
          {marketTags.map((tag) => (
            <button
              key={tag.tagName}
              ref={register(`tag-${tag.tagName}`)}
              className={`px-2 py-1 rounded-full border ${activeId === tag.tagName ? "bg-green-500 text-white" : "border-green-500 text-green-600"}`}
              onClick={() => scrollTo(tag.tagName)}
            >
              <div className="font-subtitle2 max-h-6 w-full max-w-18 overflow-hidden text-ellipsis whitespace-nowrap">
                {tag.tagName}
              </div>
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
                    id={product.id}
                    name={product.name}
                    originalPrice={product.originPrice}
                    salePrice={product.discountPrice}
                    stock={product.stock}
                    imageUrl={product.image}
                    isClose={!isOpen}
                    cartItem={cartItem}
                    updateCartCount={(type) =>
                      setCartItem((prev) => {
                        if (type === "up") {
                          if (!prev[product.id]) {
                            return {
                              ...prev,
                              [product.id]: {
                                ...product,
                                count: 1,
                              },
                            };
                          }
                          return {
                            ...prev,
                            [product.id]: {
                              ...prev[product.id],
                              count: prev[product.id].count + 1,
                            },
                          };
                        } else if (type === "down") {
                          if (prev[product.id].count === 1) {
                            const newCart = { ...prev };
                            delete newCart[product.id];
                            return newCart;
                          } else {
                            return {
                              ...prev,
                              [product.id]: {
                                ...prev[product.id],
                                count: prev[product.id].count - 1,
                              },
                            };
                          }
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
          cartItem={cartItem}
          disabled={!isOpen || Object.keys(cartItem).length === 0}
          isOpen={isOpen}
          onBeforeSubmit={() => {
            if (platform === "web") {
              fallbackPostToApp();
              return false;
            }

            if (!accessToken) {
              setOpenLoginAlert(true);
              return false;
            }
            return true;
          }}
          onSuccess={() => {
            setCartItem({});
            postToApp(
              {
                type: "NATIVE_NAVIGATION",
                payload: {
                  screen: "CartRoot",
                  params: { screen: "Cart" },
                  callbackState: {
                    screen: "Detail",
                    params: { screen: "MarketDetail", params: { marketId: marketData.id } },
                    webUri: window.location.href,
                  },
                },
              },
              {
                fallback: fallbackPostToApp,
              },
            );
          }}
        />
      </div>
      <SuggestionInstallAppModal
        open={openSuggestionInstallAppModal}
        onOpenChange={setOpenSuggestionInstallAppModal}
        cancelLabel="웹에서 볼게요"
      />
      <Alert
        open={openLoginAlert}
        onOpenChange={setOpenLoginAlert}
        actionDirection={"col"}
        allowClickAway
        title="로그인 후 이용해주세요"
        description="로그인 후 장바구니에 추가할 수 있어요"
        cancel={{
          label: "다음에 할게요",
          action: () => {
            setOpenLoginAlert(false);
          },
          className: "border-none text-gray-400 shadow-none",
        }}
        confirm={{
          label: "로그인하기",
          action: () => {
            setOpenLoginAlert(false);
            postToApp({
              type: "NATIVE_NAVIGATION",
              payload: { screen: "Register", params: { screen: "Login" } },
            });
          },
        }}
      />
    </DefaultLayout>
  );
};

export default DetailPage;
