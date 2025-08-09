import {MarketType} from '../types/market.type';
import {WeekdayEnum} from '../constants/weekday.const';

export class Market {
  id: MarketType['id'];
  name: MarketType['name'];
  openHours: MarketType['openHours'];
  address: MarketType['address'];
  products: MarketType['products'];
  imageUrls: MarketType['imageUrls'];
  summary: MarketType['summary'];

  constructor(data: MarketType) {
    this.id = data.id;
    this.name = data.name;
    this.openHours = data.openHours;
    this.address = data.address;
    this.products = data.products;
    this.imageUrls = data.imageUrls;
    this.summary = data.summary;
  }

  public isOpen(): boolean {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const openHour = this.openHours.find(openHour => WeekdayEnum[openHour.dayOfWeek] === (dayOfWeek + 1) % 7);

    if (!openHour) return false;

    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();

    const openTime = openHour.openTime;
    const closeTime = openHour.closeTime;

    const [openTimeHour, openTimeMinute] = openTime.split(':').map(Number);
    const [closeTimeHour, closeTimeMinute] = closeTime.split(':').map(Number);

    if (nowHour < openTimeHour || nowHour > closeTimeHour) return false;

    if (nowHour === openTimeHour && nowMinute < openTimeMinute) return false;

    if (nowHour === closeTimeHour && nowMinute >= closeTimeMinute) return false;

    return true;
  }
}
