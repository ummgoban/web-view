import { Market } from "./Market.model";
import { MarketType } from "../../types";

describe("Market", () => {
  it("should be defined", () => {
    expect(Market).toBeDefined();
  });

  it("should compatible with MarketType (MarketType -> Market)", () => {
    const marketType: MarketType = {
      id: 1,
      name: "test",
      address: "test",
      products: [],
      imageUrls: [],
      summary: "test",
      openAt: "",
      closeAt: "",
      likeNum: 0,
      reviewNum: 0,
      averageRating: 0,
    };

    const market = new Market(marketType);

    expect(market).toBeInstanceOf(Market);
    expect(market.id).toBe(marketType.id);
    expect(market.name).toBe(marketType.name);
    expect(market.address).toBe(marketType.address);
    expect(market.products).toEqual(marketType.products);
    expect(market.imageUrls).toEqual(marketType.imageUrls);
    expect(market.summary).toBe(marketType.summary);
  });

  it("should compatible with MarketType (Market -> MarketType)", () => {
    const market = new Market({
      id: 1,
      name: "test",
      address: "test",
      products: [],
      imageUrls: [],
      summary: "test",
      openAt: "",
      closeAt: "",
      likeNum: 0,
      reviewNum: 0,
      averageRating: 0,
    });

    const marketType: MarketType = market;

    expect(marketType).toEqual({
      id: 1,
      name: "test",
      openHours: [],
      address: "test",
      products: [],
      imageUrls: [],
      summary: "test",
      openAt: "",
      closeAt: "",
      likeNum: 0,
      reviewNum: 0,
      averageRating: 0,
    });
  });
});
