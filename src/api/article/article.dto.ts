import { IsEnum, IsIn, IsString } from "class-validator";
import {
  ARTICLE_EVENT_LIST,
  ARTICLE_STATUS_LIST,
  type ARTICLE_EVENT,
  type ARTICLE_STATUS,
} from "../../modules/article/types/article.types";

export class ArticleReqFilter {

  @IsIn(ARTICLE_STATUS_LIST)
  status: ARTICLE_STATUS;
}

export class UpdateArticleStatusReqBodyFilter {
  @IsIn(ARTICLE_STATUS_LIST)
  status: ARTICLE_STATUS;

  @IsString()
  article_id: string;

  @IsIn(ARTICLE_EVENT_LIST)
  article_event: ARTICLE_EVENT;
}
