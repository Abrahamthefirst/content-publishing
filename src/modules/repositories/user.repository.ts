import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import type { USER_ROLE } from "../user/types/user.types";
import { parseUuid } from "../../utils/uuid";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(input: {
    email: string;
    username: string;
    password: string;
    type?: USER_ROLE;
  }) {
    const user = await this.prisma.entities.users.create({
      ...input,
      type: input.type ?? "USER",
    });

    return user;
  }

  async getById(id: string) {
    const user = await this.prisma.entities.users.first({ id: parseUuid(id) });

    return user;
  }

  async getByEmail(email: string) {
    try {
      const user = await this.prisma.entities.users.first({
        email,
      });

      return user;
    } catch (error) {}
  }
  async delete() {}

  async updateRole() {}
}
