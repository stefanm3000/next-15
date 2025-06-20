import { Gallery } from "@/components/gallery";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";

interface MovieData {
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

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <BackLink />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <Gallery
                  imdb={movie.imdbID}
                  src={movie.Poster}
                  alt={movie.Title}
                />
              ) : (
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500 text-center p-4">
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
                    <p className="text-sm font-mono">no image available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 font-mono">
                  {movie.Title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400 font-mono">
                  <span>{movie.Year}</span>
                  <span>•</span>
                  <span>{movie.Runtime}</span>
                  <span>•</span>
                  <span className="capitalize">{movie.Type}</span>
                </div>
              </div>

              {movie.imdbRating && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 font-bold text-2xl">
                      ★
                    </span>
                    <div>
                      <div className="text-white font-bold text-xl">
                        {movie.imdbRating}
                      </div>
                      <div className="text-gray-400 text-sm font-mono">/10</div>
                    </div>
                  </div>
                  {movie.imdbVotes && (
                    <div className="text-gray-400 text-sm font-mono">
                      {movie.imdbVotes} votes
                    </div>
                  )}
                </div>
              )}

              {movie.Plot && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3 font-mono">
                    plot
                  </h2>
                  <p className="text-gray-300 leading-relaxed font-mono">
                    {movie.Plot}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.Genre && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                      genre
                    </h3>
                    <p className="text-gray-300 font-mono">{movie.Genre}</p>
                  </div>
                )}

                {movie.Director && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                      director
                    </h3>
                    <p className="text-gray-300 font-mono">{movie.Director}</p>
                  </div>
                )}

                {movie.Writer && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                      writer
                    </h3>
                    <p className="text-gray-300 font-mono">{movie.Writer}</p>
                  </div>
                )}

                {movie.Actors && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                      cast
                    </h3>
                    <p className="text-gray-300 font-mono">{movie.Actors}</p>
                  </div>
                )}

                {movie.Released && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                      released
                    </h3>
                    <p className="text-gray-300 font-mono">{movie.Released}</p>
                  </div>
                )}

                {movie.Rated && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                      rated
                    </h3>
                    <p className="text-gray-300 font-mono">{movie.Rated}</p>
                  </div>
                )}
              </div>

              {movie.Ratings && movie.Ratings.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 font-mono">
                    ratings
                  </h3>
                  <div className="space-y-2">
                    {movie.Ratings.map((rating, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-white/5 backdrop-blur-md rounded-lg p-3"
                      >
                        <span className="text-gray-300 font-mono">
                          {rating.Source}
                        </span>
                        <span className="text-white font-semibold font-mono">
                          {rating.Value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {movie.BoxOffice && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                    box office
                  </h3>
                  <p className="text-gray-300 font-mono">{movie.BoxOffice}</p>
                </div>
              )}

              {movie.Production && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                    production
                  </h3>
                  <p className="text-gray-300 font-mono">{movie.Production}</p>
                </div>
              )}

              {movie.Website && movie.Website !== "N/A" && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                    website
                  </h3>
                  <a
                    href={movie.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-mono"
                  >
                    {movie.Website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
