"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

const PAGE_ORDER: Record<string, number> = {
  "/": 0,
  "/about": 1,
  "/works": 2,
  "/contact": 3,
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevIndexRef = useRef<number | null>(null);
  const dirRef = useRef(0);

  const currentIndex = PAGE_ORDER[pathname] ?? 0;

  if (prevIndexRef.current !== null && currentIndex !== prevIndexRef.current) {
    const total = Object.keys(PAGE_ORDER).length;
    const prev = prevIndexRef.current;
    const fwd = ((currentIndex - prev) + total) % total;
    const bwd = ((prev - currentIndex) + total) % total;
    dirRef.current = fwd <= bwd ? 1 : -1;
  }
  prevIndexRef.current = currentIndex;

  const dir = dirRef.current;

  return (
    <AnimatePresence custom={dir}>
      <motion.div
        key={pathname}
        custom={dir}
        variants={{
          initial: (d: number) => ({ x: d > 0 ? "100%" : d < 0 ? "-100%" : 0 }),
          animate: { x: 0 },
          exit:    (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="page-scroll"
        style={{
          position: "absolute",
          inset: 0,
          overflowY: pathname === "/works" ? "auto" : "hidden",
          paddingLeft: "32px",
          paddingRight: "32px",
          background: "#f4f4f2",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
