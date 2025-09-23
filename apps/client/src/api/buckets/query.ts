import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBucketList,
  validateBucket,
  addToBucket,
  updateBucketProduct,
  deleteBucketProduct,
} from "./client";
import type { AddBucketRequest, UpdateBucketRequest } from "./model";

export const useBucketList = () =>
  useQuery({
    queryKey: ["bucketList"],
    queryFn: getBucketList,
  });

export const useValidateBucket = () =>
  useMutation({
    mutationKey: ["validateBucket"],
    mutationFn: (marketId: number) => validateBucket(marketId),
  });

export const useAddToBucket = () =>
  useMutation({
    mutationKey: ["addToBucket"],
    mutationFn: ({ marketId, products }: AddBucketRequest) => addToBucket({ marketId, products }),
  });

export const useDeleteFromBucket = () =>
  useMutation({
    mutationKey: ["deleteFromBucket"],
    mutationFn: (productId: number) => deleteBucketProduct(productId),
  });

export const useUpdateBucket = () =>
  useMutation({
    mutationKey: ["updateBucket"],
    mutationFn: ({ productId, count }: UpdateBucketRequest) =>
      updateBucketProduct({ productId, count }),
  });
