import {SessionType} from './session.type';

export type StorageType = {
  session: SessionType;
};

export type StorageKeyType = keyof StorageType;
