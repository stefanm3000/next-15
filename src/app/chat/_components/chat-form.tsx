"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRef } from "react";

export default function ChatForm() {
  const sendMsg = useMutation(api.chat.sendMessage);
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (!formData.get("user") || !formData.get("body")) {
      ref.current?.focus();
      return;
    }

    await sendMsg({
      user: formData.get("user") as string,
      body: formData.get("body") as string,
    });

    ref.current?.focus();
    ref.current!.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border border-white/20 rounded-md p-2 mt-auto w-full md:max-w-[500px] mx-auto bg-neutral-900/50 backdrop-blur-sm sticky bottom-4"
    >
      <input
        type="text"
        name="user"
        className="border rounded-md p-2"
        placeholder="username"
      />
      <input
        type="text"
        name="body"
        className="border rounded-md p-2"
        placeholder="message"
        ref={ref}
      />
      <button type="submit" className="border rounded-md p-2">
        send
      </button>
    </form>
  );
}
