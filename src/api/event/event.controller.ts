import { Controller, Post } from "@nestjs/common";
import { EventService } from "../../modules/event/event.service";

@Controller("events")
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  createArticleEvent() {}
}
