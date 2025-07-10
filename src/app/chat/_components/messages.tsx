"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  useEffect,
  useState,
  unstable_ViewTransition as ViewTransition,
} from "react";

export function Messages() {
  const messages = useQuery(api.chat.getMessages);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("chatUserId");
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (messages) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <ViewTransition>
      <div className="flex flex-col gap-4 p-2 h-full overflow-y-auto w-full md:max-w-[800px] mx-auto whitespace-pre-wrap no-scrollbar">
        {messages?.map((msg) => {
          const isOwnMessage = msg.userId === currentUserId;

          return (
            <ViewTransition key={msg._id} name={`message-${msg._id}`}>
              <div
                className={`flex flex-col gap-2 ${isOwnMessage ? "items-end" : "items-start"}`}
              >
                <div
                  className={`text-sm text-neutral-500 flex items-center gap-2 ${isOwnMessage ? "ml-auto" : ""}`}
                >
                  {msg.user} @
                  <div>{new Date(msg._creationTime).toLocaleString()}</div>
                </div>
                <div
                  key={msg._id}
                  className={`p-2 rounded-md text-white flex w-fit text-sm max-w-[70%] ${
                    isOwnMessage ? "bg-blue-600 ml-auto" : "bg-neutral-900"
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            </ViewTransition>
          );
        })}
      </div>
    </ViewTransition>
  );
}
