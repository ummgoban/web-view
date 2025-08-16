import { ProductCard } from "@/component/product/product-card";
import type { CartItemType } from "../types/cart.type";
import { useCartStore } from "../store/cart.store";

type CartItemProps = {
  item: CartItemType;
};

export const CartItem = ({ item }: CartItemProps) => {
  const { updateItemCount, toggleItemCheck } = useCartStore();

  const handleCountChange = (type: "up" | "down") => {
    if (type === "up") {
      updateItemCount(item.id, item.count + 1);
    } else {
      updateItemCount(item.id, item.count - 1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <input type="checkbox" checked={item.checked} onChange={() => toggleItemCheck(item.id)} className="w-5 h-5 mr-2 accent-green-500" />
        <ProductCard
          name={item.name}
          originalPrice={item.originPrice}
          salePrice={item.discountPrice}
          stock={item.stock}
          imageUrl={item.image}
          count={item.count}
          onCountChange={handleCountChange}
          variant="cart"
        />
      </div>
    </div>
  );
};
