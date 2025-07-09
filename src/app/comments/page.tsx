import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { CommentInput } from "./_components/comment-input";
import { ConvexClientProvider } from "./_components/convex-client-provider";
import { CommentsGrid } from "./_components/comments-grid";

const getComments = async () => await fetchQuery(api.comments.get);

export default async function Comments() {
  const commentsPromise = getComments();

  return (
    <ConvexClientProvider>
      <div className="min-h-[calc(100vh-140px)] flex flex-col gap-2 relative">
        <p className="text-gray-400 text-sm mb-6">
          built with{" "}
          <a
            href="https://www.convex.dev/"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            convex
          </a>
          . leave me a comment, but don&apos;t be mean
        </p>
        <CommentsGrid commentsPromise={commentsPromise} />
        <CommentInput />
      </div>
    </ConvexClientProvider>
  );
}
