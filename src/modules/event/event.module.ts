import { Module } from "@nestjs/common";
import { EventController } from "../../api/event/event.controller";
import { EventService } from "./event.service";
import { RepositoryModule } from "../repositories/repository.module";
@Module({
  imports: [RepositoryModule],
  providers: [EventService],
  controllers: [EventController],
})
export class AppModule {}
