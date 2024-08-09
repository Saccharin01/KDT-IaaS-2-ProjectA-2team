import { LoginDto } from "./login.dto";

export interface AccountDto extends LoginDto {
  phone : string
}