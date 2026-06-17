"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/works";

interface CategoryPanelProps {
  activeIndex: number;
}

export default function CategoryPanel({ activeIndex }: CategoryPanelProps) {
  const idx = activeIndex % CATEGORIES.length;
  const category = CATEGORIES[idx];

  return (
    <div className="flex flex-col justify-center h-full px-10 py-8 select-none">
      {/* Category tabs */}
      <div className="flex gap-6 mb-8">
        {CATEGORIES.map((cat, i) => (
          <span
            key={cat.id}
            className={`text-[11px] uppercase tracking-[0.15em] transition-opacity duration-300 ${
              i === idx ? "opacity-100 font-semibold" : "opacity-25 font-normal"
            }`}
          >
            {cat.label}
          </span>
        ))}
      </div>

      {/* Active category content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="border-l-2 border-black pl-6 py-3"
        >
          <h2 className="text-5xl font-light tracking-tight leading-none mb-4">
            {category.label}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {category.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Scroll hint */}
      <div className="mt-10 space-y-2">
        <div className="h-px bg-gray-200 w-full" />
        <div className="h-px bg-gray-200 w-4/5" />
        <p className="text-[10px] text-gray-300 tracking-widest uppercase mt-4">
          scroll to explore
        </p>
      </div>
    </div>
  );
}
