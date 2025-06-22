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
          <h1 className="text-4xl font-bold mb-2 text-white font-mono">
            <Link
              className="hover:text-amber-300 transition-colors duration-300"
              href="/movies"
            >
              snappy imdb
            </Link>
          </h1>
        </ViewTransition>
      </div>

      {children}
    </>
  );
}
