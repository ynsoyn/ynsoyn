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
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeCategory]);

  // 작업물 영역 위에서 휠 → 카테고리 회전 대신 내부 스크롤
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => { e.stopPropagation(); };
    el.addEventListener("wheel", handler, { passive: true });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const filtered = WORKS.filter((w) => w.categories.includes(activeCategory));

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(238, 238, 236, 0.6)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.55)",
        overflow: "hidden",
      }}
    >
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              padding: "14px 24px 18px",
              justifyContent: "center",
              alignContent: "flex-start",
            }}
          >
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                style={{ fontSize: "0.875rem", padding: "20px 0", color: "#b5a99e" }}
              >
                작업물이 없습니다.
              </motion.p>
            ) : (
              filtered.map((work, i) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.26, delay: i * 0.05, ease: [0.22, 0.1, 0.28, 1] }}
                  style={{ width: "min(200px, calc(50% - 7px))", cursor: "pointer", flexShrink: 0 }}
                  onClick={() => onSelect?.(work)}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4/3",
                      backgroundColor: work.bgColor,
                      borderRadius: "12px",
                      boxShadow: "4px 4px 10px rgba(155,135,115,0.22), -3px -3px 8px rgba(255,255,255,0.92)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 14px rgba(155,135,115,0.28), -4px -4px 10px rgba(255,255,255,0.96)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "4px 4px 10px rgba(155,135,115,0.22), -3px -3px 8px rgba(255,255,255,0.92)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px", padding: "0 2px" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "#6b5f59", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: "6px" }}>
                      {work.title}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#b5a99e", flexShrink: 0 }}>
                      {work.year}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
