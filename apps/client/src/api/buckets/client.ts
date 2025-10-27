import type { BucketType, BucketProductType } from "@/lib/types/bucket.type";

import type { AddBucketRequest, UpdateBucketRequest } from "./model";

import apiClient from "../ApiClient";
import CustomError from "../CustomError";

export const getBucketList = async (): Promise<BucketType | null> => {
  try {
    const res = await apiClient.get<BucketType | null>("/customer/buckets");

    return res;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return {
        // MOCK: MOCK 데이터
        market: {
          id: 0,
          name: "맛있는 제육 마켓",
          images: [],
          closeAt: "",
          openAt: "",
        },
        products: [
          {
            count: 1,
            id: 1,
            name: "맛있는 제육볶음",
            image: "https://capstone-dev-s3-bucket.s3.ap-northeast-2.amazonaws.com/Market/1/marketProduct/4a40d443",
            originPrice: 1000,
            discountPrice: 900,
            discountRate: 10,
            tags: [
              {
                id: 1,
                tagName: "매운맛",
              },
            ],
            productStatus: "IN_STOCK",
            stock: 5,
          },
        ],
      };
    }
    throw new CustomError(error);
  }
};

export const validateBucket = async (marketId: number): Promise<boolean> => {
  try {
    const res = await apiClient.get<{
      sameMarketProduct: boolean;
    }>(`/customer/buckets/markets/${marketId}`);
    if (res?.sameMarketProduct) {
      return true;
    }
    return false;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const addToBucket = async ({ marketId, products }: AddBucketRequest): Promise<boolean> => {
  try {
    const res = await apiClient.post<
      {
        code: number;
        message: string;
        data: string;
      },
      { products: BucketProductType[] }
    >(`/customer/buckets/markets/${marketId}`, { products });
    console.log("products: ", products);
    if (res && res.code === 200 && res.data === "상품 추가 성공") {
      return true;
    }
    return false;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const updateBucketProduct = async ({ productId, count }: UpdateBucketRequest): Promise<BucketType | null> => {
  try {
    const res = await apiClient.patch<{
      code: number;
      message: string;
      data: BucketType;
    }>(
      `/customer/buckets`,
      {},
      {
        params: {
          productId,
          count,
        },
      },
    );
    if (res && res.code === 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    throw new CustomError(error);
  }
};

export const deleteBucketProduct = async (productId: number): Promise<boolean> => {
  try {
    const res = await apiClient.del<{
      code: number;
      message: string;
      data: string;
    }>(`/customer/buckets`, {
      params: {
        productId,
      },
    });
    if (res && res.code === 200) {
      return true;
    }
    return false;
  } catch (error) {
    throw new CustomError(error);
  }
};
