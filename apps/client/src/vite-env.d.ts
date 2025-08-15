/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare global {
  const __DEV__: boolean;
  const __PROD__: boolean;
  const __LOCAL_DEV__: boolean;
  const __LOCAL_PROD__: boolean;
}

export {};
