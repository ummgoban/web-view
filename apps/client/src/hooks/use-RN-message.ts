import useSafeAreaStore from "@/store/safearea.store";
import type { ReceiveMessagePayloadType } from "@packages/shared";

import { useEffect } from "react";

/**
 * React Native 메시지를 수신하는 훅
 */
export const useRNMessage = () => {
  const { setInsets } = useSafeAreaStore();

  useEffect(() => {
    const onAppMessage = (e: CustomEvent<ReceiveMessagePayloadType>) => {
      const msg = e.detail;

      switch (msg.type) {
        case "SAFE_AREA_INSETS":
          setInsets(msg.payload);
          break;
        case "INIT":
          break;
        default:
          break;
      }
    };

    window.addEventListener("APP_MESSAGE", onAppMessage as EventListener);

    window.dispatchEvent(new Event("APP_MESSAGE_LISTENER_READY"));

    return () => {
      window.removeEventListener("APP_MESSAGE", onAppMessage as EventListener);
    };
  }, [setInsets]);
};
