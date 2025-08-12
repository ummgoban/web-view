import type { ReceiveMessageMethodType, ReceiveMessagePayload, ReceiveMessagePayloadType } from "../types";

export const receiveMessageGuard = <T extends ReceiveMessageMethodType>(msg: ReceiveMessagePayloadType): msg is ReceiveMessagePayload<T> => {
  if (msg.type === "SAFE_AREA_INSETS") {
    return true;
  }
  if (msg.type === "INIT") {
    return true;
  }
  if (msg.type === "WEB_NAVIGATION") {
    return true;
  }
  if (msg.type === "NATIVE_HISTORY") {
    return true;
  }
  return false;
};
