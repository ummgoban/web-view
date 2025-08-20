import { useMemo, useState } from "react";

import { Alert, cn } from "@packages/ui";

import { useAddToBucket, useValidateBucket } from "@/api/buckets";
import type { BucketProductType } from "@/lib/types/bucket.type";
import { useProfileStore } from "@/store";
import { postToApp } from "@packages/shared";

type BottomButtonProps = {
  marketId: number;
  insetsBottom: number;
  cartItem: { [key: string]: BucketProductType };
  disabled: boolean;
  isOpen: boolean;
  onClick: () => void;
};

export const BottomButton = ({ marketId, insetsBottom, cartItem, disabled: _disabled, isOpen, onClick }: BottomButtonProps) => {
  const [openBucketAlert, setOpenBucketAlert] = useState(false);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);

  // TODO: 웹뷰에서도 액세스 토큰 대신 프로필을 확인. 혹은 api 호출 후 refresh 시도
  const { accessToken } = useProfileStore();
  const { mutateAsync: validateBucket } = useValidateBucket();
  const { mutateAsync: addToBucket, isPending } = useAddToBucket();

  const products = useMemo(() => Object.values(cartItem), [cartItem]);

  const { totalPrice, totalCount } = useMemo(() => {
    let totalPrice = 0;
    let totalCount = 0;
    products.forEach((item) => {
      totalPrice += item.count * item.discountPrice;
      totalCount += item.count;
    });
    return { totalPrice, totalCount };
  }, [products]);

  const disabled = _disabled || isPending;

  return (
    <>
      <button
        style={{ paddingBottom: `${insetsBottom + 16}px` }}
        type="submit"
        className={cn("fixed bottom-0 left-0 right-0 p-4 text-center font-bold", disabled ? "bg-gray-200 text-gray-500" : "bg-primary-200 text-primary-600")}
        disabled={disabled}
        name="add-to-bucket"
        onClick={async () => {
          if (disabled) return;

          if (!accessToken) {
            setOpenLoginAlert(true);
            return;
          }

          const validationResult = await validateBucket(marketId);

          // 장바구니 교체 알림
          if (!validationResult) {
            setOpenBucketAlert(true);
          } else {
            await addToBucket({ marketId, products });
            onClick();
          }
        }}
        aria-label="장바구니 추가"
        aria-disabled={disabled}
      >
        <span>{isOpen ? `${totalPrice > 0 ? `${totalPrice.toLocaleString()}원 ` : ""}예약하기 (${totalCount})` : "영업이 종료되었어요."}</span>
      </button>
      {/* MARK: Alert */}
      {/* 장바구니 교체 알림 */}
      <Alert
        open={openBucketAlert}
        onOpenChange={setOpenBucketAlert}
        title="기존에 담아두었던 장바구니가 존재합니다"
        description="장바구니를 교체하시겠습니까?"
        cancel={{
          label: "아니오",
          action: () => {
            setOpenBucketAlert(false);
          },
        }}
        confirm={{
          label: "예",
          action: async () => {
            setOpenBucketAlert(false);
            await addToBucket({ marketId, products });
            onClick();
          },
        }}
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
        }}
        confirm={{
          label: "로그인하기",
          action: () => {
            setOpenLoginAlert(false);
            postToApp({ type: "NATIVE_NAVIGATION", payload: { screen: "Register", params: { screen: "Login" } } });
          },
        }}
      />
    </>
  );
};
