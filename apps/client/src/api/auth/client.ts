import type { SessionType, UserType } from "@packages/shared";
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

export const getProfile = async (): Promise<UserType | null> => {
  try {
    const res = await apiClient.get<UserType | null>("/common/members/profiles");

    if (res) {
      return {
        id: res.id,
        name: res.name || "고객",
        provider: res.provider,
        nickname: res.nickname,
        email: res.email,
        phoneNumber: res.phoneNumber,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new CustomError(error);
  }
};
