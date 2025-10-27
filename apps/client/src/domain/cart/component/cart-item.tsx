import { ProductCard } from "@/component/product/product-card";
import { useUpdateBucket, useDeleteFromBucket } from "@/api/buckets";
import type { BucketProductType } from "@/lib/types/bucket.type";

type CartItemProps = {
  item: BucketProductType;
  checked: boolean;
  onToggleCheck: () => void;
};

export const CartItem = ({ item, checked, onToggleCheck }: CartItemProps) => {
  const updateBucket = useUpdateBucket();
  const deleteFromBucket = useDeleteFromBucket();

  if (!item) {
    return null;
  }

  const handleCountChange = (type: "up" | "down") => {
    const newCount = type === "up" ? item.count + 1 : item.count - 1;

    if (newCount <= 0) {
      // 수량이 0 이하가 되면 삭제
      deleteFromBucket.mutate(item.id);
    } else {
      // 낙관적 업데이트를 통해 즉시 UI에 반영
      updateBucket.mutate({ productId: item.id, count: newCount });
    }
  };

  const handleRemove = () => {
    deleteFromBucket.mutate(item.id);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <ProductCard
          name={item.name}
          originalPrice={item.originPrice}
          salePrice={item.discountPrice}
          stock={item.stock}
          imageUrl={item.image}
          count={item.count}
          onSelectChange={onToggleCheck}
          isSelected={checked}
          onCountChange={handleCountChange}
          onRemove={handleRemove}
          variant="cart"
        />
      </div>
    </div>
  );
};
