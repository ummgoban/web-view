import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToBucket, deleteBucketProduct, getBucketList, updateBucketProduct, validateBucket } from "./client";
import type { AddBucketRequest, UpdateBucketRequest } from "./model";
import type { BucketType } from "@/lib/types/bucket.type";

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

export const useAddToBucket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addToBucket"],
    mutationFn: ({ marketId, products }: AddBucketRequest) => addToBucket({ marketId, products }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bucketList"] });
    },
  });
};

export const useDeleteFromBucket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteFromBucket"],
    mutationFn: (productId: number) => deleteBucketProduct(productId),
    onMutate: async (productId: number) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["bucketList"] });

      // 이전 데이터 스냅샷 저장
      const previousBucket = queryClient.getQueryData<BucketType>(["bucketList"]);

      // 낙관적 업데이트: 해당 상품 제거
      queryClient.setQueryData<BucketType>(["bucketList"], (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.filter((product) => product.id !== productId),
        };
      });

      return { previousBucket };
    },
    onError: (_err, _productId, context) => {
      // 에러 발생 시 이전 상태로 복구
      if (context?.previousBucket) {
        queryClient.setQueryData(["bucketList"], context.previousBucket);
      }
    },
    onSettled: () => {
      // 성공/실패 여부와 관계없이 최종적으로 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ["bucketList"] });
    },
  });
};

export const useUpdateBucket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateBucket"],
    mutationFn: ({ productId, count }: UpdateBucketRequest) => updateBucketProduct({ productId, count }),
    onMutate: async ({ productId, count }: UpdateBucketRequest) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["bucketList"] });

      // 이전 데이터 스냅샷 저장
      const previousBucket = queryClient.getQueryData<BucketType>(["bucketList"]);

      // 낙관적 업데이트: 수량 변경
      queryClient.setQueryData<BucketType>(["bucketList"], (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.map((product) =>
            product.id === productId ? { ...product, count } : product,
          ),
        };
      });

      return { previousBucket };
    },
    onError: (_err, _variables, context) => {
      // 에러 발생 시 이전 상태로 복구
      if (context?.previousBucket) {
        queryClient.setQueryData(["bucketList"], context.previousBucket);
      }
    },
    onSettled: () => {
      // 성공/실패 여부와 관계없이 최종적으로 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ["bucketList"] });
    },
  });
};
