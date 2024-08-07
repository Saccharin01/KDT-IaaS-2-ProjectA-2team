import {IUserId, IPassword, INickName, IBudget} from "@shared/interface/userData"

export default interface IUserData extends IUserId, IPassword, INickName, IBudget {}
