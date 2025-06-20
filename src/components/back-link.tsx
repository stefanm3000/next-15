"use client";

import { useRouter } from "next/navigation";

const backArrow = (
  <svg
    className="w-4 h-4 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export const BackLink = () => {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-mono"
      onClick={() => router.back()}
    >
      {backArrow} back
    </button>
  );
};
