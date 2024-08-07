import {
  IBudge,
  INickName,
  IPassword,
  IUserId,
} from '@shared/interface/userData';

export default interface UserDataInterface
  extends IBudge,
    INickName,
    IPassword,
    IUserId {}
