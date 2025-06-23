import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";
import { BlogPostCard } from "@/app/blog/(components)/blog-post-card";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest articles",
};

export default async function BlogPostPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  const noPosts = posts.length === 0;

  if (noPosts) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4 font-mono">
          no posts found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-gray-400 text-sm mb-6 font-mono flex flex-col gap-2">
        <p>
          these blog posts are rendered using next.js incremental static regen
          w/{" "}
          <a href="https://sanity.io" className="underline">
            sanity
          </a>{" "}
          as the cms
        </p>
        <p>
          mostly written by dan abramov, check out{" "}
          <a href="https:overreacted.io" className="underline">
            overreacted.io
          </a>{" "}
          for more cool stuff
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(({ _id, image, title, slug, excerpt, publishedAt }) => {
          const src = urlFor(image)?.width(400).height(225).url() ?? null;

          return (
            <BlogPostCard
              key={_id}
              imageSrc={src}
              title={title}
              slug={slug.current}
              excerpt={excerpt}
              publishedAt={publishedAt}
            />
          );
        })}
      </div>
    </div>
  );
}
