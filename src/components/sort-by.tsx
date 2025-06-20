"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type SortOption =
  | "default"
  | "year-new"
  | "year-old"
  | "title-a-z"
  | "title-z-a";

interface SortOptionItem {
  value: SortOption;
  label: string;
}

const sortOptions: SortOptionItem[] = [
  { value: "default", label: "default" },
  { value: "year-new", label: "year (newest)" },
  { value: "year-old", label: "year (oldest)" },
  { value: "title-a-z", label: "title (a-z)" },
  { value: "title-z-a", label: "title (z-a)" },
];

export function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "default";

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.delete("page");
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
