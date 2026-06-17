"use client";

import { useRef, useEffect } from "react";
import { WORKS, type CategoryId } from "@/data/works";

interface WorksCarouselProps {
  activeCategory: CategoryId;
}

export default function WorksCarousel({ activeCategory }: WorksCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.2;
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const filtered =
    activeCategory === "all"
      ? WORKS
      : WORKS.filter((w) => w.category === activeCategory);

  return (
    <div className="bg-[#e8e6e2] border-t border-gray-300">
      {/* Large card row */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-8 pt-5 pb-4 overflow-x-auto cursor-ew-resize"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filtered.map((work) => (
          <div
            key={work.id}
            className="flex-shrink-0 w-72 group"
          >
            {/* Thumbnail */}
            <div
              className="w-full h-44 relative overflow-hidden"
              style={{ backgroundColor: work.bgColor }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-200" />
            </div>
            {/* Label */}
            <div className="flex items-center gap-3 mt-2 px-1">
              <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-600 font-medium">{work.title}</span>
              <span className="text-xs text-gray-400 ml-auto">{work.year}</span>
            </div>
          </div>
        ))}
        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-4" />
      </div>

      {/* Bottom line */}
      <div className="h-px bg-gray-300 mx-8 mb-3" />
    </div>
  );
}
