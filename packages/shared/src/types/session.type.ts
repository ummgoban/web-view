import {OAuthProviderType} from './ouath-provider.type';

export type SessionType = {
  accessToken: string;
  refreshToken?: string;
  /**
   * @description accessToken 만료 시간 (Oauth 로그인 시)
   */
  accessTokenExpiresAt?: number;
  /**
   * @description refreshToken 만료 시간 (Oauth 로그인 시)
   */
  refreshTokenExpiresAt?: number;
  OAuthProvider: OAuthProviderType;
};
