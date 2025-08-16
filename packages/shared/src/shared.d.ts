// ReactNativeWebView 타입 선언
declare global {
  interface Window {
    ReactNativeWebView?: {
      webToApp(message: string): void;
    };
  }
}

export {};
