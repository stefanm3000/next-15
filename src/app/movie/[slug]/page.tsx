import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MovieDetail {
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
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface MoviePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const popularSearches = [
    "marvel",
    "batman",
    "spider",
    "star wars",
    "harry potter",
  ];
  const staticParams: { slug: string }[] = [];

  for (const search of popularSearches) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=7f887362&s=${encodeURIComponent(
          search
        )}`,
        { next: { revalidate: 86400 } }
      );
      const data = await response.json();

      if (data.Search) {
        data.Search.slice(0, 5).forEach((movie: MovieDetail) => {
          staticParams.push({ slug: movie.imdbID });
        });
      }
    } catch (error) {
      console.error(`Error fetching movies for ${search}:`, error);
    }
  }

  return staticParams;
}

async function getMovieDetails(imdbID: string): Promise<MovieDetail | null> {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=7f887362&i=${imdbID}`,
      { next: { revalidate: 86400 } }
    );

    const data = await response.json();

    if (data.Response === "False") {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getMovieDetails(params.slug);

  if (!movie) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            prefetch={true}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-white/10">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <div className="text-gray-400 text-center p-4">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {movie.Title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>{movie.Year}</span>
                  {movie.Rated && <span>• {movie.Rated}</span>}
                  {movie.Runtime && <span>• {movie.Runtime}</span>}
                </div>
              </div>

              {movie.imdbRating && (
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-bold text-xl">
                        ★
                      </span>
                      <span className="text-white font-semibold">
                        {movie.imdbRating}
                      </span>
                      <span className="text-gray-400">/10</span>
                    </div>
                    {movie.imdbVotes && (
                      <span className="text-gray-400">
                        ({movie.imdbVotes} votes)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {movie.Plot && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Plot
                  </h2>
                  <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.Genre && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Genre
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.Genre.split(", ").map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {movie.Director && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Director
                    </h3>
                    <p className="text-gray-300">{movie.Director}</p>
                  </div>
                )}

                {movie.Actors && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Cast
                    </h3>
                    <p className="text-gray-300">{movie.Actors}</p>
                  </div>
                )}

                {movie.Writer && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Writer
                    </h3>
                    <p className="text-gray-300">{movie.Writer}</p>
                  </div>
                )}

                {movie.Released && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Released
                    </h3>
                    <p className="text-gray-300">{movie.Released}</p>
                  </div>
                )}

                {movie.BoxOffice && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Box Office
                    </h3>
                    <p className="text-gray-300">{movie.BoxOffice}</p>
                  </div>
                )}
              </div>

              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Ratings
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movie.Ratings.map((rating, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-gray-400">
                          {rating.Source}
                        </div>
                        <div className="text-white font-semibold">
                          {rating.Value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
