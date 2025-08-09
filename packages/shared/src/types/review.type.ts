/**
 * @description 리뷰 댓글 항목 타입
 */
export type ReviewReplyType = {
  reviewReplyId: number;
  createAt: string;
  content: string;
};

/**
 * @description 사장님 앱 리뷰 항목 타입
 */
export type ReviewType = {
  id: number;
  name: string;
  content: string;
  rating: number;
  products: string[];
  createdAt: string;
  imageUrls: string[];
  reviewReplies: ReviewReplyType;
};

/**
 * @description 고객 리뷰 항목 타입
 */
export type CustomerReviewInfo = {
  id: number;
  content: string;
  rating: number;
  products: string[];
  createdAt: string;
  imageUrls: string[];
  reviewReplies: ReviewReplyType[];
  marketId: number;
  marketName: string;
};
