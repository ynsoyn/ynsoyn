"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORKS, type CategoryId, type Work } from "@/data/works";

interface WorksCarouselProps {
  activeCategory: CategoryId;
  onSelect?: (work: Work) => void;
}

export default function WorksCarousel({ activeCategory, onSelect }: WorksCarouselProps) {
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

  // 카테고리 변경 시 스크롤 위치 초기화
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeCategory]);

  const filtered = WORKS.filter((w) => w.category === activeCategory);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "rgba(230, 223, 214, 0.6)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.55)",
      }}
    >
      {/* 스크롤 컨테이너 — 항상 마운트 유지 */}
      <div
        ref={scrollRef}
        className="overflow-x-auto cursor-ew-resize"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.05 }}
            className="flex gap-6 px-12 pt-7 pb-6 justify-center"
          >
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="text-sm py-6"
                style={{ color: "#b5a99e" }}
              >
                작업물이 없습니다.
              </motion.p>
            ) : (
              <>
                {filtered.map((work, i) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 22, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.07,
                      ease: [0.22, 0.1, 0.28, 1],
                    }}
                    className="flex-shrink-0 w-64 group cursor-pointer"
                    onClick={() => onSelect?.(work)}
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-full h-40 relative overflow-hidden transition-all duration-300"
                      style={{
                        backgroundColor: work.bgColor,
                        borderRadius: "14px",
                        boxShadow: "5px 5px 12px rgba(155,135,115,0.24), -3px -3px 9px rgba(255,255,255,0.92)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 18px rgba(155,135,115,0.3), -4px -4px 12px rgba(255,255,255,0.96)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "5px 5px 12px rgba(155,135,115,0.24), -3px -3px 9px rgba(255,255,255,0.92)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      <div
                        className="absolute inset-0 transition-colors duration-200"
                        style={{ background: "rgba(255,255,255,0)" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLDivElement).style.background =
                            "rgba(255,255,255,0.12)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLDivElement).style.background =
                            "rgba(255,255,255,0)")
                        }
                      />
                    </div>
                    {/* Label */}
                    <div className="flex items-center gap-2 mt-2 px-0.5">
                      <span className="text-xs font-medium" style={{ color: "#6b5f59" }}>
                        {work.title}
                      </span>
                      <span className="text-xs ml-auto" style={{ color: "#b5a99e" }}>
                        {work.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <div className="flex-shrink-0 w-4" />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mx-12 mb-4"
        style={{ height: "1px", background: "rgba(255,255,255,0.4)" }}
      />
    </div>
  );
}
