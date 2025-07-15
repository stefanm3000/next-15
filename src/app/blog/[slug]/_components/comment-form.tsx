"use client";

import { useRef } from "react";
import { addComment } from "../actions";

export function CommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    await addComment(formData);
    formRef.current?.reset();
  };

  return (
    <form action={formAction} className="flex gap-2" ref={formRef}>
      <input type="hidden" name="postId" value={postId} />
      <input
        type="text"
        name="text"
        placeholder="Add a comment"
        className="bg-transparent border border-white/10 rounded-md p-2 text-sm w-full"
      />
      <button type="submit" className="bg-white/10 rounded-md p-2 text-sm">
        Submit
      </button>
    </form>
  );
}
