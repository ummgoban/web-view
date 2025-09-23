import type { AppToWebMethodType, AppToWebPayload, AppToWebPayloadType } from "../types";

type IsAppToWebOf<T extends AppToWebMethodType> = {
  (msg: AppToWebPayloadType): msg is AppToWebPayload<T>;
};

export const isSafeAreaInsets: IsAppToWebOf<"SAFE_AREA_INSETS"> = (
  msg,
): msg is AppToWebPayload<"SAFE_AREA_INSETS"> => msg.type === "SAFE_AREA_INSETS";
export const isInit: IsAppToWebOf<"INIT"> = (msg): msg is AppToWebPayload<"INIT"> =>
  msg.type === "INIT";
export const isWebNavigation: IsAppToWebOf<"WEB_NAVIGATION"> = (
  msg,
): msg is AppToWebPayload<"WEB_NAVIGATION"> => msg.type === "WEB_NAVIGATION";
export const isNativeHistory: IsAppToWebOf<"NATIVE_HISTORY"> = (
  msg,
): msg is AppToWebPayload<"NATIVE_HISTORY"> => msg.type === "NATIVE_HISTORY";
export const isAuthorization: IsAppToWebOf<"AUTHORIZATION"> = (
  msg,
): msg is AppToWebPayload<"AUTHORIZATION"> => msg.type === "AUTHORIZATION";
