"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

export interface NodeInfo {
  id: string;
  label: string;
  color: string;
  description?: string;
}

function SpinningOrb({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.22;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.22;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} color="#fff4f0" />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffe0d8" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#ffd0e0" />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.78, 32, 26]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.06}
          metalness={0.04}
          transmission={0.3}
          thickness={2.2}
          reflectivity={0.9}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.96, 16, 14]} />
        <meshStandardMaterial color={color} transparent opacity={0.05} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI * 0.28, 0.2, 0]}>
        <torusGeometry args={[1.22, 0.016, 8, 80]} />
        <meshStandardMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </>
  );
}

interface Props {
  node: NodeInfo | null;
  onDeselect: () => void;
}

export default function NodeDetailPanel({ node, onDeselect }: Props) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#f5f5f3" }}>
      <AnimatePresence mode="wait">
        {node ? (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Close button */}
            <button
              onClick={onDeselect}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 2,
                background: "rgba(255,255,255,0.55)",
                border: "none",
                borderRadius: "50%",
                width: "26px",
                height: "26px",
                cursor: "pointer",
                fontSize: "0.7rem",
                color: "#8c7272",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              ✕
            </button>

            {/* 3D Orb */}
            <div style={{ height: "52%", flexShrink: 0 }}>
              <Canvas camera={{ position: [0, 0, 2.8], fov: 48 }}
                style={{ background: "#f5f5f3" }}>
                <SpinningOrb color={node.color} />
              </Canvas>
            </div>

            {/* Label + description */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px 18px" }}>
              <p style={{
                color: node.color,
                fontSize: "0.88rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                marginBottom: node.description ? "10px" : 0,
                fontFamily: "'Presentation', sans-serif",
              }}>
                {node.label}
              </p>
              {node.description && (
                <p style={{
                  fontSize: "0.72rem",
                  color: "#8c7f78",
                  lineHeight: 1.75,
                  margin: 0,
                  fontFamily: "'MaruBuri', serif",
                }}>
                  {node.description}
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="guide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#d4a0b0",
              }}
            />
            <p style={{
              fontSize: "0.7rem",
              color: "#c4aaa8",
              letterSpacing: "0.1em",
              textAlign: "center",
              lineHeight: 1.7,
              fontFamily: "'MaruBuri', serif",
            }}>
              요소를 눌러보세요
            </p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              marginTop: "6px",
              padding: "12px 18px",
              borderTop: "1px solid rgba(200,185,174,0.25)",
            }}>
              {[
                ["휠",          "확대 / 축소"],
                ["휠 드래그",   "이동"],
                ["클릭",        "요소 선택"],
                ["클릭 드래그", "회전"],
              ].map(([key, val]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                  <span style={{ fontSize: "0.6rem", color: "#d4b8b4", fontFamily: "'CloudSansCode', monospace", flexShrink: 0 }}>
                    {key}
                  </span>
                  <span style={{ fontSize: "0.6rem", color: "#b5a99e", fontFamily: "'MaruBuri', serif", textAlign: "right" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
