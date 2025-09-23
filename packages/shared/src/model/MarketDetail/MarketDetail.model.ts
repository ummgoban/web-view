import type { MarketDetailType } from "../../types/market.type";

import { Market } from "../Market/Market.model";
import { WeekdayEnum } from "../../constants/weekday.const";

export class MarketDetail extends Market {
  public marketOpenHour: MarketDetailType["marketOpenHour"];
  public hasLike: MarketDetailType["hasLike"];
  private _todayOpenHour: MarketDetailType["marketOpenHour"][number] | undefined;
  private _tomorrowOpenHour: MarketDetailType["marketOpenHour"][number] | undefined;

  constructor(data: MarketDetailType) {
    super(data);
    this.marketOpenHour = data.marketOpenHour;
    this.hasLike = data.hasLike;
    this._todayOpenHour = this.getTodayOpenHour();
    this._tomorrowOpenHour = this.getTomorrowOpenHour();
  }

  public get todayOpenHour() {
    return this._todayOpenHour;
  }

  public get tomorrowOpenHour() {
    return this._tomorrowOpenHour;
  }

  private getOpenHourOf(offset: number): MarketDetailType["marketOpenHour"][number] | undefined {
    const now = new Date();
    const dayOfWeek = now.getDay();
    return this.marketOpenHour.find(
      (openHour) => WeekdayEnum[openHour.dayOfWeek] === (dayOfWeek + offset) % 7,
    );
  }

  public getTodayOpenHour(): MarketDetailType["marketOpenHour"][number] | undefined {
    return this.getOpenHourOf(1);
  }

  public getTomorrowOpenHour(): MarketDetailType["marketOpenHour"][number] | undefined {
    return this.getOpenHourOf(2);
  }

  public isOpen(): boolean {
    const now = new Date();
    const openHour = this.todayOpenHour;

    if (!openHour) return false;

    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();

    const openTime = openHour.openTime;
    const closeTime = openHour.closeTime;

    const [openTimeHour, openTimeMinute] = openTime.split(":").map(Number);
    const [closeTimeHour, closeTimeMinute] = closeTime.split(":").map(Number);

    if (openTimeHour === closeTimeHour && openTimeMinute === closeTimeMinute) return true;

    if (nowHour < openTimeHour || nowHour > closeTimeHour) return false;

    if (nowHour === openTimeHour && nowMinute < openTimeMinute) return false;

    if (nowHour === closeTimeHour && nowMinute > closeTimeMinute) return false;

    return true;
  }
}
