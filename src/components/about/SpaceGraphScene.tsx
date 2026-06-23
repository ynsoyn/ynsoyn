"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text, OrbitControls, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { type NodeInfo } from "./NodeDetailPanel";

type Vec3 = [number, number, number];

interface NodeDef {
  id: string;
  label: string;
  pos: Vec3;
  size: number;
  color: string;
  glow?: boolean;
}

// Warm rose/pastel palette — nodes scaled 0.65x closer
const NODES: NodeDef[] = [
  // Center
  { id: "center",      label: "ynsoyn",         pos: [0, 0, 0],               size: 0.18,  color: "#c8687e", glow: true },

  // Level 1
  { id: "3d",          label: "3D",              pos: [-0.85, 0.26, 0.13],     size: 0.10,  color: "#d4899a", glow: true },
  { id: "motion",      label: "Motion",          pos: [0.39, 0.65, 0.26],      size: 0.10,  color: "#c890a8", glow: true },
  { id: "visual",      label: "Visual",          pos: [0.72, 0.07, 0.46],      size: 0.10,  color: "#c4a0b4", glow: true },
  { id: "code",        label: "Code",            pos: [-0.26, -0.65, 0.52],    size: 0.10,  color: "#b8a0c4", glow: true },
  { id: "research",    label: "Research",        pos: [0.20, 0.33, 0.78],      size: 0.10,  color: "#c0accc", glow: true },
  { id: "worktool",    label: "Work Tool",       pos: [-0.65, -0.33, -0.46],   size: 0.10,  color: "#d4a0ac", glow: true },
  { id: "aitools",     label: "AI Tools",        pos: [0.46, 0.26, -0.65],     size: 0.10,  color: "#cc9898", glow: true },

  // Level 2 — 3D
  { id: "maya",        label: "Autodesk Maya",   pos: [-1.37, 0.59, -0.07],    size: 0.06,  color: "#e0b0b8" },
  { id: "blender",     label: "Blender",         pos: [-1.30, 0.07, 0.39],     size: 0.06,  color: "#e0b8c0" },
  { id: "unity3d",     label: "Unity",           pos: [-1.17, 0.52, 0.52],     size: 0.06,  color: "#d8b4bc" },

  // Level 2 — Motion
  { id: "ae",          label: "After Effects",   pos: [0.85, 1.04, 0.13],      size: 0.06,  color: "#d8b0c4" },
  { id: "premiere",    label: "Premiere",        pos: [0.46, 1.04, 0.65],      size: 0.06,  color: "#dcb8cc" },

  // Level 2 — Visual
  { id: "figma",       label: "Figma",           pos: [1.17, 0.33, 0.26],      size: 0.06,  color: "#d4b4c0" },
  { id: "photoshop",   label: "Photoshop",       pos: [1.24, -0.33, 0.26],     size: 0.06,  color: "#d8bcc8" },
  { id: "davinci",     label: "DaVinci Resolve", pos: [0.91, -0.26, 0.91],     size: 0.06,  color: "#d0b8c4" },

  // Level 2 — Code
  { id: "unitycode",   label: "Unity",           pos: [-0.59, -1.11, 0.26],    size: 0.06,  color: "#c8b0cc" },
  { id: "vibe",        label: "Vibe Coding",     pos: [-0.33, -1.17, 0.78],    size: 0.06,  color: "#ccb4d0" },

  // Level 2 — Research
  { id: "xr",          label: "XR",              pos: [0.33, 0.78, 1.17],      size: 0.06,  color: "#c4b0d0" },
  { id: "interaction", label: "Interaction",     pos: [-0.20, 0.59, 1.24],     size: 0.06,  color: "#c8b8d4" },

  // Level 2 — Work Tool
  { id: "shotgrid",    label: "ShotGrid",        pos: [-1.17, -0.59, -0.72],   size: 0.06,  color: "#ddbcc4" },
  { id: "github",      label: "GitHub",          pos: [-0.98, 0.0, -0.91],     size: 0.06,  color: "#d8b4be" },

  // Level 2 — AI Tools
  { id: "chatgpt",     label: "ChatGPT",         pos: [0.91, 0.65, -0.91],     size: 0.06,  color: "#d4b0b0" },
  { id: "claude",      label: "Claude",          pos: [0.59, -0.07, -1.11],    size: 0.06,  color: "#d8b4b4" },
  { id: "gemini",      label: "Gemini",          pos: [0.20, 0.59, -1.04],     size: 0.06,  color: "#d0b0b8" },

  // Level 3 — Maya
  { id: "animation",   label: "Animation",       pos: [-1.82, 0.98, -0.33],    size: 0.045, color: "#e8c8cc" },
];

