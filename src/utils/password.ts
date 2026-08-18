import * as bcrpyt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrpyt.hash(password, 10);
};
export const comparePassword = async (
  password: string,
  hashedPassword: string | null,
): Promise<boolean> => {
  if (hashedPassword == null) {
    return false;
  } else {
    return await bcrpyt.compare(password, hashedPassword);
  }
};
