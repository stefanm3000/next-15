"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Dot } from "lucide-react";
import { useRef } from "react";
import { useChatUser } from "../_hooks/use-chat-user";

export default function ChatForm() {
  const sendMsg = useMutation(api.chat.sendMessage);
  const ref = useRef<HTMLInputElement>(null);
  const { userId, username, updateUsername } = useChatUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userValue = username || (formData.get("user") as string);
    const bodyValue = formData.get("body") as string;

    if (!userValue || !bodyValue) {
      ref.current?.focus();
      return;
    }

    if (!username || username !== userValue) {
      updateUsername(userValue);
    }

    await sendMsg({
      user: userValue,
      userId: userId,
      body: bodyValue,
    });

    ref.current?.focus();
    ref.current!.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group flex gap-2 border border-white/20 rounded-md p-2 mt-auto w-full md:max-w-[500px] mx-auto bg-neutral-900/50 backdrop-blur-sm sticky bottom-4"
    >
      <div className="flex flex-col gap-2 w-full">
        {username ? (
          <div className="text-sm text-neutral-500 flex items-center">
            <Dot className="text-green-500 animate-pulse" /> connected as{" "}
            {username}
          </div>
        ) : (
          <input
            type="text"
            name="user"
            className="border border-white/20 rounded-md p-2"
            placeholder="username"
          />
        )}
        <div className="flex gap-2">
          <input
            type="text"
            name="body"
            className="border text-sm border-white/20 rounded-md p-2 focus:outline-0 w-full focus:border-white/50 transition-colors"
            placeholder="message..."
            ref={ref}
          />
          <button
            type="submit"
            className="border border-white/50 rounded-md p-2 cursor-pointer ml-auto"
          >
            send
          </button>
        </div>
      </div>
    </form>
  );
}
