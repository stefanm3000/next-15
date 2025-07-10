"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  useEffect,
  useState,
  unstable_ViewTransition as ViewTransition,
} from "react";
import { Message } from "./message";

export function Messages() {
  const messages = useQuery(api.chat.getMessages);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("chatUserId");
    if (storedUserId !== currentUserId) {
      setCurrentUserId(storedUserId || "");
    }

    if (messages) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, currentUserId]);

  return (
    <ViewTransition>
      <div className="flex flex-col gap-4 p-2 h-full overflow-y-auto w-full md:max-w-[800px] mx-auto whitespace-pre-wrap no-scrollbar">
        {messages?.map((msg) => {
          const isOwnMessage = msg.userId === currentUserId;

          return (
            <Message key={msg._id} msg={msg} isOwnMessage={isOwnMessage} />
          );
        })}
      </div>
    </ViewTransition>
  );
}
