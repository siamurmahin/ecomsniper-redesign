import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* Brand colours, resolved once so the GPU never sees a CSS variable. */
const BRAND = {
  /* Accent blue, matching --color-accent. Metal darkens under the lights, so
     the rim light below uses the lighter --color-accent-soft value. */
  accent: '#0064d2',
  accentSoft: '#5b9df0',
  ink: '#2a2c31',
  ebayBlue: '#0064d2',
  ebayRed: '#e53238',
  ebayGreen: '#86b817',
  ebayYellow: '#f5af02',
  amazon: '#ff9900',
};

/** The brand mark in space rather than a generic spinning blob: three rings
    at different tilts, slowly counter-rotating. */
function ReticleRings({ pointer }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y += delta * 0.16;

    // Ease the whole assembly toward the pointer for a parallax-like tilt.
    const targetX = pointer.current.y * 0.22;
    group.rotation.x += (targetX - group.rotation.x) * 0.04;
    group.position.x += (pointer.current.x * 0.25 - group.position.x) * 0.04;
    group.position.y += (-pointer.current.y * 0.2 - group.position.y) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring — thin, accent blue, the locked-on target */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 12, 128]} />
        <meshStandardMaterial color={BRAND.accent} roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Middle ring — tilted the other way, ink */}
      <mesh rotation={[Math.PI / 1.7, Math.PI / 5, 0]}>
        <torusGeometry args={[1.85, 0.01, 12, 128]} />
        <meshStandardMaterial color={BRAND.ink} roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Inner ring — the closest thing to the crosshair in the logo */}
      <mesh rotation={[Math.PI / 2.9, -Math.PI / 3, 0]}>
        <torusGeometry args={[1.2, 0.014, 12, 96]} />
        <meshStandardMaterial color={BRAND.accent} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Core sphere: the product that has been found */}
      <mesh>
        <icosahedronGeometry args={[0.34, 3]} />
        <meshStandardMaterial color={BRAND.accent} roughness={0.18} metalness={0.85} />
      </mesh>
    </group>
  );
}

/**
 * Floating listing tiles orbiting the reticle — one per marketplace colour.
 * Each drifts on its own axis so the cluster never looks mechanically placed.
 */
function ListingTiles() {
  const tiles = useMemo(
    () => [
      { position: [-2.9, 1.25, -0.6], color: BRAND.ebayBlue, scale: 0.62, speed: 1.1 },
      { position: [2.85, 0.95, -0.9], color: BRAND.amazon, scale: 0.54, speed: 1.4 },
      { position: [2.3, -1.45, 0.5], color: BRAND.ebayGreen, scale: 0.46, speed: 0.9 },
      { position: [-2.35, -1.55, 0.35], color: BRAND.ebayRed, scale: 0.5, speed: 1.25 },
      { position: [0.15, 2.35, -1.3], color: BRAND.ebayYellow, scale: 0.4, speed: 1.6 },
    ],
    [],
  );

  return tiles.map((tile, index) => (
    <Float
      key={tile.color + index}
      speed={tile.speed}
      rotationIntensity={0.5}
      floatIntensity={0.9}
      floatingRange={[-0.18, 0.18]}
    >
      <mesh position={tile.position} rotation={[0.2, -0.35, 0.08]} scale={tile.scale}>
        {/* Rounded-ish card: a thin box reads as a listing tile at this size. */}
        <boxGeometry args={[1.15, 1.4, 0.06]} />
        <meshStandardMaterial color={tile.color} roughness={0.42} metalness={0.25} />
      </mesh>
    </Float>
  ));
}

/** Sparse dust field. Adds depth without the cost of a particle system. */
function DepthDust({ count = 90 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 12;
      array[i * 3 + 1] = (Math.random() - 0.5) * 8;
      array[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={BRAND.accent} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/** Tracks normalised pointer position and feeds it to the reticle. */
function PointerTracker({ pointer }) {
  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });
  return null;
}

/**
 * Decoration, so it is aria-hidden and carries nothing the copy does not.
 * Mounted lazily and skipped entirely under reduced motion.
 */
export default function ReticleScene() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      aria-hidden="true"
      // Cap DPR: past ~1.75 the extra pixels cost frames and buy nothing here.
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color('#fbfbfa'), 0)}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-5, -2, -4]} intensity={0.8} color={BRAND.accentSoft} />

      <PointerTracker pointer={pointer} />
      <ReticleRings pointer={pointer} />
      <ListingTiles />
      <DepthDust />
    </Canvas>
  );
}
