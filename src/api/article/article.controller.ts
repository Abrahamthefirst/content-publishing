import { Controller, Get, Post, Req, Query, Patch, Body } from "@nestjs/common";
import { ArticleReqFilter } from "./article.dto";
import type { AuthRequest } from "../../modules/auth/types/auth.types";
import { ArticleService } from "../../modules/article/article.service";
import { CreateArticleBodyReqDto } from "./article.dto";

@Controller("articles")
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getArticles(
    @Req() req: AuthRequest,

    @Query() query: ArticleReqFilter,
  ) {
    const articles = this.articleService.getArticles(query);
    return { articles };
  }

  @Get()
  async createArticle(
    @Req() req: AuthRequest,
    @Body() body: CreateArticleBodyReqDto,
  ) {
    const articles = this.articleService.create(req.user.id, body);
    return { articles };
  }

  @Patch()
  async updateArticleStatus(@Req() req: AuthRequest) {}
}
