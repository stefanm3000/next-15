import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { SortBy, type SortOption } from "@/components/sort-by";
import { MovieList } from "@/components/movie-list";

const ITEMS_PER_PAGE = 10;

interface SearchParams {
  s?: string;
  page?: string;
  sort?: string;
}

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

const getMovies = async (query: string, page: number) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${
      process.env.SECRET_OMDB_API_KEY
    }&s=${encodeURIComponent(query)}&page=${page}`,
    { next: { revalidate: 3600 } }
  );

  const data = await response.json();
  const movies = data.Search || [];
  const totalPages = Math.ceil(data.totalResults / ITEMS_PER_PAGE);
  const totalResults = parseInt(data.totalResults || "0");

  return { movies, totalPages, totalResults };
};

export default async function Home({ searchParams }: HomeProps) {
  const { s, page, sort } = await searchParams;

  const query = s || "batman";
  const currentPage = parseInt(page || "1");
  const sortOption: SortOption = (sort as SortOption) || "default";

  const moviesPromise = getMovies(query, currentPage);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white font-mono">
            snappy imdb
          </h1>
        </div>

        <div className="sticky top-0 z-10 mb-8 py-4 flex flex-nowrap justify-center items-center gap-4">
          <SearchForm initialQuery={query} />
          <SortBy currentSort={sortOption} />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <MovieList moviesPromise={moviesPromise} />
        </Suspense>
      </div>
    </div>
  );
}
