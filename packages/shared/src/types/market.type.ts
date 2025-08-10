import { ProductType } from "./product.type";
import { Weekday } from "./weekday.type";

/**
 * 영업 시간
 */
export type OpenHour = {
  dayOfWeek: Weekday;
  /** 영업 시작 시간 HH:mm */
  openTime: string;
  /** 영업 종료 시간 HH:mm */
  closeTime: string;
};

export type MarketType = {
  id: number;
  name: string;
  /** 영업 시간 */
  openHours: OpenHour[];
  /** 주소 */
  address: string;
  /** 상품 목록 */
  products: ProductType[];
  /** 이미지 URL 목록 */
  imageUrls: string[];
  /** 요약 정보 */
  summary: string;
};

export type MarketOpenHourType = {
  dayOfWeek: Weekday;
  openTime: string;
  closeTime: string;
};

export type MarketDetailType = MarketType & {
  /** 좋아요 여부 */
  hasLike: boolean;
  /** 평균 평점 */
  averageRating: number;
  /** 리뷰 수 */
  reviewNum: number;
  /** 좋아요 수 */
  likeNum: number;
  /** 영업 시간 */
  marketOpenHour: MarketOpenHourType[];
};
