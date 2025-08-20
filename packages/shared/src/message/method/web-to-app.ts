import type { WebToAppMethodType, WebToAppPayload } from "../types/web-to-app.type";

export const postToApp = <T extends WebToAppMethodType>(payload: WebToAppPayload<T>) => {
  if (typeof window.ReactNativeWebView === "undefined") {
    console.info(`[${payload.type}] ${JSON.stringify(payload.payload, null, 2)}`);
    return;
  }

  window.ReactNativeWebView.postMessage(JSON.stringify(payload));
};
