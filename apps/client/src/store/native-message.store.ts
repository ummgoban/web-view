import type { AppToWebPayload } from "@packages/shared";
import { create } from "zustand";

import pkg from "../../package.json";

interface NativeMessageStore {
  init: AppToWebPayload<"INIT">["payload"] & { connected: boolean };
  navigation: AppToWebPayload<"WEB_NAVIGATION">["payload"];
  previousScreen: AppToWebPayload<"NATIVE_HISTORY">["payload"] | undefined;
  setInit: (init: AppToWebPayload<"INIT">["payload"] & { connected: boolean }) => void;
  setNavigation: (payload: AppToWebPayload<"WEB_NAVIGATION">["payload"]) => void;
  setPreviousScreen: (payload: AppToWebPayload<"NATIVE_HISTORY">["payload"] | undefined) => void;
}

const nativeMessageStore = create<NativeMessageStore>((set) => ({
  init: {
    platform: "web",
    version: pkg.version,
    ts: Date.now(),
    connected: false,
  },
  navigation: {
    screen: "",
    params: undefined,
  },
  previousScreen: undefined,
  setInit: (init: AppToWebPayload<"INIT">["payload"] & { connected: boolean }) => set({ init }),
  setNavigation: (payload: AppToWebPayload<"WEB_NAVIGATION">["payload"]) =>
    set({ navigation: payload }),
  setPreviousScreen: (payload: AppToWebPayload<"NATIVE_HISTORY">["payload"] | undefined) =>
    set({ previousScreen: payload }),
}));

export const useNativeMessageStore = () => {
  const init = nativeMessageStore((state) => state.init);
  const navigation = nativeMessageStore((state) => state.navigation);
  const previousScreen = nativeMessageStore((state) => state.previousScreen);

  const setInit = nativeMessageStore((state) => state.setInit);
  const setNavigation = nativeMessageStore((state) => state.setNavigation);
  const setPreviousScreen = nativeMessageStore((state) => state.setPreviousScreen);

  return { init, navigation, previousScreen, setInit, setNavigation, setPreviousScreen };
};
