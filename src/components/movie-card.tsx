"use client";

import Link from "next/link";
import Image from "next/image";
import { type MovieDetail } from "@/utils/movies";
import { SlideTransition } from "./slide-transition";

interface MovieCardProps {
  movie: MovieDetail;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      className="group bg-white/5 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform border border-white/10"
      prefetch={true}
      onMouseEnter={() => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = `/movie/${movie.imdbID}`;
        document.head.appendChild(link);
      }}
    >
      <div className="relative aspect-[2/3]">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <SlideTransition name={`movie-poster-${movie.imdbID}`}>
            <Image
              loading="eager"
              placeholder="empty"
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              priority={true}
            />
          </SlideTransition>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-gray-500 text-center p-4">
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
              <p className="text-sm font-mono">no image</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-gray-300 transition-colors font-mono">
          {movie.Title}
        </h3>

        {movie.imdbRating && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-yellow-400 font-bold text-xs">★</span>
            <span className="text-white font-semibold text-xs">
              {movie.imdbRating}
            </span>
            <span className="text-gray-400 text-xs">/10</span>
            {movie.imdbVotes && (
              <span className="text-gray-500 text-xs">({movie.imdbVotes})</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
          <span>{movie.Year}</span>
          <span className="capitalize bg-white/10 text-white px-2 py-1 rounded">
            {movie.Type}
          </span>
        </div>
      </div>
    </Link>
  );
}
