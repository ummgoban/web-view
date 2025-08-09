export type ProductStatusType = 'IN_STOCK' | 'OUT_OF_STOCK' | 'HIDDEN';

export type ProductType = {
  id: number;
  name: string;
  image: string;
  originPrice: number;
  discountPrice: number;
  discountRate: number;
  tags: TagType[];
  productStatus: ProductStatusType;
  stock: number;
  count?: number;
};

export type TagType = {
  id: number;
  tagName: string;
};
