import { Injectable } from "@nestjs/common";
import { USER_ROLE } from "../user/types/user.types";
import type {
  ARTICLE_EVENT,
  ARTICLE_STATUS,
} from "../article/types/article.types";
import  { ArticlePolicy } from "./policies/article.policy";

@Injectable()
export class PermissionService {
  constructor(private articlePolicy: ArticlePolicy) {}
  assertArticleTransition(
    role: USER_ROLE,
    event: ARTICLE_EVENT,
    currentStatus: ARTICLE_STATUS,
  ): ARTICLE_STATUS {
    return this.articlePolicy.assertTransition(role, event, currentStatus);
  }

  assertRoleEvent(role: USER_ROLE, event: ARTICLE_EVENT) {
    this.articlePolicy.availableRoleEvent(role, event);
  }
}
