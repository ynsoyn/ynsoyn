"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import CategoryPanel from "@/components/home/CategoryPanel";
import WorksCarousel from "@/components/home/WorksCarousel";
import { CATEGORIES, type CategoryId } from "@/data/works";

// Three.js requires browser APIs — disable SSR
const MobileScene = dynamic(
  () => import("@/components/home/MobileScene"),
  { ssr: false }
);

const CAT_COUNT = CATEGORIES.length;
// How many radians of scroll correspond to one category step
const RAD_PER_CAT = Math.PI * 0.5;

export default function HomePage() {
  const [rotation, setRotation] = useState(0);
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const rotRef = useRef(0);
  const mobileAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mobileAreaRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      rotRef.current += e.deltaY * 0.004;
      setRotation(rotRef.current);
      const idx =
        ((Math.floor(Math.abs(rotRef.current) / RAD_PER_CAT) % CAT_COUNT) +
          CAT_COUNT) %
        CAT_COUNT;
      setActiveCatIndex(idx);
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const activeCategory = CATEGORIES[activeCatIndex].id as CategoryId;

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* ── Upper: 3D Mobile + Category ── */}
      <div ref={mobileAreaRef} className="flex flex-1 min-h-0">
        {/* Left: 3D canvas */}
        <div className="w-[58%] relative">
          <MobileScene rotation={rotation} />
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200" />

        {/* Right: Category info */}
        <div className="flex-1">
          <CategoryPanel activeIndex={activeCatIndex} />
        </div>
      </div>

      {/* ── Lower: Works carousel ── */}
      <WorksCarousel activeCategory={activeCategory} />
    </div>
  );
}
