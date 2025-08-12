import type { ReceivedMessagePayload, ReceivedMessagePayloadType } from "../types";

export const isSafeAreaInsets = (msg: ReceivedMessagePayloadType): msg is ReceivedMessagePayload<"SAFE_AREA_INSETS"> => msg.type === "SAFE_AREA_INSETS";
export const isInit = (msg: ReceivedMessagePayloadType): msg is ReceivedMessagePayload<"INIT"> => msg.type === "INIT";
export const isWebNavigation = (msg: ReceivedMessagePayloadType): msg is ReceivedMessagePayload<"WEB_NAVIGATION"> => msg.type === "WEB_NAVIGATION";
export const isNativeHistory = (msg: ReceivedMessagePayloadType): msg is ReceivedMessagePayload<"NATIVE_HISTORY"> => msg.type === "NATIVE_HISTORY";
export const isAuthorization = (msg: ReceivedMessagePayloadType): msg is ReceivedMessagePayload<"AUTHORIZATION"> => msg.type === "AUTHORIZATION";
