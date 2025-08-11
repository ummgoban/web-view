import { create } from "zustand";

interface NativeMessageStore {
  init: {
    platform: "ios" | "android" | undefined;
    version: string;
    ts: number;
  };
  navigation: {
    screen: string;
    params?: object;
  };
  previousScreen:
    | {
        screen: string;
        params?: object;
      }
    | undefined;
  setInit: (init: { platform: "ios" | "android"; version: string; ts: number }) => void;
  setNavigation: (payload: { screen: string; params?: object } | undefined) => void;
  setPreviousScreen: (payload: { screen: string; params?: object } | undefined) => void;
}

const nativeMessageStore = create<NativeMessageStore>((set) => ({
  init: {
    platform: undefined,
    version: "",
    ts: 0,
  },
  navigation: {
    screen: "",
    params: undefined,
  },
  previousScreen: undefined,
  setInit: (init: { platform: "ios" | "android"; version: string; ts: number }) => set({ init }),
  setNavigation: (payload: { screen: string; params?: object } | undefined) => set({ navigation: payload }),
  setPreviousScreen: (payload: { screen: string; params?: object } | undefined) => set({ previousScreen: payload }),
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
