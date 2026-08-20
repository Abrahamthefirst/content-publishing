import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./modules/permission/guards/auth.guard";
import { ArticleModule } from "./modules/article/article.module";


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ArticleModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AppController],
})
export class AppModule {}
