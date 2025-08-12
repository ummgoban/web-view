import type { ReceivedMessagePayloadType } from "@packages/shared";
import { postToApp, isSafeAreaInsets, isInit, isWebNavigation, isNativeHistory } from "@packages/shared";

import { useSafeAreaStore, useNativeMessageStore } from "@/store";

import { useEffect } from "react";

/**
 * React Native 메시지를 수신하는 훅
 */
export const useRNMessage = () => {
  const { setInsets } = useSafeAreaStore();
  const { setPreviousScreen, setNavigation, setInit } = useNativeMessageStore();

  useEffect(() => {
    const onAppMessage = (e: CustomEvent<ReceivedMessagePayloadType>) => {
      const msg = e.detail;

      postToApp({ type: "PLAIN", payload: { message: `Received message: ${msg.type}` } });

      if (isSafeAreaInsets(msg)) {
        setInsets(msg.payload);
      } else if (isInit(msg)) {
        setInit(msg.payload);
      } else if (isWebNavigation(msg)) {
        setNavigation(msg.payload);
      } else if (isNativeHistory(msg)) {
        setPreviousScreen(msg.payload);
      }
    };

    window.addEventListener("APP_MESSAGE", onAppMessage as EventListener);

    window.dispatchEvent(new Event("APP_MESSAGE_LISTENER_READY"));

    return () => {
      window.removeEventListener("APP_MESSAGE", onAppMessage as EventListener);
    };
  }, [setInsets, setInit, setNavigation, setPreviousScreen]);
};
