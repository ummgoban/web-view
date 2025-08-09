import { cn } from "@/lib";
import { createPortal } from "react-dom";

export type LoadingCircleProps = {
  /**
   * animation state
   */
  animation: boolean;
  /**
   * position of loading circle
   * - global: full screen
   * - local: relative to parent element
   */
  position?: "global" | "local";
  /**
   * color of loading circle
   * @default black
   */
  color?: string;
  /**
   * size of loading circle
   * @default 5
   */
  size?: number;
};

const CircleSvg = ({ color = "text-black", size = 5 }: { color: string; size: number }) => (
  <svg className={cn("animate-spin", color, `size-${size}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const loadingCircleContainerClassName = "top-0 left-0 right-0 bottom-0 justify-center items-center z-50";

export const LoadingCircle = ({ position = "global", animation, color = "text-black", size = 5 }: LoadingCircleProps) => {
  if (!animation) {
    return null;
  }

  const isGlobal = position === "global";

  if (isGlobal) {
    return createPortal(
      <div className={cn("absolute", loadingCircleContainerClassName)}>
        <div className="flex items-center justify-center w-full h-full">
          <CircleSvg color={color} size={size} />
        </div>
      </div>,
      document.body
    );
  }

  return (
    <div className={cn("absolute", loadingCircleContainerClassName)}>
      <div className="flex items-center justify-center w-full h-full">
        <CircleSvg color={color} size={size} />
      </div>
    </div>
  );
};
