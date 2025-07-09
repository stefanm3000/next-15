"use client";

import { useRef, useTransition } from "react";
import { addComment } from "../actions";

export function CommentInput() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text") as string;

    if (!text) return;
    startTransition(async () => {
      await addComment(text);
      formRef.current?.reset();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formData = new FormData(formRef.current!);
      const text = formData.get("text") as string;

      if (!text) return;
      startTransition(async () => {
        await addComment(text);
        formRef.current?.reset();
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="border border-neutral-500/50 flex gap-2 mt-auto mx-auto p-2 md:max-w-[500px] fixed bottom-4 rounded-lg left-2 right-2 bg-gray-900/50 backdrop-blur-sm text-sm"
    >
      <textarea
        name="text"
        placeholder="Add an anonymous comment"
        onKeyDown={handleKeyDown}
        className="border border-neutral-500/20 rounded-md p-2 w-full outline-none resize-none"
      />
      <button
        disabled={isPending}
        type="submit"
        className="cursor-pointer border border-neutral-500/20 rounded-md p-2 self-stretch flex items-center justify-center w-[100px]"
      >
        {isPending ? "Sending" : "Send"}
      </button>
    </form>
  );
}
