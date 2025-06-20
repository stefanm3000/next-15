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

export interface SearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export async function getMovieDetails(
  imdbID: string
): Promise<MovieDetail | null> {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=7f887362&i=${imdbID}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    if (data.Response === "False") {
      return null;
    }

    return {
      imdbID: data.imdbID,
      Title: data.Title,
      Year: data.Year,
      Poster: data.Poster,
      Type: data.Type,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
      Genre: data.Genre,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

export function sortMovies(
  movies: MovieDetail[],
  sortOption: string
): MovieDetail[] {
  const sortedMovies = [...movies];

  switch (sortOption) {
    case "rating-high":
      return sortedMovies.sort((a, b) => {
        const ratingA = parseFloat(a.imdbRating) || 0;
        const ratingB = parseFloat(b.imdbRating) || 0;
        return ratingB - ratingA;
      });

    case "rating-low":
      return sortedMovies.sort((a, b) => {
        const ratingA = parseFloat(a.imdbRating) || 0;
        const ratingB = parseFloat(b.imdbRating) || 0;
        return ratingA - ratingB;
      });

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
