import ChatForm from "./_components/chat-form";
import { Messages } from "./_components/messages";

export const metadata = {
  title: "next 15 | chat",
  description: "realtime chat w convex",
};

export default function ChatPage() {
  return (
    <main className="flex flex-col flex-grow flex-1 self-stretch min-h-[calc(100dvh-140px)] relative">
      <Messages />
      <ChatForm />
    </main>
  );
}
