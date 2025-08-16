import { useState } from "react";
import { useNavigate } from "react-router";
import { postToApp } from "@packages/shared";
import { LoadingCircle } from "@packages/ui";

import { DefaultLayout } from "@/component";
import { useSafeAreaStore } from "@/store";

import { CartItem } from "../component/cart-item";
import { useCartStore } from "../store/cart.store";
import { useBucketList } from "@/api/buckets";

export const CartPage = () => {
  const navigate = useNavigate();
  const { totalPrice, totalCount, toggleAllCheck, clearCart } = useCartStore();
  const [allChecked, setAllChecked] = useState(true);

  const { data: items } = useBucketList();

  const {
    insets: { bottom },
  } = useSafeAreaStore();

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    toggleAllCheck(newChecked);
  };

  const handleCheckout = () => {
    // 결제 페이지로 이동 또는 결제 처리
    postToApp({
      type: "NATIVE_NAVIGATION",
      payload: {
        screen: "Checkout",
        params: { totalPrice, totalCount },
      },
    });
  };

  if (!items) {
    return <LoadingCircle animation />;
  }

  return (
    <DefaultLayout
      appBarOptions={{
        title: "장바구니",
        back: () => navigate(-1),
      }}
    >
      <div className="flex flex-col h-full bg-gray-50">
        {/* 전체 선택 섹션 */}
        <div className="p-4 bg-white flex items-center justify-between border-b border-gray-200">
          <label className="flex items-center">
            <input type="checkbox" checked={allChecked} onChange={handleToggleAll} className="w-5 h-5 mr-2 accent-green-500" />
            <span className="font-medium">전체 선택</span>
          </label>
          <button className="text-sm text-gray-500" onClick={clearCart}>
            선택 삭제
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="flex-1 p-4 overflow-y-auto">
          {Object.values(items.market).length > 0 ? (
            Object.values(items.products).map((item) => <CartItem key={item.id} item={{ ...item, checked: false }} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500">장바구니가 비어있습니다.</p>
            </div>
          )}
        </div>

        {/* 할인 정보 */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">상품 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">할인 금액</span>
            <span className="text-red-500">-0원</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">배송비</span>
            <span>무료배송</span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="font-bold">총 구매 금액</span>
            <span className="font-bold text-lg text-red-500">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="p-4 bg-white border-t border-gray-200 flex justify-center" style={{ paddingBottom: `${bottom + 16}px` }}>
          <button className={`w-full py-3 rounded-md font-bold text-white ${totalCount > 0 ? "bg-green-500" : "bg-gray-300"}`} disabled={totalCount === 0} onClick={handleCheckout}>
            {totalCount > 0 ? `${totalCount}개 상품 구매하기 (${totalPrice.toLocaleString()}원)` : "상품을 선택해주세요"}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};
