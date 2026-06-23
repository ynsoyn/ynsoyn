"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WORKS, type Work } from "@/data/works";
import { type FilterState } from "./WorksFilter";

interface WorksGridProps {
  filters: FilterState;
  selectedId?: string;
  onSelect?: (work: Work) => void;
}

const NEU_CARD      = "6px 6px 16px rgba(155,135,115,0.24), -4px -4px 12px rgba(255,255,255,0.92)";
const NEU_CARD_HOVER= "9px 9px 22px rgba(155,135,115,0.3), -5px -5px 16px rgba(255,255,255,0.96)";
const NEU_SELECTED  = "inset 4px 4px 10px rgba(155,135,115,0.22), inset -3px -3px 8px rgba(255,255,255,0.85)";

export default function WorksGrid({ filters, selectedId, onSelect }: WorksGridProps) {
  const filtered = WORKS.filter((w) => {
    if (filters.category && w.category !== filters.category) return false;
    if (filters.year && w.year !== filters.year) return false;
    if (filters.search && !w.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {filtered.length === 0 ? (
        <p className="text-sm py-16 text-center" style={{ color: "#b5a99e" }}>
          해당하는 작업물이 없습니다.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "32px 32px" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((work) => {
              const isSelected = work.id === selectedId;
              return (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="group cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); onSelect?.(work); }}
                >
                  {/* Thumbnail */}
                  <div
                    className="w-full aspect-[4/3] relative overflow-hidden mb-3 transition-all duration-300"
                    style={{
                      backgroundColor: work.bgColor,
                      borderRadius: "16px",
                      boxShadow: isSelected ? NEU_SELECTED : NEU_CARD,
                      outline: isSelected ? `2px solid rgba(155,135,115,0.35)` : "2px solid transparent",
                      transform: isSelected ? "scale(0.98)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (isSelected) return;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = NEU_CARD_HOVER;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      if (isSelected) return;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = NEU_CARD;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    }}
                  />
                  {/* Info */}
                  <div className="flex items-baseline justify-between px-1">
                    <p className="text-sm font-medium" style={{ color: isSelected ? "#3d3530" : "#6b5f59" }}>
                      {work.title}
                    </p>
                    <p className="text-xs" style={{ color: "#b5a99e" }}>{work.year}</p>
                  </div>
                  <p className="text-xs mt-1 px-1 uppercase tracking-wider" style={{ color: "#c4b5ab" }}>
                    {work.category}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
