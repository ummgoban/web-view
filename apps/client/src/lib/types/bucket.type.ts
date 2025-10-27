import type { MarketType } from "./market.type";
import type { ProductType } from "@packages/shared";

//TODO: type explict define
export type BucketType = {
  market: Pick<MarketType, "id" | "name" | "images" | "closeAt" | "openAt">;
  products: ({ count: number } & ProductType)[];
};

export type BucketProductType = Omit<ProductType, "tags" | "productStatus"> & {
  count: number;
};
