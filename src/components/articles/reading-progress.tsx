"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress({ contentId }: { contentId: string }) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = document.getElementById(contentId);
    const indicator = indicatorRef.current;
    if (!content || !indicator) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = content.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.75;
      const progress = bounds.height > 0
        ? Math.max(0, Math.min(1, (readingLine - bounds.top) / bounds.height))
        : 0;
      indicator.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    resizeObserver?.observe(content);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [contentId]);

  return <div className="article-reading__progress" ref={indicatorRef} aria-hidden="true" />;
}
