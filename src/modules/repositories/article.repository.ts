import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { parseUuid } from "../../utils/uuid";
import type { ARTICLE_STATUS } from "../article/types/article.types";

@Injectable()
export class ArticleRepository {
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

    if (article) {
      const status = article?.status as ARTICLE_STATUS;

      return { ...article, status, id };
    } else return null;
  }

  async getByUserId(userId: string) {
    const articles = await this.prisma.entities.articles
      .where({ authorId: parseUuid(userId) })
      .all();

    return articles;
  }

  async delete(id: string){
    const article = await this.prisma.entities.articles.where({id: parseUuid(id)}).delete()

    return article ? article?.id : ""
  }

  async updateStatus(id: string, status: ARTICLE_STATUS) {
    const article = await this.prisma.entities.articles
      .where({ id: parseUuid(id) })
      .update({ status: status });

    return article;
  }

  async get(filters: { status?: ARTICLE_STATUS }) {
    const query = this.filterQueryBuilder(filters);

    return await query.all();
  }

  filterQueryBuilder(filters: { status?: ARTICLE_STATUS }) {
    let query = this.prisma.entities.articles;

    if (filters.status) {
      query = query.where({ status: filters.status });
    }

    return query;
  }
}
