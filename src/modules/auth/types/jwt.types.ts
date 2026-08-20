import { USER_ROLE } from "../../user/types/user.types";

export type AuthJWT = {
  id: string;
  email: string;
  account_type: USER_ROLE
};
