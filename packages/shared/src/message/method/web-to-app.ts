import type { WebToAppMethodType, WebToAppPayload } from "../types/web-to-app.type";

interface PostToAppOptions {
  /**
   * logging
   * @default false
   */
  log?: boolean;
  /**
   * @decription onSuccess callback. `window.ReactNativeWebView.postMessage` success 시 호출
   */
  onSuccess?: () => void;
  /**
   * @decription onError callback. `window.ReactNativeWebView.postMessage` fail 시 호출
   */
  onError?: () => void;
  /**
   * @decription fallback callback `window.ReactNativeWebView` undefined 시 호출
   *
   * 앱 환경이 아닌 웹 브라우저에서 실행시 수행할 폴백함수
   */
  fallback?: () => void;
}

export const postToApp = <T extends WebToAppMethodType>(
  payload: WebToAppPayload<T>,
  options?: PostToAppOptions,
) => {
  if (typeof window.ReactNativeWebView === "undefined") {
    if (options?.log) {
      console.info(`[${payload.type}] ${JSON.stringify(payload.payload, null, 2)}`);
    }
    options?.fallback?.();
    return;
  }

  try {
    window.ReactNativeWebView.postMessage(JSON.stringify(payload));
    options?.onSuccess?.();
  } catch {
    options?.onError?.();
  }
};
