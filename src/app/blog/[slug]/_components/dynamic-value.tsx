"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowBigUp, Loader } from "lucide-react";

export function DynamicValue({ postId }: { postId: string }) {
  const value = useQuery(api.posts.get, { postId });
  const increment = useMutation(api.posts.increment);

  const loading = value === undefined;

  const handleClick = () => {
    if (loading) return;
    increment({ postId });
  };

  return (
    <button
      className="group flex mx-auto items-center gap-2 text-white hover:text-gray-300 transition-colors cursor-pointer border border-white/10 rounded-md p-2 hover:bg-white/5 hover:border-white/20"
      onClick={handleClick}
    >
      <span className="max-w-[200px] lg:max-w-[500px] text-center text-xs text-gray-400 group-hover:text-white transition-colors">
        this part of the page is dynamic, while the rest of the page is
        statically prerendered. click me to increment the value.
      </span>
      <span className="text-lg font-bold w-[20px]">
        {loading ? (
          <Loader size={22} className="animate-spin opacity-50" />
        ) : (
          value
        )}
      </span>
      <ArrowBigUp
        size={22}
        className="text-green-300 group-hover:fill-green-500"
      />
    </button>
  );
}
