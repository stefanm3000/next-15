import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { SortBy } from "@/components/sort-by";
import { MovieList } from "@/components/movie-list";
import { MovieDetail } from "@/utils/movies";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
import { MovieGridSkeleton } from "@/components/movie-skeleton";

const ITEMS_PER_PAGE = 10;

interface SearchParams {
  s?: string;
  page?: string;
  sort?: string;
}

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

const getMovies = async (
  query: string,
  page: number,
): Promise<{
  movies: MovieDetail[];
  totalPages: number;
  totalResults: number;
}> => {
  const url = `http://www.omdbapi.com/?apikey=${
    process.env.SECRET_OMDB_API_KEY
  }&s=${encodeURIComponent(query)}&page=${page}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });
  const data = await response.json();

  const movies = data.Search || [];
  const totalPages = Math.ceil(data.totalResults / ITEMS_PER_PAGE);
  const totalResults = parseInt(data.totalResults || "0");

  return { movies, totalPages, totalResults };
};

export default async function Home({ searchParams }: HomeProps) {
  const { s, page } = await searchParams;

  const query = s || "batman";
  const currentPage = parseInt(page || "1");

  const moviesPromise = getMovies(query, currentPage);

  return (
    <>
      <div className="mb-8">
        <ViewTransition name="movies">
          <h1 className="text-2xl font-bold mb-2 text-white font-mono">
            <Link
              className="hover:text-amber-300 transition-colors duration-300"
              href="/movies"
            >
              snappy imdb
            </Link>
          </h1>
        </ViewTransition>
      </div>

      <div className="sticky top-0 z-10 mb-8 py-4 flex flex-nowrap justify-center items-center gap-4">
        <SearchForm />
        <SortBy />
      </div>

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieList moviesPromise={moviesPromise} />
      </Suspense>
    </>
  );
}
