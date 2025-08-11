import { create } from "zustand";

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SafeAreaStore {
  insets: SafeAreaInsets;
  setInsets: (insets: SafeAreaInsets) => void;
}

const safeAreaStore = create<SafeAreaStore>((set) => ({
  insets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  setInsets: (insets: SafeAreaInsets) => set({ insets }),
}));

export const useSafeAreaStore = () => {
  const insets = safeAreaStore((state) => state.insets);
  const setInsets = safeAreaStore((state) => state.setInsets);

  return { insets, setInsets };
};
