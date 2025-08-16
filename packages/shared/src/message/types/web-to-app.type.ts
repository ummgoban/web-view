// internal type

export type WebToAppMethodType = "NATIVE_NAVIGATION" | "NATIVE_GO_BACK" | "PLAIN" | "UNKNOWN";

interface WebToAppPayloadType {
  type: WebToAppMethodType;
  payload?: object;
}

/**
 * Use React Native Stack Navigation
 * - Navigation
 */
export interface WebToAppNativeNavigationPayload extends WebToAppPayloadType {
  type: "NATIVE_NAVIGATION";
  payload: {
    screen: string;
    params?: object;
    callbackState?: {
      screen: string;
      params?: object;
      webUri: string;
    };
  };
}

/**
 * Use React Native Stack Navigation
 * - Go Back Navigation
 */
export interface WebToAppNativeGoBackPayload extends WebToAppPayloadType {
  type: "NATIVE_GO_BACK";
}

export interface WebToAppPlainPayload extends WebToAppPayloadType {
  type: "PLAIN";
  payload: {
    message: string;
  };
}

export type WebToAppPayload<T extends WebToAppMethodType> = T extends "NATIVE_NAVIGATION"
  ? WebToAppNativeNavigationPayload
  : T extends "NATIVE_GO_BACK"
  ? WebToAppNativeGoBackPayload
  : T extends "PLAIN"
  ? WebToAppPlainPayload
  : never;
