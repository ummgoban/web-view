import type { MarketType as MarketTypeShared, ProductType } from "@packages/shared";

export type MarketType = MarketTypeShared & {
  id: number;
  name: string;
  address: string;
  specificAddress: string;
  products: ProductType[];
  latitude: number;
  longitude: number;
  openAt: string;
  closeAt: string;
  summary: string;
  likeNum: number;
  reviewNum: number;
  averageRating: number;
  images: string[];
  cursorDistance: number;
};
