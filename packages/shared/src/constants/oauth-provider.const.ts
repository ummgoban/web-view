import {SessionType} from '../types';

export const OAUTH_PROVIDER: Record<SessionType['OAuthProvider'], string> = {
  KAKAO: '카카오',
  NAVER: '네이버',
  APPLE: '애플',
  BASIC: '일반회원',
};
