import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { SortControls } from "@/components/sort-controls";
import {
  getMovieDetails,
  sortMovies,
  type MovieDetail,
  type SearchResult,
} from "@/utils/movies";

interface SearchParams {
  s?: string;
  page?: string;
  sort?: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams.s) || "batman";
  const page = parseInt(searchParams.page || "1");
  const sortOption = searchParams.sort || "default";
  const pageSize = 10;

  const response = await fetch(
    `http://www.omdbapi.com/?apikey=7f887362&s=${encodeURIComponent(
      query
    )}&page=${page}`,
    { next: { revalidate: 3600 } }
  );

  const data = await response.json();
  const searchResults = data.Search || [];
  console.log(data);
  const movieDetails = await Promise.all(
    searchResults.map((movie: SearchResult) => getMovieDetails(movie.imdbID))
  );

  const movies = movieDetails.filter(
    (movie): movie is MovieDetail => movie !== null
  );
  const sortedMovies = sortMovies(movies, sortOption);

  const totalResults = parseInt(data.totalResults || "0");
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white font-mono">
            snappy imdb{" "}
          </h1>
        </div>

        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-white/10 mb-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 lg:col-start-4">
              <SearchForm initialQuery={query} />
            </div>

            <div className="lg:col-span-3">
              <SortControls
                currentSort={
                  sortOption as
                    | "default"
                    | "rating-high"
                    | "rating-low"
                    | "year-new"
                    | "year-old"
                    | "title-a-z"
                    | "title-z-a"
                }
              />
            </div>
          </div>
        </div>

        {query && (
          <div className="mb-6 text-center">
            <p className="text-gray-400 font-mono">
              found{" "}
              <span className="text-white font-semibold">{totalResults}</span>{" "}
              results for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

        <Suspense
          fallback={
            <div className="text-center py-12 text-gray-400 font-mono">
              loading movies...
            </div>
          }
        >
          <MovieGrid movies={sortedMovies} />
        </Suspense>

        {totalPages > 1 && sortedMovies.length > 0 && (
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
