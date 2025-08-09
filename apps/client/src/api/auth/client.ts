import type { SessionType } from "@packages/shared";
import { setStorage } from "@packages/shared";

import apiClient from "../ApiClient";
import CustomError from "../CustomError";

export const throwRefreshError = async () => {
  try {
    const res = await apiClient.get("/common/auth/refresh-test");
    return res;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<SessionType | null> => {
  try {
    const res = await apiClient.post<{
      code: number;
      data: SessionType;
    }>("/common/auth/refresh", {
      refreshToken,
    });

    if (res && res.code === 200) {
      setStorage("session", res.data);
      return res.data;
    }

    return null;
  } catch (error) {
    throw new CustomError(error);
  }
};
