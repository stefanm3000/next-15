import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";
import { ArrowLeft } from "lucide-react";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(
    `*[_type == "post" && defined(slug.current)]{slug}`,
    {},
    options,
  );
  return posts.map((post) => ({ slug: post.slug.current }));
}

export default async function PostPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug: params.slug },
    options,
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft size={16} />
          <span>back to blog</span>
        </Link>

        <article className="space-y-8">
          {postImageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
              <ViewTransition name={`blog-post-image-${params.slug}`}>
                <Image
                  src={postImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </ViewTransition>
            </div>
          )}

          <header className="space-y-4">
            <ViewTransition name={`blog-post-${params.slug}`}>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight font-mono">
                {post.title}
              </h1>
            </ViewTransition>

            <div className="flex items-center space-x-4 text-gray-400 font-mono text-sm">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="bg-white/10 text-white px-2 py-1 rounded text-xs">
                article
              </span>
            </div>
          </header>

          {Array.isArray(post.body) && (
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed space-y-6 font-mono">
                <PortableText
                  value={post.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="mb-6 text-gray-300 leading-relaxed">
                          {children}
                        </p>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-white mb-6 mt-12">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-white mb-3 mt-8">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-lg font-bold text-white mb-3 mt-6">
                          {children}
                        </h4>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/10 rounded-r-lg my-6">
                          <div className="text-gray-200 italic">{children}</div>
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => (
                        <li className="text-gray-300">{children}</li>
                      ),
                      number: ({ children }) => (
                        <li className="text-gray-300">{children}</li>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold text-white">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-gray-200">{children}</em>
                      ),
                      code: ({ children }) => (
                        <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm font-mono">
                          {children}
                        </code>
                      ),
                      link: ({ children, value }) => (
                        <a
                          href={value.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                          {children}
                        </a>
                      ),
                    },
                    types: {
                      image: ({ value }) => {
                        const imageUrl = urlFor(value)
                          ?.width(800)
                          .height(450)
                          .url();
                        return imageUrl ? (
                          <div className="my-8">
                            <Image
                              src={imageUrl}
                              alt={value.alt || "Blog post image"}
                              width={800}
                              height={450}
                              className="rounded-lg w-full"
                            />
                            {value.caption && (
                              <p className="text-center text-gray-500 text-sm mt-2 italic">
                                {value.caption}
                              </p>
                            )}
                          </div>
                        ) : null;
                      },
                      code: ({ value }) => (
                        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto my-6">
                          <code className="text-gray-300 text-sm font-mono">
                            {value.code}
                          </code>
                        </pre>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
