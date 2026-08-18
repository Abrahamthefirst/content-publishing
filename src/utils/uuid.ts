import { type Char } from "@prisma/orm-postgres/target/codec-types";

export function parseUuid(value: string): Char<36> {
  return value as unknown as Char<36>;
}