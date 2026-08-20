import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { parseUuid } from "../../utils/uuid";
import type { ARTICLE_STATUS } from "../article/types/article.types";

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  //   handling resolution of multiple Event
  // I am putting resolved at in create for ease of use, but I know it will pose a problem when things become concurrent
  async create(input: {
    actorId: string;
    articleId?: string;
    status: EVENT_STATUS;
    event: string;
    resolvedAt?: string;
  }) {
    const event = await this.prisma.entities.events.create({
      ...input,
      status: input.status,
      event: input.event,
      resolvedAt: parseUuid(input.resolvedAt),
      articleId: parseUuid(input.articleId),
      actorId: parseUuid(input.actorId),
    });
    return event;
  }

  // In the case of updating the status of an event the actorId is almost always going to be the same as the resolvedById, and it's probably the only thing we would like to update
  // but now I a thinkign if an event should  even be updated in the first place
  async update(input: {
    status: EVENT_STATUS;
    actorId: string;
    resolvedAt: string;
  }) {
    // const article = await this.prisma.entities.events.create({
    //   ...input,
    // });
  }

  async getByUserId(userId: string) {
    const articles = await this.prisma.entities.articles
      .where({ authorId: parseUuid(userId) })
      .all();

    return articles;
  }

  async delete() {}

  async updateStatus(id: string, status: EVENT_STATUS) {
    const article = await this.prisma.entities.articles
      .where({ id: parseUuid(id) })
      .update({ status: status });

    return article;
  }

  async get(filters: { status?: EVENT_STATUS }) {
    const query = this.filterQueryBuilder(filters);

    return await query.all();
  }

  filterQueryBuilder(filters: { status?: EVENT_STATUS }) {
    let query = this.prisma.entities.articles;

    if (filters.status) {
      query = query.where({ status: filters.status });
    }

    return query;
  }
}
