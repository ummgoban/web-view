// internal type

export type PostMessageMethodType = "NATIVE_NAVIGATION" | "NATIVE_GO_BACK" | "AUTHORIZATION" | "PLAIN" | "UNKNOWN";

interface PostMessagePayloadType {
  type: PostMessageMethodType;
  payload?: object;
}

/**
 * Use React Native Stack Navigation
 * - Navigation
 */
export interface PostMessageNativeNavigationPayload extends PostMessagePayloadType {
  type: "NATIVE_NAVIGATION";
  payload: {
    screen: string;
    params?: object;
    callbackUri?: string;
  };
}

/**
 * Use React Native Stack Navigation
 * - Go Back Navigation
 */
export interface PostMessageNativeGoBackPayload extends PostMessagePayloadType {
  type: "NATIVE_GO_BACK";
}

export interface PostMessageAuthorizedPayload extends PostMessagePayloadType {
  type: "AUTHORIZATION";
}

export interface PostMessagePlainPayload extends PostMessagePayloadType {
  type: "PLAIN";
  payload: {
    message: string;
  };
}

export type PostMessagePayload<T extends PostMessageMethodType> = T extends "NATIVE_NAVIGATION"
  ? PostMessageNativeNavigationPayload
  : T extends "NATIVE_GO_BACK"
  ? PostMessageNativeGoBackPayload
  : T extends "AUTHORIZATION"
  ? PostMessageAuthorizedPayload
  : T extends "PLAIN"
  ? PostMessagePlainPayload
  : never;
