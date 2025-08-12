import type { MarketDetailType } from "@/types/market.type";

import { Market } from "../Market/Market.model";
import { WeekdayEnum } from "@/constants/weekday.const";

export class MarketDetail extends Market {
  marketOpenHour: MarketDetailType["marketOpenHour"];
  hasLike: MarketDetailType["hasLike"];
  private _todayOpenHour: MarketDetailType["marketOpenHour"][number] | undefined;

  constructor(data: MarketDetailType) {
    super(data);
    this.marketOpenHour = data.marketOpenHour;
    this.hasLike = data.hasLike;
    this._todayOpenHour = this.getTodayOpenHour();
  }

  public get todayOpenHour() {
    return this._todayOpenHour;
  }

  public getTodayOpenHour(): MarketDetailType["marketOpenHour"][number] | undefined {
    const now = new Date();
    const dayOfWeek = now.getDay();
    return this.marketOpenHour.find((openHour) => WeekdayEnum[openHour.dayOfWeek] === (dayOfWeek + 1) % 7);
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
