"use client";

import { List } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export type PerPageOption = "5" | "10" | "20" | "50";

interface PerPageOptionItem {
  value: PerPageOption;
  label: string;
}

const perPageOptions: PerPageOptionItem[] = [
  { value: "5", label: "5 per page" },
  { value: "10", label: "10 per page" },
  { value: "20", label: "20 per page" },
  { value: "50", label: "50 per page" },
];

export function CommentsPerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPerPage = searchParams.get("perPage") || "5";

  const handlePerPageChange = (perPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("perPage", perPage);
    // Clear cursor when changing per-page since pagination structure changes
    params.delete("cursor");
    router.push(`/comments?${params.toString()}`);
  };

  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-lg">
      <div className="relative md:hidden">
        <select
          value={currentPerPage}
          onChange={(e) => handlePerPageChange(e.target.value)}
          className="w-full appearance-none rounded-lg bg-transparent py-3.5 px-3 text-sm text-white focus:border-white/40 focus:outline-none opacity-0 absolute inset-0 cursor-pointer"
        >
          {perPageOptions.map((option) => (
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
          <List className="h-5 w-5 text-white/70" />
        </div>
      </div>

      <div className="relative hidden md:block">
        <select
          value={currentPerPage}
          onChange={(e) => handlePerPageChange(e.target.value)}
          className="w-full appearance-none rounded-lg bg-transparent py-3.5 pl-4 pr-10 text-sm text-white focus:border-white/40 focus:outline-none"
        >
          {perPageOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-black text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        <List className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
      </div>
    </div>
  );
}
