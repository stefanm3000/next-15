"use client";

import { ArrowUp, Loader } from "lucide-react";
import { upvoteComment } from "../actions";
import { useTransition } from "react";

export function UpvoteButton({
  commentId,
  postId,
  likes,
}: {
  commentId: string;
  postId: string;
  likes: number;
}) {
  const [isPending, startTransition] = useTransition();
  const formAction = async (formData: FormData) => {
    startTransition(async () => {
      await upvoteComment(formData);
    });
  };
  return (
    <form action={formAction}>
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="postId" value={postId} />

      <button
        type="submit"
        disabled={isPending}
        className="flex gap-1 text-sm items-center bg-white/10 rounded-md p-2 hover:bg-white/20 transition-colors cursor-pointer"
      >
        {isPending ? (
          <Loader size={16} className="animate-spin opacity-50" />
        ) : (
          <div className="flex gap-1 items-center">
            <span className="text-sm leading-4">{likes}</span>
            <ArrowUp size={16} />
          </div>
        )}
      </button>
    </form>
  );
}
