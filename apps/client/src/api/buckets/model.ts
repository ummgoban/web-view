import type { BucketProductType } from "@/lib/types/bucket.type";

export type AddBucketRequest = {
  marketId: number;
  products: BucketProductType[];
};

export type UpdateBucketRequest = {
  productId: number;
  count: number;
};
