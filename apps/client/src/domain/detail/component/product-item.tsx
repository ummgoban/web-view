import { useState } from "react";

import { cn } from "@packages/ui";

type ProductItemProps = {
  name: string;
  originalPrice: number;
  salePrice: number;
  stock: number;
  imageUrl: string;
  updateCartCount: (type: "up" | "down") => void;
};

export const ProductItem = ({ name, originalPrice, salePrice, stock, imageUrl, updateCartCount }: ProductItemProps) => {
  const [count, setCount] = useState(0);

  const disabledCountDown = count <= 0;
  const disabledCountUp = count >= stock;

  const handleCountDown = () => {
    if (disabledCountDown) return;
    updateCartCount("down");
    setCount(count - 1);
  };

  const handleCountUp = () => {
    if (disabledCountUp) return;
    updateCartCount("up");
    setCount(count + 1);
  };

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
          <button className={cn(S.CountButtonClassName)} onClick={handleCountDown} disabled={disabledCountDown}>
            <span className={S.CountButtonIconClassName}>-</span>
          </button>
          <span className={"text-center w-10 font-subtitle2"}>{stock > 0 ? `${count} 개` : "품절"}</span>
          <button className={cn(S.CountButtonClassName)} onClick={handleCountUp} disabled={disabledCountUp}>
            <span className={S.CountButtonIconClassName}>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const S = {
  CountButtonClassName: "w-8 h-8 rounded-md flex items-center justify-center bg-primary-500 text-white disabled:bg-primary-200 disabled:text-gray-500",
  CountButtonIconClassName: "text-center w-4",
};
