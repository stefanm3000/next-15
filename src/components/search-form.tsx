"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("s") || "batman";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = (e.target as HTMLFormElement).search.value.trim();

    if (value) {
      const params = new URLSearchParams(searchParams);

      params.set("s", value);
      params.delete("page");
      params.delete("sort");

      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="flex gap-2">
        <input
          key={query}
          name="search"
          type="text"
          defaultValue={query}
          placeholder="Search for movies..."
          className="flex-1 px-4 py-3 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent lg:min-w-[300px]"
        />
      </div>
    </form>
  );
}
