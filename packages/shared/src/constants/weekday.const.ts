import {Weekday} from '../types';

export const WEEKDAYS: Weekday[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export const dayMap: Record<Weekday, string> = {
  MONDAY: '월요일',
  TUESDAY: '화요일',
  WEDNESDAY: '수요일',
  THURSDAY: '목요일',
  FRIDAY: '금요일',
  SATURDAY: '토요일',
  SUNDAY: '일요일',
};

/**
 * @description
 * - 상수로 정의된 요일을 enum으로 정의
 * - 날짜간 대소 비교에 사용
 * - `WeekdayEnum["MONDAY"] === 0`
 *
 * @example
 * ```ts
 * const mondayString: Weekday = "MONDAY"
 * const fridayString: Weekday = "FRIDAY"
 * const mondayEnum: WeekdayEnum = WeekdayEnum[mondayString];
 * const fridayEnum: WeekdayEnum = WeekdayEnum[fridayString];
 * console.log(mondayEnum > fridayEnum); // false
 * ```
 *
 */
export enum WeekdayEnum {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}
