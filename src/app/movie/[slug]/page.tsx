import { notFound } from "next/navigation";
import { Details } from "./page-client";

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

async function getMovieData(imdbID: string): Promise<MovieData | null> {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=7f887362&i=${imdbID}`,
      { next: { revalidate: 3600 } }
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
  const movie = await getMovieData(slug);

  if (!movie) {
    notFound();
  }

  return <Details movie={movie} />;
}
