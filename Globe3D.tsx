import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type GlobeMarker = {
  lat: number;
  lng: number;
  label: string;
  description: string;
};

type Globe3DProps = {
  markers: GlobeMarker[];
  onMarkerClick?: (marker: GlobeMarker) => void;
};

function latLngToVector(lat: number, lng: number, radius = 1.53) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function GlobeMesh({ markers, onMarkerClick }: Globe3DProps) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => markers.map((m) => ({ marker: m, position: latLngToVector(m.lat, m.lng) })), [markers]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.075;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#101c27" roughness={0.8} metalness={0.18} />
      </mesh>
      <mesh scale={1.012}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#d6b77b" wireframe transparent opacity={0.055} />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshBasicMaterial color="#c9a66b" side={THREE.BackSide} transparent opacity={0.12} />
      </mesh>
      {points.map(({ marker, position }) => (
        <group key={marker.label} position={position}>
          <mesh>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#f3d8a0" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshBasicMaterial color="#d4af72" transparent opacity={0.2} />
          </mesh>
          <Html distanceFactor={8} position={[0.08, 0.05, 0]} center>
            <button className="globe-pin" onClick={(e) => { e.stopPropagation(); onMarkerClick?.(marker); }} title={marker.label}>
              <span className="globe-pin-dot" />
              <span>{marker.label}</span>
            </button>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function Globe3D({ markers, onMarkerClick }: Globe3DProps) {
  return (
    <div className="globe-canvas" aria-label="Interactive 3D globe showing property markets">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} dpr={[1, 1.6]}>
        <ambientLight intensity={1.3} />
        <pointLight position={[4, 3, 4]} intensity={2.4} color="#f0d4a0" />
        <pointLight position={[-4, -2, -3]} intensity={1.6} color="#4c8fbb" />
        <Stars radius={70} depth={45} count={1300} factor={2} fade speed={0.3} />
        <GlobeMesh markers={markers} onMarkerClick={onMarkerClick} />
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}