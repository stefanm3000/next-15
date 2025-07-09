import { Suspense, use } from "react";

interface Comment {
  _id: string;
  text: string;
  _creationTime: number;
}

export function CommentsGrid({
  commentsPromise,
}: {
  commentsPromise: Promise<Comment[]>;
}) {
  const comments = use(commentsPromise);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border border-neutral-500 text-white p-4 rounded-lg mb-4 flex flex-col"
          >
            <div className="text-sm leading-relaxed mb-2 line-clamp-3">
              {comment.text}
            </div>
            <div className="text-xs text-gray-500 mt-auto">
              {new Date(comment._creationTime).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
