import { cn } from "@/lib/utils";

export type AppBarProps = {
  title: string;
  LeftContent?: React.ReactNode;
  RightContent?: React.ReactNode;
  className?: string;
};

const AppBar = ({ title, LeftContent, RightContent, className }: AppBarProps) => {
  return (
    <header className="sticky top-0">
      <div className={cn("flex items-center justify-between h-[48px] pl-4 w-full border-b border-gray-200 bg-white shadow-sm", className)}>
        {LeftContent && <div className="flex items-center justify-center p-2 h-full aspect-square box-border">{LeftContent}</div>}
        <div className="w-full text-left font-subtitle1">{title}</div>
        {RightContent && <div className="flex items-center justify-center p-2 h-full aspect-square box-border">{RightContent}</div>}
      </div>
    </header>
  );
};

export default AppBar;
