import { getStorage, setStorage } from "@packages/shared";
import { cn } from "@packages/ui";

import { useState } from "react";
import { SuggestionInstallAppModal } from "./component/feedback";
import { useInit } from "./hooks/use-init";
import { useRNMessage } from "./hooks/use-RN-message";
import { StorageKey } from "./lib/constants";
import AppProvider from "./provider";
import AppRouter from "./router/app-router";
import { useSafeAreaStore } from "./store/safearea.store";

import "./App.css";

function App() {
  // React Native 메시지를 수신하는 훅
  useRNMessage();

  const { insets } = useSafeAreaStore();

  const [openSuggestionInstallAppModal, setOpenSuggestionInstallAppModal] = useState(false);

  useInit((init) => {
    if (init.platform !== "web") return;
    const suggestInstall = Boolean(getStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL));
    const suggestInstallSession = Boolean(getStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "session"));
    if (suggestInstall || suggestInstallSession) return;
    if (!navigator.userAgent) return;
    setOpenSuggestionInstallAppModal(true);
  });

  return (
    <AppProvider>
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
              setStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "true", "session");
            }
          }}
          onConfirm={() => {
            setStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "true", "session");
          }}
          onCancel={() => {
            setStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "true");
          }}
        />
      </main>
    </AppProvider>
  );
}

export default App;
