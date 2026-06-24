"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text, OrbitControls, Billboard } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three"; // OrbitControls mouseButtons 용
import { type NodeInfo } from "./NodeDetailPanel";

type Vec3 = [number, number, number];

interface NodeDef {
  id: string;
  label: string;
  pos: Vec3;
  size: number;
  color: string;
  glow?: boolean;
  description?: string;
}

// ── 노드 정의 ─────────────────────────────────────────────────────────────────
// description: 노드 클릭 시 디테일 패널에 표시되는 내용. 직접 수정 가능.
const NODES: NodeDef[] = [
  {
    id: "center", label: "✦ ynsoyn", pos: [0, 0, 0], size: 0.18, color: "#c8687e", glow: true,
    description: "예술에서 출발해 XR 연구자로 — 만들고, 탐구하고, 코딩합니다.",
  },

  // ── Level 1: 주요 분야 ──────────────────────────────────────────────────────
  {
    id: "3d", label: "🔷 3D", pos: [-0.85, 0.26, 0.13], size: 0.10, color: "#d4899a", glow: true,
    description: "Autodesk Maya 중심의 3D 모델링 · 조각 · 애니메이션.",
  },
  {
    id: "motion", label: "🎬 Motion", pos: [0.39, 0.65, 0.26], size: 0.10, color: "#c890a8", glow: true,
    description: "After Effects · Premiere 기반 모션그래픽과 영상 편집.",
  },
  {
    id: "visual", label: "🎨 Visual", pos: [0.72, 0.07, 0.46], size: 0.10, color: "#c4a0b4", glow: true,
    description: "Figma · Photoshop · DaVinci로 시각 작업 전반.",
  },
  {
    id: "code", label: "💻 Code", pos: [-0.26, -0.65, 0.52], size: 0.10, color: "#b8a0c4", glow: true,
    description: "Unity + Vibe Coding. 비전공자 출신의 실전 코더.",
  },
  {
    id: "research", label: "🔭 Research", pos: [0.20, 0.33, 0.78], size: 0.10, color: "#c0accc", glow: true,
    description: "경희대 실감AX융합학과 석사. XR · 감각 · 인터랙션 연구.",
  },
  {
    id: "worktool", label: "⚙️ Work Tool", pos: [-0.65, -0.33, -0.46], size: 0.10, color: "#d4a0ac", glow: true,
    description: "VFX 파이프라인(ShotGrid)과 개발 관리(GitHub).",
  },
  {
    id: "aitools", label: "🤖 AI Tools", pos: [0.46, 0.26, -0.65], size: 0.10, color: "#cc9898", glow: true,
    description: "ChatGPT · Claude · Gemini — 연구와 창작에 AI를 적극 활용.",
  },

  // ── 3D 도구 ─────────────────────────────────────────────────────────────────
  {
    id: "maya", label: "🏺 Autodesk Maya", pos: [-1.37, 0.59, -0.07], size: 0.06, color: "#e0b0b8",
    description: "VFX 회사 2년 메인 툴. 캐릭터 · 시뮬레이션 · 렌더링.",
  },
  {
    id: "blender", label: "🔵 Blender", pos: [-1.30, 0.07, 0.39], size: 0.06, color: "#e0b8c0",
    description: "개인 프로젝트 · 프로토타이핑 · 빠른 3D 작업.",
  },
  {
    id: "unity3d", label: "🎮 Unity", pos: [-1.17, 0.52, 0.52], size: 0.06, color: "#d8b4bc",
    description: "XR 콘텐츠와 3D 씬 제작의 핵심 엔진.",
  },

  // ── Motion / 영상 ────────────────────────────────────────────────────────────
  {
    id: "ae", label: "⚡ After Effects", pos: [0.85, 1.04, 0.13], size: 0.06, color: "#d8b0c4",
    description: "VFX 컴포지팅과 모션그래픽. Adobe 생태계 핵심 툴.",
  },
  {
    id: "premiere", label: "🎞 Premiere", pos: [0.46, 1.04, 0.65], size: 0.06, color: "#dcb8cc",
    description: "영상 편집 및 타임라인 작업.",
  },

  // ── Visual 디자인 ────────────────────────────────────────────────────────────
  {
    id: "figma", label: "📐 Figma", pos: [1.17, 0.33, 0.26], size: 0.06, color: "#d4b4c0",
    description: "UI 설계, 프로토타이핑, 협업 디자인.",
  },
  {
    id: "photoshop", label: "🖌 Photoshop", pos: [1.24, -0.33, 0.26], size: 0.06, color: "#d8bcc8",
    description: "텍스처, 이미지 편집, 소스 제작.",
  },
  {
    id: "davinci", label: "🌈 DaVinci Resolve", pos: [0.91, -0.26, 0.91], size: 0.06, color: "#d0b8c4",
    description: "고급 색보정과 영상 후반 작업.",
  },

  // ── Code ─────────────────────────────────────────────────────────────────────
  {
    id: "unitycode", label: "🎮 Unity", pos: [-0.59, -1.11, 0.26], size: 0.06, color: "#c8b0cc",
    description: "C#으로 XR 앱 · 인터랙션 · 게임 개발.",
  },
  {
    id: "vibe", label: "🎵 Vibe Coding", pos: [-0.33, -1.17, 0.78], size: 0.06, color: "#ccb4d0",
    description: "AI와 함께 아이디어를 코드로 빠르게 실현하는 방식. 이 사이트도 그렇게 만들었어요.",
  },

  // ── Research ─────────────────────────────────────────────────────────────────
  {
    id: "xr", label: "🥽 XR", pos: [0.33, 0.78, 1.17], size: 0.06, color: "#c4b0d0",
    description: "VR · AR · MR 경험 설계. 멀미 저감, VR 조소, 엑서게임 등.",
  },
  {
    id: "interaction", label: "👆 Interaction", pos: [-0.20, 0.59, 1.24], size: 0.06, color: "#c8b8d4",
    description: "인터랙션 연구 · 인터페이스 설계 · 사용자 경험.",
  },

  // ── Work Tool ────────────────────────────────────────────────────────────────
  {
    id: "shotgrid", label: "🎯 ShotGrid", pos: [-1.17, -0.59, -0.72], size: 0.06, color: "#ddbcc4",
    description: "VFX 파이프라인 관리. 회사 재직 당시 메인 협업 툴.",
  },
  {
    id: "github", label: "🐙 GitHub", pos: [-0.98, 0.0, -0.91], size: 0.06, color: "#d8b4be",
    description: "개인 프로젝트 버전 관리. github.com/ynsoyn",
  },

  // ── AI Tools ─────────────────────────────────────────────────────────────────
  {
    id: "chatgpt", label: "💬 ChatGPT", pos: [0.91, 0.65, -0.91], size: 0.06, color: "#d4b0b0",
    description: "리서치, 아이디어 발산, 텍스트 작업에 활용.",
  },
  {
    id: "claude", label: "🌸 Claude", pos: [0.59, -0.07, -1.11], size: 0.06, color: "#d8b4b4",
    description: "이 사이트도 Claude와 함께 만들었습니다.",
  },
  {
    id: "gemini", label: "💫 Gemini", pos: [0.20, 0.59, -1.04], size: 0.06, color: "#d0b0b8",
    description: "구글 생태계 연동 작업 및 멀티모달 활용.",
  },

  // ── 심화 ─────────────────────────────────────────────────────────────────────
  {
    id: "animation", label: "🎭 Animation", pos: [-1.82, 0.98, -0.33], size: 0.045, color: "#e8c8cc",
    description: "드라마 · 영화 VFX 애니메이션. 환혼, 한산, 아일랜드, 스위트홈 등 참여.",
  },
];

