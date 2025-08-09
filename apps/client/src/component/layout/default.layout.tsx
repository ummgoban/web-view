import { AppBar, type AppBarProps } from "@packages/ui";

export type DefaultLayoutProps = {
  appBarOptions: AppBarProps;
  children: React.ReactNode;
};

export const DefaultLayout = ({ appBarOptions, children }: DefaultLayoutProps) => {
  return (
    <div className="relative">
      <AppBar {...appBarOptions} />
      {children}
      {/* TODO: 탭바 컴포넌트 필요시 넣기 */}
    </div>
  );
};
