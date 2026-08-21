import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Req,
  Body,
  UseGuards,
} from "@nestjs/common";
import { EventService } from "../../modules/event/event.service";
import { GetEventReqQuery } from "./dto/event.dto";
import type { AuthRequest } from "../../modules/auth/types/auth.types";
import { EVENT_STATUS } from "../../modules/event/types/event.types";
import { CreateEventReqDTO } from "./dto/event.dto";
import { RolesGuard } from "../../modules/permission/guards/roles.guard";
@Controller("events")
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async createArticleEvent(@Body() body: CreateEventReqDTO) {
    const { status, ...dto } = body;
    const eventStatus = status as EVENT_STATUS;
    const event = await this.eventService.create({
      ...dto,
      status: eventStatus,
    });

    return event;
  }

  @Get("")
  @UseGuards(RolesGuard)
  async getEvent(@Req() req: AuthRequest, @Query() query: GetEventReqQuery) {
    let { status, actorId } = query;
    const eventStatus = status as EVENT_STATUS;
    const event = await this.eventService.get(req, {
      status: eventStatus,
      actorId,
    });

    return event;
  }

  @Get("/:id")
  async getEventById(@Param("id") id: string) {
    const event = await this.eventService.getById(id);

    return event;
  }
}
