"use client";

import { useRef, useEffect, useState } from "react";
import { CATEGORIES, WORKS, type CategoryId } from "@/data/works";

export interface FilterState {
  search: string;
  categories: CategoryId[];
  tags: string[];
  year: number | "";
}

interface WorksFilterProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const YEARS = Array.from(new Set(WORKS.map((w) => w.year))).sort((a, b) => b - a);

const FILTER_TAGS = ["VR", "XR", "3D", "Maya", "Unity", "Animation", "Research", "Interaction", "Figma", "AI", "Dev"];

const NEU_RAISED = "5px 5px 12px rgba(155,135,115,0.26), -3px -3px 9px rgba(255,255,255,0.92)";
const NEU_ACTIVE = "inset 3px 3px 8px rgba(155,135,115,0.22), inset -2px -2px 6px rgba(255,255,255,0.85)";
const NEU_INSET  = "inset 4px 4px 10px rgba(155,135,115,0.2), inset -3px -3px 8px rgba(255,255,255,0.85)";

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.57rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c4b5ab",
  fontFamily: "'ReperipointOblique', sans-serif",
  fontWeight: 200,
  marginBottom: "6px",
  display: "block",
  textAlign: "right",
};

function YearDropdown({ value, onSelect }: { value: number | ""; onSelect: (v: number | "") => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const active = Boolean(value);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = NEU_ACTIVE; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = active ? NEU_ACTIVE : "none"; }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 14px",
          fontSize: "0.72rem",
          borderRadius: "999px",
          background: active ? "#f4f4f2" : "transparent",
          color: active ? "#3d3530" : "#8c7f78",
          fontWeight: active ? 600 : 400,
          boxShadow: active ? NEU_ACTIVE : "none",
          border: active ? "none" : "1px solid rgba(180,165,155,0.38)",
          outline: "none",
          cursor: "pointer",
          transition: "all 0.18s ease",
          whiteSpace: "nowrap",
        }}
      >
        <span>{value || "Year"}</span>
        <svg
          style={{ width: "12px", height: "12px", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            minWidth: "120px",
            zIndex: 50,
            borderRadius: "16px",
            overflow: "hidden",
            background: "#f4f4f2",
            boxShadow: "8px 8px 20px rgba(155,135,115,0.28), -4px -4px 14px rgba(255,255,255,0.9)",
          }}
        >
          <button
            style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: "0.84rem", color: "#b5a99e", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#8c7f78"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#b5a99e"; }}
            onClick={() => { onSelect(""); setOpen(false); }}
          >
            전체
          </button>
          {YEARS.map((y) => (
            <button
              key={y}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                fontSize: "0.84rem",
                color: y === value ? "#3d3530" : "#6b5f59",
                fontWeight: y === value ? 600 : 400,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.55)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              onClick={() => { onSelect(y); setOpen(false); }}
            >
              {y}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorksFilter({ filters, onChange }: WorksFilterProps) {
  const hasFilter = filters.search || filters.categories.length > 0 || filters.tags.length > 0 || filters.year;

  const toggleCategory = (id: CategoryId) => {
    const next = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onChange({ ...filters, categories: next });
  };

  const toggleTag = (tag: string) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags: next });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>

      {/* ── 컨트롤: Year · Search · Reset ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <YearDropdown value={filters.year} onSelect={(v) => onChange({ ...filters, year: v })} />

        {/* Search — 텍스트 중앙, 아이콘 오른쪽 */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            style={{
              padding: "5px 30px 5px 12px",
              textAlign: "center",
              fontSize: "0.72rem",
              borderRadius: "999px",
              outline: "none",
              width: "150px",
              background: "#f4f4f2",
              color: "#3d3530",
              boxShadow: NEU_INSET,
              border: "none",
            }}
          />
          <svg
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}
            width="14" height="14"
            fill="none" viewBox="0 0 24 24" stroke="#b5a99e" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>

        {/* Reset — 정원 + 입체 효과 */}
        <button
          onClick={() => onChange({ search: "", categories: [], tags: [], year: "" })}
          disabled={!hasFilter}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "none",
            cursor: hasFilter ? "pointer" : "default",
            background: "#f4f4f2",
            color: hasFilter ? "#8c7f78" : "#c4b5ab",
            opacity: hasFilter ? 1 : 0.45,
            fontSize: "0.85rem",
            lineHeight: 1,
            boxShadow: hasFilter ? NEU_RAISED : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.18s ease",
          }}
          onMouseEnter={(e) => { if (hasFilter) (e.currentTarget as HTMLButtonElement).style.boxShadow = NEU_ACTIVE; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = hasFilter ? NEU_RAISED : "none"; }}
        >
          ↺
        </button>
      </div>

      {/* ── Category ── */}
      <div>
        <span style={LABEL_STYLE}>category</span>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                style={{
                  padding: "5px 12px",
                  fontSize: "0.68rem",
                  borderRadius: "999px",
                  border: active ? "none" : "1px solid rgba(180,165,155,0.38)",
                  cursor: "pointer",
                  background: active ? "#f4f4f2" : "transparent",
                  color: active ? "#3d3530" : "#8c7f78",
                  fontWeight: active ? 600 : 400,
                  boxShadow: active ? NEU_ACTIVE : "none",
                  letterSpacing: "0.01em",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = NEU_ACTIVE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = active ? NEU_ACTIVE : "none"; }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Skill ── */}
      <div style={{ maxWidth: "440px" }}>
        <span style={LABEL_STYLE}>skill</span>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", flexWrap: "wrap" }}>
          {FILTER_TAGS.map((tag) => {
            const active = filters.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: "4px 10px",
                  fontSize: "0.64rem",
                  borderRadius: "999px",
                  border: active ? "none" : "1px solid rgba(180,165,155,0.35)",
                  cursor: "pointer",
                  background: active ? "#f4f4f2" : "transparent",
                  color: active ? "#3d3530" : "#a09088",
                  fontWeight: active ? 600 : 400,
                  boxShadow: active ? NEU_ACTIVE : "none",
                  letterSpacing: "0.01em",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = NEU_ACTIVE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = active ? NEU_ACTIVE : "none"; }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
