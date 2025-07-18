import { Suspense } from "react";
import { Details } from "./_components/movie-details";
import { MovieSkeleton } from "../_components/movie-skeletons";

export interface MovieData {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const movie = await getMovieData(slug);
  return {
    title: movie?.Title,
    description: movie?.Plot,
  };
}

async function getMovieData(imdbID: string): Promise<MovieData | null> {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.SECRET_OMDB_API_KEY}&i=${imdbID}`,
      { next: { revalidate: 3600 } },
    );

    const data = await response.json();

    if (data.Response === "False") {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moviePromise = getMovieData(slug);

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <Details moviePromise={moviePromise} />
    </Suspense>
  );
}
