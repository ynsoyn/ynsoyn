"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorksFilter, { type FilterState } from "@/components/works/WorksFilter";
import WorksGrid from "@/components/works/WorksGrid";
import { CATEGORIES, type Work } from "@/data/works";

export default function WorksPage() {
  const [filters, setFilters] = useState<FilterState>({ search: "", categories: [], tags: [], year: "" });
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  useEffect(() => { setDetailsExpanded(false); }, [selectedWork?.id]);

  const cats = selectedWork
    ? selectedWork.categories.map((cid) => CATEGORIES.find((c) => c.id === cid)).filter(Boolean)
    : [];

  const close = () => setSelectedWork(null);

  return (
    <div
      style={{ height: "calc(100vh - 72px)", display: "flex", overflow: "hidden" }}
    >
      {/* ── Left: detail panel ── */}
      <motion.div
        animate={{ width: selectedWork ? "44%" : "0%" }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        style={{ flexShrink: 0, overflow: "hidden", position: "relative" }}
      >
        {/* Inner content — fixed width so it doesn't reflow during animation */}
        <div style={{ width: "44vw", height: "100%", display: "flex", flexDirection: "column", borderRight: "1px solid rgba(200,185,174,0.45)" }}>
          <AnimatePresence mode="wait">
            {selectedWork && (
              <motion.div
                key={selectedWork.id}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: 0.18, duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}
              >
                {/* X 버튼 — 패널 상단에 항상 고정 */}
                <button
                  onClick={close}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "18px",
                    zIndex: 10,
                    background: "rgba(255,255,255,0.72)",
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    color: "#6b5f59",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(8px)",
                    boxShadow: "3px 3px 10px rgba(155,135,115,0.22), -2px -2px 6px rgba(255,255,255,0.9)",
                  }}
                >
                  ✕
                </button>

                {/* Artwork area */}
                <div
                  style={{
                    height: "44%",
                    flexShrink: 0,
                    backgroundColor: selectedWork.bgColor,
                    position: "relative",
                  }}
                />

                {/* Info — scrollable */}
                <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px 40px" }}>
                  {/* Category label */}
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c4b5ab", marginBottom: "10px", fontFamily: "'ReperipointOblique', sans-serif", fontWeight: 200 }}>
                    {cats.map((c) => c!.label).join(" · ")}
                  </p>

                  {/* Year + title */}
                  <span style={{ fontSize: "0.75rem", color: "#b5a99e", display: "block", marginBottom: "4px" }}>{selectedWork.year}</span>
                  <h2 style={{ fontSize: "2rem", fontWeight: 500, color: "#3d3530", margin: "0 0 8px", lineHeight: 1.15, fontFamily: "'Presentation', sans-serif" }}>
                    {selectedWork.title}
                  </h2>

                  {/* Category description */}
                  {cats[0]?.description && (
                    <p style={{ fontSize: "0.72rem", color: "#b5a99e", marginBottom: "28px", lineHeight: 1.6 }}>
                      {cats[0].description}
                    </p>
                  )}

                  {/* Work description + details (인라인으로 이어짐) */}
                  {selectedWork.description && (
                    <p style={{ fontSize: "0.85rem", color: "#8c7f78", lineHeight: 1.82, marginBottom: "24px", fontFamily: "'Presentation', sans-serif" }}>
                      {selectedWork.description}
                      {selectedWork.details && (
                        <>
                          {detailsExpanded && (
                            <span style={{ color: "#a09088" }}>{" "}{selectedWork.details}</span>
                          )}
                          {" "}
                          <button
                            onClick={() => setDetailsExpanded((v) => !v)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.72rem",
                              color: "#b5a99e",
                              padding: 0,
                              fontFamily: "'ReperipointOblique', sans-serif",
                              fontWeight: 200,
                              letterSpacing: "0.08em",
                              textDecoration: "underline",
                              textUnderlineOffset: "3px",
                              verticalAlign: "baseline",
                            }}
                          >
                            {detailsExpanded ? "접기" : "더보기..."}
                          </button>
                        </>
                      )}
                    </p>
                  )}

                  {/* Tags */}
                  {selectedWork.tags && selectedWork.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {selectedWork.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.62rem",
                            padding: "5px 14px",
                            borderRadius: "999px",
                            background: "#f4f4f2",
                            color: "#8c7f78",
                            boxShadow: "inset 2px 2px 5px rgba(155,135,115,0.18), inset -1px -1px 4px rgba(255,255,255,0.85)",
                            letterSpacing: "0.08em",
                            fontFamily: "'CloudSansCode', monospace",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Right: filter + grid ── */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "40px 52px 80px" }}>
          {/* Header row: 제목 좌 · 필터 우 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", marginBottom: "40px" }}>
            <motion.h1
              initial={false}
              animate={{ fontSize: selectedWork ? "2rem" : "3rem" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontWeight: 700, letterSpacing: "-0.02em", color: "#3d3530", fontFamily: "'SchoolSafetyNotification', sans-serif", flexShrink: 0, margin: 0 }}
            >
              Works
            </motion.h1>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <WorksFilter filters={filters} onChange={setFilters} />
            </div>
          </div>

          <WorksGrid
            filters={filters}
            selectedId={selectedWork?.id}
            onSelect={setSelectedWork}
          />
        </div>
      </div>
    </div>
  );
}
