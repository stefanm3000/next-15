import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: {
    paginationOptions: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("comments")
      .order("desc")
      .paginate(args.paginationOptions);
    return result;
  },
});

export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const commentId = await ctx.db.insert("comments", { text: args.text });
    return commentId;
  },
});
