"use client";

import { useLayoutEffect, useRef } from "react";

function sectionVisibleRatio(section: Element) {
  const { top, bottom, height } = section.getBoundingClientRect();
  if (height <= 0) return 0;
  const visible = Math.min(bottom, window.innerHeight) - Math.max(top, 0);
  return visible > 0 ? visible / height : 0;
}

export function StoreVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const section = video?.closest("[data-store]");
    if (!video || !section) return;

    const tryPlay = () => {
      if (playedRef.current || sectionVisibleRatio(section) < 0.5) return;
      playedRef.current = true;
      video.play().catch(() => {});
      window.removeEventListener("scroll", tryPlay);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(() => tryPlay(), {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    observer.observe(section);
    window.addEventListener("scroll", tryPlay, { passive: true });
    tryPlay();

    return () => {
      window.removeEventListener("scroll", tryPlay);
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      className="block aspect-square w-full object-cover"
    />
  );
}
