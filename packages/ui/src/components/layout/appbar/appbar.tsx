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
      <div className={cn("flex items-center justify-between h-[50px] w-full border-b border-gray-200 bg-white shadow-sm", className)}>
        {LeftContent ?? <div />}
        <span className="font-subtitle1">{title}</span>
        {RightContent ?? <div />}
      </div>
    </header>
  );
};

export default AppBar;
