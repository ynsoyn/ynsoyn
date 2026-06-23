"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/works";

interface CategoryPanelProps {
  activeIndex: number;
  onCategoryClick?: (index: number) => void;
}

export default function CategoryPanel({ activeIndex, onCategoryClick }: CategoryPanelProps) {
  const idx = activeIndex % CATEGORIES.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* ── Vertical dot indicator (right side) ── */}
      <div style={{
        position: "absolute",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}>
        {CATEGORIES.map((_, i) => {
          const isActive = i === idx;
          return (
            <motion.div
              key={i}
              animate={{
                width:   isActive ? 7 : 3,
                height:  isActive ? 7 : 3,
                background: isActive ? "#8c7f78" : "#d0c8c0",
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ borderRadius: "50%", cursor: "pointer", flexShrink: 0 }}
              onClick={() => onCategoryClick?.(i)}
            />
          );
        })}
      </div>

      {/* ── Category list (centered) ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "40px 60px" }}>
        {CATEGORIES.map((cat, i) => {
          const isActive = i === idx;

          return (
            <motion.div
              key={cat.id}
              initial={false}
              animate={{
                marginTop:    isActive ? "10px" : "2px",
                marginBottom: isActive ? "10px" : "2px",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ position: "relative", cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}
              onClick={() => onCategoryClick?.(i)}
            >
              {/* Glass frame (scoped to text block) */}
              <div style={{ position: "relative", display: "inline-block", textAlign: "center" }}>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{
                        position: "absolute",
                        inset: "-16px -32px",
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.34)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        border: "1px solid rgba(255, 255, 255, 0.68)",
                        boxShadow: [
                          "0 8px 28px rgba(155,135,115,0.10)",
                          "inset 0 1.5px 0 rgba(255,255,255,0.80)",
                          "inset 0 -1px 0 rgba(200,185,174,0.18)",
                        ].join(", "),
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </AnimatePresence>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <motion.span
                    initial={false}
                    animate={{
                      fontSize:      isActive ? "2.4rem" : "0.78rem",
                      color:         isActive ? "#3d3530" : "#c4b5ab",
                      fontWeight:    isActive ? 300 : 400,
                      letterSpacing: isActive ? "-0.02em" : "0.02em",
                    }}
                    transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      display: "block",
                      lineHeight: isActive ? 1.1 : 1.6,
                      textAlign: "center",
                      fontFamily: isActive ? "'GapyeongWave', sans-serif" : undefined,
                    }}
                  >
                    {cat.label}
                  </motion.span>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        transition={{ duration: 0.25, delay: 0.15 }}
                        style={{
                          fontSize: "0.72rem",
                          color: "#a09088",
                          marginTop: "5px",
                          lineHeight: 1.7,
                          letterSpacing: "0.01em",
                          overflow: "hidden",
                          textAlign: "center",
                        }}
                      >
                        {cat.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
