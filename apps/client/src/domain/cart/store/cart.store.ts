import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { BucketProductType } from "@/lib/types/bucket.type";
import type { CartItemsType, CartStoreType } from "../types/cart.type";

export const useCartStore = create<CartStoreType>()(
  devtools((set, get) => ({
    items: {},
    totalPrice: 0,
    totalCount: 0,

    addItem: (item: BucketProductType) => {
      set((state) => {
        const newItems = { ...state.items };
        const id = item.id.toString();

        if (newItems[id]) {
          newItems[id] = {
            ...newItems[id],
            count: newItems[id].count + item.count,
          };
        } else {
          newItems[id] = {
            ...item,
            checked: true,
          };
        }

        return {
          items: newItems,
          ...calculateTotals(newItems),
        };
      });
    },

    removeItem: (id: number) => {
      set((state) => {
        const newItems = { ...state.items };
        delete newItems[id.toString()];

        return {
          items: newItems,
          ...calculateTotals(newItems),
        };
      });
    },

    updateItemCount: (id: number, count: number) => {
      set((state) => {
        const newItems = { ...state.items };
        const itemId = id.toString();

        if (newItems[itemId]) {
          if (count <= 0) {
            delete newItems[itemId];
          } else {
            newItems[itemId] = {
              ...newItems[itemId],
              count,
            };
          }
        }

        return {
          items: newItems,
          ...calculateTotals(newItems),
        };
      });
    },

    toggleItemCheck: (id: number) => {
      set((state) => {
        const newItems = { ...state.items };
        const itemId = id.toString();

        if (newItems[itemId]) {
          newItems[itemId] = {
            ...newItems[itemId],
            checked: !newItems[itemId].checked,
          };
        }

        return {
          items: newItems,
          ...calculateTotals(newItems),
        };
      });
    },

    toggleAllCheck: (checked: boolean) => {
      set((state) => {
        const newItems = { ...state.items };

        Object.keys(newItems).forEach((key) => {
          newItems[key] = {
            ...newItems[key],
            checked,
          };
        });

        return {
          items: newItems,
          ...calculateTotals(newItems),
        };
      });
    },

    clearCart: () => {
      set({
        items: {},
        totalPrice: 0,
        totalCount: 0,
      });
    },
    getItems: () => get().items,
    getTotalPrice: () => get().totalPrice,
    getTotalCount: () => get().totalCount,
  }))
);

// 장바구니 총액과 총 개수 계산 헬퍼 함수
const calculateTotals = (items: CartItemsType) => {
  let totalPrice = 0;
  let totalCount = 0;

  Object.values(items).forEach((item) => {
    if (item.checked) {
      totalPrice += item.discountPrice * item.count;
      totalCount += item.count;
    }
  });

  return { totalPrice, totalCount };
};
