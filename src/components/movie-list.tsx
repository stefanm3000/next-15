"use client";

import { MovieDetail, sortMovies } from "@/utils/movies";
import { MovieGrid } from "./movie-grid";
import { Pagination } from "./pagination";
import { use } from "react";
import { useSearchParams } from "next/navigation";

export const MovieList = ({
  moviesPromise,
}: {
  moviesPromise: Promise<{
    movies: MovieDetail[];
    totalPages: number;
    totalResults: number;
  }>;
}) => {
  const searchParams = useSearchParams();
  const { movies, totalPages, totalResults } = use(moviesPromise);

  const query = searchParams.get("s");
  const currentPage = searchParams.get("page");
  const sort = searchParams.get("sort") || "default";

  const sortedMovies = sortMovies(movies, sort);

  const showPagination = totalPages > 1 && sortedMovies.length > 0;

  return (
    <>
      {query && (
        <div className="mb-6 text-center">
          <p className="text-gray-400 font-mono">
            found{" "}
            <span className="text-white font-semibold">{totalResults}</span>{" "}
            results for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}

      <MovieGrid movies={sortedMovies} />

      {showPagination && (
        <div className="mt-8">
          <Pagination
            currentPage={parseInt(currentPage || "1")}
            totalPages={totalPages}
            query={query || ""}
          />
        </div>
      )}
    </>
  );
};
