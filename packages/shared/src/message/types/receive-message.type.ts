export type ReceivedMessageMethodType = "INIT" | "SAFE_AREA_INSETS" | "WEB_NAVIGATION" | "NATIVE_HISTORY";

export interface ReceivedMessagePayloadType {
  type: ReceivedMessageMethodType;
  payload?: object;
}

interface ReceivedMessageSafeAreaInsetsPayload extends ReceivedMessagePayloadType {
  type: "SAFE_AREA_INSETS";
  payload: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface ReceivedMessageInitPayload extends ReceivedMessagePayloadType {
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

interface ReceivedMessageNavigationPayload extends ReceivedMessagePayloadType {
  type: "WEB_NAVIGATION";
  payload: {
    screen: string;
    params?: object;
  };
}

interface ReceivedMessageNativeHistoryPayload extends ReceivedMessagePayloadType {
  type: "NATIVE_HISTORY";
  payload: {
    screen: string;
    params?: object;
  };
}

export type ReceivedMessagePayload<T extends ReceivedMessageMethodType> = T extends "SAFE_AREA_INSETS"
  ? ReceivedMessageSafeAreaInsetsPayload
  : T extends "INIT"
  ? ReceivedMessageInitPayload
  : T extends "WEB_NAVIGATION"
  ? ReceivedMessageNavigationPayload
  : T extends "NATIVE_HISTORY"
  ? ReceivedMessageNativeHistoryPayload
  : never;
