import type { BucketProductType } from "@/lib/types/bucket.type";
import { ProductCard } from "@/component/product/product-card";

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

  return (
    <ProductCard
      name={name}
      originalPrice={originalPrice}
      salePrice={salePrice}
      stock={stock}
      imageUrl={imageUrl}
      isClose={isClose}
      count={count}
      onCountChange={updateCartCount}
      variant="detail"
    />
  );
};
