import { MarketDetailType, MarketType } from "../types/market.type";
import { WeekdayEnum } from "../constants/weekday.const";

export class Market {
  id: MarketType["id"];
  name: MarketType["name"];
  marketOpenHour: MarketDetailType["marketOpenHour"];
  address: MarketType["address"];
  products: MarketType["products"];
  imageUrls: MarketType["imageUrls"];
  summary: MarketType["summary"];

  private _todayOpenHour: MarketDetailType["marketOpenHour"][number] | undefined;

  constructor(data: MarketDetailType) {
    this.id = data.id;
    this.name = data.name;
    this.marketOpenHour = data.marketOpenHour;
    this.address = data.address;
    this.products = data.products;
    this.imageUrls = data.imageUrls;
    this.summary = data.summary;
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

    if (nowHour < openTimeHour || nowHour > closeTimeHour) return false;

    if (nowHour === openTimeHour && nowMinute < openTimeMinute) return false;

    if (nowHour === closeTimeHour && nowMinute >= closeTimeMinute) return false;

    return true;
  }
}
