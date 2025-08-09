import {Market} from './Market.model';
import {MarketType} from '../types/market.type';

class MockDate extends Date {
  private mockDay: number;
  private mockHours: number;
  private mockMinutes: number;

  constructor(day: number, hours: number, minutes: number) {
    super();
    this.mockDay = day;
    this.mockHours = hours;
    this.mockMinutes = minutes;
  }

  getDay(): number {
    return this.mockDay;
  }

  getHours(): number {
    return this.mockHours;
  }

  getMinutes(): number {
    return this.mockMinutes;
  }
}

const market: Market = new Market({
  id: 1,
  name: 'test',
  openHours: [
    {
      dayOfWeek: 'MONDAY',
      openTime: '09:30',
      closeTime: '18:00',
    },
    {
      dayOfWeek: 'TUESDAY',
      openTime: '09:30',
      closeTime: '18:00',
    },
    {
      dayOfWeek: 'WEDNESDAY',
      openTime: '09:30',
      closeTime: '18:00',
    },
    {
      dayOfWeek: 'THURSDAY',
      openTime: '09:30',
      closeTime: '18:00',
    },
    {
      dayOfWeek: 'FRIDAY',
      openTime: '09:30',
      closeTime: '18:00',
    },
    {
      dayOfWeek: 'SATURDAY',
      openTime: '09:30',
      closeTime: '18:00',
    },
    {
      dayOfWeek: 'SUNDAY',
      openTime: '09:30',
      closeTime: '18:00',
    },
  ],
  address: 'test',
  products: [],
  imageUrls: [],
  summary: 'test',
});

describe('Market', () => {
  it('should be defined', () => {
    expect(Market).toBeDefined();
  });

  it('should isOpen return true when market is open', () => {
    vitest.spyOn(global, 'Date').mockImplementation(() => new MockDate(0, 9, 30));

    expect(market.isOpen()).toBeTruthy();
    vitest.restoreAllMocks();
  });

  it('should isOpen return false when market is open (same open time)', () => {
    vitest.spyOn(global, 'Date').mockImplementation(() => new MockDate(0, 9, 29));

    expect(market.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it('should isOpen return false when market is open (same close time)', () => {
    vitest.spyOn(global, 'Date').mockImplementation(() => new MockDate(0, 18, 0));

    expect(market.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it('should isOpen return false when market is closed', () => {
    vitest.spyOn(global, 'Date').mockImplementation(() => new MockDate(0, 19, 0));

    expect(market.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it('should isOpen return false when market is not open day', () => {
    // 금요일 10시 00분
    vitest.spyOn(global, 'Date').mockImplementation(() => new MockDate(5, 10, 0));

    const closedMarket = new Market({
      id: 1,
      name: 'test',
      openHours: [
        {
          dayOfWeek: 'MONDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
        {
          dayOfWeek: 'WEDNESDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
      ],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    });

    expect(closedMarket.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it('should compatible with MarketType (MarketType -> Market)', () => {
    const marketType: MarketType = {
      id: 1,
      name: 'test',
      openHours: [
        {
          dayOfWeek: 'MONDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
        {
          dayOfWeek: 'TUESDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
      ],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    };

    const market = new Market(marketType);

    expect(market).toBeInstanceOf(Market);
    expect(market.id).toBe(marketType.id);
    expect(market.name).toBe(marketType.name);
    expect(market.openHours).toEqual(marketType.openHours);
    expect(market.address).toBe(marketType.address);
    expect(market.products).toEqual(marketType.products);
    expect(market.imageUrls).toEqual(marketType.imageUrls);
    expect(market.summary).toBe(marketType.summary);
  });

  it('should compatible with MarketType (Market -> MarketType)', () => {
    const market = new Market({
      id: 1,
      name: 'test',
      openHours: [],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    });

    const marketType: MarketType = market;

    expect(marketType).toEqual({
      id: 1,
      name: 'test',
      openHours: [],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    });
  });
});
