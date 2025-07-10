"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { unstable_ViewTransition as ViewTransition } from "react";

export function Messages() {
  const messages = useQuery(api.chat.getMessages);

  return (
    <div className="flex flex-col gap-4 p-2 h-full overflow-y-auto w-full md:max-w-[800px] mx-auto whitespace-pre-wrap no-scrollbar">
      {messages?.map((msg) => (
        <ViewTransition key={msg._id} name={`message-${msg._id}`}>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-neutral-500 flex items-center gap-2">
              {msg.user} @
              <div>{new Date(msg._creationTime).toLocaleString()}</div>
            </div>
            <div
              key={msg._id}
              className="p-2 bg-neutral-900 rounded-md text-white flex w-fit text-sm"
            >
              {msg.body}
            </div>
          </div>
        </ViewTransition>
      ))}
    </div>
  );
}
