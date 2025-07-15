import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  comments: defineTable({ text: v.string() }),
  messages: defineTable({
    user: v.string(),
    userId: v.string(),
    body: v.string(),
  }),
  posts: defineTable({
    postId: v.string(),
    dynamicValue: v.number(),
  }),
  blogComments: defineTable({
    postId: v.string(),
    text: v.string(),
    likes: v.number(),
  }),
});
