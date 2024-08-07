import {IUserId, IPassword, INickName, IBudge} from "@shared/interface/userData"

export default interface IUserData extends IUserId, IPassword, INickName, IBudge {}
