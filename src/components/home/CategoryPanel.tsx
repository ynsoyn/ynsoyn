"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/works";

const CATEGORY_FONT: Record<string, string> = {
  xr:          "'KblJumpExtended', sans-serif",
  animation:   "'SchoolSafetyChalk', sans-serif",
  interactive: "'MunmakchoHalfMoon', sans-serif",
  research:    "'BookkMyungjo', serif",
  design:      "'HsJandari', sans-serif",
};

const CATEGORY_SCALE: Record<string, number> = {
  xr:          0.8,
  animation:   1.0,
  interactive: 1.0,
  research:    1.0,
  design:      1.2,
};

interface CategoryPanelProps {
  activeIndex: number;
  onCategoryClick?: (index: number) => void;
}

export default function CategoryPanel({ activeIndex, onCategoryClick }: CategoryPanelProps) {
  const idx = activeIndex % CATEGORIES.length;

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>

      {/* ── 우측 도트 인디케이터 ── */}
      <div style={{
        position: "absolute",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        zIndex: 2,
      }}>
        {CATEGORIES.map((_, i) => {
          const isActive = i === idx;
          return (
            <motion.div
              key={i}
              animate={{
                width:      isActive ? 7 : 3,
                height:     isActive ? 7 : 3,
                background: isActive ? "#8c7f78" : "#d0c8c0",
                opacity:    isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ borderRadius: "50%", cursor: "pointer", flexShrink: 0 }}
              onClick={() => onCategoryClick?.(i)}
            />
          );
        })}
      </div>

      {/* ── 카테고리 목록 ── */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {CATEGORIES.map((cat, i) => {
          const isActive = i === idx;
          const activeFontSize = `${(3.6 * (CATEGORY_SCALE[cat.id] ?? 1)).toFixed(2)}rem`;
          return (
            <motion.div
              key={cat.id}
              initial={false}
              animate={{
                marginTop:    isActive ? "14px" : "3px",
                marginBottom: isActive ? "14px" : "3px",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ width: "100%", textAlign: "center", cursor: "pointer" }}
              onClick={() => onCategoryClick?.(i)}
            >
              {/* 레이블 — 비활성: 촘촘 + 블러 / 활성: 크고 선명 */}
              <motion.span
                initial={false}
                animate={{
                  fontSize:      isActive ? activeFontSize : "1rem",
                  color:         isActive ? "#3d3530" : "#c4b5ab",
                  letterSpacing: isActive ? "-0.02em" : "0.04em",
                  filter:        isActive ? "blur(0px)" : "blur(1.8px)",
                }}
                transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  display: "block",
                  fontWeight: isActive ? 400 : 200,
                  lineHeight: isActive ? 1.15 : 0.95,
                  fontFamily: isActive
                    ? (CATEGORY_FONT[cat.id] ?? "'Sweet', sans-serif")
                    : "'ReperipointOblique', 'Sweet', sans-serif",
                }}
              >
                {cat.label}
              </motion.span>

              {/* 설명 — 활성일 때만 렌더링, 박스 없음 */}
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    style={{
                      fontSize: "1.26rem",
                      color: "#a09088",
                      marginTop: "7px",
                      lineHeight: 1.7,
                      letterSpacing: "0.01em",
                      textAlign: "center",
                      pointerEvents: "none",
                    }}
                  >
                    {cat.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
