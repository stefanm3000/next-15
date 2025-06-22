"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackLink = () => {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-mono"
      onClick={() => router.back()}
    >
      <ArrowLeft size={16} /> back
    </button>
  );
};
