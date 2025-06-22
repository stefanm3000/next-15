import { unstable_ViewTransition as ViewTransition } from "react";
import { Film, BookOpen } from "lucide-react";
import { ProjectLink } from "@/components/project-link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <ViewTransition name="page-title">
          <h1 className="text-4xl font-bold mb-8 text-white font-mono">home</h1>
        </ViewTransition>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <ProjectLink
            title="snappy imdb"
            description="explore movie database"
            icon={<Film className="w-6 h-6 text-orange-400" />}
            transitionName="movies"
            href="/movies"
          />

          <ProjectLink
            title="blog"
            description="read latest articles"
            icon={<BookOpen className="w-6 h-6 text-green-400" />}
            transitionName="blog"
            href="/blog"
          />
        </section>
      </div>
    </div>
  );
}
