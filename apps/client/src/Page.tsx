import { useEffect, useState } from "react";

import { getStorage, isReactNativeWebView, setStorage } from "@packages/shared";
import { cn } from "@packages/ui";

import { SuggestionInstallAppModal } from "./component/feedback";
import { STORAGE_KEY } from "./lib/constants";
import AppRouter from "./router/app-router";
import { useSafeAreaStore } from "./store";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const Page = () => {
  const { insets } = useSafeAreaStore();

  const [openSuggestionInstallAppModal, setOpenSuggestionInstallAppModal] = useState(false);

  useEffect(() => {
    /// NOTE: 웹 브라우저 환경에서 앱 설치 권장 모달
    if (!isReactNativeWebView()) {
      const suggestInstallSession = Boolean(
        getStorage(STORAGE_KEY.PROMOTION_MODAL.SUGGEST_INSTALL, "session"),
      );
      if (suggestInstallSession) return;

      const suggestInstallDateString = getStorage(STORAGE_KEY.PROMOTION_MODAL.SUGGEST_INSTALL);
      const isValidDate =
        typeof suggestInstallDateString === "string" && !isNaN(Number(suggestInstallDateString));

      if (isValidDate) {
        const lastShownTime = Number(suggestInstallDateString);
        const isWithin24Hours = Date.now() - lastShownTime < ONE_DAY_MS;

        if (isWithin24Hours) return;
      }

      setOpenSuggestionInstallAppModal(true);
    }
  }, []);

  return (
    <main
      className={cn("h-screen w-screen flex flex-col")}
      style={{
        margin: `0px ${insets.right}px ${insets.bottom}px ${insets.left}px`,
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
