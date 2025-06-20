"use client";

import Link from "next/link";
import Image from "next/image";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No movies found</div>
        <p className="text-gray-500">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.imdbID}
          href={`/movie/${movie.imdbID}`}
          className="group bg-white/10 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          prefetch={true}
          onMouseEnter={() => {
            // Preload the movie detail page
            const link = document.createElement("link");
            link.rel = "prefetch";
            link.href = `/movie/${movie.imdbID}`;
            document.head.appendChild(link);
          }}
        >
          <div className="relative aspect-[2/3]">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <Image
                src={movie.Poster}
                alt={movie.Title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="text-gray-400 text-center p-4">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">No Image</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1 group-hover:text-purple-300 transition-colors">
              {movie.Title}
            </h3>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{movie.Year}</span>
              <span className="capitalize bg-purple-500/30 text-purple-300 px-2 py-1 rounded">
                {movie.Type}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