// ── 엣지 정의 (관련성 기반 연결) ───────────────────────────────────────────────
// 계층 구조가 아니라 개념적 연관성으로 연결됨.
// 추가/삭제: ["노드id", "노드id"] 형태로 자유롭게 수정 가능.
const EDGES: [string, string][] = [
  // 중심 → 주요 분야
  ["center", "3d"], ["center", "motion"], ["center", "visual"],
  ["center", "code"], ["center", "research"], ["center", "worktool"], ["center", "aitools"],

  // 3D 도구 간
  ["3d", "maya"], ["3d", "blender"], ["3d", "unity3d"],
  ["maya", "blender"],           // 둘 다 3D 모델링 툴

  // Animation · VFX 워크플로우
  ["maya", "animation"],         // Maya로 애니메이션 제작
  ["3d", "animation"],           // 3D 분야와 직결
  ["animation", "ae"],           // 애니메이션 → AE 컴포지팅
  ["motion", "ae"], ["motion", "premiere"],
  ["ae", "premiere"],            // Adobe 편집 툴 연결
  ["premiere", "davinci"],       // 영상 편집 도구 연결
  ["photoshop", "ae"],           // 포토샵 소스 → AE 컴포지팅

  // Visual 디자인
  ["visual", "figma"], ["visual", "photoshop"], ["visual", "davinci"],
  ["figma", "photoshop"],        // 디자인 툴 연결

  // XR · 연구
  ["research", "xr"], ["research", "interaction"],
  ["xr", "interaction"],         // XR 연구 ↔ 인터랙션 연구
  ["xr", "unity3d"],             // XR 개발 = Unity
  ["xr", "animation"],           // VR + 세계관 애니메이션
  ["figma", "interaction"],      // UI 디자인 ↔ 인터랙션 연구

  // Code
  ["code", "unitycode"], ["code", "vibe"],
  ["unitycode", "unity3d"],      // 코드 Unity = 3D Unity (동일 툴)
  ["unitycode", "xr"],           // Unity 개발 → XR 앱

  // AI Tools
  ["aitools", "chatgpt"], ["aitools", "claude"], ["aitools", "gemini"],
  ["claude", "vibe"],            // Claude → Vibe Coding
  ["chatgpt", "vibe"],           // ChatGPT → Vibe Coding
  ["aitools", "research"],       // AI 툴 ↔ 연구

  // Work Tool
  ["worktool", "shotgrid"], ["worktool", "github"],
  ["shotgrid", "maya"],          // ShotGrid ↔ Maya (VFX 파이프라인)
  ["github", "vibe"],            // GitHub ↔ Vibe Coding
  ["github", "unitycode"],       // GitHub ↔ Unity 개발
];

