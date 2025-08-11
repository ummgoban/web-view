import type { MarketType } from "@/types/market.type";

export class Market {
  id: MarketType["id"];
  name: MarketType["name"];
  address: MarketType["address"];
  products: MarketType["products"];
  imageUrls: MarketType["imageUrls"];
  summary: MarketType["summary"];
  openAt: MarketType["openAt"];
  closeAt: MarketType["closeAt"];
  likeNum: MarketType["likeNum"];
  reviewNum: MarketType["reviewNum"];
  averageRating: MarketType["averageRating"];

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
