import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export enum SortBy {
  Newest = "newest",
  Oldest = "oldest",
  MostLiked = "mostLiked",
  LeastLiked = "leastLiked",
}

export const get = query({
  args: { postId: v.string(), sortBy: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("blogComments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .collect();

    return comments.sort((a, b) => b.likes - a.likes);
  },
});

export const addComment = mutation({
  args: { postId: v.string(), text: v.string() },
  handler: async (ctx, args) => {
    const comment = await ctx.db.insert("blogComments", {
      postId: args.postId,
      text: args.text,
      likes: 0,
    });
    return comment;
  },
});

export const upvote = mutation({
  args: { postId: v.string(), commentId: v.id("blogComments") },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    await ctx.db.patch(args.commentId, { likes: comment.likes + 1 });
    return comment;
  },
});
