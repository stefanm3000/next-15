import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { Pagination } from "@/components/pagination";
import { MovieGrid } from "@/components/movie-grid";

interface SearchParams {
  s?: string;
  page?: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams.s || "marvel";
  const page = parseInt(searchParams.page || "1");
  const pageSize = 10;

  const response = await fetch(
    `http://www.omdbapi.com/?apikey=7f887362&s=${encodeURIComponent(
      query
    )}&page=${page}`,
    { next: { revalidate: 3600 } }
  );

  const data = await response.json();
  const movies = data.Search || [];
  const totalResults = parseInt(data.totalResults || "0");
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Movie Database
          </h1>
          <p className="text-gray-300">Search and discover amazing movies</p>
        </div>

        <div className="mb-8">
          <SearchForm initialQuery={query} />
        </div>

        {query && (
          <div className="mb-6 text-center">
            <p className="text-gray-300">
              Found
              <span className="text-purple-400 font-semibold">
                {totalResults}
              </span>
              results for {query}
            </p>
          </div>
        )}

        <Suspense
          fallback={<div className="text-center py-12">Loading movies...</div>}
        >
          <MovieGrid movies={movies} />
        </Suspense>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              query={query}
            />
          </div>
        )}
      </div>
    </div>
  );
}
