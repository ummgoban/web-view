import { create } from "zustand";
import { setStorage } from "@packages/shared";
import type { SessionType } from "@packages/shared";

interface ProfileStore {
  accessToken: string | null;
  refreshToken: string | null;
  setSession: (session: SessionType | null) => void;
}

const profileStore = create<ProfileStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  setSession: (session: SessionType | null) => {
    set({ accessToken: session?.accessToken, refreshToken: session?.refreshToken });
    setStorage("session", session);
  },
}));

export const useProfileStore = () => {
  const accessToken = profileStore((state) => state.accessToken);
  const refreshToken = profileStore((state) => state.refreshToken);
  const setSession = profileStore((state) => state.setSession);

  return { accessToken, refreshToken, setSession };
};
