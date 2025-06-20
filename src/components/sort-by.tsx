"use client";

import { ArrowDownNarrowWide } from "lucide-react";
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
    <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-lg">
      <div className="relative md:hidden">
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full appearance-none rounded-lg bg-transparent py-3.5 px-3 text-sm font-mono text-white focus:border-white/40 focus:outline-none opacity-0 absolute inset-0 cursor-pointer"
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
        <div className="flex items-center justify-center py-3.5 px-3">
          <ArrowDownNarrowWide className="h-5 w-5 text-white/70" />
        </div>
      </div>

      <div className="relative hidden md:block">
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full appearance-none rounded-lg bg-transparent py-3.5 pl-4 pr-10 text-sm font-mono text-white focus:border-white/40 focus:outline-none"
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
        <ArrowDownNarrowWide className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
      </div>
    </div>
  );
}
