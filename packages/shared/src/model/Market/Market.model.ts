import type { MarketType } from "../../types";

export class Market {
  public id: MarketType["id"];
  public name: MarketType["name"];
  public address: MarketType["address"];
  public products: MarketType["products"];
  public imageUrls: MarketType["imageUrls"];
  public summary: MarketType["summary"];
  public openAt: MarketType["openAt"];
  public closeAt: MarketType["closeAt"];
  public likeNum: MarketType["likeNum"];
  public reviewNum: MarketType["reviewNum"];
  public averageRating: MarketType["averageRating"];

  constructor(data: MarketType) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.products = data.products;
    this.imageUrls = data.imageUrls;
    this.summary = data.summary;
    this.openAt = data.openAt;
    this.closeAt = data.closeAt;
    this.likeNum = data.likeNum;
    this.reviewNum = data.reviewNum;
    this.averageRating = data.averageRating;
  }
}
