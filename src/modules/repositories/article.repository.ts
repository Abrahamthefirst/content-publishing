import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import type { USER_ROLE } from "../user/types/user.types";
import { parseUuid } from "../../utils/uuid";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(input: {
    title: string;
    authorId: string;
    content: string;
    status: string;
  }) {
    const article = await this.prisma.entities.articles.create({
      ...input,
      authorId: parseUuid(input.authorId),
    });

    return article;
  }

  async getById(id: string) {
    const article = await this.prisma.entities.articles.first({
      id: parseUuid(id),
    });

    return article;
  }

  async delete() {}

  async updateRole() {}
}
