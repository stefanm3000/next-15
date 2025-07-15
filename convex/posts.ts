import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: { postId: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .first();

    return result?.dynamicValue || 0;
  },
});

export const increment = mutation({
  args: { postId: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .first();

    if (!post) {
      await ctx.db.insert("posts", {
        postId: args.postId,
        dynamicValue: 1,
      });
      return 1;
    }

    await ctx.db.patch(post._id, {
      dynamicValue: post.dynamicValue + 1,
    });

    return post.dynamicValue + 1;
  },
});
