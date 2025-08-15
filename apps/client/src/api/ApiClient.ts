import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";

import type { SessionType } from "@packages/shared";
import { getStorage, postToApp, setStorage } from "@packages/shared";

import { refreshAccessToken } from "./auth/client";

import CustomError from "./CustomError";

const BASE_SERVER_API_URL = (() => {
  if (__LOCAL_DEV__) {
    return "/api-dev";
  }
  if (__LOCAL_PROD__) {
    return "/api-prod";
  }
  if (__DEV__) {
    return "https://dev.ummgoban.com/v1";
  }
  return "https://api.ummgoban.com/v1";
})();

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private _jwt: string | null = null;

  private async expiredSession() {
    setStorage("session", {});
    this._jwt = null;
    const expiredError = new CustomError({
      errorCode: 401,
      errorMessage: "세션이 만료되어 로그아웃되었습니다.",
    });
    throw expiredError;
  }

  private async setAuthorizationHeader(config: InternalAxiosRequestConfig): Promise<void> {
    const session: SessionType | null = await getStorage("session");
    this._jwt = session?.accessToken ?? null;

    if (!this._jwt) {
      return;
    }

    // accessToken이 있으면 Authorization 헤더에 추가
    if (this._jwt) {
      config.headers.Authorization = `Bearer ${this._jwt}`;
    } else {
      config.headers.Authorization = null;
    }
  }

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_SERVER_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (__DEV__) {
          postToApp({
            type: "PLAIN",
            payload: {
              message: JSON.stringify({ baseURL: config.baseURL, url: config.params }),
            },
          });
        }
        if (config.url?.includes("/auth/refresh")) {
          // Skip authorization header for refresh token request
          return config;
        }

        await this.setAuthorizationHeader(config);
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (__DEV__) {
          postToApp({
            type: "PLAIN",
            payload: {
              message: JSON.stringify({ status: response.status, data: response.data }),
            },
          });
        }
        if (response.data?.token) {
          this._jwt = response.data.token; // Update token
          console.debug("Token updated:", this._jwt);
        }

        return response;
      },
      async (error) => {
        const errorCode = error.response?.data?.errorCode;

        const session: SessionType | null = await getStorage("session");

        console.debug(`[${errorCode}] ${error.response?.data?.errorMessage}`);

        if (errorCode === 401 && session?.refreshToken) {
          try {
            const newSession = await refreshAccessToken(session.refreshToken);
            if (newSession) {
              setStorage("session", newSession);
              this._jwt = newSession.accessToken;
            } else {
              await this.expiredSession();
            }
          } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
            await this.expiredSession();
          }
        }
        if (errorCode === 400) {
          // 400 에러에 대한 추가 처리 필요 시 여기에 작성
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  get = async <T>(url: string, config?: AxiosRequestConfig<unknown> | undefined): Promise<T | null> => {
    try {
      console.debug("GET", url, JSON.stringify(config, null, 2));
      const res: AxiosResponse = await this.axiosInstance.get(url, config);
      console.debug("GET", url, JSON.stringify(res.data, null, 2));

      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("GET", url, JSON.stringify(error.response.data, null, 2));
          throw new CustomError(error.response.data);
        }
      }

      console.error("unknown error", JSON.stringify(error, null, 2));

      return null;
    }
  };

  post = async <T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig<D> | undefined): Promise<T | null> => {
    try {
      console.debug("POST", url, JSON.stringify(body, null, 2), JSON.stringify(config, null, 2));
      const res: AxiosResponse<T, D> = await this.axiosInstance.post(url, body, config);

      console.debug("POST", url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("POST", url, JSON.stringify(error.response.data, null, 2));
          throw new CustomError(error.response.data);
        }
      }

      console.error("unknown error", JSON.stringify(error, null, 2));

      return null;
    }
  };

  patch = async <T, D = unknown>(url: string, body: D, config?: AxiosRequestConfig<D> | undefined): Promise<T | null> => {
    try {
      console.debug("PATCH", url, JSON.stringify(body, null, 2), JSON.stringify(config, null, 2));
      const res: AxiosResponse<T, D> = await this.axiosInstance.patch(url, body, config);

      console.debug("PATCH", url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("PATCH", url, JSON.stringify(error.response.data, null, 2));
          throw new CustomError(error.response.data);
        }
      }

      console.error("unknown error", JSON.stringify(error, null, 2));

      return null;
    }
  };

  put = async <T, D = unknown>(url: string, body: D, config?: AxiosRequestConfig<D> | undefined): Promise<T | null> => {
    try {
      console.debug("PUT", url, JSON.stringify(body, null, 2), JSON.stringify(config, null, 2));
      const res: AxiosResponse<T, D> = await this.axiosInstance.put(url, body, config);

      console.debug("PUT", url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("PUT", url, JSON.stringify(error.response.data, null, 2));
          throw new CustomError(error.response.data);
        }
      }

      console.error("unknown error", JSON.stringify(error, null, 2));

      return null;
    }
  };

  del = async <T, D = unknown>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<T | null> => {
    try {
      const res: AxiosResponse<T, D> = await this.axiosInstance.delete(url, config);

      console.debug("DELETE", url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("DELETE", url, JSON.stringify(error.response.data, null, 2));
          throw new CustomError(error.response.data);
        }
      }

      console.error("unknown error", JSON.stringify(error, null, 2));

      return null;
    }
  };
}

const apiClient = ApiClient.getInstance();

export default apiClient;
