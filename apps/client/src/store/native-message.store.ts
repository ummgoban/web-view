import type { ReceivedMessagePayload } from "@packages/shared";
import { create } from "zustand";

interface NativeMessageStore {
  init: ReceivedMessagePayload<"INIT">["payload"];
  navigation: ReceivedMessagePayload<"WEB_NAVIGATION">["payload"];
  previousScreen: ReceivedMessagePayload<"NATIVE_HISTORY">["payload"] | undefined;
  setInit: (init: ReceivedMessagePayload<"INIT">["payload"]) => void;
  setNavigation: (payload: ReceivedMessagePayload<"WEB_NAVIGATION">["payload"]) => void;
  setPreviousScreen: (payload: ReceivedMessagePayload<"NATIVE_HISTORY">["payload"] | undefined) => void;
}

const nativeMessageStore = create<NativeMessageStore>((set) => ({
  init: {
    platform: "ios",
    version: "",
    ts: 0,
  },
  navigation: {
    screen: "",
    params: undefined,
  },
  previousScreen: undefined,
  setInit: (init: ReceivedMessagePayload<"INIT">["payload"]) => set({ init }),
  setNavigation: (payload: ReceivedMessagePayload<"WEB_NAVIGATION">["payload"]) => set({ navigation: payload }),
  setPreviousScreen: (payload: ReceivedMessagePayload<"NATIVE_HISTORY">["payload"] | undefined) => set({ previousScreen: payload }),
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
