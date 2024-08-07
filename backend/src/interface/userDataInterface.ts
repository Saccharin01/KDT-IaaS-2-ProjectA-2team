import {
  IBudget,
  INickName,
  IPassword,
  IUserId,
} from '@shared/interface/userData';

export default interface UserDataInterface
  extends IBudget,
    INickName,
    IPassword,
    IUserId {}
