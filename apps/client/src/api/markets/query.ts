import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import { getMarket, getMarketList, getSubscribeList, updateMarketLike } from "./client";
import type { MarketPaginationLocRequest } from "./model";

export const useMarketList = ({ userLatitude, userLongitude }: MarketPaginationLocRequest) => {
  return useInfiniteQuery({
    queryKey: ["marketList", userLatitude, userLongitude],
    queryFn: ({ pageParam = 0 }) =>
      getMarketList({
        cursorDistance: pageParam,
        size: 5,
        userLatitude,
        userLongitude,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.markets[lastPage.markets.length - 1].cursorDistance : undefined),
  });
};

export const useMarket = (marketId: number) => {
  return useQuery({
    queryKey: ["market", marketId],
    queryFn: () => getMarket(marketId),
    retry: 1,
    retryDelay: 1000,
  });
};

export const useMarketLike = (marketId: number | undefined) => {
  return useMutation({
    mutationKey: ["marketLike", marketId],
    mutationFn: async () => {
      if (!marketId) return;
      return updateMarketLike(marketId);
    },
  });
};

export const useSubscribeList = ({ userLatitude, userLongitude }: MarketPaginationLocRequest) => {
  return useInfiniteQuery({
    queryKey: ["subscribeList", userLatitude, userLongitude],
    queryFn: ({ pageParam = 0 }) =>
      getSubscribeList({
        cursorDistance: pageParam,
        size: 5,
        userLatitude,
        userLongitude,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.markets[lastPage.markets.length - 1].cursorDistance : undefined),
  });
};
