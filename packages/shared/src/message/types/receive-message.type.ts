type ReceiveMessageMethodType = "INIT" | "SAFE_AREA_INSETS";

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

export type ReceiveMessagePayload<T extends ReceiveMessageMethodType> = T extends "SAFE_AREA_INSETS"
  ? ReceiveMessageSafeAreaInsetsPayload
  : T extends "INIT"
  ? ReceiveMessageInitPayload
  : never;
