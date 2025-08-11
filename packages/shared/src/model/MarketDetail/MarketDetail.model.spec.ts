import { MarketDetail } from "./MarketDetail.model";

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

const market = new MarketDetail({
  id: 1,
  name: "test",
  address: "test",
  products: [],
  imageUrls: [],
  summary: "test",
  hasLike: false,
  averageRating: 0,
  reviewNum: 0,
  likeNum: 0,
  marketOpenHour: [],
  openAt: "",
  closeAt: "",
});

describe("MarketDetail", () => {
  it("should be defined", () => {
    expect(MarketDetail).toBeDefined();
  });

  it("should isOpen return true when market is open", () => {
    vitest.spyOn(global, "Date").mockImplementation(() => new MockDate(0, 9, 30));

    expect(market.isOpen()).toBeTruthy();
    vitest.restoreAllMocks();
  });

  it("should isOpen return false when market is open (same open time)", () => {
    vitest.spyOn(global, "Date").mockImplementation(() => new MockDate(0, 9, 29));

    expect(market.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it("should isOpen return false when market is open (same close time)", () => {
    vitest.spyOn(global, "Date").mockImplementation(() => new MockDate(0, 18, 0));

    expect(market.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it("should isOpen return false when market is closed", () => {
    vitest.spyOn(global, "Date").mockImplementation(() => new MockDate(0, 19, 0));

    expect(market.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it("should isOpen return false when market is not open day", () => {
    // 금요일 10시 00분
    vitest.spyOn(global, "Date").mockImplementation(() => new MockDate(5, 10, 0));

    const closedMarket = new MarketDetail({
      id: 1,
      name: "test",
      marketOpenHour: [
        {
          dayOfWeek: "MONDAY",
          openTime: "09:00",
          closeTime: "18:00",
        },
        {
          dayOfWeek: "WEDNESDAY",
          openTime: "09:00",
          closeTime: "18:00",
        },
      ],
      address: "test",
      products: [],
      imageUrls: [],
      summary: "test",
      hasLike: false,
      averageRating: 0,
      reviewNum: 0,
      likeNum: 0,
      openAt: "",
      closeAt: "",
    });

    expect(closedMarket.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });
});
