import type { MarketType } from "@/lib/types/market.type";

export type MarketPaginationLocRequest = {
  userLatitude?: number;
  userLongitude?: number;
};

export type MarketPaginationRequest = {
  cursorDistance: number;
  size: number;
} & MarketPaginationLocRequest;

export type MarketListResponse = {
  markets: MarketType[];
  hasNext: boolean;
};
