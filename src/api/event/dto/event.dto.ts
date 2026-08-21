import { IsIn, IsString, IsOptional } from "class-validator";
import { EVENT_STATUS_LIST } from "../../../modules/event/types/event.types";
import { ARTICLE_EVENT_LIST } from "../../../modules/article/types/article.types";

export class GetEventReqQuery {
  @IsString()
  actorId: string;

  @IsIn(EVENT_STATUS_LIST)
  status: string;
}

export class CreateEventReqDTO {
  @IsString()
  actorId: string;

  @IsString()
  @IsOptional()
  articleId?: string;

  @IsIn(EVENT_STATUS_LIST)
  status: string;

  @IsIn(ARTICLE_EVENT_LIST)
  event: string;

  @IsString()
  resolvedAt?: string;
}
