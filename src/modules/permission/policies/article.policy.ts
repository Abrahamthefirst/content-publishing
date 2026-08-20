import { Injectable } from "@nestjs/common";
import type {
  ARTICLE_EVENT,
  ARTICLE_STATUS,
} from "../../article/types/article.types";
import { USER_ROLE } from "../../user/types/user.types";
import { TRANSITIONS, type Transition } from "../../article/state-machine";
import { ForbiddenException } from "@nestjs/common";

@Injectable()
export class ArticlePolicy {
  private findTransition(
    event: ARTICLE_EVENT,
    from: ARTICLE_STATUS,
    role: USER_ROLE,
  ): Transition | undefined {
    return TRANSITIONS.find(
      (t) =>
        t.event === event && t.from.includes(from) && t.roles.includes(role),
    );
  }

  assertTransition(
    role: USER_ROLE,
    event: ARTICLE_EVENT,
    currentStatus: ARTICLE_STATUS,
  ): ARTICLE_STATUS {
    const transition = this.findTransition(event, currentStatus, role);

    if (!transition) {
      throw new ForbiddenException(
        `Role ${role} cannot fire ${event} from status ${currentStatus}`,
      );
    }

    return transition.to;
  }

  availableEvents(
    role: USER_ROLE,
    currentStatus: ARTICLE_STATUS,
  ): ARTICLE_EVENT[] {
    return TRANSITIONS.filter(
      (t) => t.from.includes(currentStatus) && t.roles.includes(role),
    ).map((t) => t.event);
  }

  availableRoleEvent(role: USER_ROLE, event: ARTICLE_EVENT): boolean {
    return TRANSITIONS.some((t) => t.roles.includes(role) && t.event === event);
  }
}
