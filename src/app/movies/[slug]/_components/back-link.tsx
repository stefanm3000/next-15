"use client";

import { Routes } from "@/utils/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const BackLink = () => {
  const searchParams = useSearchParams();
  const backHref = searchParams.get("back") || Routes.MOVIES;

  return (
    <Link
      href={backHref}
      className="w-full md:w-fit border border-white/10 cursor-pointer inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8  sticky md:static top-4 lg:top-14 z-10 bg-black/50 backdrop-blur-md rounded-lg p-2 px-4"
    >
      <ArrowLeft size={16} className="mr-2" /> back to search
    </Link>
  );
};
