import type { BucketProductType } from "@/lib/types/bucket.type";

export type CartItemType = BucketProductType & {
  checked: boolean;
};

export type CartItemsType = {
  [key: string]: CartItemType;
};

export type CartStoreType = {
  items: CartItemsType;
  totalPrice: number;
  totalCount: number;
  addItem: (item: BucketProductType) => void;
  removeItem: (id: number) => void;
  updateItemCount: (id: number, count: number) => void;
  toggleItemCheck: (id: number) => void;
  toggleAllCheck: (checked: boolean) => void;
  clearCart: () => void;
};
