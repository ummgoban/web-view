import {ProductType} from './product.type';
import {Weekday} from './weekday.type';

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