const EDGES: [string, string][] = [
  ["center", "3d"], ["center", "motion"], ["center", "visual"],
  ["center", "code"], ["center", "research"], ["center", "worktool"], ["center", "aitools"],
  ["3d", "maya"], ["3d", "blender"], ["3d", "unity3d"],
  ["motion", "ae"], ["motion", "premiere"],
  ["visual", "figma"], ["visual", "photoshop"], ["visual", "davinci"],
  ["code", "unitycode"], ["code", "vibe"],
  ["research", "xr"], ["research", "interaction"],
  ["worktool", "shotgrid"], ["worktool", "github"],
  ["aitools", "chatgpt"], ["aitools", "claude"], ["aitools", "gemini"],
  ["maya", "animation"],
];

// Shared material cache — one material instance per color string
const matCache = new Map<string, THREE.MeshStandardMaterial>();
function getNodeMat(color: string) {
  if (!matCache.has(color)) {
    matCache.set(color, new THREE.MeshStandardMaterial({
      color,
      roughness: 0.14,
      metalness: 0.08,
      envMapIntensity: 1.4,
    }));
  }
  return matCache.get(color)!;
}

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
      {NODES.map((node) => {
        // Fewer segments for smaller/farther nodes
        const seg = node.size >= 0.15 ? 14 : node.size >= 0.09 ? 12 : 10;
        return (
          <group key={node.id}>
            {/* Single mesh — visible + clickable (hitbox expanded via raycast) */}
            <mesh
              position={node.pos}
              scale={1}
              onClick={(e) => {
                e.stopPropagation();
                onNodeClick?.({ id: node.id, label: node.label, color: node.color });
              }}
            >
              <sphereGeometry args={[node.size * 1.6, seg, Math.ceil(seg * 0.8)]} />
              <primitive object={getNodeMat(node.color)} attach="material" />
            </mesh>

            <Text
              position={[node.pos[0], node.pos[1] + node.size * 1.6 + 0.07, node.pos[2]]}
              fontSize={node.size * 0.82}
              color="#8c7272"
              anchorX="center"
              anchorY="bottom"
              fillOpacity={0.65}
            >
              {node.label}
            </Text>
          </group>
        );
      })}

      {EDGES.map(([a, b]) => (
        <Line
          key={`${a}-${b}`}
          points={[nodeMap[a], nodeMap[b]]}
          color="#d4b0b8"
          lineWidth={0.55}
          transparent
          opacity={0.5}
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
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#fdf9f7", cursor: "grab" }}
    >
      {/* Scene background color — must be set here, not via CSS (alpha:false) */}
      <color attach="background" args={["#fdf9f7"]} />

      {/* HDR environment — drives reflections on MeshStandardMaterial */}
      <Environment files={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sky.hdr`} background={false} />

      {/* Supplemental lights to warm up the scene */}
      <ambientLight intensity={0.4} color="#fff4f0" />
      <directionalLight position={[6, 8, 4]} intensity={0.8} color="#ffe8e0" />
      <pointLight position={[-4, 2, 5]} intensity={0.35} color="#ffd0e4" />

      <OrbitControls
        enableZoom
        enablePan
        minDistance={1.6}
        maxDistance={7}
        mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.DOLLY }}
      />
      <Graph onNodeClick={onNodeClick} />
    </Canvas>
  );
}
