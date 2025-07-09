"use client";

import { MovieDetail, sortMovies } from "@/src/utils/movies";
import { MovieGrid } from "./movie-grid";
import { Pagination } from "./pagination";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import { SortOption } from "./sort-by";

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

  const sort = (searchParams.get("sort") as SortOption) || "default";
  const sortedMovies = sortMovies(movies, sort);

  const showPagination = totalPages > 1 && sortedMovies.length > 0;

  return (
    <>
      <div className={`mb-6 text-center ${query ? "block" : "hidden"}`}>
        <p className="text-gray-400 ">
          found <span className="text-white font-semibold">{totalResults}</span>{" "}
          results for &ldquo;{query}&rdquo;
        </p>
      </div>

      <MovieGrid movies={sortedMovies} />

      {showPagination && (
        <div className="mt-8 sticky">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
};
