"use client";

import { MovieCard } from "./movie-card";
import { type MovieDetail } from "@/utils/movies";

interface MovieGridProps {
  movies: MovieDetail[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4 font-mono">
          no movies found
        </div>
        <p className="text-gray-500 font-mono">
          try searching for something else
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
