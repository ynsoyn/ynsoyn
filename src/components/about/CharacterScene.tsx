"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// ── Deterministic droplet generator ──────────────────────────
function seeded(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface Drop {
  x: number; y: number;
  rx: number; ry: number;
  angle: number; opacity: number;
}

function genDroplets(count: number): Drop[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (offset: number) => seeded(i * 11 + offset);
    // cluster more drops toward edges (use beta-like distribution)
    const rawX = r(0);
    const rawY = r(1);
    // pull some toward edges
    const x = i % 3 === 0 ? rawX * 30 : i % 3 === 1 ? rawX * 30 + 70 : rawX * 100;
    const y = r(2) * 100;
    return {
      x,
      y,
      rx: r(3) * 4.5 + 1.5,
      ry: r(4) * 3.5 + 1.2,
      angle: r(5) * 40 - 20,
      opacity: r(6) * 0.45 + 0.28,
    };
  });
}

function Droplet({ x, y, rx, ry, angle, opacity }: Drop) {
  const cx = x;
  const cy = y;
  const hx = cx - rx * 0.22;
  const hy = cy - ry * 0.26;
  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      {/* body */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
        fill={`rgba(255,252,250,${opacity * 0.38})`}
        stroke={`rgba(255,255,255,${opacity * 0.65})`}
        strokeWidth={0.5}
      />
      {/* inner highlight top-left */}
      <ellipse cx={hx} cy={hy} rx={rx * 0.38} ry={ry * 0.3}
        fill={`rgba(255,255,255,${opacity * 0.72})`}
      />
      {/* faint shadow bottom-right */}
      <ellipse cx={cx + rx * 0.18} cy={cy + ry * 0.22} rx={rx * 0.28} ry={ry * 0.22}
        fill={`rgba(200,185,175,${opacity * 0.18})`}
      />
    </g>
  );
}

// ── Star sticker (like human1 / human3) ───────────────────────
function StarSticker({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const outer = (i * 60 - 90) * (Math.PI / 180);
    const inner = ((i * 60 - 90) + 30) * (Math.PI / 180);
    const ro = size, ri = size * 0.42;
    return [
      `${x + ro * Math.cos(outer)},${y + ro * Math.sin(outer)}`,
      `${x + ri * Math.cos(inner)},${y + ri * Math.sin(inner)}`,
    ];
  }).flat().join(" ");
  return (
    <polygon points={pts}
      fill={`rgba(240,238,248,${opacity * 0.75})`}
      stroke={`rgba(220,215,240,${opacity * 0.9})`}
      strokeWidth={0.4}
    />
  );
}

