"use client";

import { useRef, useEffect, useState } from "react";
import { CATEGORIES, WORKS, type CategoryId } from "@/data/works";

export interface FilterState {
  search: string;
  category: CategoryId | "";
  year: number | "";
}

interface WorksFilterProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const YEARS = Array.from(new Set(WORKS.map((w) => w.year))).sort((a, b) => b - a);

const NEU_RAISED = "5px 5px 12px rgba(155,135,115,0.26), -3px -3px 9px rgba(255,255,255,0.92)";
const NEU_ACTIVE = "inset 3px 3px 8px rgba(155,135,115,0.22), inset -2px -2px 6px rgba(255,255,255,0.85)";
const NEU_INSET  = "inset 4px 4px 10px rgba(155,135,115,0.2), inset -3px -3px 8px rgba(255,255,255,0.85)";

function Dropdown({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);
  const active = Boolean(value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-full transition-all"
        style={{
          background: "#f0ebe3",
          color: active ? "#3d3530" : "#8c7f78",
          fontWeight: active ? 600 : 400,
          boxShadow: active ? NEU_ACTIVE : NEU_RAISED,
          border: "none",
          outline: "none",
        }}
      >
        <span>{selected ? selected.label : label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 min-w-[160px] z-50 rounded-2xl overflow-hidden"
          style={{
            background: "#f0ebe3",
            boxShadow: "8px 8px 20px rgba(155,135,115,0.28), -4px -4px 14px rgba(255,255,255,0.9)",
          }}
        >
          <button
            className="w-full text-left px-4 py-2.5 text-sm transition-all"
            style={{ color: "#b5a99e", background: "transparent" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8c7f78")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#b5a99e")}
            onClick={() => { onSelect(""); setOpen(false); }}
          >
            전체
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              className="w-full text-left px-4 py-2.5 text-sm transition-all"
              style={{
                color: opt.value === value ? "#3d3530" : "#6b5f59",
                fontWeight: opt.value === value ? 600 : 400,
                background: "transparent",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.55)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
              onClick={() => { onSelect(opt.value); setOpen(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorksFilter({ filters, onChange }: WorksFilterProps) {
  const categoryOptions = CATEGORIES.map((c) => ({ label: c.label, value: c.id }));
  const yearOptions = YEARS.map((y) => ({ label: String(y), value: String(y) }));
  const hasFilter = filters.search || filters.category || filters.year;

  return (
    <div
      className="flex items-center gap-4 flex-wrap mb-12 pb-10"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}
    >
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
          style={{ color: "#b5a99e" }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="검색"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-9 pr-4 py-2.5 text-sm rounded-full outline-none w-44 transition-all"
          style={{
            background: "#f0ebe3",
            color: "#3d3530",
            boxShadow: NEU_INSET,
            border: "none",
          }}
        />
      </div>

      <Dropdown
        label="카테고리"
        value={filters.category}
        options={categoryOptions}
        onSelect={(v) => onChange({ ...filters, category: v as CategoryId | "" })}
      />

      <Dropdown
        label="연도"
        value={filters.year ? String(filters.year) : ""}
        options={yearOptions}
        onSelect={(v) => onChange({ ...filters, year: v ? Number(v) : "" })}
      />

      {hasFilter && (
        <button
          onClick={() => onChange({ search: "", category: "", year: "" })}
          className="px-4 py-2.5 text-sm rounded-full transition-all"
          style={{ color: "#b5a99e", background: "transparent", border: "none" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8c7f78")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#b5a99e")}
        >
          초기화
        </button>
      )}
    </div>
  );
}
