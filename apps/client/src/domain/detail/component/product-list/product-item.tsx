import type { BucketProductType } from "@/lib/types/bucket.type";
import { cn } from "@packages/ui";

type ProductItemProps = {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  stock: number;
  imageUrl: string;
  isClose: boolean;
  cartItem: { [key: string]: BucketProductType };
  updateCartCount: (type: "up" | "down") => void;
};

export const ProductItem = ({
  id,
  name,
  originalPrice,
  salePrice,
  stock,
  imageUrl,
  isClose,
  cartItem,
  updateCartCount,
}: ProductItemProps) => {
  const count = cartItem[id]?.count || 0;

  const disabledCountDown = count <= 0 || isClose;
  const disabledCountUp = count >= stock || isClose;

  const isSale = originalPrice !== salePrice;

  const handleCountDown = () => {
    if (disabledCountDown) return;
    updateCartCount("down");
  };

  const handleCountUp = () => {
    if (disabledCountUp) return;
    updateCartCount("up");
  };

  return (
    <div className={cn("flex justify-between items-center p-4 bg-white rounded-lg mb-3")}>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center mt-1">
          <p className={cn("text-gray-500 text-sm", isSale && "line-through")}>
            {originalPrice.toLocaleString()}원
          </p>
        </div>
        {isSale && <p className="text-sm font-bold">{salePrice.toLocaleString()}원</p>}
        <p className="font-subtitle2 text-green-600 mt-1">재고 : {stock}</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-md" />

        <div className="flex flex-row items-center justify-center mt-2 space-x-2">
          <button
            className={cn(S.CountButtonClassName)}
            onClick={handleCountDown}
            disabled={disabledCountDown}
          >
            <span className={S.CountButtonIconClassName}>-</span>
          </button>
          <span className={"text-center w-10 font-subtitle2"}>
            {stock > 0 ? `${count} 개` : "품절"}
          </span>
          <button
            className={cn(S.CountButtonClassName)}
            onClick={handleCountUp}
            disabled={disabledCountUp}
          >
            <span className={S.CountButtonIconClassName}>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const S = {
  CountButtonClassName:
    "w-8 h-8 rounded-md flex items-center justify-center bg-primary-500 text-white disabled:bg-primary-200 disabled:text-gray-500",
  CountButtonIconClassName: "text-center w-4",
};
