import { useState } from "react";

import { Alert } from "@packages/ui";
import { getStorage, setStorage } from "@packages/shared";

import { useInit } from "@/hooks/use-init";
import { IOS_APP_URL, ANDROID_APP_URL, StorageKey } from "@/lib/constants";

export const SuggestionInstallAppModal = () => {
  const [open, setOpen] = useState(false);

  useInit((init) => {
    if (init.platform !== "web") return;
    const suggestInstall = Boolean(getStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL));
    const suggestInstallSession = Boolean(getStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "session"));
    if (suggestInstall || suggestInstallSession) return;
    if (!navigator.userAgent) return;
    setOpen(true);
  });

  return (
    <Alert
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "true", "session");
        }
      }}
      allowClickAway
      title="앱을 설치하고 이용해보세요"
      description={`맘찬픽 앱에서 예약하고\n찜한 가게의 할인 알림을 받아보세요.`}
      actionDirection="col"
      cancel={{
        label: "오늘은 그만 볼래요.",
        action: () => {
          setStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "true");
          setOpen(false);
        },
        className: "border-none text-gray-400 shadow-none",
      }}
      confirm={{
        label: "앱에서 보기",
        action: () => {
          setOpen(false);
          setStorage(StorageKey.PROMOTION_MODAL.SUGGEST_INSTALL, "true", "session");
          const varUA = navigator.userAgent.toLowerCase();

          if (varUA.indexOf("android") > -1) {
            window.open(ANDROID_APP_URL, "_blank");
          } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
            window.open(IOS_APP_URL, "_blank");
          }
        },
        className: "bg-primary text-white font-bold",
      }}
    />
  );
};
