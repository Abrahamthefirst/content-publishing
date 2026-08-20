import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ArticleRepository } from "./article.repository";
import { PrismaService } from "../../prisma.service";
import { EventRepository } from "./event.repository";

@Module({
  providers: [
    PrismaService,
    ArticleRepository,
    UserRepository,
    EventRepository,
  ],
  exports: [PrismaService, ArticleRepository, UserRepository, EventRepository],
})
export class RepositoryModule {}
