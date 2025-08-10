type ProductItemProps = {
  name: string;
  originalPrice: number;
  salePrice: number;
  stock: number;
  imageUrl: string;
};

export const ProductItem = ({ name, originalPrice, salePrice, stock, imageUrl }: ProductItemProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg mb-3">
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center mt-1">
          <p className="text-gray-500 line-through text-sm">정가: {originalPrice.toLocaleString()}원</p>
        </div>
        <p className="font-bold mt-1">할인가: {salePrice.toLocaleString()}원</p>
        <p className="text-green-600 mt-1">재고 : {stock}</p>
      </div>

      <div className="flex flex-col items-center">
        <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-md" />

        <div className="flex flex-row items-center justify-center mt-2 space-x-2">
          <button className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
            <span>-</span>
          </button>
          <span className="text-center">{stock > 0 ? "0 개" : "품절"}</span>
          <button className="w-8 h-8 bg-green-500 text-white rounded-md flex items-center justify-center">
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