// ── Wireframe character ───────────────────────────────────────
function WireframeCharacter({ onReact }: { onReact: () => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const reactionRef = useRef(0);
  const autoRot = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    autoRot.current += delta * 0.38;

    if (reactionRef.current > 0) {
      reactionRef.current = Math.max(0, reactionRef.current - delta * 1.8);
      const t = reactionRef.current;
      groupRef.current.position.y = Math.sin(t * Math.PI) * 0.5 - 0.8;
      groupRef.current.rotation.y = autoRot.current + (1 - t) * Math.PI * 2;
    } else {
      groupRef.current.position.y = -0.8;
      groupRef.current.rotation.y = autoRot.current;
    }
  });

  const triggerReaction = () => { reactionRef.current = 1; onReact(); };
  const mat = <meshBasicMaterial color="#b8a898" wireframe />;

  return (
    <group ref={groupRef} position={[0, -0.8, 0]} onClick={triggerReaction}>
      <mesh position={[0, 1.65, 0]}><sphereGeometry args={[0.22, 12, 10]} />{mat}</mesh>
      <mesh position={[0, 1.05, 0]}><boxGeometry args={[0.46, 0.6, 0.28]} />{mat}</mesh>
      <mesh position={[0, 0.7, 0]}><boxGeometry args={[0.38, 0.18, 0.26]} />{mat}</mesh>
      <mesh position={[-0.34, 1.08, 0]} rotation={[0, 0, Math.PI * 0.08]}><cylinderGeometry args={[0.07, 0.065, 0.38, 8]} />{mat}</mesh>
      <mesh position={[-0.46, 0.74, 0]} rotation={[0, 0, Math.PI * 0.05]}><cylinderGeometry args={[0.065, 0.055, 0.36, 8]} />{mat}</mesh>
      <mesh position={[0.34, 1.08, 0]} rotation={[0, 0, -Math.PI * 0.08]}><cylinderGeometry args={[0.07, 0.065, 0.38, 8]} />{mat}</mesh>
      <mesh position={[0.46, 0.74, 0]} rotation={[0, 0, -Math.PI * 0.05]}><cylinderGeometry args={[0.065, 0.055, 0.36, 8]} />{mat}</mesh>
      <mesh position={[-0.13, 0.38, 0]}><cylinderGeometry args={[0.1, 0.09, 0.38, 8]} />{mat}</mesh>
      <mesh position={[-0.13, -0.02, 0]}><cylinderGeometry args={[0.085, 0.072, 0.38, 8]} />{mat}</mesh>
      <mesh position={[-0.13, -0.26, 0.06]}><boxGeometry args={[0.12, 0.1, 0.22]} />{mat}</mesh>
      <mesh position={[0.13, 0.38, 0]}><cylinderGeometry args={[0.1, 0.09, 0.38, 8]} />{mat}</mesh>
      <mesh position={[0.13, -0.02, 0]}><cylinderGeometry args={[0.085, 0.072, 0.38, 8]} />{mat}</mesh>
      <mesh position={[0.13, -0.26, 0.06]}><boxGeometry args={[0.12, 0.1, 0.22]} />{mat}</mesh>
    </group>
  );
}

// ── Frosted glass overlay ─────────────────────────────────────
function FrostedOverlay() {
  const drops = useMemo(() => genDroplets(58), []);
  const stars = useMemo(() => [
    { x: 28, y: 42, size: 5.5, opacity: 0.7 },
    { x: 61, y: 68, size: 4.2, opacity: 0.55 },
    { x: 18, y: 75, size: 3.6, opacity: 0.5 },
    { x: 78, y: 28, size: 5.0, opacity: 0.65 },
    { x: 85, y: 82, size: 3.8, opacity: 0.45 },
    { x: 44, y: 18, size: 4.5, opacity: 0.6 },
  ], []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ① Subtle overall tint — very faint glass */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(248,244,240,0.07)",
      }} />

      {/* ② Radial fog — edges heavy, center clear */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(
          ellipse 54% 48% at 50% 50%,
          transparent 0%,
          rgba(242,236,230,0.18) 50%,
          rgba(238,232,225,0.62) 75%,
          rgba(234,228,220,0.88) 100%
        )`,
      }} />

      {/* ③ Top band fog */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(
          to bottom,
          rgba(240,235,228,0.82) 0%,
          rgba(240,235,228,0.28) 20%,
          transparent 38%
        )`,
      }} />

      {/* ④ Bottom band fog */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(
          to top,
          rgba(240,235,228,0.75) 0%,
          rgba(240,235,228,0.22) 18%,
          transparent 34%
        )`,
      }} />

      {/* ⑤ Left edge fog */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(
          to right,
          rgba(240,235,228,0.6) 0%,
          transparent 22%
        )`,
      }} />

      {/* ⑥ Right edge fog */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(
          to left,
          rgba(240,235,228,0.6) 0%,
          transparent 22%
        )`,
      }} />

      {/* ⑦ Water droplets + stars SVG */}
      <svg
        width="100%" height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <filter id="droplet-soft">
            <feGaussianBlur stdDeviation="0.18" />
          </filter>
        </defs>
        <g filter="url(#droplet-soft)">
          {drops.map((d, i) => <Droplet key={i} {...d} />)}
        </g>
        {stars.map((s, i) => <StarSticker key={i} {...s} />)}
      </svg>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function CharacterScene({ onReact }: { onReact?: () => void }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0.2, 3], fov: 50 }}
        style={{ background: "#f0ebe4", cursor: "pointer" }}
      >
        <WireframeCharacter onReact={onReact ?? (() => {})} />
      </Canvas>
      <FrostedOverlay />
    </div>
  );
}
