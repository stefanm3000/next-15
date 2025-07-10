"use client";

import { Routes } from "@/src/utils/routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  baseUrl?: Routes;
}

export function Pagination({
  totalPages,
  baseUrl = Routes.MOVIES,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const visiblePages = getVisiblePages({ currentPage, totalPages });

  if (totalPages <= 1) return null;

  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center space-x-2">
      {showPrev && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-2 bg-black-50/50 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors "
          prefetch
        >
          prev
        </Link>
      )}

      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500 ">...</span>
          ) : (
            <Link
              href={createPageUrl(page as number)}
              className={`px-3 py-2 rounded-lg transition-colors  ${
                currentPage === page
                  ? "bg-white text-black font-semibold"
                  : "bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10"
              }`}
              prefetch
            >
              {page}
            </Link>
          )}
        </div>
      ))}

      {showNext && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors "
          prefetch
        >
          next
        </Link>
      )}
    </div>
  );
}

const getVisiblePages = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push("...", totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
};
