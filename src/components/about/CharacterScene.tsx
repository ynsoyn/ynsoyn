"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

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
          rgba(244,244,242,0.82) 0%,
          rgba(244,244,242,0.28) 20%,
          transparent 38%
        )`,
      }} />

      {/* ④ Bottom band fog */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(
          to top,
          rgba(244,244,242,0.75) 0%,
          rgba(244,244,242,0.22) 18%,
          transparent 34%
        )`,
      }} />

      {/* ⑤ Left edge fog */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(
          to right,
          rgba(244,244,242,0.6) 0%,
          transparent 22%
        )`,
      }} />

      {/* ⑥ Right edge fog */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(
          to left,
          rgba(244,244,242,0.6) 0%,
          transparent 22%
        )`,
      }} />

    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function CharacterScene({ onReact }: { onReact?: () => void }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0.2, 3], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: "#f4f4f2", cursor: "pointer" }}
      >
        <WireframeCharacter onReact={onReact ?? (() => {})} />
      </Canvas>
      <FrostedOverlay />
    </div>
  );
}
