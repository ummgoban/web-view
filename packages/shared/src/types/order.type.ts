import {ProductType} from './product.type';

export type OrderType = {
  ordersId: string;
  marketId: number;
  marketName: string;
  /** 주문 생성 시간 (ISO 8601) */
  createdAt: string;
  /** 픽업 예약 시간 (ISO 8601) */
  pickupReservedAt: string;
  /** 주문이 완료된 시간 (ISO 8601) */
  doneAt?: string;
  /** 주문 총 가격 */
  ordersPrice: number;
  ordersStatus: 'ORDERED' | 'ACCEPTED' | 'PICKEDUP' | 'CANCELED' | 'NO_SHOW' | 'IN_PROGRESS' | 'PICKEDUP_OR_CANCELED';
  customerRequest: string;
  products: Required<ProductType>[];
  review: boolean;
};

export type OrderDetailType = OrderType & {
  /** 주문자 이름 */
  orderMemberName: string;
  /** 결제 방법 */
  method: string;
  /** 결제 총액 */
  totalAmount: number;
  /** 결제 키 */
  paymentKey: string;
  /** 주문자 주소 */
  address: string;
  /** 주문 완료 시간 (ISO 8601) */
  doneAt: string;
};
