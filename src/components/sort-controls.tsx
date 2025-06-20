"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SortOption =
  | "default"
  | "rating-high"
  | "rating-low"
  | "year-new"
  | "year-old"
  | "title-a-z"
  | "title-z-a";

interface SortControlsProps {
  currentSort: SortOption;
}

interface SortOptionItem {
  value: SortOption;
  label: string;
}

const sortOptions: SortOptionItem[] = [
  { value: "default", label: "default" },
  { value: "rating-high", label: "rating (high to low)" },
  { value: "rating-low", label: "rating (low to high)" },
  { value: "year-new", label: "year (newest)" },
  { value: "year-old", label: "year (oldest)" },
  { value: "title-a-z", label: "title (a-z)" },
  { value: "title-z-a", label: "title (z-a)" },
];

export function SortControls({ currentSort }: SortControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.delete("page"); // Reset to first page when sorting
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-2">
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-full bg-transparent text-white rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-white/40"
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-black text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
