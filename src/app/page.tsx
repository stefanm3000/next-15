import { Film, BookOpen, Flag, MessageCircle, Radio } from "lucide-react";
import { ProjectLink } from "./_components/project-link";
import { Metadata } from "next";
import { Routes } from "../utils/routes";

export const metadata: Metadata = {
  title: "next 15 | playground",
  description: "the next 15+ playground",
};

export default function Home() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectLink
        title="chat"
        description="realtime chat built with convex"
        icon={<Radio className="w-6 h-6 text-white animate-pulse" />}
        transitionName="chat"
        href={Routes.CHAT}
      />

      <ProjectLink
        title="snappy imdb"
        description="explore movie database"
        icon={<Film className="w-6 h-6 text-orange-400" />}
        transitionName="movies"
        href={Routes.MOVIES}
      />

      <ProjectLink
        title="blog"
        description="read latest articles"
        icon={<BookOpen className="w-6 h-6 text-green-400" />}
        transitionName="blog"
        href={Routes.BLOG}
      />

      <ProjectLink
        title="mini golf"
        description="play mini golf"
        icon={<Flag className="w-6 h-6 text-blue-400" />}
        transitionName="mini-golf"
        href={Routes.GOLF}
      />

      <ProjectLink
        title="comments"
        description="leave an anon comment"
        icon={<MessageCircle className="w-6 h-6 text-purple-400" />}
        transitionName="comments"
        href={Routes.COMMENTS}
      />
    </section>
  );
}
