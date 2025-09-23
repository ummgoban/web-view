import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ChevronLeft from "@/assets/svg/chevron-left.svg";

export type AppBarProps = {
  title: string;
  LeftContent?: React.ReactNode;
  RightContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  back?: () => void;
  hiddenBack?: boolean;
};

const SideContentLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center p-2 h-full aspect-square box-border">
      {children}
    </div>
  );
};

export const AppBar = ({
  title,
  LeftContent,
  RightContent,
  className,
  style,
  back,
  hiddenBack = false,
}: AppBarProps) => {
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    if (!window) return;
    setHasHistory(window.history.length > 1);
  }, []);

  return (
    <header className={cn("sticky top-0 bg-white z-50", className)} style={style}>
      <div className={cn("flex items-center justify-between h-[48px] w-full")}>
        {!hiddenBack && LeftContent ? (
          <SideContentLayout>{LeftContent}</SideContentLayout>
        ) : !hiddenBack && (hasHistory || back) ? (
          <SideContentLayout>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (back) {
                  back();
                  return;
                }
                window.history.back();
              }}
            >
              <ChevronLeft />
            </a>
          </SideContentLayout>
        ) : (
          <div aria-describedby="space" className="w-4" />
        )}
        <div className="w-full text-left font-subtitle2">{title}</div>
        {RightContent && (
          <div className="flex items-center justify-center p-2 h-full aspect-square box-border">
            {RightContent}
          </div>
        )}
      </div>
    </header>
  );
};
