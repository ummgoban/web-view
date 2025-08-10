import type { ReceiveMessagePayloadType } from "@packages/shared";
import { useEffect, useState } from "react";

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// TODO: RN message 송수신 이벤트 구독 등록
// 이벤트 발생으로 얻은 정보를 웹에서 사용 가능하도록 상태 관리

/**
 * React Native 메시지를 수신하는 훅
 * @returns 안전 영역 인셋 값과 메시지 핸들러 함수
 */
export const useRNMessage = () => {
  /**
   * 안전 영역 인셋 상태
   */
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  /**
   * 마지막으로 수신한 메시지
   */
  const [lastMessage, setLastMessage] = useState<ReceiveMessagePayloadType | null>(null);

  useEffect(() => {
    const onAppMessage = (e: CustomEvent<ReceiveMessagePayloadType>) => {
      const msg = e.detail;
      setLastMessage(msg);

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

    /**
     * 메시지 리스너 등록
     *
     */
    window.addEventListener("APP_MESSAGE", onAppMessage as EventListener);

    /**
     * 메시지 리스너 준비 완료 이벤트 발생
     *
     */
    window.dispatchEvent(new Event("APP_MESSAGE_LISTENER_READY"));

    /**
     * 컴포넌트 언마운트 시 이벤트 리스너 제거
     *
     */
    return () => {
      window.removeEventListener("APP_MESSAGE", onAppMessage as EventListener);
    };
  }, []);

  return {
    insets,
    lastMessage,
  };
};
