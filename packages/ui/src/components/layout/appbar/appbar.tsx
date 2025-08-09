import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ChevronLeft from "@/assets/svg/chevron-left.svg";

export type AppBarProps = {
  title: string;
  LeftContent?: React.ReactNode;
  RightContent?: React.ReactNode;
  className?: string;
  back?: () => void;
};

const SideContendLayout = ({ children }: React.PropsWithChildren) => {
  return <div className="flex items-center justify-center p-2 h-full aspect-square box-border">{children}</div>;
};

export const AppBar = ({ title, LeftContent, RightContent, className, back }: AppBarProps) => {
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    if (!window) return;
    setHasHistory(window.history.length > 1);
  }, []);

  return (
    <header className="sticky top-0">
      <div className={cn("flex items-center justify-between h-[48px] w-full border-b border-gray-200 bg-white shadow-sm", className)}>
        {LeftContent ? (
          <SideContendLayout>{LeftContent}</SideContendLayout>
        ) : hasHistory ? (
          <SideContendLayout>
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
          </SideContendLayout>
        ) : (
          <div aria-describedby="space" className="w-4" />
        )}
        <div className="w-full text-left font-subtitle1">{title}</div>
        {RightContent && <div className="flex items-center justify-center p-2 h-full aspect-square box-border">{RightContent}</div>}
      </div>
    </header>
  );
};
