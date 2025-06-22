import { Suspense } from "react";
import { MovieList } from "@/components/movie-list";
import { MovieDetail } from "@/utils/movies";
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

export default async function MoviesPage({ searchParams }: HomeProps) {
  const { s, page } = await searchParams;

  const query = s || "batman";
  const currentPage = parseInt(page || "1");

  const moviesPromise = getMovies(query, currentPage);

  return (
    <Suspense fallback={<MovieGridSkeleton />}>
      <MovieList moviesPromise={moviesPromise} />
    </Suspense>
  );
}
