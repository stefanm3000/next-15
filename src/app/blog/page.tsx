import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { unstable_ViewTransition as ViewTransition } from "react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";
import { ImageOffIcon } from "lucide-react";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt,
  excerpt,
  image,
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div>
      <ViewTransition name="blog">
        <h1 className="text-2xl font-bold mb-8 text-white font-mono">blog</h1>
      </ViewTransition>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group bg-white/5 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="relative aspect-[16/9]">
              {post.image && urlFor(post.image) ? (
                <ViewTransition name={`blog-post-image-${post.slug.current}`}>
                  <Image
                    src={urlFor(post.image)?.width(400).height(225).url() || ""}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </ViewTransition>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-500 text-center p-4 flex flex-col items-center gap-2">
                    <ImageOffIcon size={48} />
                    <p className="text-sm font-mono">no image</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            <div className="p-4">
              <ViewTransition name={`blog-post-${post.slug.current}`}>
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors font-mono line-clamp-2">
                  {post.title}
                </h2>
              </ViewTransition>

              {post.excerpt && (
                <p className="text-gray-400 text-sm mb-3 line-clamp-3 font-mono">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className="bg-white/10 text-white px-2 py-1 rounded">
                  article
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4 font-mono">
            no posts found
          </div>
          <p className="text-gray-500 font-mono">
            check back later for new content
          </p>
        </div>
      )}
    </div>
  );
}
