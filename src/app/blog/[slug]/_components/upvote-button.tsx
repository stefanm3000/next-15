"use client";

import { ArrowUp } from "lucide-react";
import { upvoteComment } from "../actions";

export function UpvoteButton({
  commentId,
  postId,
  likes,
}: {
  commentId: string;
  postId: string;
  likes: number;
}) {
  return (
    <form action={upvoteComment}>
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        className="flex gap-1 text-sm items-center bg-white/10 rounded-md p-2 hover:bg-white/20 transition-colors cursor-pointer"
      >
        {likes}
        <ArrowUp size={16} />
      </button>
    </form>
  );
}
