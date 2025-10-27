import { cn } from "@packages/ui";

export type ProductCardProps = {
  name: string;
  originalPrice: number;
  salePrice: number;
  stock: number;
  imageUrl: string;
  isClose?: boolean;
  count: number;
  maxCount?: number;
  onCountChange?: (type: "up" | "down") => void;
  onRemove?: () => void;
  isSelected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  tags?: string[];
  variant?: "detail" | "cart";
};

export const ProductCard = ({
  name,
  originalPrice,
  salePrice,
  stock,
  imageUrl,
  isClose = false,
  count,
  maxCount,
  onCountChange,
  onRemove,
  isSelected = false,
  onSelectChange,
  tags,
  variant = "detail",
}: ProductCardProps) => {
  const disabledCountDown = count <= 0 || isClose;
  const disabledCountUp = count >= (maxCount || stock) || isClose;

  const isSale = originalPrice !== salePrice;

  const handleCountDown = () => {
    if (disabledCountDown || !onCountChange) return;
    onCountChange("down");
  };

  const handleCountUp = () => {
    if (disabledCountUp || !onCountChange) return;
    onCountChange("up");
  };

  return (
    <div className={cn("relative flex-1 ", variant === "detail" ? "mb-3" : "mb-0")}>
      <div className="flex gap-3 p-4 bg-white border-b border-gray-100">
        {/* Checkbox */}
        {onSelectChange && (
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelectChange(e.target.checked)}
              className="w-5 h-5 mr-2 accent-green-500"
            />
          </div>
        )}

        {/* Product Image */}
        <div className="flex-shrink-0 relative">
          <div className="w-[130px] h-[130px] bg-gray-100 rounded-lg overflow-hidden">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Product Name */}
          <div className="mb-2">
            <h3 className="text-gray-900 font-semibold text-base leading-tight mb-1">{name}</h3>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Price Info */}
          <div className="mb-2">
            {isSale && (
              <div className="text-gray-400 text-sm line-through mb-0.5">{originalPrice.toLocaleString()}원</div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-gray-900 text-xl font-bold">{salePrice.toLocaleString()}원</div>
            </div>
          </div>
        </div>
      </div>
      {/* 수량 수정 및 삭제 버튼 */}
      <div className="flex flex-col justify-between items-end">
        {/* Counter */}
        {onCountChange && (
          <div className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1">
            <button
              className={cn(
                "w-6 h-6 flex items-center justify-center text-gray-600 transition-colors",
                disabledCountDown ? "opacity-40 cursor-not-allowed" : "hover:text-gray-900",
              )}
              onClick={handleCountDown}
              disabled={disabledCountDown}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-gray-900 text-sm font-medium min-w-[2rem] text-center">
              {stock > 0 ? count : "품절"}
            </span>
            <button
              className={cn(
                "w-6 h-6 flex items-center justify-center text-gray-600 transition-colors",
                disabledCountUp ? "opacity-40 cursor-not-allowed" : "hover:text-gray-900",
              )}
              onClick={handleCountUp}
              disabled={disabledCountUp}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
