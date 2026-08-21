import { Injectable } from "@nestjs/common";
import { parseUuid } from "../../utils/uuid";
import { EventRepository } from "../repositories/event.repository";
import { EVENT_STATUS } from "./types/event.types";
import { AuthRequest } from "../auth/types/auth.types";
@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async create(input: {
    actorId: string;
    articleId?: string;
    status: EVENT_STATUS;
    event: string;
    resolvedAt?: string;
  }) {
    const article = await this.eventRepository.create({
      ...input,
      actorId: input.actorId,
      articleId: parseUuid(input.articleId),
      event: input.event,
      resolvedAt: input.resolvedAt,
    });

    return article;
  }

  async getById(id: string) {
    const article = await this.eventRepository.getById(id);

    return article;
  }

  async get(
    req: AuthRequest,
    input: { status?: EVENT_STATUS; actorId?: string },
  ) {
    const event = await this.eventRepository.get(input);
    return event;
  }
}
