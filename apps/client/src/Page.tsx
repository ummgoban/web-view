import { useEffect, useState } from "react";

import { getStorage, setStorage } from "@packages/shared";
import { cn } from "@packages/ui";

import { SuggestionInstallAppModal } from "./component/feedback";
import { STORAGE_KEY } from "./lib/constants";
import AppRouter from "./router/app-router";
import { useNativeMessageStore, useSafeAreaStore } from "./store";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const Page = () => {
  const { insets } = useSafeAreaStore();
  const { init } = useNativeMessageStore();

  const [openSuggestionInstallAppModal, setOpenSuggestionInstallAppModal] = useState(false);

  useEffect(() => {
    if (!init.connected && init.platform === "web" && navigator.userAgent) {
      // 세션 스토리지에 이미 설치 제안을 표시했는지 확인
      const suggestInstallSession = Boolean(getStorage(STORAGE_KEY.PROMOTION_MODAL.SUGGEST_INSTALL, "session"));
      if (suggestInstallSession) return;

      // 마지막으로 설치 제안을 표시한 시간 확인
      const suggestInstallDateString = getStorage(STORAGE_KEY.PROMOTION_MODAL.SUGGEST_INSTALL);
      const isValidDate = typeof suggestInstallDateString === "string" && !isNaN(Number(suggestInstallDateString));

      // 24시간 내에 이미 설치 제안을 표시했는지 확인
      if (isValidDate) {
        const lastShownTime = Number(suggestInstallDateString);
        const isWithin24Hours = Date.now() - lastShownTime < ONE_DAY_MS;

        if (isWithin24Hours) return;
      }

      setOpenSuggestionInstallAppModal(true);
    }
  }, [init]);

  return (
    <main
      className={cn("h-screen w-screen flex flex-col")}
      style={{
        margin: `$0px ${insets.right}px ${insets.bottom}px ${insets.left}px`,
      }}
    >
      <AppRouter />
      <SuggestionInstallAppModal
        open={openSuggestionInstallAppModal}
        onOpenChange={(open) => {
          setOpenSuggestionInstallAppModal(open);
          if (!open) {
            setStorage(STORAGE_KEY.PROMOTION_MODAL.SUGGEST_INSTALL, "true", "session");
          }
        }}
        onConfirm={() => {
          setStorage(STORAGE_KEY.PROMOTION_MODAL.SUGGEST_INSTALL, "true", "session");
        }}
        onCancel={() => {
          setStorage(STORAGE_KEY.PROMOTION_MODAL.SUGGEST_INSTALL, Date.now().toString());
        }}
      />
    </main>
  );
};
