import { IsIn, IsString, IsEmail } from "class-validator";
import { EVENT_STATUS_LIST } from "../../../modules/event/types/event.types";

export class LoginReqBodyDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignupReqBodyDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}
