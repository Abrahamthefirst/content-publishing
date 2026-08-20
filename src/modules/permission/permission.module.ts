import { Module } from "@nestjs/common";
import { Global } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { ArticlePolicy } from "./policies/article.policy";

@Global()
@Module({
  providers: [ArticlePolicy, PermissionService],
  exports: [ PermissionService],
})
export class PermissionModule {}
