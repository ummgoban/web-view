import { postToApp } from "@packages/shared";
import { LoadingCircle } from "@packages/ui";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { DefaultLayout } from "@/component";
import { useSafeAreaStore } from "@/store";

import { useBucketList, useDeleteFromBucket } from "@/api/buckets";
import { CartItem } from "../component/cart-item";

export const CartPage = () => {
  const navigate = useNavigate();
  const { data: bucketData } = useBucketList();
  const deleteFromBucket = useDeleteFromBucket();

  // UI 상태: 체크 상태를 로컬에서 관리
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(() => {
    // 초기값: 모든 아이템 체크
    const initial: Record<number, boolean> = {};
    bucketData?.products.forEach((product) => {
      initial[product.id] = true;
    });
    return initial;
  });

  const {
    insets: { bottom },
  } = useSafeAreaStore();

  // Derived state: 총액과 총 개수 계산
  const { totalPrice, totalCount } = useMemo(() => {
    if (!bucketData?.products) return { totalPrice: 0, totalCount: 0 };

    let price = 0;
    let count = 0;

    bucketData.products.forEach((product) => {
      if (checkedItems[product.id]) {
        price += product.discountPrice * product.count;
        count += product.count;
      }
    });

    return { totalPrice: price, totalCount: count };
  }, [bucketData?.products, checkedItems]);

  // 전체 선택 상태 계산
  const allChecked = useMemo(() => {
    if (!bucketData?.products || bucketData.products.length === 0) return false;
    return bucketData.products.every((product) => checkedItems[product.id]);
  }, [bucketData?.products, checkedItems]);

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setCheckedItems((prev) => {
      const updated = { ...prev };
      bucketData?.products.forEach((product) => {
        updated[product.id] = newChecked;
      });
      return updated;
    });
  };

  const handleToggleItem = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteSelected = async () => {
    if (!bucketData?.products) return;

    const selectedIds = bucketData.products
      .filter((product) => checkedItems[product.id])
      .map((product) => product.id);

    // 선택된 아이템들 삭제
    await Promise.all(selectedIds.map((id) => deleteFromBucket.mutateAsync(id)));
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

  if (!bucketData) {
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
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleToggleAll}
              className="w-5 h-5 mr-2 accent-green-500"
            />
            <span className="font-medium">전체 선택</span>
          </label>
          <button className="text-sm text-gray-500" onClick={handleDeleteSelected}>
            선택 삭제
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="flex-1 p-4 overflow-y-auto">
          {bucketData.products.length > 0 ? (
            bucketData.products.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                checked={checkedItems[item.id]}
                onToggleCheck={() => handleToggleItem(item.id)}
              />
            ))
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
          <div className="flex justify-between mt-4">
            <span className="font-bold">총 구매 금액</span>
            <span className="font-bold text-lg text-red-500">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div
          className="p-4 bg-white border-t border-gray-200 flex justify-center"
          style={{ paddingBottom: `${bottom + 16}px` }}
        >
          <button
            className={`w-full py-3 rounded-md font-bold text-white ${totalCount > 0 ? "bg-green-500" : "bg-gray-300"}`}
            disabled={totalCount === 0}
            onClick={handleCheckout}
          >
            {totalCount > 0
              ? `${totalCount}개 상품 구매하기 (${totalPrice.toLocaleString()}원)`
              : "상품을 선택해주세요"}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};
