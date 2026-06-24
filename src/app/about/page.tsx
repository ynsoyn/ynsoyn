"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import NodeDetailPanel, { type NodeInfo } from "@/components/about/NodeDetailPanel";

const CharacterScene = dynamic(() => import("@/components/about/CharacterScene"), { ssr: false });
const SpaceGraphScene = dynamic(() => import("@/components/about/SpaceGraphScene"), { ssr: false });

const SNS_LINKS = [
  { label: "LinkedIn",  href: "https://linkedin.com/in/soyn-yn-58ab79414" },
  { label: "YouTube",   href: "https://youtube.com/@ynsoworks" },
  { label: "GitHub",    href: "https://github.com/ynsoyn" },
];

const EDUCATION = [
  { period: "2025—2027", school: "경희대학교 일반대학원", dept: "실감AX융합학과 공학 석사" },
  { period: "2014—2019", school: "중앙대학교 예술대학교", dept: "미술학부 조소전공 미술 학사" },
  { period: "2011—2014", school: "계원예술고등학교", dept: "미술과" },
];

const CAREER_WORKS = [
  "환혼 Part 1/2 (tvN)",
  "한산: 용의 출현",
  "아일랜드 (TVING)",
  "스위트홈 시즌2 (Netflix)",
  "킬러들의 쇼핑몰 (Disney+)",
  "소년심판 (Netflix)",
  "모범가족 (Netflix)",
  "뉴 노멀",
];

const DIV_V = <div style={{ width: "1px", flexShrink: 0, background: "rgba(200,185,174,0.4)" }} />;

const GLASS: React.CSSProperties = {
  borderRadius: "20px",
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.28)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255, 255, 255, 0.65)",
  boxShadow: [
    "0 6px 28px rgba(155,135,115,0.12)",
    "4px 4px 14px rgba(155,135,115,0.10)",
    "inset 0 1.5px 0 rgba(255,255,255,0.88)",
    "inset 0 -1px 0 rgba(200,185,174,0.16)",
    "inset 1px 0 0 rgba(255,255,255,0.5)",
  ].join(", "),
};

export default function AboutPage() {
  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);

  return (
    <div style={{ height: "calc(100vh - 72px)", display: "flex", overflow: "hidden" }}>

      {/* ══ Left block (55%) ══ */}
      <div style={{ width: "55%", display: "flex", flexDirection: "column", flexShrink: 0, padding: "14px 10px 14px 16px", gap: "10px" }}>

        {/* Top row (flex: 2) — Character | Detail  as glass cards */}
        <div style={{ flex: 2, minHeight: 0, display: "flex", gap: "10px" }}>

          {/* Character glass card */}
          <div style={{ flex: 1, minWidth: 0, position: "relative", ...GLASS }}>
            <CharacterScene />
          </div>

          {/* Node detail glass card */}
          <div style={{ flex: 1, minWidth: 0, ...GLASS }}>
            <NodeDetailPanel node={selectedNode} onDeselect={() => setSelectedNode(null)} />
          </div>
        </div>

        {/* Bottom bio (flex: 3) */}
        <div style={{ flex: 3, minHeight: 0, position: "relative", borderTop: "1px solid rgba(200,185,174,0.35)" }}>
        <div style={{ position: "absolute", inset: 0, overflowY: "auto", overflowX: "auto", display: "flex" }}>
          {/* Name + title + links */}
          <div style={{ flex: "0 0 auto", padding: "22px 28px 20px", minWidth: "170px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#3d3530", lineHeight: 1.15, marginBottom: "6px", fontFamily: "'SchoolSafetyNotification', sans-serif" }}>
                윤소연
              </h1>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c4b5ab" }}>
                3D · XR · 3DUX · Virtual Designer
              </p>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {SNS_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ fontSize: "0.7rem", color: "#8c7f78", textDecoration: "none", transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.45")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {DIV_V}

          {/* Education */}
          <div style={{ flex: 1, padding: "22px 24px 20px", minWidth: 0 }}>
            <p style={{ fontSize: "0.57rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c4b5ab", marginBottom: "12px", fontFamily: "'ReperipointOblique', sans-serif", fontWeight: 200 }}>
              Education
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {EDUCATION.map((e) => (
                <li key={e.school}>
                  <p style={{ fontSize: "0.58rem", color: "#b5a99e", marginBottom: "1px", fontFamily: "'Presentation', sans-serif" }}>{e.period}</p>
                  <p style={{ fontSize: "0.74rem", color: "#6b5f59", fontWeight: 500, marginBottom: "1px", fontFamily: "'Presentation', sans-serif" }}>{e.school}</p>
                  <p style={{ fontSize: "0.64rem", color: "#a09088", fontFamily: "'Presentation', sans-serif" }}>{e.dept}</p>
                </li>
              ))}
            </ul>
          </div>

          {DIV_V}

          {/* Career */}
          <div style={{ flex: 1, padding: "22px 24px 20px", minWidth: 0 }}>
            <p style={{ fontSize: "0.57rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c4b5ab", marginBottom: "12px", fontFamily: "'ReperipointOblique', sans-serif", fontWeight: 200 }}>
              Career
            </p>
            <p style={{ fontSize: "0.58rem", color: "#b5a99e", marginBottom: "1px", fontFamily: "'Presentation', sans-serif" }}>2021—2023</p>
            <p style={{ fontSize: "0.74rem", color: "#6b5f59", fontWeight: 500, marginBottom: "1px", fontFamily: "'Presentation', sans-serif" }}>위지윅 스튜디오</p>
            <p style={{ fontSize: "0.64rem", color: "#a09088", marginBottom: "10px", fontFamily: "'Presentation', sans-serif" }}>VFX Animator</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {CAREER_WORKS.map((t) => (
                <li key={t} style={{ fontSize: "0.62rem", color: "#b5a99e", fontFamily: "'Presentation', sans-serif" }}>— {t}</li>
              ))}
            </ul>
          </div>

        </div>
        </div>
      </div>

      {/* Vertical divider */}
      {DIV_V}

      {/* ══ Right: Space graph ══ */}
      <div style={{ flex: 1, position: "relative", minWidth: 0, height: "100%" }}>
        <SpaceGraphScene onNodeClick={setSelectedNode} />
      </div>
    </div>
  );
}
