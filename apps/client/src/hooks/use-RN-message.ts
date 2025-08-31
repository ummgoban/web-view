import type { AppToWebPayloadType } from "@packages/shared";
import { postToApp, isSafeAreaInsets, isInit, isWebNavigation, isNativeHistory, isAuthorization } from "@packages/shared";

import { useSafeAreaStore, useNativeMessageStore, useProfileStore } from "@/store";

import { useEffect } from "react";

/**
 * React Native 메시지를 수신하는 훅
 */
export const useRNMessage = () => {
  const { setInsets } = useSafeAreaStore();
  const { setPreviousScreen, setNavigation, setInit } = useNativeMessageStore();
  const { setSession } = useProfileStore();

  useEffect(() => {
    const onAppMessage = (e: CustomEvent<AppToWebPayloadType>) => {
      const msg = e.detail;

      postToApp({ type: "PLAIN", payload: { message: `Received message: ${msg.type}` } });

      if (isSafeAreaInsets(msg)) {
        setInsets(msg.payload);
      } else if (isInit(msg)) {
        setInit({ ...msg.payload, connected: true });
      } else if (isWebNavigation(msg)) {
        setNavigation(msg.payload);
      } else if (isNativeHistory(msg)) {
        setPreviousScreen(msg.payload);
      } else if (isAuthorization(msg)) {
        setSession(msg.payload);
      }
    };

    window.addEventListener("APP_MESSAGE", onAppMessage as EventListener);

    window.dispatchEvent(new Event("APP_MESSAGE_LISTENER_READY"));

    return () => {
      window.removeEventListener("APP_MESSAGE", onAppMessage as EventListener);
    };
  }, [setInsets, setInit, setNavigation, setPreviousScreen, setSession]);
};
