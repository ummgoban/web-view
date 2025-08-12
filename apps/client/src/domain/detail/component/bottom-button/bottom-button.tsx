import { useMemo, useState } from "react";

import { Alert, cn } from "@packages/ui";

import { useAddToBucket, useValidateBucket } from "@/api/buckets";
import type { BucketProductType } from "@/lib/types/bucket.type";

type BottomButtonProps = {
  marketId: number;
  insetsBottom: number;
  cartItem: { [key: string]: BucketProductType };
  disabled: boolean;
  isOpen: boolean;
  onClick: () => void;
};

export const BottomButton = ({ marketId, insetsBottom, cartItem, disabled: _disabled, isOpen, onClick }: BottomButtonProps) => {
  const [open, setOpen] = useState(false);

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
        onClick={async () => {
          if (disabled) return;
          const validationResult = await validateBucket(marketId);

          // 장바구니 교체 알림
          if (!validationResult) {
            setOpen(true);
          } else {
            await addToBucket({ marketId, products });
            onClick();
          }
        }}
      >
        <span>{isOpen ? `${totalPrice > 0 ? `${totalPrice.toLocaleString()}원 ` : ""}예약하기 (${totalCount})` : "영업이 종료되었어요."}</span>
      </button>
      <Alert
        open={open}
        onOpenChange={setOpen}
        title="기존에 담아두었던 장바구니가 존재합니다"
        description="장바구니를 교체하시겠습니까?"
        cancel={{
          label: "아니오",
          action: () => {
            setOpen(false);
          },
        }}
        confirm={{
          label: "예",
          action: async () => {
            setOpen(false);
            await addToBucket({ marketId, products });
            onClick();
          },
        }}
      />
    </>
  );
};
