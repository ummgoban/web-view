import { AppBar, type AppBarProps } from "@packages/ui";

import useSafeAreaStore from "@/store/safearea.store";

export type DefaultLayoutProps = {
  appBarOptions: AppBarProps;
  children: React.ReactNode;
};

export const DefaultLayout = ({ appBarOptions, children }: DefaultLayoutProps) => {
  const {
    insets: { top },
  } = useSafeAreaStore();
  return (
    <div className="relative">
      <AppBar {...appBarOptions} style={{ paddingTop: top }} />
      {children}
      {/* TODO: 탭바 컴포넌트 필요시 넣기 */}
    </div>
  );
};
