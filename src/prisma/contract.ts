import { defineContract } from "@prisma/orm-postgres/contract-builder";

export const contract = defineContract({}, ({ field, model, rel }) => ({
  models: {
    users: model("users", {
      fields: {
        id: field.id.uuidv7String(),
        email: field.text().unique(),
        username: field.text().optional(),
        password: field.text().optional(),
        type: field.text().default("PENDING"),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        posts: rel.hasMany("articles", { by: "authorId" }),
        events: rel.hasMany("events", { by: "actorId" }),
      },
    }),

    articles: model("articles", {
      fields: {
        id: field.id.uuidv7String(),
        title: field.text(),
        content: field.text().optional(),
        authorId: field.uuidString(),
        status: field.text().default("DRAFT"),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        author: rel.belongsTo("users", { from: "authorId", to: "id" }),
        events: rel.hasMany("events", { by: "articleId" }),
      },
    }),

    events: model("events", {
      fields: {
        id: field.id.uuidv7String(),
        actorId: field.uuidString(),
        articleId: field.uuidString().optional(),
        event: field.text(),
        status: field.text().optional().default("PENDING"),
        resolvedById: field.uuidString().optional(),
        resolvedAt: field.uuidString().optional(),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        users: rel.belongsTo("users", { from: "actorId", to: "id" }),
        articles: rel.belongsTo("articles", { from: "articleId", to: "id" }),
      },
    }),
  },
}));
