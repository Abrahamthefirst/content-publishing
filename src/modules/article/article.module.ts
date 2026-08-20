import { Module } from "@nestjs/common";

import { ArticleService } from "./article.service";
import { ArticleController } from "../../api/article/article.controller";
import { RepositoryModule } from "../repositories/repository.module";
import { PermissionModule } from "../permission/permission.module";

@Module({
  imports: [PermissionModule, RepositoryModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
