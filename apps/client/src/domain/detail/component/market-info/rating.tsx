import ChevronRight from "@/lib/assets/icons/chevron-right.svg?react";
import Heart from "@/lib/assets/icons/heart.svg?react";
import Star from "@/lib/assets/icons/star.svg?react";

import { useMarketLike } from "@/api/markets";
import { useState } from "react";

type RatingProps = {
  marketId: number;
  /**
   * @description 평균 평점
   * @note null일 경우 0으로 처리
   */
  averageRating: number | null;
  reviewNum: number;
  hasLike: boolean;
  onClickReview: () => void;
};

export const Rating = ({ marketId, averageRating, reviewNum, hasLike, onClickReview }: RatingProps) => {
  const { mutate: updateMarketLike } = useMarketLike(marketId);
  const [isLiked, setIsLiked] = useState(hasLike);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="text-yellow-400">
          <Star />
        </div>
        <a
          onClick={(e) => {
            e.preventDefault();
            onClickReview();
          }}
          className="flex items-center"
        >
          <span className="text-sm font-bold ml-1">{averageRating?.toFixed(1) ?? 0}</span>
          <span className="text-sm text-gray-500 ml-1">{`리뷰 ${reviewNum}개`}</span>
          <ChevronRight className="ml-1 text-gray-500" />
        </a>
      </div>

      {/* 좋아요 버튼 */}
      <button className={isLiked ? "text-red-500" : "text-gray-500"} onClick={() => updateMarketLike(undefined, { onSuccess: () => setIsLiked(!isLiked) })}>
        <Heart />
      </button>
    </div>
  );
};
