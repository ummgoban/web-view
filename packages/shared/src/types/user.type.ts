import {SessionType} from './session.type';

export type UserType = {
  id: number | string;
  name: string;
  nickname: string;
  image?: string;
  provider: SessionType['OAuthProvider'];
  phoneNumber?: string;
  email?: string;
};
