"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import React, { useRef, useMemo, useState } from "react";
import * as THREE from "three";

const WIRE = "#9e8c7c";
const WARM1 = "#c9a882";
const WARM2 = "#8fa89e";
const WARM3 = "#d4c4a8";

function MobileRig({
  rotation,
  dragDelta,
}: {
  rotation: number;
  dragDelta: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  const arcPoints = useMemo((): [number, number, number][] => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, 0, 0),
      new THREE.Vector3(-0.5, 0.3, 0),
      new THREE.Vector3(0.1, 0.36, 0),
      new THREE.Vector3(0.7, 0.28, 0),
      new THREE.Vector3(1.2, 0.14, 0),
      new THREE.Vector3(1.75, 0, 0),
    ]);
    return curve.getPoints(60).map((p) => [p.x, p.y, p.z]);
  }, []);

  const largeRed = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(-0.18, 0.06, -0.36, 0.32, -0.22, 0.68);
    s.bezierCurveTo(-0.08, 1.04, 0.16, 0.98, 0.26, 0.66);
    s.bezierCurveTo(0.36, 0.34, 0.22, 0.06, 0, 0);
    return s;
  }, []);

  const smallRed = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(-0.1, 0.05, -0.18, 0.22, -0.1, 0.42);
    s.bezierCurveTo(-0.02, 0.62, 0.1, 0.58, 0.16, 0.4);
    s.bezierCurveTo(0.22, 0.22, 0.12, 0.04, 0, 0);
    return s;
  }, []);

  const yellowLeaf = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0.07, 0.22);
    s.lineTo(0.14, 0);
    s.closePath();
    return s;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        rotation + dragDelta.current + Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Line points={[[0, 1.3, 0], [0, 0.05, 0]]} color={WIRE} lineWidth={1} />
      <Line points={arcPoints} color={WIRE} lineWidth={1.5} />

      <Line points={[[-1.2, 0, 0], [-1.2, -0.28, 0]]} color={WIRE} lineWidth={1} />
      <mesh position={[-1.34, -1.18, 0]} scale={0.86}>
        <shapeGeometry args={[largeRed]} />
        <meshBasicMaterial color={WARM1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.2, 0, 0]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color={WIRE} />
      </mesh>

      <Line points={[[0.06, 0.3, 0], [0.06, -0.04, 0]]} color={WIRE} lineWidth={1} />
      <Line points={[[-0.42, -0.04, 0], [0.34, -0.04, 0]]} color={WIRE} lineWidth={1.2} />

      <Line points={[[-0.36, -0.04, 0], [-0.36, -0.24, 0]]} color={WIRE} lineWidth={1} />
      <mesh position={[-0.46, -0.72, 0]} scale={0.72}>
        <shapeGeometry args={[smallRed]} />
        <meshBasicMaterial color={WARM1} side={THREE.DoubleSide} />
      </mesh>

      <Line points={[[0.28, -0.04, 0], [0.28, -0.18, 0]]} color={WIRE} lineWidth={1} />
      <mesh position={[0.28, -0.42, 0]}>
        <circleGeometry args={[0.22, 32]} />
        <meshBasicMaterial color={WARM2} side={THREE.DoubleSide} />
      </mesh>

      <Line points={[[1.2, 0.14, 0], [1.2, -0.08, 0]]} color={WIRE} lineWidth={1} />
      <Line points={[[0.94, -0.08, 0], [1.52, -0.08, 0]]} color={WIRE} lineWidth={1} />

      <Line points={[[0.96, -0.08, 0], [0.96, -0.2, 0]]} color={WIRE} lineWidth={0.8} />
      <mesh position={[0.9, -0.42, 0]} scale={1.9}>
        <shapeGeometry args={[yellowLeaf]} />
        <meshBasicMaterial color={WARM3} side={THREE.DoubleSide} />
      </mesh>

      <Line points={[[1.22, -0.08, 0], [1.22, -0.22, 0]]} color={WIRE} lineWidth={0.8} />
      <mesh position={[1.16, -0.46, 0]} scale={1.9} rotation={[0, 0, 0.1]}>
        <shapeGeometry args={[yellowLeaf]} />
        <meshBasicMaterial color={WARM3} side={THREE.DoubleSide} />
      </mesh>

      <Line points={[[1.5, -0.08, 0], [1.5, -0.18, 0]]} color={WIRE} lineWidth={0.8} />
      <mesh position={[1.44, -0.4, 0]} scale={1.9} rotation={[0, 0, -0.08]}>
        <shapeGeometry args={[yellowLeaf]} />
        <meshBasicMaterial color={WARM3} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[1.75, 0, 0]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color={WIRE} />
      </mesh>
    </group>
  );
}

export default function MobileScene({ rotation }: { rotation: number }) {
  const dragDelta = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    setGrabbing(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    dragDelta.current += (e.clientX - lastX.current) * 0.008;
    lastX.current = e.clientX;
  };

  const stopDrag = () => {
    isDragging.current = false;
    setGrabbing(false);
  };

  return (
    <div
      style={{ width: "100%", height: "100%", cursor: grabbing ? "grabbing" : "grab" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <Canvas camera={{ position: [0.3, 0.15, 3.6], fov: 54 }} style={{ background: "#ede8e0" }}>
        <MobileRig rotation={rotation} dragDelta={dragDelta} />
      </Canvas>
    </div>
  );
}
