import type { PostMessageMethodType, PostMessagePayload } from "../types/post-message.type";

export const postToApp = <T extends PostMessageMethodType>(payload: PostMessagePayload<T>) => {
  if (typeof window.ReactNativeWebView === "undefined") {
    return;
  }

  window.ReactNativeWebView.postMessage(JSON.stringify(payload));
};
