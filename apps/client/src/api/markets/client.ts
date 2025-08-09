import type { MarketDetailType } from "@packages/shared";
import type { MarketPaginationRequest, MarketListResponse } from "./model";

import apiClient from "../ApiClient";
import CustomError from "../CustomError";

export const getMarketList = async ({ cursorDistance, size, userLatitude, userLongitude }: MarketPaginationRequest): Promise<MarketListResponse> => {
  try {
    const res = await apiClient.get<MarketListResponse>(`customer/markets`, {
      params: {
        cursorDistance,
        size,
        userLatitude,
        userLongitude,
      },
    });

    if (!res) {
      return {
        markets: [],
        hasNext: false,
      };
    }

    return res;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const getMarket = async (marketId: number): Promise<MarketDetailType | null> => {
  try {
    const res = await apiClient.get<MarketDetailType | null>(`/customer/markets/${marketId}`);

    return res;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const updateMarketLike = async (marketId: number): Promise<boolean> => {
  try {
    const res = await apiClient.post(`customer/markets/${marketId}/likes`);
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const getSubscribeList = async ({ cursorDistance, size, userLatitude, userLongitude }: MarketPaginationRequest): Promise<MarketListResponse> => {
  try {
    const res = await apiClient.get<MarketListResponse>(`/customer/markets/likes`, {
      params: {
        cursorDistance,
        size,
        userLatitude,
        userLongitude,
      },
    });

    if (!res) {
      return {
        markets: [],
        hasNext: false,
      };
    }

    return res;
  } catch (error) {
    throw new CustomError(error);
  }
};
