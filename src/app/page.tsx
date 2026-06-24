"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import CategoryPanel from "@/components/home/CategoryPanel";
import WorksCarousel from "@/components/home/WorksCarousel";
import { CATEGORIES, type CategoryId, type Work } from "@/data/works";

const MobileScene = dynamic(
  () => import("@/components/home/MobileScene"),
  { ssr: false }
);

const CAT_COUNT = CATEGORIES.length;
const RAD_PER_CAT = Math.PI * 0.5;

export default function HomePage() {
  const [rotation, setRotation] = useState(0);
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [splitPct, setSplitPct] = useState(62);
  const rotRef = useRef(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current || !rightRef.current) return;
      const rect = rightRef.current.getBoundingClientRect();
      const pct = ((ev.clientY - rect.top) / rect.height) * 100;
      setSplitPct(Math.min(75, Math.max(35, pct)));
    };
    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  useEffect(() => {
    const el = pageRef.current;
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
      ref={pageRef}
      className="flex overflow-hidden"
      style={{ height: "calc(100vh - 72px)" }}
    >
      {/* ── Left: 3D Mobile (full height) ── */}
      <div style={{ width: "50%", flexShrink: 0, height: "100%", position: "relative" }}>
        <MobileScene rotation={rotation} />

        {/* Work detail overlay */}
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              key={selectedWork.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedWork(null)}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(240, 240, 238, 0.76)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.88, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 20 }}
                transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "72%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "rgba(252, 252, 250, 0.97)",
                  boxShadow: "10px 10px 28px rgba(155,135,115,0.24), -6px -6px 18px rgba(255,255,255,0.92)",
                }}
              >
                {/* Thumbnail area */}
                <div
                  style={{
                    height: "260px",
                    backgroundColor: selectedWork.bgColor,
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => setSelectedWork(null)}
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "16px",
                      background: "rgba(255,255,255,0.55)",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      color: "#6b5f59",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Info */}
                <div style={{ padding: "28px 32px 36px" }}>
                  <span style={{ fontSize: "0.7rem", color: "#b5a99e", display: "block", marginBottom: "4px" }}>{selectedWork.year}</span>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: 600, color: "#3d3530", margin: "0 0 10px" }}>
                    {selectedWork.title}
                  </h2>

                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c4b5ab", marginBottom: "14px" }}>
                    {selectedWork.categories.join(" · ")}
                  </p>

                  {selectedWork.description && (
                    <p style={{ fontSize: "0.82rem", color: "#8c7f78", lineHeight: 1.75, marginBottom: "18px" }}>
                      {selectedWork.description}
                    </p>
                  )}

                  {selectedWork.tags && selectedWork.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {selectedWork.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.62rem",
                            padding: "4px 12px",
                            borderRadius: "999px",
                            background: "#f4f4f2",
                            color: "#8c7f78",
                            boxShadow: "inset 2px 2px 5px rgba(155,135,115,0.18), inset -1px -1px 4px rgba(255,255,255,0.85)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vertical divider */}
      <div style={{ width: "1px", background: "rgba(200,185,174,0.5)", flexShrink: 0 }} />

      {/* ── Right: draggable split (default 6:4) ── */}
      <div ref={rightRef} className="flex-1 flex flex-col min-h-0">
        <div style={{ height: `${splitPct}%`, minHeight: 0, overflow: "hidden" }}>
          <CategoryPanel activeIndex={activeCatIndex} onCategoryClick={(i) => {
            const target = i * RAD_PER_CAT;
            rotRef.current = target;
            setRotation(target);
            setActiveCatIndex(i);
          }} />
        </div>

        {/* Horizontal drag divider */}
        <div
          onMouseDown={handleDividerMouseDown}
          style={{
            height: "5px",
            flexShrink: 0,
            cursor: "row-resize",
            background: "rgba(200,185,174,0.35)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,185,174,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(200,185,174,0.35)")}
        />

        <div style={{ flex: 1, minHeight: 0 }}>
          <WorksCarousel activeCategory={activeCategory} onSelect={setSelectedWork} />
        </div>
      </div>
    </div>
  );
}
