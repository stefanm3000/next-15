"use client";

import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

export const Gallery = ({
  imdb,
  src,
  alt,
}: {
  imdb: string;
  src: string;
  alt: string;
}) => {
  return (
    <ViewTransition name={`movie-poster-${imdb}`}>
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority
        />
      </div>
    </ViewTransition>
  );
};
