import { SortOption } from "@/app/movies/(components)/sort-by";

export interface MovieDetail {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbRating: string;
  imdbVotes: string;
  Genre?: string;
}

export function sortMovies(
  movies: MovieDetail[],
  sortOption: SortOption,
): MovieDetail[] {
  const sortedMovies = [...movies];

  switch (sortOption) {
    case "year-new":
      return sortedMovies.sort((a, b) => {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        return yearB - yearA;
      });

    case "year-old":
      return sortedMovies.sort((a, b) => {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        return yearA - yearB;
      });

    case "title-a-z":
      return sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));

    case "title-z-a":
      return sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));

    default:
      return sortedMovies;
  }
}
