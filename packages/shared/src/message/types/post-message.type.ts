// internal type

export type PostMessageMethodType = "NATIVE_NAVIGATION" | "WEB_NAVIGATION" | "AUTHORIZATION" | "UNKNOWN";

export interface PostMessagePayloadType {
  type: PostMessageMethodType;
}

export interface PostMessageNativeNavigationPayload extends PostMessagePayloadType {
  type: "NATIVE_NAVIGATION";
  screen: string;
  params?: object;
}

export interface PostMessageWebNavigationPayload extends PostMessagePayloadType {
  type: "WEB_NAVIGATION";
  url: string;
}

export interface PostMessageAuthorizedPayload extends PostMessagePayloadType {
  type: "AUTHORIZATION";
}

export type PostMessagePayload<T extends PostMessageMethodType> = T extends "NATIVE_NAVIGATION"
  ? PostMessageNativeNavigationPayload
  : T extends "WEB_NAVIGATION"
  ? PostMessageWebNavigationPayload
  : T extends "AUTHORIZATION"
  ? PostMessageAuthorizedPayload
  : never;
