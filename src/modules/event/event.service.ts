import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../repositories/article.repository";
@Injectable()
export class EventService {
  constructor(private articleRepository: ArticleRepository) {}

  async create(input: {
    title: string;
    authorId: string;
    content: string;
    status: string;
  }) {
    const article = await this.articleRepository.create(input);

    return article;
  }

  async getById(id: string) {
    const article = await this.articleRepository.getById(id);

    return article;
  }
}
