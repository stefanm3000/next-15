import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-8">
        <ViewTransition name="movies">
          <Link
            className="text-2xl font-bold mb-8 text-white font-mono hover:text-amber-300 transition-colors duration-300"
            href="/movies"
          >
            snappy imdb
          </Link>
        </ViewTransition>
      </div>

      {children}
    </>
  );
}
