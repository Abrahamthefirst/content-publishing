import { USER_ROLE } from "../user/types/user.types";
import type { ARTICLE_EVENT, ARTICLE_STATUS } from "./types/article.types";

export type Transition = {
  event: ARTICLE_EVENT;
  from: ARTICLE_STATUS[];
  to: ARTICLE_STATUS;
  roles: USER_ROLE[];
};

// Why can't resubmitted not just be in publish and reject from

export const TRANSITIONS: Transition[] = [
  {
    event: "DRAFT_ARTICLE",
    from: ["REJECTED"],
    to: "DRAFTED",
    roles: [USER_ROLE.AUTHOR],
  },
  {
    event: "SUBMIT_ARTICLE",
    from: ["DRAFTED", "RESUBMITTED"],
    to: "PENDING_REVIEW",
    roles: [USER_ROLE.AUTHOR],
  },
  {
    event: "PUBLISH_ARTICLE",
    from: ["PENDING_REVIEW"],
    to: "PUBLISHED",
    roles: [USER_ROLE.ADMIN],
  },
  {
    event: "REJECT_ARTICLE",
    from: ["PENDING_REVIEW"],
    to: "REJECTED",
    roles: [USER_ROLE.ADMIN],
  },
  {
    event: "RESUBMIT_ARTICLE",
    from: ["REJECTED"],
    to: "RESUBMITTED",
    roles: [USER_ROLE.AUTHOR],
  },
  {
    event: "ARCHIVE_ARTICLE",
    from: ["PUBLISHED"],
    to: "ARCHIVED",
    roles: [USER_ROLE.AUTHOR, USER_ROLE.ADMIN],
  },
];
