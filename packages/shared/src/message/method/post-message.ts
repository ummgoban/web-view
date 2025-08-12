import type { PostMessageMethodType, PostMessagePayload } from "../types/post-message.type";

export const postToApp = <T extends PostMessageMethodType>(payload: PostMessagePayload<T>) => {
  if (typeof window.ReactNativeWebView === "undefined") {
    console.info(`[${payload.type}] ${JSON.stringify(payload.payload, null, 2)}`);
    return;
  }

  window.ReactNativeWebView.postMessage(JSON.stringify(payload));
};
