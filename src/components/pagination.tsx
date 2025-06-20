"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `/?${params.toString()}`;
  };

  const handleMouseEnter = (page: number) => {
    const url = createPageUrl(page);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.appendChild(link);
  };

  const visiblePages = getVisiblePages({ currentPage, totalPages });

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors font-mono"
          prefetch
          onMouseEnter={() => handleMouseEnter(currentPage - 1)}
        >
          prev
        </Link>
      )}

      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500 font-mono">...</span>
          ) : (
            <Link
              href={createPageUrl(page as number)}
              className={`px-3 py-2 rounded-lg transition-colors font-mono ${
                currentPage === page
                  ? "bg-white text-black font-semibold"
                  : "bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10"
              }`}
              prefetch
              onMouseEnter={() => handleMouseEnter(page as number)}
            >
              {page}
            </Link>
          )}
        </div>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors font-mono"
          prefetch
          onMouseEnter={() => handleMouseEnter(currentPage + 1)}
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