function Graph({ onNodeClick }: { onNodeClick?: (node: NodeInfo) => void }) {
  const groupRef = useRef<THREE.Group>(null!);

  const nodeMap = useMemo(() => {
    const m: Record<string, Vec3> = {};
    NODES.forEach((n) => { m[n.id] = n.pos; });
    return m;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.09;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.09;
    }
  });

  return (
    <group ref={groupRef}>
      {NODES.map((node) => (
        <Billboard key={node.id} position={node.pos}>
          <Text
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick?.({ id: node.id, label: node.label, color: node.color, description: node.description });
            }}
            fontSize={node.size * 0.72}
            color={node.color}
            anchorX="center"
            anchorY="middle"
            maxWidth={node.size * 4}
            fillOpacity={0.95}
            lineHeight={1.2}
          >
            {node.label}
          </Text>
        </Billboard>
      ))}

      {EDGES.map(([a, b]) => (
        <Line
          key={`${a}-${b}`}
          points={[nodeMap[a], nodeMap[b]]}
          color="#d4b0b8"
          lineWidth={0.55}
          transparent
          opacity={0.38}
        />
      ))}
    </group>
  );
}

interface SpaceGraphSceneProps {
  onNodeClick?: (node: NodeInfo) => void;
}

export default function SpaceGraphScene({ onNodeClick }: SpaceGraphSceneProps) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={1}
        style={{ background: "transparent", cursor: "grab", width: "100%", height: "100%" }}
      >
        <OrbitControls
          enableZoom
          enablePan
          minDistance={1.6}
          maxDistance={7}
          mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.DOLLY }}
        />
        <Graph onNodeClick={onNodeClick} />
      </Canvas>
    </div>
  );
}
