import type { ReceiveMessagePayloadType } from "@packages/shared";
import { postToApp, receiveMessageGuard } from "@packages/shared";

import { useSafeAreaStore, useNativeMessageStore } from "@/store";

import { useEffect } from "react";

/**
 * React Native 메시지를 수신하는 훅
 */
export const useRNMessage = () => {
  const { setInsets } = useSafeAreaStore();
  const { setPreviousScreen, setNavigation, setInit } = useNativeMessageStore();

  useEffect(() => {
    const onAppMessage = (e: CustomEvent<ReceiveMessagePayloadType>) => {
      const msg = e.detail;

      postToApp({ type: "PLAIN", payload: { message: `Received message: ${msg.type}` } });

      if (receiveMessageGuard<"SAFE_AREA_INSETS">(msg)) {
        setInsets(msg.payload);
      } else if (receiveMessageGuard<"INIT">(msg)) {
        setInit(msg.payload);
      } else if (receiveMessageGuard<"NAVIGATION">(msg)) {
        setNavigation({ screen: msg.payload.screen, params: msg.payload.params });
      } else if (receiveMessageGuard<"NATIVE_HISTORY">(msg)) {
        setPreviousScreen({ screen: msg.payload.screen, params: msg.payload.params });
      }
    };

    window.addEventListener("APP_MESSAGE", onAppMessage as EventListener);

    window.dispatchEvent(new Event("APP_MESSAGE_LISTENER_READY"));

    return () => {
      window.removeEventListener("APP_MESSAGE", onAppMessage as EventListener);
    };
  }, [setInsets, setInit, setNavigation, setPreviousScreen]);
};
