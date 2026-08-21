import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../repositories/article.repository";
import type { ARTICLE_EVENT, ARTICLE_STATUS } from "./types/article.types";
import { PermissionService } from "../permission/permission.service";
import { NotFoundException } from "@nestjs/common";
import type { AuthJWT } from "../auth/types/jwt.types";
@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private permissions: PermissionService,
  ) {}

  async create(
    userId: string,
    input: {
      title: string;
      authorId: string;
      content: string;
      status: string;
    },
  ) {
    const article = await this.articleRepository.create(input);

    return article;
  }

  async getById(id: string) {
    const article = await this.articleRepository.getById(id);

    return article;
  }

  async getArticles(filters: { status: ARTICLE_STATUS }) {
    const articles = await this.articleRepository.get(filters);

    return articles;
  }

  async getArticlesByUserId(userId: string) {
    const articles = await this.articleRepository.getByUserId(userId);
  }

  async delete() {}

  async updateStatus(
    user: AuthJWT,
    input: { status: string; articleId: string; event: ARTICLE_EVENT },
  ) {
    const article = await this.articleRepository.getById(input.articleId);
    if (!article) {
      throw new NotFoundException("Article not found");
    }

    const nextStatus = this.permissions.assertArticleTransition(
      user.account_type,
      input.event,
      article.status,
    );

    return this.articleRepository.updateStatus(input.articleId, nextStatus);
  }
}
