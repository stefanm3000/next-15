"use client";

import { Routes } from "@/src/utils/routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { PaginationResult } from "convex/server";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowRight, ListStartIcon } from "lucide-react";

interface CursorPaginationProps {
  commentsPromise: Promise<
    PaginationResult<{
      _id: Id<"comments">;
      _creationTime: number;
      text: string;
    }>
  >;
  baseUrl?: Routes;
}

export function CursorPagination({
  commentsPromise,
  baseUrl = Routes.COMMENTS,
}: CursorPaginationProps) {
  const searchParams = useSearchParams();
  const currentCursor = searchParams.get("cursor");
  const commentsResult = use(commentsPromise);

  const createCursorUrl = (cursor: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (cursor) {
      params.set("cursor", cursor);
    } else {
      params.delete("cursor");
    }
    return `${baseUrl}?${params.toString()}`;
  };

  const showPrev = !!currentCursor;
  const showNext = !commentsResult.isDone && commentsResult.continueCursor;

  if (!showPrev && !showNext) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      {showPrev && (
        <Link
          href={createCursorUrl(null)}
          className="px-3 flex items-center gap-2 py-2 bg-black-50/50 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
          prefetch
        >
          first <ListStartIcon className="text-gray-400" />
        </Link>
      )}

      {showNext && (
        <Link
          href={createCursorUrl(commentsResult.continueCursor)}
          className="px-3 py-2 flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
          prefetch
        >
          next <ArrowRight className="text-gray-400" />
        </Link>
      )}
    </div>
  );
}
