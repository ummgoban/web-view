export type ReceiveMessageMethodType = "INIT" | "SAFE_AREA_INSETS" | "WEB_NAVIGATION" | "NATIVE_HISTORY";

export interface ReceiveMessagePayloadType {
  type: ReceiveMessageMethodType;
  payload?: object;
}

interface ReceiveMessageSafeAreaInsetsPayload extends ReceiveMessagePayloadType {
  type: "SAFE_AREA_INSETS";
  payload: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface ReceiveMessageInitPayload extends ReceiveMessagePayloadType {
  type: "INIT";
  payload: {
    /**
     * platform
     */
    platform: "ios" | "android";
    /**
     * app package version
     */
    version: string;
    /**
     * UTC (ms)
     */
    ts: number;
  };
}

interface ReceiveMessageNavigationPayload extends ReceiveMessagePayloadType {
  type: "WEB_NAVIGATION";
  payload: {
    screen: string;
    params?: object;
  };
}

interface ReceiveMessageNativeHistoryPayload extends ReceiveMessagePayloadType {
  type: "NATIVE_HISTORY";
  payload: {
    screen: string;
    params?: object;
  };
}

export type ReceiveMessagePayload<T extends ReceiveMessageMethodType> = T extends "SAFE_AREA_INSETS"
  ? ReceiveMessageSafeAreaInsetsPayload
  : T extends "INIT"
  ? ReceiveMessageInitPayload
  : T extends "WEB_NAVIGATION"
  ? ReceiveMessageNavigationPayload
  : T extends "NATIVE_HISTORY"
  ? ReceiveMessageNativeHistoryPayload
  : never;
