import { Controller, Get, Patch, Query, Req } from "@nestjs/common";

import type { ArticleService } from "../../modules/article/article.service";
@Controller()
export class AdminController {
  constructor(private articleService: ArticleService) {}

}
