import { Suspense } from "react";
import { MovieList } from "@/app/movies/_components/movie-list";
import { MovieGridSkeleton } from "@/app/movies/_components/movie-skeletons";
import { SearchForm } from "@/app/movies/_components/search-form";
import { SortBy } from "@/app/movies/_components/sort-by";
import { getMovies } from "./actions";
import { Metadata } from "next";

interface SearchParams {
  s?: string;
  page?: string;
  sort?: string;
}

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export const metadata: Metadata = {
  title: "Movies",
  description: "Explore a collection of movies",
};

export default async function MoviesPage({ searchParams }: HomeProps) {
  const { s, page } = await searchParams;

  const query = s || "batman";
  const currentPage = parseInt(page || "1");

  const moviesPromise = getMovies(query, currentPage);

  return (
    <>
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
