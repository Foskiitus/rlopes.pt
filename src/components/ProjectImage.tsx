"use client";
import Image from "next/image";
import { useState } from "react";
export function ProjectImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
  eager = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        className={"image-fallback " + (className || "")}
        role="img"
        aria-label={alt}
      >
        <span>{alt}</span>
      </div>
    );
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
