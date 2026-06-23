"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorksFilter, { type FilterState } from "@/components/works/WorksFilter";
import WorksGrid from "@/components/works/WorksGrid";
import { CATEGORIES, type Work } from "@/data/works";

export default function WorksPage() {
  const [filters, setFilters] = useState<FilterState>({ search: "", category: "", year: "" });
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const cat = selectedWork ? CATEGORIES.find((c) => c.id === selectedWork.category) : null;

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
                style={{ display: "flex", flexDirection: "column", height: "100%" }}
              >
                {/* Artwork area */}
                <div
                  style={{
                    height: "44%",
                    flexShrink: 0,
                    backgroundColor: selectedWork.bgColor,
                    position: "relative",
                  }}
                >
                  {/* Close */}
                  <button
                    onClick={close}
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "18px",
                      background: "rgba(255,255,255,0.52)",
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
                      backdropFilter: "blur(6px)",
                      boxShadow: "2px 2px 8px rgba(155,135,115,0.2)",
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Info — scrollable */}
                <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px 40px" }}>
                  {/* Category label */}
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c4b5ab", marginBottom: "10px" }}>
                    {cat?.label ?? selectedWork.category}
                  </p>

                  {/* Title + year */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 500, color: "#3d3530", margin: 0, lineHeight: 1.15 }}>
                      {selectedWork.title}
                    </h2>
                    <span style={{ fontSize: "0.75rem", color: "#b5a99e", flexShrink: 0 }}>{selectedWork.year}</span>
                  </div>

                  {/* Category description */}
                  {cat?.description && (
                    <p style={{ fontSize: "0.72rem", color: "#b5a99e", marginBottom: "28px", lineHeight: 1.6 }}>
                      {cat.description}
                    </p>
                  )}

                  {/* Work description */}
                  {selectedWork.description && (
                    <p style={{ fontSize: "0.85rem", color: "#8c7f78", lineHeight: 1.82, marginBottom: "24px" }}>
                      {selectedWork.description}
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
                            background: "#f0ebe3",
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
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Right: filter + grid ── */}
      <div
        style={{ flex: 1, overflowY: "auto", cursor: "default" }}
        onClick={close}
      >
        <div style={{ padding: "64px 52px 80px" }}>
          {/* Header */}
          <motion.h1
            animate={{ fontSize: selectedWork ? "2rem" : "3rem", marginBottom: selectedWork ? "36px" : "56px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontWeight: 300, letterSpacing: "-0.02em", color: "#3d3530" }}
          >
            Works
          </motion.h1>

          <WorksFilter filters={filters} onChange={setFilters} />
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
